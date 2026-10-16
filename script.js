// ====== EDIT DATA DI SINI ======
const INFO = {
  alamat: "Jl. Kesuma - Sebelah Gg. Amin",
  jam: "Setiap hari, 17.30 – 02.00",
  buka: "17:30",   // jam buka (WIB)
  tutup: "02:00",  // jam tutup (WIB), boleh lewat tengah malam
  wa: "6285375466961",           // format 62xxxxxxxxxx
  mapsUrl: "https://maps.app.goo.gl/Af52yc2byeQeY3GR9" // ganti dengan link Google Maps warung
};
const makanan = [
  ["Ayam Penyet","22K","Tanya dulu"],["Mie Nas","16K"],["Nasi Goreng Kampung","16K"],
  ["Nasi Goreng Pete","15K"],["Nasi Goreng Biasa","13K"],
  ["Mie Goreng / Kuah","13K"],["Kwetiaw Goreng / Kuah","13K"],
  ["Miehun Goreng","13K"],["Indomie Goreng / Kuah","13K"],["Ifu Mie Goreng / Kuah","13K"]
];
const panas = [["Teh Telor","10K"],["Bandrek Telor","10K"],["Ginseng","7K"],["Cappucino","7K"],["Teh Tarik","7K"],["Milo","7K"],["Kopi Hitam","5K"],["Teh Manis","5K"]];
const dingin = [["Cappucino","8K"],["Teh Tarik","8K"],["Kopi Gingseng","8K"],["Milo","8K"],["Teh Es","5K"],["Teh Botol","5K"],["Teh Pucuk","5K"],["Mineral","5K"],["Fanta Susu","8K"],["Aneka Juice","8K","Tanya dulu"]];
// ================================
const render=(id,arr)=>document.getElementById(id).innerHTML=arr.map(([n,p,f])=>`<div class="item"><span>${n}${f?` <em class="tg">${f}</em>`:""}</span><b>${p}</b></div>`).join("");
render("makanan",makanan);render("panas",panas);render("dingin",dingin);
document.getElementById("alamat").textContent=INFO.alamat;
document.getElementById("jam").textContent=INFO.jam;
document.getElementById("wa").textContent="+"+INFO.wa;
document.getElementById("mapBtn").href=INFO.mapsUrl;
const waLink="https://wa.me/"+INFO.wa+"?text="+encodeURIComponent("Halo Warung Lapar Lagi, apakah warung sedang buka dan menu ini masih tersedia? Saya mau pesan: ");
const modal=document.getElementById("modal");
document.getElementById("waBtn").addEventListener("click",e=>{e.preventDefault();modal.classList.add("show")});
document.getElementById("goWa").href=waLink;
document.getElementById("goWa").addEventListener("click",()=>modal.classList.remove("show"));
document.getElementById("closeM").addEventListener("click",()=>modal.classList.remove("show"));
modal.addEventListener("click",e=>{if(e.target===modal)modal.classList.remove("show")});

// ===== Status Buka / Tutup otomatis (zona waktu WIB) =====
function menitSekarangWIB(){
  const p=new Intl.DateTimeFormat("en-GB",{timeZone:"Asia/Jakarta",hour:"2-digit",minute:"2-digit",hour12:false}).formatToParts(new Date());
  return +p.find(x=>x.type==="hour").value%24*60 + +p.find(x=>x.type==="minute").value;
}
function ke(m){return m.split(":").map(Number).reduce((h,mm)=>h*60+mm)}
function jam(m){return m.replace(":",".")}
function updateStatus(){
  const el=document.getElementById("status");
  const now=menitSekarangWIB(),b=ke(INFO.buka),t=ke(INFO.tutup);
  const buka=b<=t ? (now>=b&&now<t) : (now>=b||now<t);
  el.className="status "+(buka?"buka":"tutup");
  el.textContent=buka
    ? "🟢 Buka sekarang · sampai jam "+jam(INFO.tutup)
    : "🔴 Tutup · buka lagi jam "+jam(INFO.buka);
}
updateStatus();
setInterval(updateStatus,60000);
