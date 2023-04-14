import logo from "../../assets/logo-waste-to-fresh.png";

export default function Header() {
  return (
    <div
      style={{
        backgroundColor: "#60BA62",
        width: "100%",
        height: "70px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <img src={logo} style={{ width: "70%" }} />
    </div>
  );
}
