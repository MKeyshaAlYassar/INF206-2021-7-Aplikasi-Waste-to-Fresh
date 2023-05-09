import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./TukarSampah.css";
import { storage, db } from "./../../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { UserAuth } from "../../../context/AuthContext";
import PopUpBerhasil from "../../components/popup/PopUpBerhasil";
import PopUpGagal from "../../components/popup/PopUpGagal";

export default function TukarSampah() {
  // Buat state
  const [formData, setFormData] = useState({
    namaPenukar: "",
    noHP: "",
    alamatAmbil: "",
    fotoSampah: null,
  });

  const [error, setError] = useState("");

  // State untuk tangkap error form kosong
  const [formKosong, setFormKosong] = useState(false);

  // State untuk popup di component yang mau ada popup
  const navigate = useNavigate();
  const [openPopUp, setOpenPopUp] = useState(false);

  function handleChange(event) {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
        fotoSampah: event.target.files ? event.target.files[0] : null,
      };
    });
  }

  // Ambil uid user yang menukar
  const { user } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Cek form kosong
    if (
      formData.namaPenukar === "" ||
      formData.noHP === "" ||
      formData.alamatAmbil === "" ||
      formData.fotoSampah === null
    ) {
      setFormKosong(true);
      return;
    }

    // Ambil timestamp sekarang
    const now = Date.now();

    // Upload file ke storage
    const imageRef = ref(
      storage,
      `fotosampah/${formData.fotoSampah.name + v4()}`
    );
    await uploadBytes(imageRef, formData.fotoSampah);

    // Ambil url foto yang di upload
    const urlFotoSampah = await getDownloadURL(imageRef);

    const uidPenukar = user.uid;

    // Tambah data tukar sampah ke database
    const tukarsampahCollectionRef = collection(db, "tukarsampah");

    try {
      await addDoc(tukarsampahCollectionRef, {
        namaPenukar: formData.namaPenukar,
        uidPenukar: uidPenukar,
        noHpPenukar: formData.noHP,
        alamatAmbil: formData.alamatAmbil,
        urlFotoSampah: urlFotoSampah,
        status: "Menunggu petugas",
        namaPetugasPemroses: "",
        noHpPetugasPemroses: "",
        uidPetugasPemroses: "",
        poin: 0,
        waktu: Timestamp.fromMillis(now),
      });
    } catch (err) {
      console.error(err);
    }

    setOpenPopUp(true);
  };

  return (
    <div className="tukar-sampah-container">
      <Link className="tombol-kembali" to="/beranda-user">
        &lt;
      </Link>
      <div className="header-tukar-sampah">
        <p className="judul-fitur">Tukar Sampah</p>
        <p className="deskripsi-fitur">Tukarkan sampah Anda menjadi poin</p>
      </div>
      <form onSubmit={handleSubmit} className="form-tukar-sampah">
        <p>Nama</p>
        <input
          className="input-form-tukar-sampah"
          type="text"
          placeholder="Masukkan nama Anda"
          onChange={handleChange}
          name="namaPenukar"
          value={formData.namaPenukar}></input>

        <p>Nomor Telepon</p>
        <input
          className="input-form-tukar-sampah"
          type="text"
          placeholder="Masukkan nomor telepon Anda"
          onChange={handleChange}
          name="noHP"
          value={formData.noHP}></input>

        <p>Alamat Pengambilan</p>
        <input
          className="input-form-tukar-sampah"
          type="text"
          placeholder="Masukkan alamat pengambilan sampah"
          onChange={handleChange}
          name="alamatAmbil"
          value={formData.alamatAmbil}></input>

        <p>Upload Foto Sampah Yang Ingin Ditukar</p>
        <input
          className="file-upload"
          type="file"
          onChange={handleChange}></input>

        <button className="tombol-konfirmasi-tukar-sampah">Konfirmasi</button>
      </form>

      <PopUpBerhasil
        open={openPopUp}
        onClose={() => {
          setOpenPopUp(false);
          navigate("/beranda-user");
        }}
        title="Tunggu ya"
        subtitle="Penukaran Anda akan segera diproses oleh petugas"
        tombol="Kembali Ke Beranda"
      />

      <PopUpGagal
        open={formKosong}
        onClose={() => {
          setFormKosong(false);
        }}
        title="Gagal"
        subtitle="Masukan tidak boleh kosong"
        tombol="Tutup"
      />
    </div>
  );
}
