import "./DaftarRiwayat.css";
import { useState, useEffect } from "react";
import { db } from "../../../../../firebase";
import { collection, getDocs, where, query } from "firebase/firestore";
import { UserAuth } from "../../../../../context/AuthContext";
import { TbClockHour4 } from "react-icons/tb";
import { Link } from "react-router-dom";

export default function DaftarRiwayat(props) {
  console.log(props.filter);
  // Ambil uid user
  const { user } = UserAuth();
  const uidUser = user.uid;

  // Ambil semua data tukar sampah user
  // Simpan di state
  // State untuk tampung data tukar sampah user
  const [dataPenukaranUser, setDataPenukaranUser] = useState([]);

  const dbCollectionRef = collection(db, `tukar${props.filter}`);

  const q = useEffect(() => {
    const getAllDataPenukaranUser = async () => {
      try {
        const data = await getDocs(
          query(dbCollectionRef, where("uidPenukar", "==", uidUser))
        );
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setDataPenukaranUser(filteredData);
        console.log(filteredData);
      } catch (err) {
        console.error(err);
      }
    };

    if (uidUser) {
      getAllDataPenukaranUser();
    }
  }, [uidUser, props.filter]);

  // Urutin data berdasarkan waktu
  const sortedDataPenukaranUser = dataPenukaranUser.sort(
    (a, b) => b.waktu.seconds - a.waktu.seconds
  );

  const daftarDisplay = sortedDataPenukaranUser.map((item) => {
    // Set style condition
    let divStyle = {};
    let textStyle = {};

    if (item.status === "Menunggu proses") {
      divStyle = { backgroundColor: "white" };
      textStyle = { color: "black" };
    } else if (item.status === "Diproses") {
      divStyle = { backgroundColor: "#FFB547" };
      textStyle = { color: "white" };
    } else if (item.status === "Selesai") {
      divStyle = { backgroundColor: "#60BA62" };
      textStyle = { color: "white" };
    }

    // Format timestamp
    // Format the timestamp
    const tanggal = item.waktu.toDate().toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const jam = item.waktu
      .toDate()
      .toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });

    return (
      <Link
        key={item.id}
        className="display-riwayat-link"
        to={`/riwayat-user/tukar-${props.filter}/${item.id}`}>
        <div className="display-riwayat-container" style={divStyle}>
          <div className="waktu-display-container">
            <p className="tanggal-display-riwayat" style={textStyle}>
              {tanggal}
            </p>
            <div className="jam-container">
              <TbClockHour4 style={textStyle} />
              <p className="jam-display-riwayat" style={textStyle}>
                {jam} WIB
              </p>
            </div>
          </div>
          <div className="info-display-container">
            <p className="status-display-riwayat" style={textStyle}>
              Status: {item.status}
            </p>
            {(item.totalHarga > 0 || item.poin > 0) && (
              <p className="poin-display-riwayat" style={textStyle}>
                {item.poin ? `+${item.poin}` : `-${item.totalHarga}`} Poin
              </p>
            )}
          </div>
        </div>
      </Link>
    );
  });

  return <div className="scrollable-riwayat-penukaran">{daftarDisplay}</div>;
}
