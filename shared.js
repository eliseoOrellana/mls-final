(function(){
'use strict';

// ── THEME ───────────────────────────────────────────────────────────
var THEME_KEY='mls-theme';
function applyTheme(t){
  if(t==='light'){document.body.classList.add('light');}
  else{document.body.classList.remove('light');}
  localStorage.setItem(THEME_KEY,t);
}
function getTheme(){return localStorage.getItem(THEME_KEY)||'dark';}
function toggleTheme(){applyTheme(document.body.classList.contains('light')?'dark':'light');}

// apply immediately before render to avoid flash
applyTheme(getTheme());

// ── DOM READY ────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded',function(){

  // Theme buttons (desktop + mobile)
  document.querySelectorAll('.theme-toggle').forEach(function(btn){
    btn.addEventListener('click',toggleTheme);
  });

  // ── PRELOADER ──────────────────────────────────────────────────────
  window.addEventListener('load',function(){
    setTimeout(function(){
      var p=document.getElementById('pre');
      if(p)p.classList.add('out');
    },900);
  });

  // ── NAV STICKY ────────────────────────────────────────────────────
  var nav=document.getElementById('nav');
  function updateNav(){
    if(nav)nav.classList.toggle('solid',window.scrollY>20);
  }
  window.addEventListener('scroll',updateNav,{passive:true});
  updateNav();

  // ── MOBILE MENU ───────────────────────────────────────────────────
  var mobNav=document.getElementById('mobNav');
  window.toggleMob=function(){
    if(mobNav)mobNav.classList.toggle('open');
  };
  window.closeMob=function(){
    if(mobNav)mobNav.classList.remove('open');
  };

  // ── SMOOTH SCROLL ─────────────────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(function(a){
    a.addEventListener('click',function(e){
      var id=this.getAttribute('href');
      if(id.length>1){
        var t=document.querySelector(id);
        if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth'});window.closeMob();}
      }
    });
  });

  // ── REVEAL ON SCROLL ──────────────────────────────────────────────
  var ro=new IntersectionObserver(function(entries){
    entries.forEach(function(e){if(e.isIntersecting)e.target.classList.add('in');});
  },{threshold:0.08});
  document.querySelectorAll('.rv').forEach(function(el){ro.observe(el);});

  // ── FAQ ACCORDION ─────────────────────────────────────────────────
  document.querySelectorAll('.fq').forEach(function(el){
    el.addEventListener('click',function(){
      var item=this.parentElement;
      var wasOpen=item.classList.contains('open');
      document.querySelectorAll('.fi').forEach(function(i){i.classList.remove('open');});
      if(!wasOpen)item.classList.add('open');
    });
  });

  // ── PRICING TOGGLE ────────────────────────────────────────────────
  var isAnnual=false;
  var togT=document.getElementById('togT');
  if(togT){
    togT.addEventListener('click',function(){
      isAnnual=!isAnnual;
      togT.classList.toggle('on',isAnnual);
      document.querySelectorAll('.pamt').forEach(function(el){
        el.textContent=isAnnual?el.dataset.a:el.dataset.m;
      });
    });
  }

  // ── ACTIVE NAV LINK ───────────────────────────────────────────────
  var pg=window.location.pathname.split('/').pop()||'index.html';
  document.querySelectorAll('.nl').forEach(function(a){
    if(a.getAttribute('href')===pg){a.classList.add('act');}
  });
  document.querySelectorAll('.mob-nav a').forEach(function(a){
    if(a.getAttribute('href')===pg){a.classList.add('mob-act');}
  });

  // ── COUNTER ANIMATION ─────────────────────────────────────────────
  document.querySelectorAll('.count').forEach(function(el){
    var target=parseInt(el.dataset.target)||0;
    var duration=1800;
    var start=null;
    var obs=new IntersectionObserver(function(entries){
      if(entries[0].isIntersecting){
        function step(ts){
          if(!start)start=ts;
          var progress=Math.min((ts-start)/duration,1);
          var ease=1-Math.pow(1-progress,3);
          el.textContent=Math.floor(ease*target).toLocaleString();
          if(progress<1)requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
        obs.disconnect();
      }
    },{threshold:.5});
    obs.observe(el);
  });

  // ── TYPING EFFECT ─────────────────────────────────────────────────
  var typer=document.getElementById('typer');
  if(typer){
    var words=['pedidos','equipos','ventas','turnos'];
    var wi=0,ci=0,deleting=false;
    function type(){
      var w=words[wi];
      if(!deleting){
        typer.textContent=w.slice(0,ci+1);
        ci++;
        if(ci===w.length){deleting=true;setTimeout(type,1800);return;}
      } else {
        typer.textContent=w.slice(0,ci-1);
        ci--;
        if(ci===0){deleting=false;wi=(wi+1)%words.length;}
      }
      setTimeout(type,deleting?55:85);
    }
    setTimeout(type,1200);
  }

  var toggle = document.getElementById("menu-toggle");
var mobNav = document.getElementById("mobNav");

if (toggle && mobNav) {
  toggle.addEventListener("change", function () {
    mobNav.classList.toggle("open", toggle.checked);
    document.body.style.overflow = toggle.checked ? "hidden" : "";
  });

  window.closeMob = function () {
    toggle.checked = false;
    mobNav.classList.remove("open");
    document.body.style.overflow = "";
  };
}

});
})();
