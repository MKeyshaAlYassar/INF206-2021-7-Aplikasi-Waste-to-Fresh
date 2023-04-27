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
    <>
      <div className="content-div">
        <div className="title-div">
          <h1 className="title-text">Selamat Datang</h1>
          <p className="subtitle-text">Silahkan masuk menggunakan akun Anda</p>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            className="email-input"
            type="email"
            placeholder="Alamat Email"
            onChange={handleChange}
            name="email"
            value={formData.email}
          />
          <input
            className="pass-input"
            type="password"
            placeholder="Kata Sandi"
            onChange={handleChange}
            name="password"
            value={formData.password}
          />

          <button className="masuk-button">Masuk</button>

          <p className="buat-akun-link">
            Belum punya akun? <Link to="/buat-akun-user">Buat Akun</Link>
          </p>
          <p className="ubah-pass-link">
            Lupa kata sandi? <span className="link-text">Ubah kata sandi</span>
          </p>
        </form>
      </div>
      <div className="login-petugas-link">
        <Link to="/login-petugas">Masuk sebagai petugas</Link>
      </div>
    </>
  );
}
