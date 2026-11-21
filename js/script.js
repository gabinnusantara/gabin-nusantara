var WA="https://wa.me/628979563274?text=Halo%20Admin%20Gabin!%20Saya%20mau%20tanya%20soal%20menu%20dan%20promo%2C%20ya%20%F0%9F%98%8A";
var WA_NUMBER="628979563274";
var FORM="https://forms.gle/5gQNjAwmwG2b2zfR8";
var FL=[{n:"Es Teler",k:"ES TELER.png"},{n:"Es Doger",k:"ES DOGER.png"},{n:"Martabak",k:"MARTABAK.png"},{n:"Klepon",k:"KLEPON.png"},{n:"Jasuke",k:"JASUKE.png"}];
function src(k){return "img/"+encodeURIComponent(k)}
function store(k,v){try{if(v===undefined)return localStorage.getItem(k);localStorage.setItem(k,v)}catch(e){return null}}
var fl=document.getElementById("flavors");
FL.forEach(function(f){var d=document.createElement("div");d.className="glass card";
 d.innerHTML='<img src="'+src(f.k)+'" alt="'+f.n+'"><h3>'+f.n+'</h3><p class="price">Rp 13.000</p><a class="btn sm" target="_blank" rel="noopener" href="'+FORM+'">Pesan</a>';fl.appendChild(d)});
var rating=0,sw=document.getElementById("stars");
function drawStars(){sw.innerHTML="";for(var i=1;i<=5;i++){(function(i){var b=document.createElement("button");b.textContent="★";b.setAttribute("aria-label",i+" bintang");if(i<=rating)b.className="on";b.onclick=function(){rating=i;drawStars()};sw.appendChild(b)})(i)}}
drawStars();
// === REVIEW -> GOOGLE SHEETS ===
// Tempel URL Web App Apps Script (berakhiran /exec) di bawah ini:
var REVIEW_ENDPOINT="https://script.google.com/macros/s/AKfycbwii0Y7KfiorCPt15qBiegeF_dXk4BFyk93lZ59qbNuKHbYDeb5Xe66xg4JR1GN1qNz/exec";
var REVIEW_KEY="gabin_reviews",LAST_KEY="gabin_last_send";
function loadReviews(){try{var a=JSON.parse(store(REVIEW_KEY));return Array.isArray(a)?a:[]}catch(e){return[]}}
function drawReviews(){var box=document.getElementById("reviewList");box.innerHTML="";
 loadReviews().forEach(function(r){var d=document.createElement("div");d.className="glass rcard";
  var nm=document.createElement("b");nm.textContent=r.nama;
  var st=document.createElement("div");st.className="rs";st.textContent="\u2605".repeat(r.bintang)+"\u2606".repeat(5-r.bintang);
  d.appendChild(nm);d.appendChild(st);
  if(r.komentar){var p=document.createElement("p");p.textContent="\u201c"+r.komentar+"\u201d";d.appendChild(p)}
  box.appendChild(d)})}
drawReviews();
document.getElementById("sendRate").onclick=function(){var n=document.getElementById("rateNote"),btn=this;
 var nama=document.getElementById("reviewer").value.trim().slice(0,30);
 var c=document.getElementById("comment").value.trim().slice(0,300);
 if(!rating){n.textContent="Pilih bintang dulu ya.";return}
 if(!nama){n.textContent="Isi nama panggilanmu dulu ya.";return}
 if(REVIEW_ENDPOINT.indexOf("https://script.google.com/")!==0){n.textContent="Review belum tersambung ke Google Sheets.";return}
 var last=parseInt(store(LAST_KEY)||"0",10);
 if(Date.now()-last<30000){n.textContent="Tunggu sebentar sebelum kirim lagi ya.";return}
 var data={nama:nama,bintang:rating,komentar:c};
 btn.disabled=true;n.textContent="Mengirim...";
 fetch(REVIEW_ENDPOINT,{method:"POST",mode:"no-cors",headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify(data)})
 .then(function(){
  var list=loadReviews();list.unshift(data);store(REVIEW_KEY,JSON.stringify(list.slice(0,20)));store(LAST_KEY,String(Date.now()));
  drawReviews();n.textContent="Terima kasih atas reviewnya! \u2764\ufe0f";rating=0;drawStars();
  document.getElementById("reviewer").value="";document.getElementById("comment").value=""})
 .catch(function(){n.textContent="Gagal mengirim, coba lagi ya."})
 .then(function(){btn.disabled=false})};
// === VOTE (dihitung di Google Sheets, sama untuk semua device) ===
var votes=[0,0],VOTE_KEY="gabin_myvote";
function drawVotes(){var t=votes[0]+votes[1];[0,1].forEach(function(i){
  var p=t?Math.round(votes[i]/t*100):50;
  document.getElementById("p"+i).textContent=p+"% \u00b7 "+votes[i]+" suara";
  document.getElementById("b"+i).style.width=p+"%"})}
function loadVotes(){
 if(REVIEW_ENDPOINT.indexOf("https://script.google.com/")!==0)return;
 fetch(REVIEW_ENDPOINT).then(function(r){return r.json()}).then(function(d){
  if(d&&d.votes&&d.votes.length===2){votes=[Number(d.votes[0])||0,Number(d.votes[1])||0];drawVotes()}}).catch(function(){})}
drawVotes();loadVotes();
if(store(VOTE_KEY)!==null)document.getElementById("voteNote").textContent="Terima kasih sudah memilih!";
document.querySelectorAll("[data-v]").forEach(function(b){b.onclick=function(){var n=document.getElementById("voteNote"),i=parseInt(b.dataset.v,10);
 if(store(VOTE_KEY)!==null){n.textContent="Kamu sudah memilih.";return}
 if(REVIEW_ENDPOINT.indexOf("https://script.google.com/")!==0){n.textContent="Vote belum tersambung ke Google Sheets.";return}
 n.textContent="Mengirim...";
 fetch(REVIEW_ENDPOINT,{method:"POST",mode:"no-cors",headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify({type:"vote",pilihan:i})})
 .then(function(){store(VOTE_KEY,String(i));votes[i]++;drawVotes();n.textContent="Terima kasih sudah memilih!";setTimeout(loadVotes,2500)})
 .catch(function(){n.textContent="Gagal mengirim, coba lagi ya."})}});
var bg=document.getElementById("burger"),lk=document.getElementById("links");
bg.onclick=function(){var o=lk.classList.toggle("open");bg.setAttribute("aria-expanded",o)};
lk.addEventListener("click",function(e){if(e.target.tagName==="A"){lk.classList.remove("open");bg.setAttribute("aria-expanded","false")}});
