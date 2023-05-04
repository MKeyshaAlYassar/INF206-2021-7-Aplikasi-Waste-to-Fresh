import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";

import LoginUser from "./pages/login-user/LoginUser";
import LoginPetugas from "./pages/login-petugas/LoginPetugas";
import BuatAkunUser from "./pages/buat-akun-user/BuatAkunUser";
import BuatAkunPetugas from "./pages/buat-akun-petugas/BuatAkunPetugas";
import BerandaUser from "./pages/user/beranda-user/BerandaUser";
import BerandaPetugas from "./pages/petugas/beranda-petugas/BerandaPetugas";
import ProfilUser from "./pages/user/profil-user/ProfilUser";
import ProfilPetugas from "./pages/petugas/profil-petugas/ProfilPetugas";
import ProtectedRouteUser from "./pages/components/ProtectedRouteUser";
import ProtectedRoutePetugas from "./pages/components/ProtectedRoutePetugas";
import NavbarUser from "./pages/components/NavbarUser/NavbarUser";
import NavbarPetugas from "./pages/components/NavbarPetugas/NavbarPetugas";
import TukarSampah from "./pages/user/tukar-sampah/TukarSampah";
import TukarPoin from "./pages/user/tukar-poin/TukarPoin";
import StrukTukarPoin from "./pages/user/tukar-poin/StrukTukarPoin";
import CekKonversiSampah from "./pages/user/cek-konversi-sampah/CekKonversiSampah";
import DaftarRiwayatPenukaran from "./pages/user/riwayat-penukaran/daftar-riwayat-penukaran/DaftarRiwayatPenukaran";
import RincianRiwayatTukarPoin from "./pages/user/riwayat-penukaran/rincian-tukar-poin/RincianRiwayatTukarPoin";
import RincianRiwayatTukarSampah from "./pages/user/riwayat-penukaran/rincian-tukar-sampah/RincianRiwayatTukarSampah";
import BahanMakanan from "./pages/petugas/bahan-makanan/BahanMakanan";

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<LoginUser />} />
          <Route path="/login-petugas" element={<LoginPetugas />} />
          <Route path="/buat-akun-user" element={<BuatAkunUser />} />
          <Route path="/buat-akun-petugas" element={<BuatAkunPetugas />} />

          <Route element={<ProtectedRouteUser />}>
            <Route path="/profil-user" element={<ProfilUser />} />

            <Route element={<NavbarUser />}>
              <Route path="/beranda-user" element={<BerandaUser />} />

              <Route
                path="/riwayat-user"
                element={<DaftarRiwayatPenukaran />}
              />

              <Route path="/bantuan-user" element={<h1>Halaman Bantuan</h1>} />
            </Route>

            <Route
              path="/riwayat-user/tukar-sampah/:id"
              element={<RincianRiwayatTukarSampah />}
            />
            <Route
              path="/riwayat-user/tukar-poin/:id"
              element={<RincianRiwayatTukarPoin />}
            />

            <Route path="/tukar-sampah" element={<TukarSampah />} />

            <Route path="/tukar-poin" element={<TukarPoin />} />
            <Route path="/tukar-poin-struk" element={<StrukTukarPoin />} />

            <Route
              path="/cek-konversi-sampah"
              element={<CekKonversiSampah />}
            />
          </Route>

          <Route element={<ProtectedRoutePetugas />}>
            <Route path="/profil-petugas" element={<ProfilPetugas />} />

            <Route element={<NavbarPetugas />}>
              <Route path="/beranda-petugas" element={<BerandaPetugas />} />

              <Route
                path="/penukaran-petugas"
                element={<h1>Halaman Penukaran Petugas</h1>}
              />

              <Route path="/bahan-makanan" element={<BahanMakanan />} />
            </Route>
          </Route>
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
