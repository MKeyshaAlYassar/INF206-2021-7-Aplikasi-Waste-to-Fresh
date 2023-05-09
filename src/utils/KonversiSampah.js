import { useState } from "react";

// Ini untuk di copy
// const [jumlahSampah, SetJumlahSampah] = useState({
//     organik : 0,
//     botol_plastik : 0,
//     kaca : 0,
//     kertas : 0,
//     kardus : 0,
//     besi : 0,
// })

export const konversiSampah = {
    organik: 15,
    botol_plastik: 10,
    kaca: 20,
    kertas: 20,
    kardus: 15,
    besi: 30,
}

export const HitungKonversiSampah = (jumlahSampah, konversiSampah) => {
    let total = 0;
    for (const jenisSampah in jumlahSampah) {
      const jumlah = jumlahSampah[jenisSampah];
      const konversi = konversiSampah[jenisSampah];
      total += jumlah * konversi;
    }
    return total;
  };
