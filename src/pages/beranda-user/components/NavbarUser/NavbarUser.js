import { Link } from "react-router-dom";
import "./NavbarUser.css";

export default function NavbarUser() {
  return (
    <div className="navbar-user-container">
      <div className="icon-navbar-container">
        <img />
        <p className="icon-navbar-nama-riwayat">Riwayat</p>
      </div>
      <div className="icon-navbar-container">
        <img />
        <p className="icon-navbar-nama-beranda">Beranda</p>
      </div>
      <div className="icon-navbar-container">
        <img />
        <p className="icon-navbar-nama-bantuan">Bantuan</p>
      </div>
    </div>
  );
}
