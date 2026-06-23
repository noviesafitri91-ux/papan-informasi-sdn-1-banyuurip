document.addEventListener("DOMContentLoaded", function () {
  loadData();
});

async function loadData() {
  try {
    const res = await fetch("https://script.google.com/macros/s/AKfycbz7DyIPNVTXBGPxfU5hToNXiRsgyLnlsszZGt647vgqmBSWXu1Oiv0AfBXJ9FpHyBW3Lw/exec");
    const data = await res.json();

    console.log("DATA MASUK:", data);

    const aktif = data.find(item => item.aktif === "YA");

    if (aktif) {
      console.log("TEKS:", aktif.teks);

      document.getElementById("runningText").innerText = aktif.teks;
    }
  } catch (err) {
    console.error("ERROR:", err);
  }
}