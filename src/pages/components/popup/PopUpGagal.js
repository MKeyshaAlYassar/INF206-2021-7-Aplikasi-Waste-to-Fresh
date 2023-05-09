import "./PopUpGagal.css";
import { TiWarningOutline } from "react-icons/ti";

const PopUpGagal = ({ open, onClose, title, subtitle, tombol }) => {
  if (!open) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-gagal-container">
        <TiWarningOutline className="icon-gagal" />
        <p className="popup-gagal-title">{title}</p>
        <p className="popup-gagal-subtitle">{subtitle}</p>
        <button className="popup-gagal-button" onClick={onClose}>
          {tombol}
        </button>
      </div>
    </div>
  );
};

export default PopUpGagal;

// Contoh Pemakaian
{
  /* <PopUpGagal
  open={openPopUp}
  onClose={() => {
    setOpenPopUpGagal(false);
  }}
  title="Gagal"
  subtitle="Penukaran Anda akan segera diproses oleh petugas"
  tombol="Tutup"
/>; */
}

// State untuk popup di component yang mau ada popup
// const [openPopUp, setOpenPopUp] = useState(false);

// JANGAN LUPA IMPORT useNavigate
// Buat const navigate = useNavigate()

// JANGAN LUPA SET STATE NYA HABIS BACKEND SIAP

// onClose dibuat di props
// Jadi navigate bisa diatur disitu
