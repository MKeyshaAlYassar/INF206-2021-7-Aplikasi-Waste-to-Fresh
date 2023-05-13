import "./MenuUbahHapusPenukaran.css";
import { MdEdit } from "react-icons/md";
import { MdOutlineClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const MenuUbahHapusPenukaran = ({
  open,
  onClose,
  linkUbah,
  setOpenKonfirmasiHapus,
}) => {
  const navigate = useNavigate();

  if (!open) return null;

  return (
    <div className="menu-ubah-hapus-overlay" onClick={onClose}>
      <div className="menu-ubah-hapus-penukaran-container">
        <div className="garis-atas-menu-ubah-hapus" />
        <div
          className="pilihan-ubah-penukaran-container"
          onClick={() => navigate(linkUbah)}>
          <MdEdit className="icon-ubah-penukaran" />
          <p>Ubah Penukaran</p>
        </div>
        <div
          className="pilihan-hapus-penukaran-container"
          onClick={setOpenKonfirmasiHapus(true)}>
          <MdOutlineClose className="icon-hapus-penukaran" />
          <p>Hapus Penukaran</p>
        </div>
      </div>
    </div>
  );
};

export default MenuUbahHapusPenukaran;
