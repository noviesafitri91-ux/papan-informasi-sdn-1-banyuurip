document.addEventListener("DOMContentLoaded", loadData);

async function loadData() {
  try {
    const res = await fetch("URL_APPS_SCRIPT_KAMU");
    const data = await res.json();

    console.log("DATA:", data);

    if (!data || data.length === 0) return;

    const item = data[0];

    // GANTI LINK DRIVE MENJADI LINK GAMBAR LANGSUNG
    let gambar = item.gambar || "";

    gambar = gambar.replace(
      /https:\/\/drive\.google\.com\/file\/d\/(.*?)\/view.*/,
      "https://drive.google.com/thumbnail?id=$1&sz=w1600"
    );

    document.getElementById("bg").src = gambar;

    document.getElementById("textIsi").textContent =
      item.judul || "";
  } catch (e) {
    console.error(e);
  }
}
