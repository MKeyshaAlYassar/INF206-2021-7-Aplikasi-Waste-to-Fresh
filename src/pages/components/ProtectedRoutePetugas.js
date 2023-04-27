import { Outlet, useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import { useState, useEffect } from "react";
import { db } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

export default function ProtectedRoutePetugas() {
  // Akses datanya dengan dataPetugasLogin.
  // Supaya bisa akses data akun petugas, seperti email dan UID
  const { user } = UserAuth();
  const navigate = useNavigate();

  // Simpan di state
  const [dataPetugasLogin, setDataPetugasLogin] = useState([]);

  const petugasCollectionRef = collection(db, "petugas");

  const uid = user && user.uid;
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
        return navigate("/login-petugas");
      }
    };

    if (uid) {
      ambilPetugasLogin();
    }
  }, [uid]);

  if (!user) {
    return navigate("/login-petugas");
  }

  return <Outlet />;
}
