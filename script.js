async function loadData(){

  const URL = "https://script.google.com/macros/s/AKfycbxbBwiVfevQU9YKw-EE_7sN800WfkWFD61dBs69IKdLUX-hPl6y7kBkjtWprIjMkK3pTA/exec";

  try {

    const res = await fetch(URL);
    const data = await res.json();

    console.log("DATA:", data);

    if (!data || data.length === 0) return;

    const item = data[0];

    // =======================
    // GAMBAR
    // =======================
    let gambar = item.gambar || "";

    let match = gambar.match(/\/d\/(.*?)\//);

    if(match){
      gambar = "https://drive.google.com/thumbnail?id=" + match[1] + "&sz=w1600";
    }

    document.getElementById("bg").src = gambar;

    // =======================
    // RUNNING TEXT
    // =======================
    document.getElementById("text").innerText =
      item.teks || "Memuat data...";

  } catch (err) {
    console.log(err);
    document.getElementById("text").innerText = "Gagal load data";
  }
}


// =======================
// JALANKAN OTOMATIS
// =======================
document.addEventListener("DOMContentLoaded", function(){

  loadData(); // tampil pertama kali

  setInterval(loadData, 30000); // update tiap 30 detik

});
