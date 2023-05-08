import DaftarNotifikasiPenukaran from "../DaftarNotifikasiPenukaran/DaftarNotifikasiPenukaran";
import "./HeaderNavbarPetugas.css";
import { useState } from "react";

export default function HeaderNavbarPetugas() {
  const [filter, setFilter] = useState("sampah");

  // Fungsi untuk handle ganti filter
  function handleFilter(filter) {
    return () => setFilter(filter);
  }
  return (
    <div className="header-navbar-petugas-container">
      <div className="judul-beranda-petugas-container">
        <p className="judul-beranda-petugas">Notifikasi Penukaran</p>
      </div>
      <div className="fitur-beranda-petugas-container">
        <div className="filter-beranda-petugas-container">
          <button
            className={`filter-beranda-petugas-sampah ${
              filter === "sampah" ? "active" : ""
            }`}
            onClick={handleFilter("sampah")}>
            Tukar Sampah
          </button>
          <button
            className={`filter-beranda-petugas-poin ${
              filter === "poin" ? "active" : ""
            }`}
            onClick={handleFilter("poin")}>
            Tukar Poin
          </button>
        </div>
        <div className="daftar-notifikasi-penukaran-container">
          <DaftarNotifikasiPenukaran filter={filter} />
        </div>
      </div>
    </div>
  );
}
