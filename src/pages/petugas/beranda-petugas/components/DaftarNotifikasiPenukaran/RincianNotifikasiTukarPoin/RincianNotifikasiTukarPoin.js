import "./RincianNotifikasiTukarPoin.css";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  getDoc,
  doc,
  collection,
  getDocs,
  query,
  where,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../../../../firebase";
import { UserAuth } from "../../../../../../context/AuthContext";
import PopUpBerhasil from "../../../../../components/popup/PopUpBerhasil";

export default function RincianNotifikasiTukarPoin() {
  const params = useParams();
  const idTukarPoin = params.id;
  console.log(params.id);

  const [dataRincian, setDataRincian] = useState({});

  const [dataPetugasLogin, setDataPetugasLogin] = useState([]);

  const navigate = useNavigate();
  const [openPopUp, setOpenPopUp] = useState(false);

  useEffect(() => {
    const ambilDataRincian = async () => {
      const docRef = doc(db, "tukarpoin", idTukarPoin);
      const docSnap = await getDoc(docRef);
      setDataRincian(docSnap.data());
    };

    ambilDataRincian();
  }, []);

  console.log(dataRincian);

  // Format timestamp
  const tanggal = dataRincian.waktu?.toDate().toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const jam = dataRincian.waktu
    ?.toDate()
    .toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });

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

  // Buat Struk
  // Gabungin data bahan makanan sama data jumlah item yang dipilih
  const dataStruk = dataBahanMakanan.map((bahan) => ({
    ...bahan,
    jumlahDipilih:
      dataRincian.itemDipilih[bahan.nama.toLowerCase().replace(/ /g, "_")],
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

  // Supaya bisa akses data akun user, seperti email dan UID
  const { user } = UserAuth();

  // Ambil data user menurut uid nya
  // Simpan di state

  const petugasCollectionRef = collection(db, "petugas");

  const uid = user.uid;

  useEffect(() => {
    const ambilPetugasLogin = async () => {
      try {
        const querySnapshot = await getDocs(
          query(petugasCollectionRef, where("uid", "==", uid))
        );
        const data = querySnapshot.docs[0].data();
        setDataPetugasLogin(data);
      } catch (error) {
        console.log("Error getting documents: ", error);
      }
    };

    if (uid) {
      ambilPetugasLogin();
    }
  }, [uid]);

  async function handleTerima() {
    // Reference the document to be updated
    const tukarpoinRef = doc(collection(db, "tukarpoin"), idTukarPoin);

    // Update the document with multiple fields
    await updateDoc(tukarpoinRef, {
      status: "Diproses",
      uidPetugasPemroses: dataPetugasLogin.uid,
      namaPetugasPemroses: dataPetugasLogin.nama,
      noHpPetugasPemroses: dataPetugasLogin.noHP,
    });

    setOpenPopUp(true);
  }

  return (
    <div className="rincian-notifikasi-tukar-poin-container">
      <Link className="tombol-kembali" to="/beranda-petugas">
        &lt;
      </Link>
      <div className="header-rincian-notifikasi-tukar-poin">
        <p className="judul-fitur"> Rincian Notifikasi Tukar Poin</p>
        <p className="deskripsi-fitur">
          Terima permintaan penukaran dari masyarakat
        </p>
      </div>
      <div className="fitur-rincian-notifikasi-tukar-poin-container">
        <div className="informasi-notifikasi-penukaran-poin">
          <p className="judul-informasi">Informasi Penukaran</p>
          <p className="informasi-subject">Status</p>
          <p className="informasi-isi">{dataRincian.status}</p>

          <p className="informasi-subject">Tanggal Penukaran</p>
          <p className="informasi-isi">{tanggal}</p>

          <p className="informasi-subject">Waktu Penukaran</p>
          <p className="informasi-isi">{jam} WIB</p>
        </div>

        <div className="informasi-notifikasi-data-penukar">
          <p className="judul-informasi">Data Penukaran</p>
          <p className="informasi-subject">Nama</p>
          <p className="informasi-isi">{dataRincian.namaPenukar}</p>

          <p className="informasi-subject">No HP</p>
          <p className="informasi-isi">{dataRincian.noHpPenukar}</p>

          <p className="informasi-subject-alamat">Alamat Pengantaran</p>
          <p className="informasi-isi-alamat">{dataRincian.alamatAntar}</p>
        </div>

        <div className="rincian-struk-bahan-makan-dipilih">
          <p className="struk-judul">Bahan Makanan Yang Dipilih</p>
          <div className="tabel-struk">
            <p className="judul-tabel">Item</p>
            <p className="judul-tabel">Harga / kg</p>
            <p className="judul-tabel">Jumlah Poin</p>
            {componentDataStruk}
            <div className="garis-struk" />
            <p className="struk-total">Total Harga</p>
            <p className="total-harga">{`${dataRincian.totalHarga} Poin`}</p>
          </div>
        </div>

        <button
          className="tombol-terima-notifikasi-tukar-poin"
          onClick={handleTerima}>
          Terima
        </button>
      </div>

      <div className="top-scroll-cover" />
      <div className="inside-shadow-rincian-notifikasi-tukar-poin"></div>

      <PopUpBerhasil
        open={openPopUp}
        onClose={() => {
          setOpenPopUp(false);
          navigate(`/rincian-penukaran-petugas/tukar-poin/${idTukarPoin}`);
        }}
        title="Berhasil"
        subtitle="Penukaran poin berhasil diterima"
        tombol="Proses Penukaran"
      />
    </div>
  );
}
