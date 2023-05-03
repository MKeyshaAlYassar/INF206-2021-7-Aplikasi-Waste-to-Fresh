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
    <div className="buat-akun-petugas-container">
      <Link className="tombol-kembali" to="/login-petugas">
        &lt;
      </Link>
      <div className="header-buat-akun-petugas">
        <h1 className="judul-buat-akun-petugas">Buat Akun Petugas</h1>
        <p className="subjudul-buat-akun-petugas">
          Silahkan buat akun Petugas Waste to Fresh Anda
        </p>
      </div>

      <form className="form-buat-akun-petugas" onSubmit={handleSubmit}>
        <p>Nama Pengguna</p>
        <input
          className="input-buat-akun-petugas"
          type="text"
          placeholder="Nama Pengguna"
          onChange={handleChange}
          name="namaPengguna"
          value={formData.namaPengguna}
        />

        <p>Alamat Email</p>
        <input
          className="input-buat-akun-petugas"
          type="email"
          placeholder="Alamat Email"
          onChange={handleChange}
          name="email"
          value={formData.email}
        />

        <p>Nomor Telepon</p>
        <input
          className="input-buat-akun-petugas"
          type="tel"
          placeholder="Nomor Telepon"
          onChange={handleChange}
          name="noHP"
          value={formData.noHP}
        />

        <p>Password</p>
        <input
          className="input-buat-akun-petugas"
          type="password"
          placeholder="Kata Sandi"
          onChange={handleChange}
          name="password"
          value={formData.password}
        />

        <button className="tombol-buat-akun-petugas">Buat Akun</button>

        <p className="sudah-punya-akun-petugas-link">
          Sudah punya akun?
          <Link to="/login-petugas" className="link-masuk-petugas">
            Masuk
          </Link>
        </p>
      </form>
    </div>
  );
}
