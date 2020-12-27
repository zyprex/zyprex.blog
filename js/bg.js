let isLoaded = false;
function pageReadyCallBack() {
  isLoaded = true;
  if(localStorage.getItem('viewMode')=='2') return;
  if (!bg_img.disabled){
    let bgsrc = bg_img.getAttribute("data-bg");
    document.body.style.backgroundImage = "url("+bgsrc+")";
  }
}
document.addEventListener("DOMContentLoaded", pageReadyCallBack());
document.addEventListener('readystatechange', function(event){
  if (document.readyState === 'complete' && !isLoaded)
    pageReadyCallBack();
});
function viewChg(ele,v) {
  localStorage.setItem('viewMode',v);
  if (v<2) {
    if (!v) {
      bg_img.href = "/css/bgtr.css";
    } else {
      bg_img.href = "/css/bgco.css";
    }
    bg_img.disabled = false;
    let bgsrc = bg_img.getAttribute("data-bg");
    document.body.style.backgroundImage = "url("+bgsrc+")";
  } else if(v==2) {
    bg_img.disabled = true;
    document.body.style.backgroundImage = "";
  }
  view_mod_btn.querySelectorAll("*").forEach(i=>i.classList.remove('th-btn-a'));
  ele.classList.add('th-btn-a');
}
let viBtn = view_mod_btn.querySelectorAll("*");
for (let i=0;i<viBtn.length;i++) {
  viBtn[i].addEventListener('click',function(){viewChg(this,i)});
}
