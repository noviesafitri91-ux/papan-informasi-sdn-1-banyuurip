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

      // set background image
      document.getElementById("bg").src = aktif.gambar;

      // set running text (WAJIB pakai span biar jalan)
      document.getElementById("runningText").innerHTML =
        "<span>" + aktif.teks + "</span>";

    } else {
      document.getElementById("runningText").innerText = "TIDAK ADA DATA AKTIF";
    }

  } catch (error) {
    console.error("ERROR:", error);
    document.getElementById("runningText").innerText = "GAGAL LOAD DATA";
  }
}
