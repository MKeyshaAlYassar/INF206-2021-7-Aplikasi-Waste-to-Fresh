import InfoAkunPetugas from "./components/InfoAkunPetugas/InfoAkunPetugas";
import HeaderNavbarPetugas from "./components/HeaderNavbarPetugas/HeaderNavbarPetugas";
import NavbarPetugas from "./components/NavbarPetugas/NavbarPetugas";

export default function BerandaPetugas() {
  return (
    <div
      style={{
        backgroundColor: "#60BA62",
        minHeight: "100vh",
        width: "100vw",
      }}>
      <InfoAkunPetugas />
      <HeaderNavbarPetugas />
      <NavbarPetugas />
    </div>
  );
}
