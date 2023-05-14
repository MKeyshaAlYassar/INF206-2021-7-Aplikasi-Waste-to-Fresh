import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
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
  doc,
  increment,
} from "firebase/firestore";
import { UserAuth } from "../../../context/AuthContext";
import PopUpBerhasil from "../../components/popup/PopUpBerhasil";
import PopUpGagal from "../../components/popup/PopUpGagal";

export default function StrukUbahTukarPoin() {
  const navigate = useNavigate();
  const location = useLocation();

  const params = useParams();
  const idTukarPoin = params.id;

  const [filter, setFilter] = useState("sayur");

  const [dataBahanMakanan, setDataBahanMakanan] = useState([]);

  const [dataTukarPoinLama, setDataTukarPoinLama] = useState({});

  const [bahanMakananDipilihLama, setBahanMakananDipilihLama] = useState({});
  const [bahanMakananDipilihBaru, setBahanMakananDipilihBaru] = useState({});

  // State untuk popup
  const [openPopUp, setOpenPopUp] = useState(false);

  // State untuk tangkap error form kosong
  const [formKosong, setFormKosong] = useState(false);

  // State untuk tampung data form
  const [formData, setFormData] = useState({
    namaPenukar: "",
    noHP: "",
    alamatAntar: "",
  });

  // Ambil state dari halaman pilih item
  useEffect(() => {
    if (location.state) {
      setDataBahanMakanan(location.state.dataBahanMakanan);
      setDataTukarPoinLama(location.state.dataTukarPoinLama);
      setBahanMakananDipilihLama(location.state.bahanMakananDipilihLama);
      setBahanMakananDipilihBaru(location.state.bahanMakananDipilihBaru);
      setFilter(location.state.filter);

      console.log("Data di set");
    }
  }, [location.state]);

  // Update formData when dataTukarPoinLama changes
  useEffect(() => {
    if (dataTukarPoinLama) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        namaPenukar: dataTukarPoinLama.namaPenukar,
        noHP: dataTukarPoinLama.noHpPenukar,
        alamatAntar: dataTukarPoinLama.alamatAntar,
      }));
    }
  }, [dataTukarPoinLama]);

  // Hitung total harga
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

  function handleTombolKembali() {
    navigate(`/riwayat-user/tukar-poin/${idTukarPoin}/ubah`, {
      state: {
        dataBahanMakanan,
        dataTukarPoinLama,
        bahanMakananDipilihLama,
        bahanMakananDipilihBaru,
        filter,
      },
    });
  }

  console.log(dataTukarPoinLama.namaPenukar);
  console.log(dataTukarPoinLama.noHpPenukar);

  function handleChange(event) {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  }

  // Back End
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Cek form kosong
    if (
      formData.namaPenukar === "" ||
      formData.noHP === "" ||
      formData.alamatAntar === ""
    ) {
      setFormKosong(true);
      return;
    }

    // Balikin data lama
    // Tambah poin user lama
    const q = query(
      collection(db, "user"),
      where("uid", "==", dataTukarPoinLama.uidPenukar)
    );

    const querySnapshot = await getDocs(q);

    const documentRef = doc(db, "user", querySnapshot.docs[0].id);

    await updateDoc(documentRef, {
      poin: increment(dataTukarPoinLama.totalHarga),
    });

    // Tambah stok bahan makanan lama
    const bahanMakananRef = collection(db, "bahanmakanan");

    Object.keys(bahanMakananDipilihLama).forEach(async (nama) => {
      const stokToSubtract = bahanMakananDipilihLama[nama];

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
      await updateDoc(doc.ref, { stok: doc.data().stok + stokToSubtract });
    });

    //Update data tukar poin di database
    const documentRef2 = doc(db, "tukarpoin", idTukarPoin);

    await updateDoc(documentRef2, {
      namaPenukar: formData.namaPenukar,
      uidPenukar: dataTukarPoinLama.uidPenukar,
      noHpPenukar: formData.noHP,
      alamatAntar: formData.alamatAntar,
      itemDipilih: bahanMakananDipilihBaru,
      totalHarga: totalHarga,
    });

    // Kurangin poin user
    await updateDoc(documentRef, {
      poin: increment(totalHarga * -1),
    });

    // Kurangin stok bahan makanan berdasarkan pilihan baru
    Object.keys(bahanMakananDipilihBaru).forEach(async (nama) => {
      const stokToSubtract = bahanMakananDipilihBaru[nama];

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
      bahanMakananDipilihBaru[bahan.nama.toLowerCase().replace(/ /g, "_")],
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
        <p className="judul-fitur">Ubah Tukar Poin</p>
        <p className="deskripsi-fitur">Ubah penukaran poin Anda</p>
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
            navigate(`/riwayat-user/tukar-poin/${idTukarPoin}`);
          }}
          title="Berhasil"
          subtitle="Penukaran poin berhasil diubah"
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
    </div>
  );
}
