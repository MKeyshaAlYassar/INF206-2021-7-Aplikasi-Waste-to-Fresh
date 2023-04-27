import { Link } from "react-router-dom";
import "./InfoAkunPetugas.css";
import { UserAuth } from "../../../../../context/AuthContext";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../../../firebase";
import { useState, useEffect } from "react";

export default function InfoAkunPetugas() {
  // Supaya bisa akses data akun user, seperti email dan UID
  const { user } = UserAuth();

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
    <div className="profil-container">
      <Link to="/profil-petugas">
        <img
          className="foto-profil-beranda"
          src="https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png"
        />
      </Link>
      <div>
        <p className="sapaan-petugas-beranda">Ayo layani masyarakat,</p>
        <p className="nama-petugas-beranda">{dataPetugasLogin.nama}</p>
      </div>
    </div>
  );
}
