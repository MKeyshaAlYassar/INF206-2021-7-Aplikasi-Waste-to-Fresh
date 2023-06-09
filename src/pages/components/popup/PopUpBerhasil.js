import "./PopUpBerhasil.css";
import { TbDiscountCheck } from "react-icons/tb";

const PopUpBerhasil = ({ open, onClose, title, subtitle, tombol }) => {
  if (!open) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <TbDiscountCheck className="icon-berhasil" />
        <p className="popup-title">{title}</p>
        <p className="popup-subtitle">{subtitle}</p>
        <button className="popup-button" onClick={onClose}>
          {tombol}
        </button>
      </div>
    </div>
  );
};

export default PopUpBerhasil;

// Contoh Pemakaian
{
  /* <PopUpBerhasil
  open={openPopUp}
  onClose={() => {
    setOpenPopUp(false);
    navigate("/beranda-user");
  }}
  title="Tunggu ya"
  subtitle="Penukaran Anda akan segera diproses oleh petugas"
  tombol="Kembali Ke Beranda"
/>; */
}

// State untuk popup di component yang mau ada popup
// const [openPopUp, setOpenPopUp] = useState(false);

// JANGAN LUPA IMPORT useNavigate
// Buat const navigate = useNavigate()

// JANGAN LUPA SET STATE NYA HABIS BACKEND SIAP

// onClose dibuat di props
// Jadi navigate bisa diatur disitu
