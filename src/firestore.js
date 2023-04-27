// INI MODUL DOKUMENTASI
// MODULE INI UNTUK DI COPY KE MODULE LAIN, BUKAN DI IMPORT

import { async } from "@firebase/util";
///////////////////////////////////////////////////////////////////////////
import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "./firebase.js"; // IMPORT INI DISESUAIKAN
import { useState, useEffect } from "react";
///////////////////////////////////////////////////////////////////////////

// // Ambil semua data user
// // Simpan di state
// const [semuaDataUser, setSemuaDataUser] = useState([]);

// const userCollectionRef = collection(db, "user");

// useEffect(() => {
//   const getAllUser = async () => {
//     try {
//       const data = await getDocs(userCollectionRef);
//       const filteredData = data.docs.map((doc) => ({
//         ...doc.data,
//         id: doc.id,
//       }));
//       setSemuaDataUser(filteredData);
//       console.log(filteredData); // Hapus baris ini
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   getAllUser(); // Ini perlu?
// }, []);

// Tambah data user
// const userCollectionRef = collection(db, "user");

const tambahUser = async () => {
  try {
    await addDoc(userCollectionRef, {
      uid: uid,
      nama: nama,
      email: email,
      noHP: noHP,
      poin: 0,
      urlFotoProfil:
        "https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png",
    });
  } catch (err) {
    console.error(err);
  }
};

// Ambil data user menurut uid nya (COPY INI KE DALAM COMPONENT, SEBELUM  NGE RENDER)

// Akses datanya dengan dataUserLogin.
// Supaya bisa akses data akun user, seperti email dan UID
const { user } = UserAuth();

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
