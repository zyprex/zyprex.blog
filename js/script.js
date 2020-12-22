"use strict";
function $(id){return document.getElementById(id);}
const chgTheme = (ele)=> {
  localStorage.setItem('themeVar', theme_var.href = ele.getAttribute('data-src'));
  $('color_mod_btn').querySelectorAll("*").forEach(i=>i.classList.remove('th-btn-a'));
  ele.classList.add('th-btn-a');
}
$('color_mod_btn').querySelectorAll("*").forEach(i=>i.addEventListener('click', function (){chgTheme(this);}));
let navbot = $('nav_bottom');
let navmenu = $('nav_menu');
let navtoc = $('nav_toc') ?? navmenu;
let prevScrollpos = window.pageYOffset;
window.onscroll = ()=> {
  let currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    navbot.style.bottom = 0;
  } else {
    if (navmenu.style.bottom =="0px" || navtoc.style.bottom =="0px") return;
    navbot.style.bottom = "-100%";
  }
  prevScrollpos = currentScrollPos;
}
const flipMove = (ev)=> {
  let xa = ev.clientX;
  let ya = ev.clientY;
  let sh = window.innerHeight;
  let sw = window.screen.availWidth;
  let gap = 10;
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
$('nav_flip_r').onclick = flipMove;
$('nav_flip_l').onclick = flipMove;
const toggleSubNav = (ele,elem)=> {
  let isHide = ele.style.bottom;
  let navbotH = navbot.offsetHeight;
  let toHide = elem.style.bottom;
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
$('nav_menu_btn').onclick = ()=> {toggleSubNav(navmenu,navtoc)};
$('nav_toc_btn').onclick = ()=> {toggleSubNav(navtoc,navmenu)};
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
