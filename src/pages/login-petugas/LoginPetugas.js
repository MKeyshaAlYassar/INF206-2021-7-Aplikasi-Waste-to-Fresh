import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { UserAuth } from "../../context/AuthContext";
import "./LoginPetugas.css";

export default function LoginPetugas() {
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
      navigate("/beranda-petugas");
    } catch {
      setError(e.message);
      console.log(error);
    }
  };

  return (
    <div className="login-petugas-container">
      <div className="header-login-petugas">
        <h1 className="judul-login-petugas">Masuk Sebagai Petugas</h1>
        <p className="subjudul-login-petugas">
          Silahkan masuk menggunakan akun Petugas Waste to Fresh Anda
        </p>
      </div>
      <form onSubmit={handleSubmit} className="form-login-petugas">
        <p>Alamat Email</p>
        <input
          className="input-form-login-petugas"
          type="email"
          placeholder="Alamat Email"
          onChange={handleChange}
          name="email"
          value={formData.email}
        />

        <p>Kata Sandi</p>
        <input
          className="input-form-login-petugas"
          type="password"
          placeholder="Kata Sandi"
          onChange={handleChange}
          name="password"
          value={formData.password}
        />

        <button className="tombol-login-petugas">Masuk</button>

        <p className="buat-akun-link">
          Belum punya akun?
          <Link to="/buat-akun-petugas" className="link-buat-akun-petugas">
            Buat Akun Petugas
          </Link>
        </p>
        <Link to="/" className="login-petugas-link">
          Masuk sebagai user
        </Link>
      </form>
    </div>
  );
}
