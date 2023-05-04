import "./DisplayStokMakanan.css";
import { useState } from "react";
import StokFormPopUp from "./StokFormPopUp";
import PopUpBerhasil from "../../../components/popup/PopUpBerhasil";

export default function DisplayStokMakanan(props) {
  // Ambil data bahan makanan dari props
  const dataBahanMakanan = props.data;

  // State untuk pop up form tambah dan item yang ditekan
  const [openPopUpForm, setOpenPopUpForm] = useState(false);
  const [itemDitekan, setItemDitekan] = useState(null);
  const [stokPopUp, setStokPopUp] = useState(null);

  const [openPopUpBerhasil, setOpenPopUpBerhasil] = useState(false);

  function handleFormTambah(key, stok) {
    setItemDitekan(key);
    setOpenPopUpForm(true);
    setStokPopUp(stok);

    return;
  }

  // Filter data menurut jenis
  const dataDisplay = dataBahanMakanan
    .filter((item) => item.jenis === props.tipe)
    .sort((a, b) => a.nama.localeCompare(b.nama))
    .map((item) => (
      <div key={item.id} className="card-stok-bahan-makanan">
        <img src={item.urlFoto} alt={item.nama} />
        <p className="card-stok-bahan-makanan-nama">{item.nama}</p>
        <div className="card-stok-bahan-makanan-info">
          <p className="card-stok-bahan-makanan-stok">Stok {item.stok} kg</p>
        </div>
        <div className="card-tombol-container">
          <button
            className="card-stok-bahan-makanan-tombol"
            onClick={() => handleFormTambah(item.nama, item.stok)}>
            Tambah
          </button>
        </div>
      </div>
    ));

  return (
    <>
      {dataDisplay}
      <StokFormPopUp
        open={openPopUpForm}
        item={itemDitekan}
        stok={stokPopUp}
        onClose={() => setOpenPopUpForm(false)}
        setRefresh={props.setRefresh}
        refresh={props.refresh}
        setOpenPopUpBerhasil={setOpenPopUpBerhasil}
      />
      <PopUpBerhasil
        open={openPopUpBerhasil}
        onClose={() => {
          setOpenPopUpBerhasil(false);
        }}
        title="Berhasil"
        subtitle="Stok bahan makanan berhasil ditambahkan"
        tombol="Tutup"
      />
    </>
  );
}
