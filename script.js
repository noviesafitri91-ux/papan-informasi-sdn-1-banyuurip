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

  // GAMBAR DRIVE
  let gambar = item.gambar || "";
  let match = gambar.match(/\/d\/(.*?)\//);

  if(match){
    gambar = "https://drive.google.com/thumbnail?id=" + match[1] + "&sz=w1600";
  }

  // SET GAMBAR
  const bg = document.getElementById("bg");
  bg.src = gambar;

  // RUNNING TEXT PER GAMBAR
  document.getElementById("text").innerText =
    item.teks || "";

  // NEXT INDEX
  index++;
  if(index >= dataGlobal.length){
    index = 0;
  }
}


/* LOAD DATA */
async function loadData(){

  try{

    const res = await fetch(URL);
    dataGlobal = await res.json();

    console.log("DATA:", dataGlobal);

    // tampil pertama kali
    showSlide();

    // slideshow otomatis
    setInterval(showSlide, 8000);

  } catch(err){
    console.log(err);
    document.getElementById("text").innerText =
      "Gagal memuat data";
  }
}

/* START */
loadData();
