import "./RincianPenukaranSampahPetugas.css";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../../../firebase";

export default function RincianPenukaranSampahPetugas() {
  const params = useParams();
  const idTukarSampah = params.id;

  const navigate = useNavigate();

  const [dataRincian, setDataRincian] = useState({});

  // Buat style untuk kondisi diproses dan selesai
  // Set style condition
  let divStyle = {};

  if (dataRincian?.status === "Diproses") {
    divStyle = { backgroundColor: "#FFB547" };
  } else if (dataRincian?.status === "Selesai") {
    divStyle = { backgroundColor: "#60BA62" };
  }

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

  function handleBeriPoin() {
    return;
  }

  return (
    <div
      className="rincian-penukaran-sampah-petugas-container"
      style={divStyle}>
      <Link className="tombol-kembali" to="/penukaran-petugas">
        &lt;
      </Link>
      <div className="header-rincian-penukaran-sampah-petugas">
        <p className="judul-fitur"> Rincian Penukaran Sampah Anda</p>
        <p className="deskripsi-fitur">
          Lihat dan kelola penukaran sampah yang Anda proses
        </p>
      </div>
      <div className="fitur-rincian-penukaran-sampah-petugas-container">
        <div className="informasi-penukaran-sampah-petugas" style={divStyle}>
          <p className="judul-informasi">Informasi Penukaran</p>
          <p className="informasi-subject">Status</p>
          <p className="informasi-isi">{dataRincian.status}</p>

          <p className="informasi-subject">Tanggal Penukaran</p>
          <p className="informasi-isi">{tanggal}</p>

          <p className="informasi-subject">Waktu Penukaran</p>
          <p className="informasi-isi">{jam} WIB</p>
        </div>

        <div
          className="informasi-data-penukaran-sampah-petugas"
          style={divStyle}>
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

        {dataRincian?.status === "Diproses" && (
          <button
            className="tombol-beri-poin-penukaran-sampah-petugas"
            onClick={() => {
              navigate(
                `/rincian-penukaran-petugas/tukar-poin/${idTukarSampah}/beri-poin`,
                { state: dataRincian }
              );
            }}>
            Beri Poin
          </button>
        )}
      </div>
    </div>
  );
}
