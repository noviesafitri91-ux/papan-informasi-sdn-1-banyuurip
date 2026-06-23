const URL = "https://script.google.com/macros/s/AKfycbxbBwiVfevQU9YKw-EE_7sN800WfkWFD61dBs69IKdLUX-hPl6y7kBkjtWprIjMkK3pTA/exec";

let dataGlobal = [];
let index = 0;
let timer = null;

/* JAM */
function updateClock(){
  const now = new Date();
  document.getElementById("clock").innerText =
    now.toLocaleDateString("id-ID") + " | " +
    now.toLocaleTimeString("id-ID");
}
setInterval(updateClock, 1000);
updateClock();


/* SLIDE PROFESIONAL */
function showSlide(){

  if(!dataGlobal || dataGlobal.length === 0) return;

  const item = dataGlobal[index];

  const bg = document.getElementById("bg");
  const textEl = document.getElementById("text");

  // FADE OUT
  bg.style.opacity = 0;

  setTimeout(() => {

    let gambar = item.gambar || "";
    let match = gambar.match(/\/d\/(.*?)\//);

    if(match){
      gambar = "https://drive.google.com/thumbnail?id=" + match[1] + "&sz=w1600";
    }

    bg.src = gambar;

    // FADE IN
    bg.style.opacity = 1;

    // TEXT
    textEl.innerText = item.teks || "";

    // reset animasi biar smooth
    textEl.style.animation = "none";
    void textEl.offsetWidth;
    textEl.style.animation = "marquee 20s linear infinite";

    // NEXT
    index++;
    if(index >= dataGlobal.length){
      index = 0;
    }

    // durasi stabil profesional
    const durasi = 15000;

    clearTimeout(timer);
    timer = setTimeout(showSlide, durasi);

  }, 700);
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

loadData();
