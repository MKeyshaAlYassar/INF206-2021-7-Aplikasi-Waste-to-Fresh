import "./Bantuan.css";

export default function Bantuan() {
  return (
    <div className="judul-bantuan">
      <div className="header-bantuan"></div>
      <p className="judul-header-bantuan">Bantuan</p>
      <div className="isi-bantuan-container">
        <div>
          <p className="judul-pengenalan">Pengenalan</p>
          <p className="isi-pengenalan">
            Waste to Fresh adalah sebuah aplikasi inovatif yang memungkinkan
            pengguna untuk menukarkan sampah mereka menjadi bahan makanan segar.
          </p>
          <p className="judul-fitur-tukar-sampah">Fitur Tukar Sampah</p>
          <p className="isi-fitur-tukar-sampah">
            Fitur ini memungkinkan pengguna untuk menukarkan sampah mereka
            dengan poin.
          </p>
          <p className="judul-fitur-tukar-poin">Fitur Tukar Poin</p>
          <p className="isi-fitur-tukar-poin">
            Fitur ini memungkinkan pengguna untuk menukarkan poin yang telah
            mereka kumpulkan dengan bahan makanan segar yang tersedia pada
            aplikasi.
          </p>
          <p className="judul-fitur-cek-konversi">Fitur Cek Konversi Sampah</p>
          <p className="isi-fitur-cek-konversi">
            Fitur ini memungkinkan pengguna untuk melihat nilai konversi dari
            jenis-jenis sampah yang mereka kumpulkan.
          </p>
        </div>
        <div className="hubungi-kami">
          <p className="judul-hubungi-kami">Hubungi Kami </p>
          <p className="isi-hubungi-kami">wastetofresh@gmail.com</p>
        </div>
      </div>
    </div>
  );
}
