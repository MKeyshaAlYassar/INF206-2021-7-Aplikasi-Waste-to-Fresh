import { useState, useEffect } from "react";
import { db } from "../../../../firebase";
import { collection, getDocs } from "firebase/firestore";

export default function DisplayMakanan(props) {
  // Ambil data bahan makanan dari props
  const dataBahanMakanan = props.data;
  const bahanMakananDipilih = props.dataJumlah;
  console.log("yang ini:");
  console.log(bahanMakananDipilih);

  // Filter data menurut jenis
  const dataDisplay = dataBahanMakanan
    .filter((item) => item.jenis === props.tipe)
    .sort((a, b) => a.nama.localeCompare(b.nama))
    .map((item) => (
      <div key={item.id} className="card-bahan-makanan">
        <img src={item.urlFoto} alt={item.nama} />
        <p className="card-nama">{item.nama}</p>
        <div className="card-info">
          <p className="card-harga">{item.harga} Poin/kg</p>
          <p className="card-stok">Stok {item.stok} kg</p>
        </div>
        <div className="card-tombol-container">
          {bahanMakananDipilih[item.nama.replace(" ", "_").toLowerCase()] <
          1 ? (
            <button
              className="card-tombol"
              onClick={() => props.onclickFunction(item.nama, "tambah")}>
              Tambah
            </button>
          ) : (
            <div className="card-tombol-adv-container">
              <button
                className="card-tombol-adv"
                onClick={() => props.onclickFunction(item.nama, "kurang")}>
                -
              </button>
              <p className="card-tombol-adv-jumlah">
                {bahanMakananDipilih[item.nama.replace(" ", "_").toLowerCase()]}{" "}
                kg
              </p>
              <button
                className="card-tombol-adv"
                onClick={() => props.onclickFunction(item.nama, "tambah")}>
                +
              </button>
            </div>
          )}
        </div>
      </div>
    ));

  return <>{dataDisplay}</>;
}
