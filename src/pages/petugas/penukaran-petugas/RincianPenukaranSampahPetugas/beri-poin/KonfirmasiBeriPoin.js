import "./KonfirmasiBeriPoin.css";
import { CgCloseO } from "react-icons/cg";
import {
  doc,
  increment,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../../../../../firebase";
import PopUpBerhasil from "../../../../components/popup/PopUpBerhasil";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const KonfirmasiBeriPoin = ({
  open,
  onClose,
  idTukarSampah,
  data,
  konversi,
  jumlahSampah,
  totalPoin,
}) => {
  const [openPopUp, setOpenPopUp] = useState(false);

  const navigate = useNavigate();

  async function handleKirimPoin() {
    console.log(data.uidPenukar);

    // Tambah poin penukar
    const q = query(
      collection(db, "user"),
      where("uid", "==", data.uidPenukar)
    );

    const querySnapshot = await getDocs(q);

    const documentRef = doc(db, "user", querySnapshot.docs[0].id);

    await updateDoc(documentRef, {
      poin: increment(totalPoin),
    });

    // Update status penukaran jadi Selesai dan update berapa poin yang didapat
    const documentRef2 = doc(db, "tukarsampah", idTukarSampah);

    await updateDoc(documentRef2, {
      status: "Selesai",
      poin: totalPoin,
    });

    setOpenPopUp(true);
  }

  if (!open) return null;

  return (
    <div className="konfirmasi-beri-poin-overlay">
      <div className="konfirmasi-beri-poin-container">
        <CgCloseO className="tutup-konfirmasi-beri-poin" onClick={onClose} />
        <p className="judul-konfirmasi-beri-poin">Konfirmasi</p>
        <p className="nama-rincian-sampah-ditukar">
          <span className="bold">Nama Penukar:</span> {data.namaPenukar}
        </p>

        <div className="tabel-rincian-sampah-ditukar">
          <p className="judul-tabel-rincian-sampah-ditukar">
            Rincian Sampah Yang Ditukarkan
          </p>

          <p className="judul-jenis-kolom-tabel-rincian-sampah-ditukar">
            Jenis
          </p>
          <p className="judul-kolom-tabel-rincian-sampah-ditukar">Poin / kg</p>
          <p className="judul-kolom-tabel-rincian-sampah-ditukar">
            Jumlah (kg)
          </p>
          <p className="judul-jumlah-poin-tabel-rincian-sampah-ditukar">
            Jumlah Poin
          </p>

          <p className="isi-kolom-jenis">Organik</p>
          <p className="isi-kolom-poin-kg">{konversi.organik}</p>
          <p className="isi-kolom-jumlah-kg">
            {jumlahSampah.organik ? jumlahSampah.organik : "-"}
          </p>
          <p className="isi-kolom-jumlah-poin">
            {konversi.organik * jumlahSampah.organik}
          </p>

          <p className="isi-kolom-jenis">Botol Plastik</p>
          <p className="isi-kolom-poin-kg">{konversi.botol_plastik}</p>
          <p className="isi-kolom-jumlah-kg">
            {jumlahSampah.botol_plastik ? jumlahSampah.botol_plastik : "-"}
          </p>
          <p className="isi-kolom-jumlah-poin">
            {konversi.botol_plastik * jumlahSampah.botol_plastik}
          </p>

          <p className="isi-kolom-jenis">Kaca</p>
          <p className="isi-kolom-poin-kg">{konversi.kaca}</p>
          <p className="isi-kolom-jumlah-kg">
            {jumlahSampah.kaca ? jumlahSampah.kaca : "-"}
          </p>
          <p className="isi-kolom-jumlah-poin">
            {konversi.kaca * jumlahSampah.kaca}
          </p>

          <p className="isi-kolom-jenis">Kertas</p>
          <p className="isi-kolom-poin-kg">{konversi.kertas}</p>
          <p className="isi-kolom-jumlah-kg">
            {jumlahSampah.kertas ? jumlahSampah.kertas : "-"}
          </p>
          <p className="isi-kolom-jumlah-poin">
            {konversi.kertas * jumlahSampah.kertas}
          </p>

          <p className="isi-kolom-jenis">Kardus</p>
          <p className="isi-kolom-poin-kg">{konversi.kardus}</p>
          <p className="isi-kolom-jumlah-kg">
            {jumlahSampah.kardus ? jumlahSampah.kardus : "-"}
          </p>
          <p className="isi-kolom-jumlah-poin">
            {konversi.kardus * jumlahSampah.kardus}
          </p>

          <p className="isi-kolom-jenis">Besi</p>
          <p className="isi-kolom-poin-kg">{konversi.besi}</p>
          <p className="isi-kolom-jumlah-kg">
            {jumlahSampah.besi ? jumlahSampah.besi : "-"}
          </p>
          <p className="isi-kolom-jumlah-poin">
            {konversi.besi * jumlahSampah.besi}
          </p>

          <div className="garis-pembatas-tabel-sampah-ditukar" />

          <p className="judul-total-poin-tabel-sampah-ditukar">Total Poin</p>

          <p className="total-poin-tabel-sampah-ditukar">{totalPoin}</p>
        </div>

        <button className="tombol-kirim-poin" onClick={handleKirimPoin}>
          Kirim
        </button>
      </div>

      <PopUpBerhasil
        open={openPopUp}
        onClose={() => {
          setOpenPopUp(false);
          navigate("/beranda-petugas");
        }}
        title="Berhasil"
        subtitle="Poin berhasil dikirm, penukaran selesai"
        tombol="Kembali Ke Beranda"
      />
    </div>
  );
};

export default KonfirmasiBeriPoin;
