import { useState, useEffect } from "react";
import "./UserForm.css";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../../../../context/AuthContext";
import PopUpGagal from "../../../components/popup/PopUpGagal";

export default function UserForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  // State untuk pop up kesalahan
  const [salahPassword, setSalahPassword] = useState(false);
  const [salahEmail, setSalahEmail] = useState(false);

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
    } catch (error) {
      console.log(error);
      if (error.code === "auth/wrong-password") {
        setSalahPassword(true);
      } else if (error.code === "auth/user-not-found") {
        setSalahEmail(true);
      } else {
        setError(error.message);
      }
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
      <form className="form-login-user-container" onSubmit={handleSubmit}>
        <p>Alamat Email</p>
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
        Belum punya akun?{" "}
        <Link to="/buat-akun-user" className="link-buat-akun-user">
          Buat Akun
        </Link>
      </p>
      <Link to="/login-petugas" className="login-petugas-link">
        Masuk sebagai petugas
      </Link>

      <PopUpGagal
        open={salahPassword}
        onClose={() => {
          setSalahPassword(false);
        }}
        title="Gagal Masuk"
        subtitle="Kata sandi yang Anda masukkan salah"
        tombol="Tutup"
      />

      <PopUpGagal
        open={salahEmail}
        onClose={() => {
          setSalahEmail(false);
        }}
        title="Gagal Masuk"
        subtitle="Alamat email yang Anda masukkan tidak ditemukan"
        tombol="Tutup"
      />
    </div>
  );
}
