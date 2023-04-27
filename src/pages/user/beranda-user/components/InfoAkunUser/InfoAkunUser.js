import { Link } from "react-router-dom";
import "./InfoAkunUser.css";
import ilustrasiPoin from "./ilustrasi-poin.png";
import { UserAuth } from "../../../../../context/AuthContext";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../../../firebase";
import { useState, useEffect } from "react";

function Profil(props) {
  return (
    <div className="profil-container">
      <Link to="/profil-user">
        <img
          className="foto-profil-beranda"
          src="https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png"
        />
      </Link>
      <div>
        <p className="sapaan-user-beranda">Ayo tukarkan sampahmu,</p>
        <p className="nama-user-beranda">{props.nama}</p>
      </div>
    </div>
  );
}

function Poin(props) {
  return (
    <div className="poin-container">
      <p className="poin-judul">Poin Anda</p>
      <p className="poin-jumlah">{props.poin}</p>
      <img className="gambar-ilustrasi-poin" src={ilustrasiPoin} />
    </div>
  );
}

export default function InfoAkunUser() {
  // Supaya bisa akses data akun user, seperti email dan UID
  const { user } = UserAuth();

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
    <div>
      <Profil nama={dataUserLogin.nama} />
      <Poin poin={dataUserLogin.poin} />
    </div>
  );
}
