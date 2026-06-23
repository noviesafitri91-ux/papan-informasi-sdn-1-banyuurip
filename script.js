const URL = "https://script.google.com/macros/s/AKfycbyd3h9ZvUNybp4vKA-7grHeNSvRsWnzWU0UkPwcc2nZE-GWm1XWJuDSbdvSsEfcsJ5oxA/exec";

async function loadData(){

try{

const res = await fetch(URL);
const data = await res.json();

console.log(data);

if(!data || data.length === 0) return;

const item = data[0];

// ambil gambar google drive id
let gambar = item.gambar || "";

// convert /file/d/xxx/view jadi thumbnail
let match = gambar.match(/\/d\/(.*?)\//);

if(match){
  gambar = "https://drive.google.com/thumbnail?id=" + match[1] + "&sz=w1600";
}

document.getElementById("bg").src = gambar;
document.getElementById("text").innerText = item.Running_text || "";

}catch(err){

console.log(err);
document.getElementById("text").innerText = "Gagal load data";

}

}

loadData();
