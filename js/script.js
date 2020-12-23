"use strict";
function chgTheme(ele){
  localStorage.setItem('themeVar', theme_var.href = ele.getAttribute('data-src'));
  color_mod_btn.querySelectorAll("*").forEach(i=>i.classList.remove('th-btn-a'));
  ele.classList.add('th-btn-a');
}
color_mod_btn.querySelectorAll("*").forEach(i=>i.addEventListener('click', function (){chgTheme(this);}));
let prevScrollpos = window.pageYOffset;
window.onscroll = function(){
  let currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    nav_bottom.style.bottom = 0;
  } else {
    if (nav_menu.style.bottom =="0px" ||
         document.getElementById('nav_toc') && nav_toc.style.bottom =="0px")
      return;
    nav_bottom.style.bottom = "-100%";
  }
  prevScrollpos = currentScrollPos;
}
function flipMove(ev) {
  let xa = ev.clientX;
  let ya = ev.clientY;
  let sh = window.innerHeight;
  let sw = window.screen.availWidth;
  let gap = 15;
  let gap_ex = 50;
  if (xa < gap || xa > sw-gap) {
    if (ya<gap_ex) {
      window.scroll(0,0);
      return;
    } else if (sh-ya<gap_ex) {
      window.scroll(0,document.body.scrollHeight);
      return;
    }
    if (ya<sh/2) {
      window.scrollBy({top: -sh,behavior:'smooth'});
    } else {
      window.scrollBy({top:  sh,behavior:'smooth'});
    }
  }
}
nav_flip_r.onclick = flipMove;
nav_flip_l.onclick = flipMove;
function toggleSubNav(ele,elem){
  let isHide = ele.style.bottom;
  let toHide = elem.style.bottom;
  let navbotH = nav_bottom.offsetHeight;
  if (toHide == "0px") {
    elem.style.bottom = "-100%";
  }
  if (isHide != "0px") {
    ele.style.paddingBottom = navbotH+"px";
    ele.style.bottom = "0px";
  } else {
    ele.style.bottom = "-100%";
  }
}
nav_menu_btn.onclick = function(){
  if (document.getElementById('nav_toc')) {
    toggleSubNav(nav_menu,nav_toc);
  } else {
    toggleSubNav(nav_menu,nav_menu);
  }
}
nav_toc_btn.onclick = function(){toggleSubNav(nav_toc,nav_menu);}
function previewbgImg(ele,src) {
  let s = src;
  if (!s) {
    s = bg_img.getAttribute('data-bg');
    if (!s) {
       return;
    }
  }
  ele.style.backgroundImage='url('+s+')';
  ele.style.backgroundSize='cover';
}
