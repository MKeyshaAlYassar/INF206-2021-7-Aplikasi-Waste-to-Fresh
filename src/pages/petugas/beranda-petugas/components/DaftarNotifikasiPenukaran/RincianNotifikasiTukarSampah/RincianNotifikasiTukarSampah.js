import { useParams, Link } from "react-router-dom";
import "./RincianNotifikasiTukarSampah.css";
import { useState, useEffect } from "react";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../../../../../firebase";

export default function RincianNotifikasiTukarSampah() {
  const params = useParams();
  const idTukarSampah = params.id;
  console.log(params.id);

  const [dataRincian, setDataRincian] = useState({});

  useEffect(() => {
    const ambilDataRincian = async () => {
      const docRef = doc(db, "tukarsampah", idTukarSampah);
      const docSnap = await getDoc(docRef);
      setDataRincian(docSnap.data());
    };

    ambilDataRincian();
  }, []);

  console.log(dataRincian);

  // Format timestamp
  const tanggal = dataRincian.waktu?.toDate().toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const jam = dataRincian.waktu
    ?.toDate()
    .toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });

  function handleTerima() {
    //Handle terima tukar sampah disini
  }

  return (
    <div className="rincian-notifikasi-tukar-sampah-container">
      <Link className="tombol-kembali" to="/beranda-petugas">
        &lt;
      </Link>
      <div className="header-rincian-notifikasi-tukar-sampah">
        <p className="judul-fitur"> Rincian Notifikasi Tukar Sampah</p>
        <p className="deskripsi-fitur">
          Terima permintaan penukaran dari masyarakat
        </p>
      </div>
      <div className="fitur-rincian-notifikasi-tukar-sampah-container">
        <div className="informasi-notifikasi-penukaran-sampah">
          <p className="judul-informasi">Informasi Penukaran</p>
          <p className="informasi-subject">Status</p>
          <p className="informasi-isi">{dataRincian.status}</p>

          <p className="informasi-subject">Tanggal Penukaran</p>
          <p className="informasi-isi">{tanggal}</p>

          <p className="informasi-subject">Waktu Penukaran</p>
          <p className="informasi-isi">{jam} WIB</p>
        </div>

        <div className="informasi-notifikasi-data-penukar">
          <p className="judul-informasi">Data Penukaran</p>
          <p className="informasi-subject">Nama</p>
          <p className="informasi-isi">{dataRincian.namaPenukar}</p>

          <p className="informasi-subject">No HP</p>
          <p className="informasi-isi">{dataRincian.noHpPenukar}</p>

          <p className="informasi-subject-alamat">Alamat Pengambilan</p>
          <p className="informasi-isi-alamat">{dataRincian.alamatAmbil}</p>
        </div>

        <p className="judul-foto-sampah">Foto Sampah</p>
        <img className="foto-sampah" src={dataRincian.urlFotoSampah} />

        <button
          className="tombol-terima-notifikasi-tukar-sampah"
          onClick={handleTerima}>
          Terima
        </button>
      </div>
    </div>
  );
}
