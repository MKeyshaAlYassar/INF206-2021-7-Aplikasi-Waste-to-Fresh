import "./ProfilUser.css";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../../../context/AuthContext";
import { db } from "../../../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useState, useEffect } from "react";

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

  // Ambil data user menurut uid nya
  // Simpan di state
  const [dataUserLogin, setDataUserLogin] = useState([]);

  const userCollectionRef = collection(db, "user");

  const uid = user.uid;
  console.log(uid);

  useEffect(() => {
    const ambilUserLogin = async () => {
      try {
        const querySnapshot = await getDocs(
          query(userCollectionRef, where("uid", "==", uid))
        );
        const data = querySnapshot.docs[0].data();
        setDataUserLogin(data);
      } catch (error) {
        console.log("Error getting documents: ", error);
      }
    };

    if (uid) {
      ambilUserLogin();
    }
  }, [uid]);

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
        <div className="info-profil-user-container">
          <p className="nama-user">Nama User : {dataUserLogin.nama}</p>
        
          <p className="nomor-telepon-user">Nomor Telepon :{dataUserLogin.noHP}</p>
          <p className="email-user">Email : {dataUserLogin.email} </p>
         
        


        </div>
        
        <button className="tombol-keluar-akun" onClick={handleLogout}>Keluar Akun</button>
      </div>
    </div>
  );
}
