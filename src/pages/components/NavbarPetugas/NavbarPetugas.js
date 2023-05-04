import { Outlet, useNavigate } from "react-router-dom";
import "./NavbarPetugas.css";
import { GoBell } from "react-icons/go";
import { GiFruitBowl } from "react-icons/gi";
import { FaReceipt } from "react-icons/fa";
import { useState } from "react";

export default function NavbarPetugas() {
  const [activeIcon, setActiveIcon] = useState("Notifikasi Penukaran");
  const navigate = useNavigate();

  // Function to handle clicking on the icon or text
  const handleIconClick = (iconName) => {
    setActiveIcon(iconName);
    // Navigate to another route based on the icon name
    if (iconName === "Notifikasi Penukaran") {
      navigate("/beranda-petugas");
    } else if (iconName === "Penukaran Petugas") {
      navigate("/penukaran-petugas");
    } else if (iconName === "Bahan Makanan") {
      navigate("/bahan-makanan");
    }
  };

  return (
    <>
      <Outlet />
      <div className="navbar-petugas-container">
        <div
          className={`icon-navbar-container ${
            activeIcon === "Penukaran Petugas" ? "active" : ""
          }`}
          onClick={() => handleIconClick("Penukaran Petugas")}>
          <FaReceipt className="icon-navbar-penukaran-anda" />
          <p className="icon-navbar-nama-penukaran-anda">Penukaran Anda</p>
        </div>
        <div
          className={`icon-navbar-container ${
            activeIcon === "Notifikasi Penukaran" ? "active" : ""
          }`}
          onClick={() => handleIconClick("Notifikasi Penukaran")}>
          <GoBell className="icon-navbar-notifikasi-penukaran" />
          <p className="icon-navbar-nama-notifikasi-penukaran">
            Notifikasi Penukaran
          </p>
        </div>
        <div
          className={`icon-navbar-container ${
            activeIcon === "Bahan Makanan" ? "active" : ""
          }`}
          onClick={() => handleIconClick("Bahan Makanan")}>
          <GiFruitBowl className="icon-navbar-bahan-makanan" />
          <p className="icon-navbar-nama-bahan-makanan">Bahan Makanan</p>
        </div>
      </div>
    </>
  );
}
