import "./DaftarNotifikasiPenukaran.css";
import { useState, useEffect } from "react";
import { db } from "../../../../../firebase";
import { collection, getDocs, where, query } from "firebase/firestore";
import { Link } from "react-router-dom";

export default function DaftarNotifikasiPenukaran(props) {
  // Ambil semua data penukaran yang status nya "Menunggu petugas"
  // Simpan di state
  // State untuk tampung data penukaran
  const [dataPenukaran, setDataPenukaran] = useState([]);

  const dbCollectionRef = collection(db, `tukar${props.filter}`);

  const q = useEffect(() => {
    const getAllDataPenukaran = async () => {
      try {
        const data = await getDocs(
          query(dbCollectionRef, where("status", "==", "Menunggu petugas"))
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
    (a, b) => b.waktu.seconds - a.waktu.seconds
  );

  // Buat tampilan daftarnya
  const daftarDisplay = sortedDataPenukaran.map((item) => {
    // Format timestamp
    const tanggal = item.waktu.toDate().toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    return (
      <Link
        key={item.id}
        className="display-notifikasi-link"
        to={`/rincian-notifikasi-penukaran/tukar-${props.filter}/${item.id}`}>
        <div className="display-notifikasi-container">
          <div className="nama-tanggal-display-container">
            <p className="nama-display-notifikasi">Nama: {item.namaPenukar}</p>
            <p className="tanggal-display-notifikasi">{tanggal}</p>
          </div>
          <p className="alamat-display-notifikasi">
            Alamat: {item.alamatAmbil ? item.alamatAmbil : item.alamatAntar}
          </p>
        </div>
      </Link>
    );
  });

  return (
    <div className="scrollable-notifikasi-penukaran">
      {dataPenukaran.length === 0 && (
        <p className="belum-ada-penukaran">
          Tidak ada penukaran yang belum diproses
        </p>
      )}
      {daftarDisplay}
    </div>
  );
}
