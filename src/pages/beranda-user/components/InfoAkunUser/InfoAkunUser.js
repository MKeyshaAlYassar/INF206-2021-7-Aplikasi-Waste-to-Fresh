import { Link } from "react-router-dom";
import "./InfoAkunUser.css";
import ilustrasiPoin from "./ilustrasi-poin.png";

function Profil() {
  return (
    <div className="profil-container">
      <img
        className="foto-profil-beranda"
        src="https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png"
      />
      <div>
        <p className="sapaan-user-beranda">Ayo tukarkan sampahmu,</p>
        <p className="nama-user-beranda">Nama Pengguna</p>
      </div>
    </div>
  );
}

function Poin() {
  return (
    <div className="poin-container">
      <p className="poin-judul">Poin Anda</p>
      <p className="poin-jumlah">31.400</p>
      <img className="gambar-ilustrasi-poin" src={ilustrasiPoin} />
    </div>
  );
}

export default function InfoAkunUser() {
  return (
    <div>
      <Profil />
      <Poin />
    </div>
  );
}
