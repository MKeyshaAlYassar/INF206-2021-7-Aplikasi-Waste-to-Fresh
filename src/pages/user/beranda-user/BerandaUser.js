import InfoAkunUser from "./components/InfoAkunUser/InfoAkunUser";
import MenuFiturUser from "./components/MenuFiturUser/MenuFiturUser";
import NavbarUser from "../../components/NavbarUser/NavbarUser";

export default function BerandaUser() {
  return (
    <div
      style={{
        backgroundColor: "#60BA62",
        minHeight: "100vh",
        width: "100vw",
      }}>
      <InfoAkunUser />
      <MenuFiturUser />
    </div>
  );
}
