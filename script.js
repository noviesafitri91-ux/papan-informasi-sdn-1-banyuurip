const URL = "https://script.google.com/macros/s/AKfycbxbBwiVfevQU9YKw-EE_7sN800WfkWFD61dBs69IKdLUX-hPl6y7kBkjtWprIjMkK3pTA/exec";

let index = 0;
let dataGlobal = [];

document.addEventListener("DOMContentLoaded", function(){

  function updateClock(){
    const now = new Date();

    const waktu = now.toLocaleTimeString("id-ID");
    const tanggal = now.toLocaleDateString("id-ID");

    const el = document.getElementById("clock");

    if(el){
      el.innerText = tanggal + " | " + waktu;
    }
  }

  updateClock();
  setInterval(updateClock, 1000);

});

/* TAMPIL DATA */
function showData(){

  if(dataGlobal.length === 0) return;

  const item = dataGlobal[index];

  // GAMBAR
  let gambar = item.gambar || "";
  let match = gambar.match(/\/d\/(.*?)\//);

  if(match){
    gambar = "https://drive.google.com/thumbnail?id=" + match[1] + "&sz=w1600";
  }

  document.getElementById("bg").src = gambar;

  // RUNNING TEXT
  document.getElementById("text").innerText =
    item.teks || "";

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

    showData();

    setInterval(showData, 10000);

  } catch(err){
    console.log(err);
    document.getElementById("text").innerText =
      "Gagal load data";
  }
}


/* START */
loadData();
