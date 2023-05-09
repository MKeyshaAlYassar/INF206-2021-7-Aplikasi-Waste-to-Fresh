import "./StrukTukarPoin.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { db } from "../../../firebase";
import {
  collection,
  addDoc,
  Timestamp,
  where,
  getDocs,
  query,
  updateDoc,
} from "firebase/firestore";
import { UserAuth } from "../../../context/AuthContext";
import PopUpBerhasil from "../../components/popup/PopUpBerhasil";
import PopUpGagal from "../../components/popup/PopUpGagal";

export default function StrukTukarPoin() {
  const navigate = useNavigate();
  const location = useLocation();

  const [filter, setFilter] = useState("sayur");

  const [dataBahanMakanan, setDataBahanMakanan] = useState([]);

  const [bahanMakananDipilih, setBahanMakananDipilih] = useState({
    bawang_merah: 0,
    bawang_putih: 0,
    cabe_merah: 0,
    kentang: 0,
    tomat: 0,
    wortel: 0,
    alpukat: 0,
    anggur: 0,
    apel: 0,
    jeruk: 0,
    mangga: 0,
    pisang: 0,
  });

  // State untuk popup
  const [openPopUp, setOpenPopUp] = useState(false);

  // State untuk tangkap error form kosong
  const [formKosong, setFormKosong] = useState(false);

  // Ambil state dari halaman pilih item
  useEffect(() => {
    if (location.state) {
      setDataBahanMakanan(location.state.dataBahanMakanan);
      setBahanMakananDipilih(location.state.bahanMakananDipilih);
      setFilter(location.state.filter);
    }
  }, [location.state]);

  console.log("Halaman Struk");
  console.log(dataBahanMakanan);
  console.log(bahanMakananDipilih);

  // Hitung total harga
  // Hitung harga total pilihan
  let totalHarga = 0;
  for (const item in bahanMakananDipilih) {
    const matchedItem = dataBahanMakanan.find(
      (p) => p.nama.toLowerCase() === item.replace("_", " ").toLowerCase()
    );
    if (matchedItem) {
      totalHarga += bahanMakananDipilih[item] * matchedItem.harga;
    }
  }

  function handleTombolKembali() {
    navigate("/tukar-poin", {
      state: { dataBahanMakanan, bahanMakananDipilih, filter },
    });
  }

  const [formData, setFormData] = useState({
    namaPenukar: "",
    noHP: "",
    alamatAntar: "",
  });

  const [error, setError] = useState("");

  function handleChange(event) {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  }

  // Back End
  // Ambil uid user yang nukar
  const { user } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Cek form kosong
    if (
      formData.namaPenukar === "" ||
      formData.noHP === "" ||
      formData.alamatAntar === ""
    ) {
      setFormKosong(true);
      return;
    }

    // Ambil timestamp sekarang
    const now = Date.now();
    const uidPenukar = user.uid;

    // Tambah data tukar poin ke database
    const tukarpoinCollectionRef = collection(db, "tukarpoin");

    try {
      await addDoc(tukarpoinCollectionRef, {
        namaPenukar: formData.namaPenukar,
        uidPenukar: uidPenukar,
        noHpPenukar: formData.noHP,
        alamatAntar: formData.alamatAntar,
        itemDipilih: bahanMakananDipilih,
        totalHarga: totalHarga,
        status: "Menunggu petugas",
        namaPetugasPemroses: "",
        noHpPetugasPemroses: "",
        uidPetugasPemroses: "",
        waktu: Timestamp.fromMillis(now),
      });
    } catch (err) {
      console.error(err);
    }

    // Ubah data user (kurangin poin)
    const poinToSubtract = totalHarga;

    const userCollectionRef = collection(db, "user");

    const querySnapshot = await getDocs(
      query(userCollectionRef, where("uid", "==", uidPenukar))
    );
    const docRef = querySnapshot.docs[0].ref;

    const data = querySnapshot.docs[0].data();
    const updatedData = { ...data, poin: data.poin - poinToSubtract };

    await updateDoc(docRef, updatedData);

    // Kurangin stok bahan makanan
    const bahanMakananRef = collection(db, "bahanmakanan");

    Object.keys(bahanMakananDipilih).forEach(async (nama) => {
      const stokToSubtract = bahanMakananDipilih[nama];

      // Get the document with matching nama
      const querySnapshot = await getDocs(
        query(
          bahanMakananRef,
          where(
            "nama",
            "==",
            nama.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
          )
        )
      );
      const doc = querySnapshot.docs[0];

      // Update the document with the new stok value
      await updateDoc(doc.ref, { stok: doc.data().stok - stokToSubtract });
    });

    setOpenPopUp(true);
  };

  // Buat Struk
  // Gabungin data bahan makanan sama data jumlah item yang dipilih
  const dataStruk = dataBahanMakanan.map((bahan) => ({
    ...bahan,
    jumlahDipilih:
      bahanMakananDipilih[bahan.nama.toLowerCase().replace(/ /g, "_")],
  }));

  // Urutin data menurut alfabet berdasarkan nama
  dataStruk.sort((a, b) => a.nama.localeCompare(b.nama));

  console.log("Data Struk");
  console.log(dataStruk);

  // Map datanya untuk ditampilin
  const componentDataStruk = dataStruk.map((item) => {
    if (item.jumlahDipilih > 0) {
      return (
        <>
          <div key={item.nama}>
            <p className="tabel-kolom-item">{`${item.nama}`}</p>
            <p
              className="tabel-kolom-item"
              style={{ marginTop: "3px" }}>{`(${item.jumlahDipilih} kg)`}</p>
          </div>
          <p className="tabel-kolom-harga">{item.harga}</p>
          <p className="tabel-kolom-poin">{item.harga * item.jumlahDipilih}</p>
        </>
      );
    } else {
      return null;
    }
  });

  return (
    <div className="struk-tukar-poin-container">
      <p className="tombol-kembali" onClick={handleTombolKembali}>
        &lt;
      </p>
      <div className="header-tukar-poin">
        <p className="judul-fitur">Tukar Poin</p>
        <p className="deskripsi-fitur">
          Tukarkan poin Anda dengan bahan makanan segar
        </p>
      </div>

      <div className="fitur-struk-tukar-poin-container">
        <div className="struk-tukar-poin">
          <p className="struk-judul">Struk Penukaran</p>
          <div className="tabel-struk">
            <p className="judul-tabel">Item</p>
            <p className="judul-tabel">Harga / kg</p>
            <p className="judul-tabel">Jumlah Poin</p>
            {componentDataStruk}
            <div className="garis-struk" />
            <p className="struk-total">Total Harga</p>
            <p className="total-harga">{`${totalHarga} Poin`}</p>
          </div>
        </div>

        <form className="form-tukar-poin" onSubmit={handleSubmit}>
          <p>Nama</p>
          <input
            className="input-form-tukar-poin"
            type="text"
            placeholder="Masukkan nama Anda"
            onChange={handleChange}
            name="namaPenukar"
            value={formData.namaPenukar}></input>

          <p>Nomor Telepon</p>
          <input
            className="input-form-tukar-poin"
            type="text"
            placeholder="Masukkan nomor telepon Anda"
            onChange={handleChange}
            name="noHP"
            value={formData.noHP}></input>

          <p>Alamat Pengantaran</p>
          <input
            className="input-form-tukar-poin"
            type="text"
            placeholder="Masukkan alamat pengantaran"
            onChange={handleChange}
            name="alamatAntar"
            value={formData.alamatAntar}></input>

          <button className="tombol-konfirmasi-tukar-poin">Konfirmasi</button>
        </form>

        <div className="top-scroll-cover" />
        <div className="inside-shadow"></div>

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
    </div>
  );
}
