import "./DaftarPenukaranPetugas.css";
import { useState, useEffect } from "react";
import { db } from "../../../firebase";
import { collection, getDocs, where, query } from "firebase/firestore";
import { Link } from "react-router-dom";
import { UserAuth } from "../../../context/AuthContext";

export default function DaftarPenukaranPetugas(props) {
  // Ambil UID petugas yang login
  const { user } = UserAuth();
  const uid = user.uid;
  console.log(uid);

  // Ambil semua data penukaran petugas yang login
  // Simpan di state
  // State untuk tampung data penukaran
  const [dataPenukaran, setDataPenukaran] = useState([]);

  const dbCollectionRef = collection(db, `tukar${props.filter}`);

  const q = useEffect(() => {
    const getAllDataPenukaran = async () => {
      try {
        const data = await getDocs(
          query(dbCollectionRef, where("uidPetugasPemroses", "==", uid))
        );
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setDataPenukaran(filteredData);
        console.log(filteredData);
        console.log(filteredData.length);
      } catch (err) {
        console.error(err);
      }
    };

    getAllDataPenukaran();
  }, [props.filter]);

  // Urutin data berdasarkan waktu
  const sortedDataPenukaran = dataPenukaran.sort(
    (b, a) => a.waktu.seconds - b.waktu.seconds
  );

  // Buat tampilan daftarnya
  const daftarDisplay = sortedDataPenukaran.map((item) => {
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
    const tanggal = item.waktu.toDate().toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    return (
      <Link
        key={item.id}
        className="display-penukaran-petugas-link"
        to={`/rincian-penukaran-petugas/tukar-${props.filter}/${item.id}`}>
        <div className="display-penukaran-petugas-container" style={divStyle}>
          <div className="nama-tanggal-display-container">
            <p className="nama-display-penukaran-petugas" style={textStyle}>
              Nama: {item.namaPenukar}
            </p>
            <p className="tanggal-display-penukaran-petugas" style={textStyle}>
              {tanggal}
            </p>
          </div>
          <p className="alamat-display-penukaran-petugas" style={textStyle}>
            Alamat: {item.alamatAmbil ? item.alamatAmbil : item.alamatAntar}
          </p>
        </div>
      </Link>
    );
  });
  return (
    <div className="scrollable-penukaran-petugas">
      {dataPenukaran.length === 0 && (
        <p className="belum-ada-penukaran">
          Tidak ada penukaran yang Anda proses
        </p>
      )}
      {daftarDisplay}
    </div>
  );
}
