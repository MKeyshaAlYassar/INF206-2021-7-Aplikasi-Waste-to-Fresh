import "./HapusTukarSampah.css";
import { BsPatchQuestion } from "react-icons/bs";
import { collection, doc, deleteDoc } from "firebase/firestore";
import { useState } from "react";
import { db } from "../../../firebase";
import PopUpBerhasil from "../../components/popup/PopUpBerhasil";
import { useNavigate } from "react-router-dom";

const HapusTukarSampah = ({ open, onClose, idTukarSampah }) => {
  const [openPopupBerhasil, setOpenPopupBerhasil] = useState(false);

  const navigate = useNavigate();

  async function handleHapus() {
    const documentRef = doc(collection(db, "tukarsampah"), idTukarSampah);

    try {
      await deleteDoc(documentRef);
      console.log("Document successfully deleted!");
    } catch (error) {
      console.error("Error deleting document: ", error);
    }

    setOpenPopupBerhasil(true);
  }

  if (!open) return null;

  return (
    <div className="popup-overlay-hapus-tukar-sampah">
      <div className="popup-container-hapus-tukar-sampah">
        <BsPatchQuestion className="icon-berhasil-hapus-tukar-sampah" />
        <p className="popup-title-hapus-tukar-sampah">Konfirmasi Hapus</p>
        <p className="popup-subtitle-hapus-tukar-sampah">
          Apakah Anda yakin ingin menghapus penukaran sampah
        </p>
        <button
          className="tombol-yakin-hapus-tukar-sampah"
          onClick={handleHapus}>
          Yakin
        </button>
        <button className="tombol-tidak-hapus-tukar-sampah" onClick={onClose}>
          Tidak
        </button>
      </div>

      <PopUpBerhasil
        open={openPopupBerhasil}
        onClose={() => {
          setOpenPopupBerhasil(false);
          navigate("/riwayat-user");
        }}
        title="Berhasil"
        subtitle="Penukaran sampah berhasil dibatalkan"
        tombol="Tutup"
      />
    </div>
  );
};

export default HapusTukarSampah;

// Contoh Pemakaian
{
  /* <HapusTukarSampah
    open={openPopUp}
    onClose={() => {
      setOpenPopUp(false);
      navigate("/beranda-user");
    }}
   
  />; */
}

// State untuk popup di component yang mau ada popup
// const [openPopUp, setOpenPopUp] = useState(false);

// JANGAN LUPA IMPORT useNavigate
// Buat const navigate = useNavigate()

// JANGAN LUPA SET STATE NYA HABIS BACKEND SIAP

// onClose dibuat di props
// Jadi navigate bisa diatur disitu
