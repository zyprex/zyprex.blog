"use strict";
if (document.getElementById('nav_toc')) nav_toc_btn.style.display="block";
const debounce = (func, wait)=>{
  let timer = null;
  return (...args)=> {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(()=>{
      clearTimeout(timer);
      timer = null;
      func.apply(null, args);
    }, wait);
  }
}
if (navigator.userAgent.includes('Mobile')) {
  document.querySelectorAll('.md__image').forEach(i=>i.style.width="100%");
}
function getLoadImgDimension(src) {
  let imgObj = new Image();
  imgObj.src = src;
  let imgH = imgObj.height;
  let imgW = imgObj.width;
  return {H:imgH,W:imgW};
}
function isElemScrollin(ele) {
  let screenH = document.documentElement.clientHeight;
  let scrollH = document.documentElement.scrollTop;
  let sTop = ele.offsetTop-scrollH;
  if (sTop > 0 && screenH-sTop > 0) {
    return true;
  }
  return false;
}
window.addEventListener('scroll', debounce(()=>{
  document.querySelectorAll('.md__image').forEach(i=> {
      if (isElemScrollin(i)) {
        let imgNode = document.createElement('img');
        let a = i.querySelector('a');
        imgNode.src = a.href;
        imgNode.alt = a.alt;
        imgNode.title = a.title;
        i.insertBefore(imgNode,i.querySelector('svg'));
        if (a.title !== "") { a.innerText = a.title; }
        imgNode.onload = ()=>{
          let parentW = imgNode.parentNode.offsetWidth;
          let imgSize = getLoadImgDimension(imgNode.src);
          let visualH = imgSize.H*(parentW/imgSize.W);
          imgNode.parentNode.style.height = visualH+54+"px";
        }
        i.classList.remove('md__image');
      }
    })
},1000));
