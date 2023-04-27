import { collection, doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./RincianRiwayatTukarSampah.css";
import { db } from "../../../../firebase";

export default function RincianRiwayatTukarSampah() {
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

  return (
    <div className="rincian-tukar-sampah-container">
      <Link className="tombol-kembali" to="/riwayat-user">
        &lt;
      </Link>
      <div className="header-rincian-tukar-sampah">
        <p className="judul-fitur">Rincian Penukaran Sampah</p>
        <p className="deskripsi-fitur">Lihat detail penukaran Anda</p>
      </div>
      <div className="fitur-rincian-tukar-sampah-container">
        <div className="informasi-penukaran-sampah">
          <p className="judul-informasi">Informasi Penukaran</p>
          <p className="informasi-subject">Status</p>
          <p className="informasi-isi">{dataRincian.status}</p>

          <p className="informasi-subject">Tanggal Penukaran</p>
          <p className="informasi-isi">15 Oktober 2003</p>

          <p className="informasi-subject">Petugas Pemroses</p>
          <p className="informasi-isi">
            {dataRincian.namaPetugasPemroses !== ""
              ? dataRincian.namaPetugasPemroses
              : "-"}
          </p>

          <p className="informasi-subject">Nomor HP Petugas</p>
          <p className="informasi-isi">
            {dataRincian.noHpPetugasPemroses !== ""
              ? dataRincian.noHpPetugasPemroses
              : "-"}
          </p>

          <p className="informasi-subject">Poin yang Didapat</p>
          <p className="informasi-isi">
            {dataRincian.poin > 0 ? dataRincian.poin : "-"}
          </p>
        </div>

        <div className="informasi-data-penukar">
          <p className="judul-informasi">Data Penukar</p>
          <p className="informasi-subject">Nama</p>
          <p className="informasi-isi">{dataRincian.namaPenukar}</p>

          <p className="informasi-subject">No HP</p>
          <p className="informasi-isi">{dataRincian.noHpPenukar}</p>

          <p className="informasi-subject-alamat">Alamat Pengambilan</p>
          <p className="informasi-isi-alamat">{dataRincian.alamatAmbil}</p>
        </div>

        <p className="judul-foto-sampah">Foto Sampah</p>
        <img className="foto-sampah" src={dataRincian.urlFotoSampah} />
      </div>
    </div>
  );
}
