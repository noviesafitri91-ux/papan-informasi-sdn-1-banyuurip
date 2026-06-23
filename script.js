document.addEventListener("DOMContentLoaded", function () {
  loadData();
});

async function loadData() {
  try {
    const res = await fetch("https://script.google.com/macros/s/AKfycbz7DyIPNVTXBGPxfU5hToNXiRsgyLnlsszZGt647vgqmBSWXu1Oiv0AfBXJ9FpHyBW3Lw/exec");
    const data = await res.json();

    const aktif = data.find(item => item.aktif === "YA");

    if (aktif) {

      // GAMBAR
      document.getElementById("bg").src = aktif.gambar;

      // RUNNING TEXT (INI YANG BENAR)
      document.getElementById("runningText").innerHTML =
        "<span>" + aktif.teks + "</span>";

    }

  } catch (err) {
    console.log(err);
  }
}
