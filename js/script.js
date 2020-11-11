'use strict';
/* 
 * loc@ ../../layouts/partials/header.html
 */
function sidebar_open(id) {
  let sb = document.getElementById(id);
  let sbn = sb.className
  let drt = sbn.substr(-1); // left or right
  let b_class = sbn.indexOf(' ')!=-1 ?
    sbn.slice(0,sbn.indexOf(' ')-1) : sbn.slice(0,-1);
  //pad.innerText = 1;
  if (sbn.indexOf('pull',8) != -1 ) {
    sb.className = b_class + drt + " ani-push-" + drt;
  } else if (sbn.indexOf('push',8) != -1 ) {
    sb.className = b_class + drt + " ani-pull-" + drt;
  } else {
    sb.className = b_class + drt + " ani-pull-" + drt;
  }
}

/* https://radu-matei.com/blog/dark-mode/
 * loc@ ../../layouts/partials/header.html
 * */
let toggleTheme = document.getElementById("dark-mode-toggle");
let darkTheme = document.getElementById("dark-mode-theme");
toggleTheme.onclick = function () {
    if (toggleTheme.className === "light-theme") {
      setTheme("dark");
    } else if (toggleTheme.className === "dark-theme")  {
      setTheme("light");
    }
  }
function setTheme(mode) {
  if (mode === "dark") {
    darkTheme.disabled = false;
    toggleTheme.className = "dark-theme";
    toggleTheme.innerText = "🔆";
  } else if (mode === "light") {
    darkTheme.disabled = true;
    toggleTheme.className = "light-theme";
    toggleTheme.innerText = "🌙";
  }
  localStorage.setItem("dark-mode-storage",mode);
}
if(window.localStorage){
  // default dark mode
  let savedTheme = localStorage.getItem("dark-mode-storage") || "dark";
  setTheme(savedTheme);
}

/*
 * loc@ none
<!-- <span id="sitetime" style="font-size:80%;font-weight:700;"></span> -->
 * */
/*
function siteTime() {
  window.setTimeout("siteTime()", 1000);
  var seconds = 1000;
  var minutes = seconds * 60;
  var hours = minutes * 60;
  var days = hours * 24;
  var years = days * 365;
  var today = new Date();
  var todayYear = today.getFullYear();
  var todayMonth = today.getMonth() + 1;
  var todayDate = today.getDate();
  var todayHour = today.getHours();
  var todayMinute = today.getMinutes();
  var todaySecond = today.getSeconds();

  var t1 = Date.UTC(2020, 07, 15, 00, 00, 00); 
  var t2 = Date.UTC(todayYear, todayMonth, todayDate, todayHour, todayMinute, todaySecond);
  var diff = t2 - t1;
  var diffYears = Math.floor(diff / years);
  var diffDays = Math.floor((diff / days) - diffYears * 365);
  var diffHours = Math.floor((diff - (diffYears * 365 + diffDays) * days) / hours);
  var diffMinutes = Math.floor((diff - (diffYears * 365 + diffDays) * days - diffHours * hours) / minutes);
  var diffSeconds = Math.floor((diff - (diffYears * 365 + diffDays) * days - diffHours * hours - diffMinutes * minutes) / seconds);
  document.getElementById("sitetime").innerHTML = " uptime: " +   diffDays + " d " + diffHours + " h " + diffMinutes + " m " + diffSeconds + " s";
}
siteTime();
*/

