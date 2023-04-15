import React from "react";
import "./UserForm.css";
import { Link } from "react-router-dom";

export default function UserForm() {
  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  function handleChange(event) {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  }

  return (
    <>
      <div class="content-div">
        <div class="title-div">
          <h1 class="title-text">Selamat Datang</h1>
          <p class="subtitle-text">Silahkan masuk menggunakan akun Anda</p>
        </div>
        <form>
          <input class="nama-input" placeholder="Nama Pengguna" />
          <input class="pass-input" placeholder="Kata Sandi" />
          <Link to="/beranda-user">
            <button class="masuk-button">Masuk</button>
          </Link>
          <p class="buat-akun-link">
            Belum punya akun? <Link to="/buat-akun-user">Buat Akun</Link>
          </p>
          <p class="ubah-pass-link">
            Lupa kata sandi? <span class="link-text">Ubah kata sandi</span>
          </p>
        </form>
      </div>
      <div class="login-petugas-link">
        <Link to="/login-petugas">Masuk sebagai petugas</Link>
      </div>
    </>
  );
}
