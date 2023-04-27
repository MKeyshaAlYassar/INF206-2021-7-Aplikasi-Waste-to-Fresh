import { Outlet, useNavigate } from "react-router-dom";
import "./NavbarUser.css";
import { HiHome } from "react-icons/hi";
import { RiInformationFill } from "react-icons/ri";
import { FaReceipt } from "react-icons/fa";
import { useState } from "react";

export default function NavbarUser() {
  const [activeIcon, setActiveIcon] = useState("Beranda");
  const navigate = useNavigate();

  // Function to handle clicking on the icon or text
  const handleIconClick = (iconName) => {
    setActiveIcon(iconName);
    // Navigate to another route based on the icon name
    if (iconName === "Beranda") {
      navigate("/beranda-user");
    } else if (iconName === "Riwayat") {
      navigate("/riwayat-user");
    } else if (iconName === "Bantuan") {
      navigate("/bantuan-user");
    }
  };

  return (
    <>
      <Outlet />
      <div className="navbar-user-container">
        <div
          className={`icon-navbar-container ${
            activeIcon === "Riwayat" ? "active" : ""
          }`}
          onClick={() => handleIconClick("Riwayat")}>
          <FaReceipt className="icon-navbar-riwayat" />
          <p className="icon-navbar-nama-riwayat">Riwayat</p>
        </div>
        <div
          className={`icon-navbar-container ${
            activeIcon === "Beranda" ? "active" : ""
          }`}
          onClick={() => handleIconClick("Beranda")}>
          <HiHome className="icon-navbar-beranda" />
          <p className="icon-navbar-nama-beranda">Beranda</p>
        </div>
        <div
          className={`icon-navbar-container ${
            activeIcon === "Bantuan" ? "active" : ""
          }`}
          onClick={() => handleIconClick("Bantuan")}>
          <RiInformationFill className="icon-navbar-bantuan" />
          <p className="icon-navbar-nama-bantuan">Bantuan</p>
        </div>
      </div>
    </>
  );
}
