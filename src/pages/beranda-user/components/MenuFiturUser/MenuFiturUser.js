import { Link } from "react-router-dom";
import "./MenuFiturUser.css";
import iconTukarSamnpah from "./icon-tukar-sampah.png";
import iconTukarPoin from "./icon-tukar-poin.png";
import iconCekKonversiSampah from "./icon-cek-konversi-sampah.png";

export default function MenuFiturUser() {
  return (
    <div className="menu-fitur-user-container">
      <div className="fitur-user-container" style={{ marginLeft: "37px" }}>
        <div>
          <img className="icon-tukar-sampah" src={iconTukarSamnpah} />
        </div>
        <p>Tukar Sampah</p>
      </div>
      <div className="fitur-user-container">
        <div>
          <img className="icon-tukar-poin" src={iconTukarPoin} />
        </div>
        <p>Tukar Poin</p>
      </div>
      <div className="fitur-user-container" style={{ marginRight: "37px" }}>
        <div>
          <img
            className="icon-cek-konversi-sampah"
            src={iconCekKonversiSampah}
          />
        </div>
        <p>Cek Konversi Sampah</p>
      </div>
    </div>
  );
}
