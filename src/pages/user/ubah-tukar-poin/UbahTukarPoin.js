import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { db } from "../../../firebase";
import {
  collection,
  getDocs,
  where,
  query,
  doc,
  getDoc,
} from "firebase/firestore";
import DisplayMakanan from "../tukar-poin/components/DisplayMakanan";
import PopUpGagal from "./../../components/popup/PopUpGagal";
import { UserAuth } from "../../../context/AuthContext";

export default function UbahTukarPoin() {
  // Ambil id tukar poin
  const params = useParams();
  const idTukarPoin = params.id;

  // State untuk filter
  const [filter, setFilter] = useState("sayur");

  // State untuk pop up
  const [openPopUpGagal, setOpenPopUpGagal] = useState(false);

  // Fungsi untuk handle ganti filter
  function handleFilter(filter) {
    return () => setFilter(filter);
  }

  //////////////////////////////////////////////////////////////////////////////////////////

  const [dataTukarPoinLama, setDataTukarPoinLama] = useState({});

  const [bahanMakananDipilihLama, setBahanMakananDipilihLama] = useState({});
  const [bahanMakananDipilihBaru, setBahanMakananDipilihBaru] = useState({});

  // Ambil data tukar poin sekarang
  useEffect(() => {
    const ambilDataRincian = async () => {
      const docRef = doc(db, "tukarpoin", idTukarPoin);
      const docSnap = await getDoc(docRef);
      setDataTukarPoinLama(docSnap.data());

      if (!location.state) {
        setBahanMakananDipilihLama(docSnap.data().itemDipilih);
        setBahanMakananDipilihBaru(docSnap.data().itemDipilih);
      }
    };

    ambilDataRincian();
  }, []);

  //////////////////////////////////////////////////////////////////////////////////////////

  // Hitung berapa item yang udah dipilih user
  const jumlahItemDipilih = Object.values(bahanMakananDipilihBaru).filter(
    (value) => value > 0
  ).length;

  // Fungsi untuk tambah/kurang pilihan bahan makanan
  function handleTambahPilihan(key, perintah) {
    // Sesuain nama dengan object bahanMakananDipilih
    const formattedKey = key.replace(" ", "_").toLowerCase();

    if (perintah === "tambah") {
      setBahanMakananDipilihBaru((prevData) => {
        return {
          ...prevData,
          [formattedKey]: prevData[formattedKey] + 1,
        };
      });
    }

    if (perintah === "kurang") {
      setBahanMakananDipilihBaru((prevData) => {
        return {
          ...prevData,
          [formattedKey]: prevData[formattedKey] - 1,
        };
      });
    }
  }

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
      setDataTukarPoinLama(location.state.dataTukarPoinLama);
      setBahanMakananDipilihLama(location.state.bahanMakananDipilihLama);
      setBahanMakananDipilihBaru(location.state.bahanMakananDipilihBaru);
      setFilter(location.state.filter);
    }
  }, [location.state]);

  console.log("cobaa");

  // Hitung harga total pilihan
  let totalHarga = 0;
  for (const item in bahanMakananDipilihBaru) {
    const matchedItem = dataBahanMakanan.find(
      (p) => p.nama.toLowerCase() === item.replace("_", " ").toLowerCase()
    );
    if (matchedItem) {
      totalHarga += bahanMakananDipilihBaru[item] * matchedItem.harga;
    }
  }

  // Handle buka halamana struk
  const navigate = useNavigate();

  const { user } = UserAuth();
  const uidPenukar = user.uid;

  const handleNavigate = async () => {
    // Cek dulu poin user cukup atau ga

    const userCollectionRef = collection(db, "user");

    const querySnapshot = await getDocs(
      query(userCollectionRef, where("uid", "==", uidPenukar))
    );

    const data = querySnapshot.docs[0].data();

    // Hitung poin sekarang + poin yg udah ditukar sebelumnya
    if (data.poin + dataTukarPoinLama.totalHarga < totalHarga) {
      setOpenPopUpGagal(true);
      return;
    }

    navigate(`/riwayat-user/tukar-poin/${idTukarPoin}/ubah-struk`, {
      state: {
        dataBahanMakanan,
        dataTukarPoinLama,
        bahanMakananDipilihLama,
        bahanMakananDipilihBaru,
        filter,
      },
    });
  };

  return (
    <div className="tukar-poin-container">
      <Link
        className="tombol-kembali"
        to={`/riwayat-user/tukar-poin/${idTukarPoin}`}>
        &lt;
      </Link>
      <div className="header-tukar-poin">
        <p className="judul-fitur">Ubah Tukar Poin</p>
        <p className="deskripsi-fitur">Ubah penukaran poin Anda</p>
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
                dataJumlah={bahanMakananDipilihBaru}
                tipe={"sayur"}
                onclickFunction={handleTambahPilihan}
              />
            ) : (
              <DisplayMakanan
                data={dataBahanMakanan}
                dataJumlah={bahanMakananDipilihBaru}
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

      <PopUpGagal
        open={openPopUpGagal}
        onClose={() => {
          setOpenPopUpGagal(false);
        }}
        title="Gagal"
        subtitle="Poin Anda tidak cukup untuk melakukan penukaran"
        tombol="Tutup"
      />
    </div>
  );
}
