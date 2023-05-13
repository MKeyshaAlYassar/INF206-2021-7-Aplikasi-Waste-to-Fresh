import "./BeriPoinPenukaranSampah.css";
import { useLocation, Link, useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  konversiSampah,
  HitungKonversiSampah,
} from "../../../../../utils/KonversiSampah";
import KonfirmasiBeriPoin from "./KonfirmasiBeriPoin";

export default function BeriPoinPenukaranSampah() {
  const { state } = useLocation();
  const params = useParams();
  const idTukarSampah = params.id;

  const [openKonfirmasi, setOpenKonfirmasi] = useState(false);
  const navigate = useNavigate();

  const dataTukarSampah = state;

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
    <div className="beri-poin-penukaran-sampah-container">
      <Link
        className="tombol-kembali"
        to={`/rincian-penukaran-petugas/tukar-sampah/${idTukarSampah}`}>
        &lt;
      </Link>
      <div className="header-beri-poin-penukaran-sampah">
        <p className="judul-fitur-beri-poin-penukaran-sampah">Beri Poin</p>
        <p className="deskripsi-fitur-beri-poin-penukaran-sampah">
          Beri poin kepada penukar sampah
        </p>
      </div>
      <form className="fitur-beri-poin-penukaran-sampah-container">
        <p className="organik-fitur-cek-konversi-sampah">Organik</p>
        <div className="garis-pembatas-konversi-sampah" />

        <input
          className="input-beri-poin-penukaran-sampah"
          type="number"
          onChange={handleChange}
          name="organik"
          value={jumlahSampah.organik}
        />

        <p className="anorganik-fitur-beri-poin-penukaran-sampah">Anorganik</p>
        <div className="garis-pembatas-konversi-sampah" />

        <p className="judul-input-beri-poin-penukaran-sampah">Botol Plastik</p>
        <input
          className="input-beri-poin-penukaran-sampah"
          type="number"
          onChange={handleChange}
          name="botol_plastik"
          value={jumlahSampah.botol_plastik}
        />

        <p className="judul-input-beri-poin-penukaran-sampah">Kaca</p>
        <input
          className="input-beri-poin-penukaran-sampah"
          type="number"
          onChange={handleChange}
          name="kaca"
          value={jumlahSampah.kaca}
        />

        <p className="judul-input-beri-poin-penukaran-sampah">Kertas</p>
        <input
          className="input-beri-poin-penukaran-sampah"
          type="number"
          onChange={handleChange}
          name="kertas"
          value={jumlahSampah.kertas}
        />

        <p className="judul-input-beri-poin-penukaran-sampah">Kardus</p>
        <input
          className="input-beri-poin-penukaran-sampah"
          type="number"
          onChange={handleChange}
          name="kardus"
          value={jumlahSampah.kardus}
        />

        <p className="judul-input-beri-poin-penukaran-sampah">Besi</p>
        <input
          className="input-beri-poin-penukaran-sampah"
          type="number"
          onChange={handleChange}
          name="besi"
          value={jumlahSampah.besi}
        />
      </form>

      <div className="total-poin-beri-poin-penukaran-sampah-container">
        <div className="total-poin-container">
          <p className="judul-total-poin-beri-poin-penukaran-sampah">
            Total Poin
          </p>
          <div className="garis-pembatas-total-poin" />
          <p className="poin-beri-poin-penukaran-sampah">{totalKonversi}</p>
        </div>
        <button
          className="tombol-konfirmasi-beri-poin"
          onClick={() => {
            setOpenKonfirmasi(true);
          }}>
          Konfirmasi
        </button>
      </div>

      <KonfirmasiBeriPoin
        open={openKonfirmasi}
        onClose={() => {
          setOpenKonfirmasi(false);
        }}
        idTukarSampah={idTukarSampah}
        data={dataTukarSampah}
        konversi={konversiSampah}
        jumlahSampah={jumlahSampah}
        totalPoin={totalKonversi}
      />
    </div>
  );
}
