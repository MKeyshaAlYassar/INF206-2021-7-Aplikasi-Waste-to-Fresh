import React, { useState } from "react";
import "./CekKonversiSampah.css";
import {
  konversiSampah,
  HitungKonversiSampah,
} from "./../../../utils/KonversiSampah";
import { Link } from "react-router-dom";

export default function CekKonversiSampah() {
  const [jumlahSampah, SetJumlahSampah] = useState({
    organik: null,
    botol_plastik: null,
    kaca: null,
    kertas: null,
    kardus: null,
    besi: null,
  });

  function handleChange(event) {
    SetJumlahSampah((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  }

  // Hitung total konversi
  const totalKonversi = HitungKonversiSampah(jumlahSampah, konversiSampah);

  return (
    <div className="cek-konversi-sampah-container">
      <Link className="tombol-kembali" to="/beranda-user">
        &lt;
      </Link>
      <div className="header-cek-konversi-sampah">
        <p className="judul-fitur-cek-konversi-sampah">Cek Konversi Sampah</p>
        <p className="deskripsi-fitur-cek-konversi-sampah">
          Cek penukaran sampah Anda akan menghasilkan berapa poin
        </p>
      </div>
      <form className="fitur-cek-konversi-sampah-container">
        <p className="organik-fitur-cek-konversi-sampah">Organik</p>
        <div className="garis-pembatas-konversi-sampah" />

        <input
          className="input-cek-konversi-sampah"
          type="number"
          onChange={handleChange}
          name="organik"
          value={jumlahSampah.organik}
        />

        <p className="anorganik-fitur-cek-konversi-sampah">Anorganik</p>
        <div className="garis-pembatas-konversi-sampah" />

        <p className="judul-input-cek-konversi-sampah">Botol Plastik</p>
        <input
          className="input-cek-konversi-sampah"
          type="number"
          onChange={handleChange}
          name="botol_plastik"
          value={jumlahSampah.botol_plastik}
        />

        <p className="judul-input-cek-konversi-sampah">Kaca</p>
        <input
          className="input-cek-konversi-sampah"
          type="number"
          onChange={handleChange}
          name="kaca"
          value={jumlahSampah.kaca}
        />

        <p className="judul-input-cek-konversi-sampah">Kertas</p>
        <input
          className="input-cek-konversi-sampah"
          type="number"
          onChange={handleChange}
          name="kertas"
          value={jumlahSampah.kertas}
        />

        <p className="judul-input-cek-konversi-sampah">Kardus</p>
        <input
          className="input-cek-konversi-sampah"
          type="number"
          onChange={handleChange}
          name="kardus"
          value={jumlahSampah.kardus}
        />

        <p className="judul-input-cek-konversi-sampah">Besi</p>
        <input
          className="input-cek-konversi-sampah"
          type="number"
          onChange={handleChange}
          name="besi"
          value={jumlahSampah.besi}
        />
      </form>

      <div className="total-poin-cek-konversi-sampah-container">
        <p className="judul-total-poin-cek-konversi-sampah-container">
          Total Poin
        </p>
        <p className="judul-poin-cek-konversi-sampah-container">
          {totalKonversi}
        </p>
      </div>
    </div>
  );
}
