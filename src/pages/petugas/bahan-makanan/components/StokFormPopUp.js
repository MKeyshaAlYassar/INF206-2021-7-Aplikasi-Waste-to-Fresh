import { useState } from "react";
import { CgCloseO } from "react-icons/cg";
import "./StokFormPopUp.css";
import { db } from "../../../../firebase";
import {
  collection,
  query,
  getDocs,
  where,
  updateDoc,
} from "firebase/firestore";

export default function StokFormPopUp({
  item,
  stok,
  open,
  onClose,
  setRefresh,
  refresh,
  setOpenPopUpBerhasil,
}) {
  const [stokDitambah, setStokDitambah] = useState();
  if (!open) return null;

  function handleChange(event) {
    const value = event.target.value;
    setStokDitambah(parseInt(value));
  }

  async function handleTambahStok(e) {
    e.preventDefault();

    // Kurangin stok bahan makanan
    const bahanMakananRef = collection(db, "bahanmakanan");

    // Get the document with matching nama
    const querySnapshot = await getDocs(
      query(bahanMakananRef, where("nama", "==", item))
    );
    const doc = querySnapshot.docs[0];

    // Update the document with the new stok value
    await updateDoc(doc.ref, { stok: doc.data().stok + stokDitambah });

    setRefresh(!refresh);
    setOpenPopUpBerhasil(true);
    onClose();
    setStokDitambah();
  }

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <CgCloseO className="tombol-tutup-popup-stok-form" onClick={onClose} />
        <p className="judul-popup-stok-form">Tambah Stok</p>
        <p className="nama-popup-stok-form">Nama: {item}</p>
        <p className="stok-popup-stok-form">Stok: {stok}</p>

        <form className="popup-stok-form-container" onSubmit={handleTambahStok}>
          <p>Jumlah Stok Untuk Ditambah</p>
          <input
            type="number"
            placeholder="Masukkan jumlah"
            value={stokDitambah}
            onChange={handleChange}
          />

          <button>Tambah Stok</button>
        </form>
      </div>
    </div>
  );
}
