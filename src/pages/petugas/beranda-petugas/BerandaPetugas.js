import InfoAkunPetugas from "./components/InfoAkunPetugas/InfoAkunPetugas";
import HeaderNavbarPetugas from "./components/HeaderNavbarPetugas/HeaderNavbarPetugas";
import NavbarPetugas from "./components/NavbarPetugas/NavbarPetugas";
import "./BerandaPetugas.css";

export default function BerandaPetugas() {
  return (
    <div className="beranda-petugas-container">
      <InfoAkunPetugas />
      <HeaderNavbarPetugas />
      <NavbarPetugas />
    </div>
  );
}
