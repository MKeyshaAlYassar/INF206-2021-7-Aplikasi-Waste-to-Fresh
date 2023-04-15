import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import LoginUser from "./pages/login-user/LoginUser";
import LoginPetugas from "./pages/login-petugas/LoginPetugas";
import BuatAkunUser from "./pages/buat-akun-user/BuatAkunUser";
import BuatAkunPetugas from "./pages/buat-akun-petugas/BuatAkunPetugas";
import BerandaUser from "./pages/beranda-user/BerandaUser";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginUser />} />
        <Route path="/login-petugas" element={<LoginPetugas />} />
        <Route path="/buat-akun-user" element={<BuatAkunUser />} />
        <Route path="/buat-akun-petugas" element={<BuatAkunPetugas />} />
        <Route path="/beranda-user" element={<BerandaUser />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
