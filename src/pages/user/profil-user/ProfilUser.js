import "./ProfilUser.css";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../../../context/AuthContext";

export default function ProfilUser() {
  const navigate = useNavigate();

  const { user, logout } = UserAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
      console.log("Berhasil keluar akun");
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div className="profil-user-container">
      <div className="header-profil-user">
        <Link className="tombol-kembali-profil" to="/beranda-user">
          <p>&lt;</p>
        </Link>
        <p className="judul-fitur">Profil</p>
      </div>
      <div className="fitur-profil-user-container">
        <img className="gambar-profile-user" src="https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png" />
        <p className="halo-pengguna">Halo, Pengguna kami</p>
        <button className="tombol-ubah-profil">Ubah Profil</button>
        <button className="tombol-ubah-kata-sandi">Ubah Kata Sandi</button>
        <button className="tombol-keluar-akun" onClick={handleLogout}>Keluar Akun</button>
      </div>
    </div>
  );
}
