import { useState, useEffect } from "react";
import "./UserForm.css";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../../../../context/AuthContext";
import { async } from "@firebase/util";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../../../firebase";

export default function UserForm() {
  // Tes database disini

  // Tes database disini (end)

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { login } = UserAuth();

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

    try {
      await login(formData.email, formData.password);
      navigate("/beranda-user");
    } catch {
      setError(e.message);
      console.log(error);
    }
  };

  return (
    <div className="login-user-container">
      <div className="header-login-user">
        <h1 className="judul-login-user">Selamat Datang</h1>
        <p className="subjudul-login-user">
          Silahkan masuk menggunakan akun Anda
        </p>
      </div>

      <p>Alamat Email</p>
      <form onSubmit={handleSubmit}>
        <input
          className="input-form-login-user"
          type="email"
          placeholder="Alamat Email"
          onChange={handleChange}
          name="email"
          value={formData.email}
        />

        <p>Kata Sandi</p>
        <input
          className="input-form-login-user"
          type="password"
          placeholder="Kata Sandi"
          onChange={handleChange}
          name="password"
          value={formData.password}
        />

        <button className="tombol-login-user">Masuk</button>
      </form>
      <p className="buat-akun-link">
        Belum punya akun? <Link to="/buat-akun-user">Buat Akun</Link>
      </p>
      <Link to="/login-petugas" className="login-petugas-link">
        Masuk sebagai petugas
      </Link>
    </div>
  );
}
