const URL = "https://script.google.com/macros/s/AKfycbxbBwiVfevQU9YKw-EE_7sN800WfkWFD61dBs69IKdLUX-hPl6y7kBkjtWprIjMkK3pTA/exec";

let dataGlobal = [];
let index = 0;

/* JAM */
function updateClock(){
  const now = new Date();

  document.getElementById("clock").innerText =
    now.toLocaleDateString("id-ID") + " | " +
    now.toLocaleTimeString("id-ID");
}
setInterval(updateClock, 1000);
updateClock();


/* TAMPIL SLIDE */
function showSlide(){

  if(!dataGlobal || dataGlobal.length === 0) return;

  const item = dataGlobal[index];

  // GAMBAR
  let gambar = item.gambar || "";
  let match = gambar.match(/\/d\/(.*?)\//);

  if(match){
    gambar = "https://drive.google.com/thumbnail?id=" + match[1] + "&sz=w1600";
  }

  document.getElementById("bg").src = gambar;

  // RUNNING TEXT
  const textEl = document.getElementById("text");
  textEl.innerText = item.teks || "";

  // reset animasi
  textEl.style.animation = "none";
  void textEl.offsetWidth;
  textEl.style.animation = "marquee 20s linear";

  /* HITUNG DURASI TEKS */
  const panjangTeks = textEl.innerText.length;

  // perkiraan durasi (lebih panjang teks = lebih lama)
  const durasi = Math.max(8000, panjangTeks * 250);

  index++;
  if(index >= dataGlobal.length){
    index = 0;
  }

  // ⏱️ GANTI SLIDE SETELAH TEKS SELESAI
  setTimeout(showSlide, durasi);
}


/* LOAD DATA */
async function loadData(){

  try{

    const res = await fetch(URL);
    dataGlobal = await res.json();

    console.log("DATA:", dataGlobal);

    showSlide();

  } catch(err){
    console.log(err);
    document.getElementById("text").innerText =
      "Gagal memuat data";
  }
}


/* START */
loadData();
