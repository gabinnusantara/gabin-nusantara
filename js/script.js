var WA="https://wa.me/628979563274?text=Halo%20Admin%20Gabin!%20Saya%20mau%20tanya%20soal%20menu%20dan%20promo%2C%20ya%20%F0%9F%98%8A";
var WA_NUMBER="628979563274";
var FORM="https://forms.gle/5gQNjAwmwG2b2zfR8";
var FL=[{n:"Es Teler",k:"ES TELER.PNG"},{n:"Es Doger",k:"ES DOGER.PNG"},{n:"Martabak",k:"MARTABAK.PNG"},{n:"Klepon",k:"KLEPON.PNG"},{n:"Jasuke",k:"JASUKE.PNG"}];
function src(k){return "img/"+encodeURIComponent(k)}
function store(k,v){try{if(v===undefined)return localStorage.getItem(k);localStorage.setItem(k,v)}catch(e){return null}}
var fl=document.getElementById("flavors");
FL.forEach(function(f){var d=document.createElement("div");d.className="glass card";
 d.innerHTML='<img src="'+src(f.k)+'" alt="'+f.n+'"><h3>'+f.n+'</h3><p class="price">Rp 13.000</p><a class="btn sm" target="_blank" rel="noopener" href="'+FORM+'">Pesan</a>';fl.appendChild(d)});
var rating=0,sw=document.getElementById("stars");
function drawStars(){sw.innerHTML="";for(var i=1;i<=5;i++){(function(i){var b=document.createElement("button");b.textContent="★";b.setAttribute("aria-label",i+" bintang");if(i<=rating)b.className="on";b.onclick=function(){rating=i;drawStars()};sw.appendChild(b)})(i)}}
drawStars();
var REVIEW_ENDPOINT="https://formspree.io/f/xkjrvjeg"; // GANTI dengan endpoint Formspree-mu
document.getElementById("sendRate").onclick=function(){var n=document.getElementById("rateNote"),btn=this;
 if(!rating){n.textContent="Pilih bintang dulu ya.";return}
 var c=document.getElementById("comment").value.trim();
 btn.disabled=true;n.textContent="Mengirim...";
 fetch(REVIEW_ENDPOINT,{method:"POST",headers:{"Content-Type":"application/json","Accept":"application/json"},
  body:JSON.stringify({bintang:rating+"/5",komentar:c||"(tanpa komentar)",waktu:new Date().toLocaleString("id-ID")})})
 .then(function(r){if(!r.ok)throw new Error("gagal");n.textContent="Terima kasih atas reviewnya! ❤️";rating=0;drawStars();document.getElementById("comment").value=""})
 .catch(function(){n.textContent="Gagal mengirim, coba lagi ya."})
 .then(function(){btn.disabled=false})};
var votes=[10,10];try{var s=JSON.parse(store("votes"));if(s&&s.length===2)votes=s}catch(e){}
function drawVotes(){var t=votes[0]+votes[1];[0,1].forEach(function(i){var p=Math.round(votes[i]/t*100);document.getElementById("p"+i).textContent=p+"%";document.getElementById("b"+i).style.width=p+"%"})}
drawVotes();
if(store("myvote"))document.getElementById("voteNote").textContent="Terima kasih sudah memilih!";
document.querySelectorAll("[data-v]").forEach(function(b){b.onclick=function(){var n=document.getElementById("voteNote");
 if(store("myvote")){n.textContent="Kamu sudah memilih.";return}
 votes[b.dataset.v]++;store("votes",JSON.stringify(votes));store("myvote","1");drawVotes();n.textContent="Terima kasih sudah memilih!"}});
var bg=document.getElementById("burger"),lk=document.getElementById("links");
bg.onclick=function(){var o=lk.classList.toggle("open");bg.setAttribute("aria-expanded",o)};
lk.addEventListener("click",function(e){if(e.target.tagName==="A"){lk.classList.remove("open");bg.setAttribute("aria-expanded","false")}});
