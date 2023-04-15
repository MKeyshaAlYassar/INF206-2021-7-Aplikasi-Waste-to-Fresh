import Header from "../components/Header";
import { Link } from "react-router-dom";
import "./BuatAkunUser.css";

export default function BuatAkunUser() {
  return (
    <>
      <Header />
      <h1>Buat Akun</h1>
      <p>Silahkan buat akun Waste to Fresh Anda</p>
      <form>
        <input placeholder="Nama Pengguna" />
        <input placeholder="Nomor Telepon" />
        <input placeholder="Kata Sandi" />
        <input placeholder="Ulangi Kata Sandi" />
        <button>Buat Akun</button>
      </form>
      <p>
        Sudah punya akun?<Link to="/">Masuk</Link>
      </p>
    </>
  );
}
