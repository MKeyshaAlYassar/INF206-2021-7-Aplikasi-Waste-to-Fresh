import "./DaftarRiwayatPenukaran.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { db } from "../../../../firebase";
import { collection, getDocs } from "firebase/firestore";
import DaftarRiwayat from "./components/DaftarRiwayat";

export default function DaftarRiwayatPenukaran() {
  const [filter, setFilter] = useState("sampah");

  // Fungsi untuk handle ganti filter
  function handleFilter(filter) {
    return () => setFilter(filter);
  }

  return (
    <div className="riwayat-penukaran-container">
      <div className="header-riwayat-penukaran">
        <p className="judul-fitur">Riwayat Penukaran</p>
      </div>
      <div className="fitur-riwayat-penukaran-container">
        <div className="filter-riwayat-penukaran-container">
          <button
            className={`filter-riwayat-tukar-sampah ${
              filter === "sampah" ? "active" : ""
            }`}
            onClick={handleFilter("sampah")}>
            Tukar Sampah
          </button>
          <button
            className={`filter-riwayat-tukar-poin ${
              filter === "poin" ? "active" : ""
            }`}
            onClick={handleFilter("poin")}>
            Tukar Poin
          </button>
        </div>
        <div className="daftar-riwayat-container">
          <DaftarRiwayat filter={filter} />
        </div>
      </div>
    </div>
  );
}
