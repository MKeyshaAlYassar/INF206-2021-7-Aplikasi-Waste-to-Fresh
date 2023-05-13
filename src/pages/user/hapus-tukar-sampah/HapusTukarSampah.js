import "./HapusTukarSampah.css";
import { BsPatchQuestion } from "react-icons/bs";

const HapusTukarSampah = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div className="popup-overlay-hapus-tukar-sampah">
      <div className="popup-container-hapus-tukar-sampah">
        <BsPatchQuestion className="icon-berhasil" />
        <p className="popup-title-hapus-tukar-sampah">Konfirmasi Hapus</p>
        <p className="popup-subtitle-hapus-tukar-sampah">
          Apakah Anda yakin ingin menghapus penukaran sampah
        </p>
        <button className="tombol-yakin-hapus-tukar-sampah" onClick={onClose}>
          Yakin
        </button>
        <button className="tombol-tidak-hapus-tukar-sampah" onClick={onClose}>
          Tidak
        </button>
      </div>
    </div>
  );
};

export default HapusTukarSampah;

// Contoh Pemakaian
{
  /* <HapusTukarSampah
    open={openPopUp}
    onClose={() => {
      setOpenPopUp(false);
      navigate("/beranda-user");
    }}
   
  />; */
}

// State untuk popup di component yang mau ada popup
// const [openPopUp, setOpenPopUp] = useState(false);

// JANGAN LUPA IMPORT useNavigate
// Buat const navigate = useNavigate()

// JANGAN LUPA SET STATE NYA HABIS BACKEND SIAP

// onClose dibuat di props
// Jadi navigate bisa diatur disitu
