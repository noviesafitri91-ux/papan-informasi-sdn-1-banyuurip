document.addEventListener("DOMContentLoaded", function () {
  loadData();
});

async function loadData() {
  try {
    const res = await fetch("https://script.google.com/macros/s/AKfycbz7DyIPNVTXBGPxfU5hToNXiRsgyLnlsszZGt647vgqmBSWXu1Oiv0AfBXJ9FpHyBW3Lw/exec");
    const data = await res.json();

    console.log("DATA:", data);

    const aktif = data.find(item => item.aktif === "YA");

    if (aktif) {

      // 🔥 GAMBAR (DIPAKSA LOAD ULANG BIAR TIDAK HITAM)
      const img = document.getElementById("bg");
      img.src = "";
      setTimeout(() => {
        img.src = aktif.gambar;
      }, 100);

      // 🔥 RUNNING TEXT
      document.getElementById("runningText").innerHTML =
        "<span>" + aktif.teks + "</span>";

    } else {
      document.getElementById("runningText").innerText = "TIDAK ADA DATA AKTIF";
    }

  } catch (err) {
    console.error("ERROR:", err);
    document.getElementById("runningText").innerText = "GAGAL LOAD DATA";
  }
}
