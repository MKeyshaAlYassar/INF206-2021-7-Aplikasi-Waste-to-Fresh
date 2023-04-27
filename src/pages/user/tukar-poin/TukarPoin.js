import "./TukarPoin.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { db } from "../../../firebase";
import { collection, getDocs } from "firebase/firestore";
import DisplayMakanan from "./components/DisplayMakanan";

export default function TukarPoin() {
  // State untuk filter
  const [filter, setFilter] = useState("sayur");

  // Fungsi untuk handle ganti filter
  function handleFilter(filter) {
    return () => setFilter(filter);
  }

  // State untuk tampung jumlah bahan makanan yang dipilih user
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

  // Hitung berapa item yang udah dipilih user
  const jumlahItemDipilih = Object.values(bahanMakananDipilih).filter(
    (value) => value > 0
  ).length;

  console.log(`Jumlah Item Dipilih: ${jumlahItemDipilih}`);

  // Fungsi untuk tambah/kurang pilihan bahan makanan
  function handleTambahPilihan(key, perintah) {
    const formattedKey = key.replace(" ", "_").toLowerCase();

    if (perintah === "tambah") {
      setBahanMakananDipilih((prevData) => {
        return {
          ...prevData,
          [formattedKey]: prevData[formattedKey] + 1,
        };
      });
    }

    if (perintah === "kurang") {
      setBahanMakananDipilih((prevData) => {
        return {
          ...prevData,
          [formattedKey]: prevData[formattedKey] - 1,
        };
      });
    }
  }

  console.log("TombolDitekan");
  console.log(bahanMakananDipilih);

  // Ambil semua data bahan makanan
  // Simpan di state
  // State untuk tampung data bahan makanan
  const [dataBahanMakanan, setDataBahanMakanan] = useState([]);

  const bahanmakananCollectionRef = collection(db, "bahanmakanan");

  useEffect(() => {
    const getAllBahanMakanan = async () => {
      try {
        const data = await getDocs(bahanmakananCollectionRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setDataBahanMakanan(filteredData);
        console.log(filteredData);
      } catch (err) {
        console.error(err);
      }
    };

    getAllBahanMakanan();
  }, []);

  // Ambil state waktu balik dari halaman struk
  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      setDataBahanMakanan(location.state.dataBahanMakanan);
      setBahanMakananDipilih(location.state.bahanMakananDipilih);
      setFilter(location.state.filter);
    }
  }, [location.state]);

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

  // Handle buka halamana struk
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/tukar-poin-struk", {
      state: { dataBahanMakanan, bahanMakananDipilih, filter },
    });
  };

  return (
    <div className="tukar-poin-container">
      <Link className="tombol-kembali" to="/beranda-user">
        &lt;
      </Link>
      <div className="header-tukar-poin">
        <p className="judul-fitur">Tukar Poin</p>
        <p className="deskripsi-fitur">
          Tukarkan poin Anda dengan bahan makanan segar
        </p>
      </div>
      <div className="fitur-tukar-poin-container">
        <div className="filter-tukar-poin-container">
          <button
            className={`filter-tukar-poin-sayur ${
              filter === "sayur" && "active"
            }`}
            onClick={handleFilter("sayur")}>
            Sayur
          </button>
          <button
            className={`filter-tukar-poin-buah ${
              filter === "buah" && "active"
            }`}
            onClick={handleFilter("buah")}>
            Buah
          </button>
        </div>
        <div className="display-tukar-poin-container">
          <div className="scrollable-content">
            {filter === "sayur" ? (
              <DisplayMakanan
                data={dataBahanMakanan}
                dataJumlah={bahanMakananDipilih}
                tipe={"sayur"}
                onclickFunction={handleTambahPilihan}
              />
            ) : (
              <DisplayMakanan
                data={dataBahanMakanan}
                dataJumlah={bahanMakananDipilih}
                tipe={"buah"}
                onclickFunction={handleTambahPilihan}
              />
            )}
          </div>
        </div>
      </div>
      <div className="inside-shadow"></div>
      {jumlahItemDipilih > 0 && (
        <div className="tombol-rincian" onClick={handleNavigate}>
          <p className="tombol-rincian-jumlah-item">{jumlahItemDipilih} Item</p>
          <p className="tombol-rincian-jumlah-poin">{totalHarga} Poin</p>
        </div>
      )}
    </div>
  );
}
