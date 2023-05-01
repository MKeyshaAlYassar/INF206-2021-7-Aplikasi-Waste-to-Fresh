import { useState, useEffect } from "react";
import Header from "../components/Header";
import { Link, useNavigate } from "react-router-dom";
import "./BuatAkunUser.css";
import { async } from "@firebase/util";
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

export default function BuatAkunUser() {
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

      const userCollectionRef = collection(db, "user");

      await addDoc(userCollectionRef, {
        uid: user.uid,
        nama: formData.namaPengguna,
        email: formData.email,
        noHP: formData.noHP,
        poin: 0,
        urlFotoProfil:
          "https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png",
      });
      // Setelah buat akun pergi ke halaman beranda
      navigate("/beranda-user");
    } catch (e) {
      setError(e.message);
      console.log(error);
    }
  };

  return (
    <div className="buat-akun-user-container">
      <Link className="tombol-kembali" to="/">
        &lt;
      </Link>
      <div className="header-buat-akun-user">
        <h1 className="judul-buat-akun-user">Buat Akun</h1>
        <p className="subjudul-buat-akun-user">
          Silahkan buat akun Waste to Fresh Anda
        </p>
      </div>

      <form className="form-buat-akun-user" onSubmit={handleSubmit}>
        <p>Nama Pengguna</p>
        <input
          className="input-form-buat-akun-user"
          type="text"
          placeholder="Nama Pengguna"
          onChange={handleChange}
          name="namaPengguna"
          value={formData.namaPengguna}
        />

        <p>Alamat Email</p>
        <input
          className="input-form-buat-akun-user"
          type="email"
          placeholder="Alamat Email"
          onChange={handleChange}
          name="email"
          value={formData.email}
        />

        <p>Nomor Telepon</p>
        <input
          className="input-form-buat-akun-user"
          type="tel"
          placeholder="Nomor Telepon"
          onChange={handleChange}
          name="noHP"
          value={formData.noHP}
        />

        <p>Kata Sandi</p>
        <input
          className="input-form-buat-akun-user"
          type="password"
          placeholder="Kata Sandi"
          onChange={handleChange}
          name="password"
          value={formData.password}
        />

        <button className="tombol-buat-akun-user">Buat Akun</button>

        <p className="sudanh-punya-akun-user-link">
          Sudah punya akun?<Link to="/">Masuk</Link>
        </p>
      </form>
    </div>
  );
}
