import Header from "../components/Header";
import { Link } from "react-router-dom";
import "./BuatAkunPetugas.css";

export default function BuatAkunPetugas() {
  return (
    <>
      <Header />
      <h1>Buat Akun Petugas</h1>
      <p>Silahkan buat akun Petugas Waste to Fresh Anda</p>
      <form>
        <input placeholder="Nama Pengguna" />
        <input placeholder="Nomor Telepon" />
        <input placeholder="Kata Sandi" />
        <input placeholder="Ulangi Kata Sandi" />
        <button>Buat Akun</button>
      </form>
      <p>
        Sudah punya akun?<Link to="/login-petugas">Masuk</Link>
      </p>
    </>
  );
}
