import "./UbahTukarSampah.css";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { storage, db } from "./../../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import {
  collection,
  addDoc,
  Timestamp,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { UserAuth } from "../../../context/AuthContext";
import PopUpBerhasil from "../../components/popup/PopUpBerhasil";
import PopUpGagal from "../../components/popup/PopUpGagal";

export default function UbahTukarSampah() {
  const params = useParams();
  const idTukarSampah = params.id;

  // Buat state
  const [formData, setFormData] = useState({
    namaPenukar: "",
    noHP: "",
    alamatAmbil: "",
    fotoSampah: null,
  });

  const [error, setError] = useState("");

  const [dataTukarSampahLama, setDataTukarSampahLama] = useState({});

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

  useEffect(() => {
    const ambilDataRincian = async () => {
      const docRef = doc(db, "tukarsampah", idTukarSampah);
      const docSnap = await getDoc(docRef);
      const data = docSnap.data();
      setDataTukarSampahLama(data);

      setFormData((prevFormData) => {
        return {
          ...prevFormData,
          namaPenukar: data.namaPenukar,
          noHP: data.noHpPenukar,
          alamatAmbil: data.alamatAmbil,
        };
      });
    };

    ambilDataRincian();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Cek form kosong
    if (
      formData.namaPenukar === "" ||
      formData.noHP === "" ||
      formData.alamatAmbil === ""
    ) {
      setFormKosong(true);
      return;
    }

    // Update data tukar sampah di database
    const documentRef = doc(db, "tukarsampah", idTukarSampah);

    await updateDoc(documentRef, {
      namaPenukar: formData.namaPenukar,
      noHpPenukar: formData.noHP,
      alamatAmbil: formData.alamatAmbil,
    });

    // Upload file ke storage dan database jika ada file baru
    if (formData.fotoSampah) {
      const imageRef = ref(
        storage,
        `fotosampah/${formData.fotoSampah.name + v4()}`
      );
      await uploadBytes(imageRef, formData.fotoSampah);

      // Ambil url foto yang di upload
      const urlFotoSampah = await getDownloadURL(imageRef);

      await updateDoc(documentRef, {
        urlFotoSampah: urlFotoSampah,
      });
    }

    setOpenPopUp(true);
  };

  return (
    <div className="ubah-tukar-sampah-container">
      <Link
        className="tombol-kembali"
        to={`/riwayat-user/tukar-sampah/${idTukarSampah}`}>
        &lt;
      </Link>
      <div className="header-ubah-tukar-sampah">
        <p className="judul-fitur">Ubah Tukar Sampah</p>
        <p className="deskripsi-fitur">Ubah data penukaran sampah Anda</p>
      </div>
      <form onSubmit={handleSubmit} className="form-ubah-tukar-sampah">
        <p>Nama</p>
        <input
          className="input-form-ubah-tukar-sampah"
          type="text"
          placeholder="Masukkan nama Anda"
          onChange={handleChange}
          name="namaPenukar"
          value={formData.namaPenukar}></input>

        <p>Nomor Telepon</p>
        <input
          className="input-form-ubah-tukar-sampah"
          type="text"
          placeholder="Masukkan nomor telepon Anda"
          onChange={handleChange}
          name="noHP"
          value={formData.noHP}></input>

        <p>Alamat Pengambilan</p>
        <input
          className="input-form-ubah-tukar-sampah"
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

        <p>Note: Kosongkan input file foto sampah jika tidak ingin diubah.</p>

        <button className="tombol-konfirmasi-ubah-tukar-sampah">
          Konfirmasi
        </button>
      </form>

      <PopUpBerhasil
        open={openPopUp}
        onClose={() => {
          setOpenPopUp(false);
          navigate(`/riwayat-user/tukar-sampah/${idTukarSampah}`);
        }}
        title="Berhasil"
        subtitle="Penukaran sampah berhasil diubah"
        tombol="Tutup"
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
