import "./ProfilPetugas.css";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../../../context/AuthContext";

export default function ProfilPetugas() {
  const navigate = useNavigate();

  const { user, logout } = UserAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login-petugas");
      console.log("Berhasil keluar akun");
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <>
      <div>
        <Link to="/beranda-petugas">
          <p>&lt;</p>
        </Link>
        <p>Profil</p>
      </div>
      <div>
        <img src="https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png" />
        <p>Halo, Pengguna kami</p>
        <button>Ubah Profil</button>
        <button>Ubah Kata Sandi</button>
        <button onClick={handleLogout}>Keluar Akun</button>
      </div>
    </>
  );
}
