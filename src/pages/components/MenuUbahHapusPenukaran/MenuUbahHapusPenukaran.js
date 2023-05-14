import "./MenuUbahHapusPenukaran.css";
import { MdEdit } from "react-icons/md";
import { MdOutlineClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const MenuUbahHapusPenukaran = ({
  open,
  onClose,
  linkUbah,
  setOpenKonfirmasiHapus,
  status,
}) => {
  const navigate = useNavigate();

  //Buat style
  let styleWarna = {};

  if (status === "Diproses" || status === "Selesai") {
    styleWarna = {
      color: "#9B9B9B",
    };
  }
  function handleBukaHalamanUbah() {
    if (status === "Diproses" || status === "Selesai") {
      return;
    }

    navigate(linkUbah);
  }

  function handleBukaKonfirmasiHapus() {
    if (status === "Diproses" || status === "Selesai") {
      return;
    }

    setOpenKonfirmasiHapus();
  }

  if (!open) return null;

  return (
    <>
      <div className="menu-ubah-hapus-overlay" onClick={onClose} />
      <div className="menu-ubah-hapus-penukaran-container">
        <div className="garis-atas-menu-ubah-hapus" />
        <div
          className="pilihan-ubah-penukaran-container"
          onClick={handleBukaHalamanUbah}>
          <MdEdit className="icon-ubah-penukaran" style={styleWarna} />
          <p style={styleWarna}>Ubah Penukaran</p>
        </div>
        <div
          className="pilihan-hapus-penukaran-container"
          onClick={handleBukaKonfirmasiHapus}>
          <MdOutlineClose className="icon-hapus-penukaran" style={styleWarna} />
          <p style={styleWarna}>Hapus Penukaran</p>
        </div>
      </div>
    </>
  );
};

export default MenuUbahHapusPenukaran;
