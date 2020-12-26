setTimeout(function(){
  let pTh = localStorage.getItem('themeVar');
  theme_var.href = pTh === null ? "/css/dark.css" : pTh;
},0);
