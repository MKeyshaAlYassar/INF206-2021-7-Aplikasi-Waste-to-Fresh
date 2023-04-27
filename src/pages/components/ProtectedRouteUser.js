import { Outlet, useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import { useState, useEffect } from "react";
import { db } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

export default function ProtectedRouteUser() {
  // Akses datanya dengan dataUserLogin.
  // Supaya bisa akses data akun user, seperti email dan UID
  const { user } = UserAuth();
  const navigate = useNavigate();

  // Simpan di state
  const [dataUserLogin, setDataUserLogin] = useState([]);

  const userCollectionRef = collection(db, "user");

  const uid = user && user.uid;

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
        return navigate("/");
      }
    };

    if (uid) {
      ambilUserLogin();
    }
  }, [uid]);

  if (!user) {
    return navigate("/");
  }

  return <Outlet />;
}
