import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";

export default function LoginPetugas() {
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
      <Header />
      <div class="content-div">
        <div class="title-div">
          <h1 class="title-text">Masuk Sebagai Petugas</h1>
          <p class="subtitle-text">
            Silahkan masuk menggunakan akun Petugas Waste to Fresh Anda
          </p>
        </div>
        <form>
          <input class="nama-input" placeholder="Nama Pengguna" />
          <input class="pass-input" placeholder="Kata Sandi" />
          <button class="masuk-button">Masuk</button>
          <p class="buat-akun-link">
            Belum punya akun?{" "}
            <Link to="/buat-akun-petugas">Buat Akun Petugas</Link>
          </p>
          <p class="ubah-pass-link">
            Lupa kata sandi? <span class="link-text">Ubah kata sandi</span>
          </p>
        </form>
      </div>
      <div class="login-petugas-link">
        <Link to="/">Masuk sebagai user</Link>
      </div>
    </>
  );
}
