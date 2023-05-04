import "./BahanMakanan.css";
import { useState, useEffect } from "react";
import { db } from "../../../firebase";
import { getDocs, collection } from "firebase/firestore";
import DisplayStokMakanan from "./components/DisplayStokMakanan";

export default function BahanMakanan() {
  // State untuk filter
  const [filter, setFilter] = useState("sayur");

  // Fungsi untuk handle ganti filter
  function handleFilter(filter) {
    return () => setFilter(filter);
  }

  // Ambil semua data bahan makanan
  // Simpan di state
  // State untuk tampung data bahan makanan
  const [dataBahanMakanan, setDataBahanMakanan] = useState([]);

  // State untuk refresh data stok setelah ditambah
  // Supaya diambil data baru setelah stok ditambah
  // Bakal di pass ke DisplayStokMakanan
  // Terus di pass lagi ke StokFormPopUp
  const [refreshState, setRefreshState] = useState(false);

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
  }, [refreshState]);

  return (
    <div className="bahan-makanan-container">
      <div className="header-bahan-makanan">
        <p className="judul-fitur">Bahan Makanan</p>
        <p className="deskripsi-fitur">Kelola stok bahan makanan</p>
      </div>
      <div className="fitur-bahan-makanan-container">
        <div className="filter-bahan-makanan-container">
          <button
            className={`filter-bahan-makanan-sayur ${
              filter === "sayur" && "active"
            }`}
            onClick={handleFilter("sayur")}>
            Sayur
          </button>
          <button
            className={`filter-bahan-makanan-buah ${
              filter === "buah" && "active"
            }`}
            onClick={handleFilter("buah")}>
            Buah
          </button>
        </div>
        <div className="display-bahan-makanan-container">
          <div className="scrollable-content-stok-bahan-makanan">
            {filter === "sayur" ? (
              <DisplayStokMakanan
                data={dataBahanMakanan}
                tipe={"sayur"}
                setRefresh={setRefreshState}
                refresh={refreshState}
              />
            ) : (
              <DisplayStokMakanan
                data={dataBahanMakanan}
                tipe={"buah"}
                setRefresh={setRefreshState}
                refresh={refreshState}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
