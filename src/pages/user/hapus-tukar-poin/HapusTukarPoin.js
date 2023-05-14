import "./HapusTukarPoin.css";
import { BsPatchQuestion } from "react-icons/bs";
import {
  collection,
  doc,
  deleteDoc,
  query,
  where,
  getDocs,
  updateDoc,
  increment,
} from "firebase/firestore";
import { useState } from "react";
import { db } from "../../../firebase";
import PopUpBerhasil from "../../components/popup/PopUpBerhasil";
import { useNavigate } from "react-router-dom";

const HapusTukarPoin = ({ open, onClose, idTukarPoin, dataTukarPoin }) => {
  const [openPopupBerhasil, setOpenPopupBerhasil] = useState(false);

  const navigate = useNavigate();

  async function handleHapus() {
    const documentRef = doc(collection(db, "tukarpoin"), idTukarPoin);

    // Balikin poin dan stok
    // Balikin poin user
    const q = query(
      collection(db, "user"),
      where("uid", "==", dataTukarPoin.uidPenukar)
    );

    const querySnapshot = await getDocs(q);

    const documentRef2 = doc(db, "user", querySnapshot.docs[0].id);

    await updateDoc(documentRef2, {
      poin: increment(dataTukarPoin.totalHarga),
    });

    // Balikin stok makanan
    const bahanMakananRef = collection(db, "bahanmakanan");

    const bahanMakananDipilih = dataTukarPoin.itemDipilih;

    Object.keys(bahanMakananDipilih).forEach(async (nama) => {
      const stokToSubtract = bahanMakananDipilih[nama];

      // Get the document with matching nama
      const querySnapshot = await getDocs(
        query(
          bahanMakananRef,
          where(
            "nama",
            "==",
            nama.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
          )
        )
      );
      const doc = querySnapshot.docs[0];

      // Update the document with the new stok value
      await updateDoc(doc.ref, { stok: doc.data().stok + stokToSubtract });
    });

    // Hapus data penukaran
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
    <div className="popup-overlay-hapus-tukar-poin">
      <div className="popup-container-hapus-tukar-poin">
        <BsPatchQuestion className="icon-berhasil-hapus-tukar-poin" />
        <p className="popup-title-hapus-tukar-poin">Konfirmasi Hapus</p>
        <p className="popup-subtitle-hapus-tukar-poin">
          Apakah Anda yakin akan menghapus penukaran poin
        </p>
        <button className="tombol-yakin-hapus-tukar-poin" onClick={handleHapus}>
          Yakin
        </button>
        <button className="tombol-tidak-hapus-tukar-poin" onClick={onClose}>
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
        subtitle="Penukaran poin berhasil dibatalkan"
        tombol="Tutup"
      />
    </div>
  );
};

export default HapusTukarPoin;

// Contoh Pemakaian
{
  /* <HapusTukarPoin
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
