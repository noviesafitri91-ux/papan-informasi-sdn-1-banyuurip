const URL = "https://script.google.com/macros/s/AKfycbxbBwiVfevQU9YKw-EE_7sN800WfkWFD61dBs69IKdLUX-hPl6y7kBkjtWprIjMkK3pTA/exec";

async function loadData(){
  try {
    const res = await fetch(URL);
    const data = await res.json();

    console.log("DATA:", data);

    if (!data || data.length === 0) return;

    const item = data[0];

    // ===== GAMBAR (tetap seperti kamu) =====
    let gambar = item.gambar || "";

    let match = gambar.match(/\/d\/(.*?)\//);

    if(match){
      gambar = "https://drive.google.com/thumbnail?id=" + match[1] + "&sz=w1600";
    }

    document.getElementById("bg").src = gambar;

    document.getElementById("text").innerText =
  (data[0] && data[0].teks) ? data[0].teks : "Tidak ada teks";

  } catch(err) {
    console.log(err);
    document.getElementById("text").innerText = "Gagal load data";
  }
}

loadData();
