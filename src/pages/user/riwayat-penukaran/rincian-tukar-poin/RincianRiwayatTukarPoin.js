import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./RincianRiwayatTukarPoin.css";
import { db } from "../../../../firebase";
import { TiThMenuOutline } from "react-icons/ti";
import MenuUbahHapusPenukaran from "../../../components/MenuUbahHapusPenukaran/MenuUbahHapusPenukaran";

export default function RincianRiwayatTukarPoin() {
  const params = useParams();
  const idTukarPoin = params.id;
  console.log(params.id);

  const [dataRincian, setDataRincian] = useState({});

  // State untuk buka menu ubah / hapus
  const [openMenu, setOpenMenu] = useState(false);

  // State untuk buka pop up konfirmasi hapus
  const [openKonfirmasiHapus, setOpenKonfirmasiHapus] = useState(false);

  // Ambil data tukar poin
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

  return (
    <div className="rincian-tukar-poin-container">
      <Link className="tombol-kembali" to="/riwayat-user">
        &lt;
      </Link>
      <TiThMenuOutline
        className="penukaran-menu-icon"
        onClick={() => setOpenMenu(true)}
      />
      <div className="header-rincian-tukar-poin">
        <p className="judul-fitur">Rincian Penukaran Poin</p>
        <p className="deskripsi-fitur">Lihat detail penukaran Anda</p>
      </div>
      <div className="fitur-rincian-tukar-poin-container">
        <div className="informasi-penukaran-poin">
          <p className="judul-informasi">Informasi Penukaran</p>
          <p className="informasi-subject">Status</p>
          <p className="informasi-isi">{dataRincian.status}</p>

          <p className="informasi-subject">Tanggal Penukaran</p>
          <p className="informasi-isi">{tanggal}</p>

          <p className="informasi-subject">Petugas Pemroses</p>
          <p className="informasi-isi">
            {dataRincian.namaPetugasPemroses !== ""
              ? dataRincian.namaPetugasPemroses
              : "-"}
          </p>

          <p className="informasi-subject">Nomor HP Petugas</p>
          <p className="informasi-isi">
            {dataRincian.noHpPetugasPemroses !== ""
              ? dataRincian.noHpPetugasPemroses
              : "-"}
          </p>

          <p className="informasi-subject">Poin yang Didapat</p>
          <p className="informasi-isi">
            {dataRincian.poin > 0 ? dataRincian.poin : "-"}
          </p>
        </div>

        <div className="informasi-data-penukar">
          <p className="judul-informasi">Data Penukar</p>
          <p className="informasi-subject">Nama</p>
          <p className="informasi-isi">{dataRincian.namaPenukar}</p>

          <p className="informasi-subject">No HP</p>
          <p className="informasi-isi">{dataRincian.noHpPenukar}</p>

          <p className="informasi-subject-alamat">Alamat Pengantaran</p>
          <p className="informasi-isi-alamat">{dataRincian.alamatAntar}</p>
        </div>

        <div className="struk-tukar-poin">
          <p className="struk-judul">Struk Penukaran</p>
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
      </div>

      <div className="top-scroll-cover" />
      <div className="inside-shadow-tukar-poin"></div>

      <MenuUbahHapusPenukaran
        open={openMenu}
        onClose={() => setOpenMenu(false)}
        linkUbah="/belum-ada"
        setOpenKonfirmasiHapus={setOpenKonfirmasiHapus}
      />
    </div>
  );
}
