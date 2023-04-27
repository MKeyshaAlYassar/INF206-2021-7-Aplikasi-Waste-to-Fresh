import { collection, doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./RincianRiwayatTukarPoin.css";
import { db } from "../../../../firebase";

export default function RincianRiwayatTukarPoin() {
  const params = useParams();
  const idTukarPoin = params.id;
  console.log(params.id);

  const [dataRincian, setDataRincian] = useState({});

  useEffect(() => {
    const ambilDataRincian = async () => {
      const docRef = doc(db, "tukarpoin", idTukarPoin);
      const docSnap = await getDoc(docRef);
      setDataRincian(docSnap.data());
    };

    ambilDataRincian();
  }, []);

  console.log(dataRincian);

  return <h1>Halaman Rincian Riwayat Tukar Poin</h1>;
}
