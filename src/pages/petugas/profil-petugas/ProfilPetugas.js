import "./ProfilPetugas.css";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../../../context/AuthContext";
import { db } from "../../../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useState, useEffect } from "react";

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

  // Ambil data user menurut uid nya
  // Simpan di state
  const [dataPetugasLogin, setDataPetugasLogin] = useState([]);

  const petugasCollectionRef = collection(db, "petugas");

  const uid = user.uid;
  console.log(uid);

  useEffect(() => {
    const ambilPetugasLogin = async () => {
      try {
        const querySnapshot = await getDocs(
          query(petugasCollectionRef, where("uid", "==", uid))
        );
        const data = querySnapshot.docs[0].data();
        setDataPetugasLogin(data);
      } catch (error) {
        console.log("Error getting documents: ", error);
      }
    };

    if (uid) {
      ambilPetugasLogin();
    }
  }, [uid]);

  return (
    <>
      <div className="profil-petugas-container">
      <div className="header-profil-petugas">
        <Link className="tombol-kembali-profil-petugas" to="/beranda-petugas">
          <p>&lt;</p>
        </Link>
        <p className="judul-fitur-petugas">Profil</p>
      </div>
      <div className="fitur-profil-petugas-container">
        <img className="gambar-profile-petugas" src="https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png" />
        <p className="halo-petugas">Halo, Petugas kami</p>
        <div className="info-profil-petugas-container">
          <p className="nama-petugas">Nama Petugas   : {dataPetugasLogin.nama}</p>
        
          <p className="nomor-telepon-petugas">Nomor Telepon : {dataPetugasLogin.noHP}</p>
          <p className="email-petugas">Email : {dataPetugasLogin.email} </p>
         
        


        </div>
        
        <button className="tombol-keluar-akun-petugas" onClick={handleLogout}>Keluar Akun</button>
      </div>
    </div>
    </>
  );
}
