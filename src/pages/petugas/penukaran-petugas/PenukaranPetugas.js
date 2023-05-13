import "./PenukaranPetugas.css";
import { useState } from "react";
import DaftarPenukaranPetugas from "./DaftarPenukaranPetugas";

export default function PenukaranPetugas() {
  const [filter, setFilter] = useState("sampah");

  // Fungsi untuk handle ganti filter
  function handleFilter(filter) {
    return () => setFilter(filter);
  }

  return (
    <div className="daftar-penukaran-petugas-container">
      <div className="judul-penukaran-petugas-container">
        <p className="judul-penukaran-petugas">Penukaran Anda</p>
        <p className="subjudul-penukaran-petugas">
          Lihat dan kelola penukaran yang Anda proses
        </p>
      </div>
      <div className="fitur-penukaran-petugas-container">
        <div className="filter-penukaran-petugas-container">
          <button
            className={`filter-penukaran-petugas-sampah ${
              filter === "sampah" ? "active" : ""
            }`}
            onClick={handleFilter("sampah")}>
            Tukar Sampah
          </button>
          <button
            className={`filter-penukaran-petugas-poin ${
              filter === "poin" ? "active" : ""
            }`}
            onClick={handleFilter("poin")}>
            Tukar Poin
          </button>
        </div>
        <div className="daftar-notifikasi-penukaran-container">
          <DaftarPenukaranPetugas filter={filter} />
        </div>
      </div>
    </div>
  );
}
