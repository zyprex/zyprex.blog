'use strict';
function debounce(fn,wait) {
  let timer=null;
  return function(...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(function (){
      clearTimeout(timer);
      timer = null;
      fn.apply(null, args);
    }, wait);
  };
}
function isElemScrollin(ele) {
  let vH = document.documentElement.clientHeight,
  rH = document.documentElement.scrollTop;
  let vY = ele.offsetTop - rH;
  return (vY > 0 && vH - vY > 0);
}
function lazyLoadImg() {
  document.querySelectorAll('.md__image').forEach(function (i) {
    if(!isElemScrollin(i)) return;
    if (i.querySelector('img')) return;
    let imgNode = document.createElement('img');
    let a = i.querySelector('a');
    imgNode.src = a.href;
    imgNode.alt = a.alt??'';
    imgNode.title = a.title??a.href;
    if (a.title) a.innerText = a.title;
    i.insertBefore(imgNode,i.querySelector('label'));
  });
}
function simulateScroll(where) {
  let vH = window.innerHeight;
  switch (where) {
    case "T": window.scroll(0,0); break;
    case "B": window.scroll(0,document.body.scrollHeight);  break;
    case "U": window.scrollBy({top:-vH,behavior:'smooth'}); break;
    case "D": window.scrollBy({top: vH,behavior:'smooth'}); break;
    default: break;
  }
}
function selectElemTxt(ele) {
  if (document.body.createTextRange) {
    const range = document.body.createTextRange();
    range.moveToElementText(ele);
    range.select();
  } else if (window.getSelection) {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(ele);
    selection.removeAllRanges();
    selection.addRange(range);
  } else {
    console.warn("Could not select text in node: Unsupported browser.");
  }
}
function touchAct(e) {
  let th = e.touches,
   vX = th[0].clientX,
   vY = th[0].clientY,
   vH = window.screen.availHeight,
   vW = window.screen.availWidth,
   mW = 45;
  if ( th[0].target.tagName == "PRE" && th.length > 2  ) {
    selectElemTxt(th[0].target);
    document.execCommand("copy");
    return;
  }
  if (th[0].target.tagName != "BODY") return;
  if (vX > mW && vX < vW-mW) return;
  if (vY < vH/2) {
    if (vY < vH/8) {
      simulateScroll("T");
    } else {
      simulateScroll("U");
    }
  } else {
    if (vY > vH*7/8) {
      simulateScroll("B");
    } else {
      simulateScroll("D");
    }
  }
}
function throttle(fn, wait) {
  let last = 0;
  return function (...args) {
    let now = Date.now();
    if (now-last < wait) return;
    last = Date.now();
    fn.apply(null, args);
  }
}
function showJmpball(fn,args,posX,posY,Txt) {
  let ele = document.createElement("div");
  ele.id = "jmpball";
  ele.className = "jmpball";
  ele.style.left = posX-25+"px";
  ele.style.top = posY-25+"px";
  ele.innerText = Txt;
  ele.onclick = function(){
    let y = window.scrollY;
    fn(args);
    this.innerText = "Back"
    this.onclick = function(){
      window.scroll(0,y);
    };
  };
  document.body.appendChild(ele);
}
function hideJmpball() {
  document.getElementById('jmpball').remove();
}
let gMvPath = [], gTimer = null;
function swipeAct(e) {
  let vX = e.touches[0].clientX;
  let vY = e.touches[0].clientY;
  gMvPath.push(vY);
  gTimer = setTimeout(function(){
    /*"long drag linger!"*/
    if (!document.getElementById("jmpball")) {
      let d = gMvPath[0] - gMvPath[gMvPath.length-1];
      if (d > 0) {
        showJmpball(simulateScroll,"B",vX,vY-50,"Bot");
      } else if (d < 0) {
        showJmpball(simulateScroll,"T",vX,vY,"Top");
      } else {
        return;
      }
      setTimeout(hideJmpball,3000);
    }
    clearTimeout(gTimer);
  },1500);
}
function detachAct(e) {
  gMvPath = [];
  clearTimeout(gTimer);
}
function wrapElem(q,cls,paren) {
  let p = document.querySelector(paren);
  document.querySelectorAll(q).forEach(function (c){
    let wrap = document.createElement("div");
    wrap.className = cls;
    p.insertBefore(wrap,c);
    wrap.appendChild(c);
  });
}
(function() {
  wrapElem('#C>table','table-wrap','#C');
  wrapElem('#C>pre','code-wrap','#C');
  document.querySelectorAll(".code-wrap,.highlight").forEach(function(c){
    let cpBtn = document.createElement("button");
    cpBtn.className = "cp-btn";
    cpBtn.innerHTML= "copy";
    cpBtn.onclick = function () {
      let cp = this.previousSibling;
      if (cp.className=="chroma") {
        let cpN = cp.querySelector("pre>code[data-lang]");
        cp = cpN;
      }
      selectElemTxt(cp);
      document.execCommand("copy");
      this.innerHTML= "copied";
    }
    c.appendChild(cpBtn);
  });
  lazyLoadImg();
  window.addEventListener('scroll', debounce(lazyLoadImg, 1000));
  if (navigator.userAgent.includes('Mobile')) {
    if (document.documentElement.offsetHeight > document.documentElement.clientHeight) {
      window.addEventListener('touchstart',touchAct);
      window.addEventListener('touchmove',throttle(swipeAct,400));
      window.addEventListener('touchend',detachAct);
    }
  }
})();
