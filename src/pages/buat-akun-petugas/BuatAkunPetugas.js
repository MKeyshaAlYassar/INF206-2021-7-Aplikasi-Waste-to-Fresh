import { useState, useEffect } from "react";
import Header from "../components/Header";
import { Link, useNavigate } from "react-router-dom";
import "./BuatAkunPetugas.css";
import { UserAuth } from "../../context/AuthContext";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../firebase";

export default function BuatAkunPetugas() {
  const [formData, setFormData] = useState({
    namaPengguna: "",
    email: "",
    noHP: "",
    password: "",
    repeatPassword: "",
  });

  const [error, setError] = useState("");

  const { createUser, login } = UserAuth();
  const navigate = useNavigate();

  function handleChange(event) {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Buat akun ke autentikasi
    try {
      const { user } = await createUser(formData.email, formData.password);

      const petugasCollectionRef = collection(db, "petugas");

      await addDoc(petugasCollectionRef, {
        uid: user.uid,
        nama: formData.namaPengguna,
        email: formData.email,
        noHP: formData.noHP,
        urlFotoProfil:
          "https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png",
      });
      // Setelah buat akun pergi ke halaman beranda
      navigate("/beranda-petugas");
    } catch (e) {
      setError(e.message);
      console.log(error);
    }
  };

  return (
    <>
      <Header />
      <h1>Buat Akun Petugas</h1>
      <p>Silahkan buat akun Petugas Waste to Fresh Anda</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nama Pengguna"
          onChange={handleChange}
          name="namaPengguna"
          value={formData.namaPengguna}
        />
        <input
          type="email"
          placeholder="Alamat Email"
          onChange={handleChange}
          name="email"
          value={formData.email}
        />
        <input
          type="tel"
          placeholder="Nomor Telepon"
          onChange={handleChange}
          name="noHP"
          value={formData.noHP}
        />
        <input
          type="password"
          placeholder="Kata Sandi"
          onChange={handleChange}
          name="password"
          value={formData.password}
        />
        <input
          type="password"
          placeholder="Ulangi Kata Sandi"
          onChange={handleChange}
          name="repeatPassword"
          value={formData.repeatPassword}
        />
        <button>Buat Akun</button>
      </form>
      <p>
        Sudah punya akun?<Link to="/login-petugas">Masuk</Link>
      </p>
    </>
  );
}
