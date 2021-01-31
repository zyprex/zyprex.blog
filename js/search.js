'use strict';
let gIndx = {};
let gColor = {
  "0":"#FF4D00",
  "categories":"#FF33FC",
  "tags":"#FFCF3E",
  "1":"#3F51B5"
};
fetch('/index.json')
.then(function(res){return res.json();})
.then(function(j) {
  gIndx = j;
  let tlen = 0;
  for (let i in gIndx)
    tlen+=gIndx[i].length;
  console.log(j);
  load_indx.innerHTML = "<big>[ "+tlen+" data ready ]</big>";
});
function fillResult(rx) {
  let ar = [];
  for (let i in gIndx) {
    let lim = 20;
    gIndx[i].forEach(function (cur){
      for (let k in cur) {
        if (lim==0) break;
        let haystack = cur[k];
        if (k=='k') haystack = cur[k].join();
        if (k!='u' && rx.test(haystack)) {
          lim--;
          let mk = haystack.replace(rx,"<mark>$1</mark>");
          ar.push("<dl style='border-color:"
            +gColor[i]+";'><a style='color:"
            +gColor[i]+"' href='"
            +cur.u+"'>"+cur.n+"</a><dt>"+mk+"</dt></dl>");
          break;
        }
      }
    });
  }
  search_result.style.width = searcher.offsetWidth + "px";
  search_result.innerHTML = ar.join("");
}
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
searcher.oninput = debounce(function (){
  if (searcher.value=="") {
    search_result.innerHTML = "";
    return;
  }
  try {
    let rx = RegExp("("+searcher.value+")");
    fillResult(rx);
  } catch(err) {
    return;
  }
},400);
