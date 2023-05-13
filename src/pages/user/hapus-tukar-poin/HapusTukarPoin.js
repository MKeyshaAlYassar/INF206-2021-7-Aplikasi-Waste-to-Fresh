import "./HapusTukarPoin.css";
import { BsPatchQuestion } from "react-icons/bs";

const HapusTukarPoin = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div className="popup-overlay-hapus-tukar-poin">
      <div className="popup-container-hapus-tukar-poin">
        <BsPatchQuestion className="icon-berhasil-hapus-tukar-poin" />
        <p className="popup-title-hapus-tukar-poin">Konfirmasi Hapus</p>
        <p className="popup-subtitle-hapus-tukar-poin">
          Apakah Anda yakin akan menghapus penukaran poin
        </p>
        <button className="tombol-yakin-hapus-tukar-poin" onClick={onClose}>
          Yakin
        </button>
        <button className="tombol-tidak-hapus-tukar-poin" onClick={onClose}>
          Tidak
        </button>
      </div>
    </div>
  );
};

export default HapusTukarPoin;

// Contoh Pemakaian
{
  /* <HapusTukarPoin
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
