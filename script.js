'use strict';
// English is preserved in the HTML; Chinese sits beside each editable text node.
const translations = new Map();
document.querySelectorAll('[data-zh]').forEach(element => translations.set(element, {en:element.innerHTML,zh:element.dataset.zh}));
let currentLanguage = 'en';
function getStoredLanguage() { try { return localStorage.getItem('yh-language') === 'zh' ? 'zh' : 'en'; } catch { return 'en'; } }
function setLanguage(language) {
  language = language === 'zh' ? 'zh' : 'en';
  const y = window.scrollY;
  translations.forEach((text,element) => { if(language === 'en') element.innerHTML = text.en; else element.textContent = text.zh; });
  document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
  document.title = language === 'zh' ? '胡云皓 · 安全合规、隐私与自动化' : 'Yunhao Hu · GRC, Privacy & Security';
  const toggle = document.getElementById('language-toggle');
  toggle.textContent = language === 'zh' ? 'EN' : '中文';
  toggle.setAttribute('aria-label', language === 'zh' ? 'Switch to English' : '切换至中文');
  toggle.setAttribute('aria-pressed',String(language === 'zh'));
  currentLanguage = language;
  buildTitleKeys();
  try { localStorage.setItem('yh-language', language); } catch { /* Restricted storage does not block the page. */ }
  window.scrollTo({top:y,behavior:'instant'});
}

// Each stationary hit area contains a moving glyph: motion cannot retrigger itself.
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
function buildTitleKeys() {
  const title = document.querySelector('.hero h1');
  title.setAttribute('aria-label', [...title.querySelectorAll('[data-zh]')].map(line=>line.textContent).join(' '));
  let index = 0;
  title.querySelectorAll('[data-zh]').forEach(line => {
    const text = line.textContent;
    line.replaceChildren();
    line.setAttribute('aria-hidden','true');
    // Preserve whole English words; Chinese can wrap between characters.
    const chunks = currentLanguage === 'zh' ? [...text] : text.split(/(\s+)/);
    chunks.forEach(chunk => {
      if (/^\s+$/.test(chunk)) { line.append(document.createTextNode(chunk)); return; }
      const word = document.createElement('span');
      word.className = 'title-word';
      for (const character of chunk) {
        const key = document.createElement('span');
        key.className = 'title-key';
        key.dataset.key = index++;
        const face = document.createElement('span');
        face.className = 'key-face';
        face.textContent = character;
        key.append(face);
        word.append(key);
      }
      line.append(word);
    });
  });
}
function strikeTitleKey(key) {
  if (motionPreference.matches) return;
  const face = key.querySelector('.key-face');
  face.getAnimations().forEach(animation=>animation.cancel());
  face.animate([
    {transform:'translateY(0) rotateX(0deg)',color:'#f4f0e8',textShadow:'0 0 0 transparent'},
    {transform:'translateY(9px) rotateX(-14deg)',color:'#d4b579',textShadow:'0 -1px 0 #f8e3b4, 0 8px 18px #c5a26033',offset:.17},
    {transform:'translateY(-2px) rotateX(3deg)',color:'#ead4a5',textShadow:'0 0 14px #c5a26022',offset:.52},
    {transform:'translateY(0) rotateX(0deg)',color:'#f4f0e8',textShadow:'0 0 0 transparent'}
  ],{duration:760,easing:'cubic-bezier(.2,.7,.25,1)'});
  const pianoKey = document.querySelectorAll('.white-key-face')[Number(key.dataset.key)%14];
  pianoKey.getAnimations().forEach(animation=>animation.cancel());
  pianoKey.animate([{transform:'none',filter:'brightness(1)'},{transform:'translateY(5px)',filter:'brightness(.72)',offset:.18},{transform:'none',filter:'brightness(1)'}],{duration:650,easing:'ease-out'});
}
let lastTitleKey = null;
const titleSurface = document.querySelector('.hero h1');
titleSurface.addEventListener('pointermove',event=>{
  const key = event.target.closest('.title-key');
  if(key && key!==lastTitleKey) strikeTitleKey(key);
  lastTitleKey = key;
});
titleSurface.addEventListener('pointerleave',()=>{lastTitleKey=null;});
titleSurface.addEventListener('pointerdown',event=>{const key=event.target.closest('.title-key');if(key)strikeTitleKey(key);});
motionPreference.addEventListener('change',()=>{if(motionPreference.matches) document.getAnimations().forEach(animation=>animation.cancel());});
if ('IntersectionObserver' in window) {
  const entrances = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      if (!motionPreference.matches) entry.target.classList.add('played');
      entrances.unobserve(entry.target);
    });
  }, {threshold:0.12});
  document.querySelectorAll('.timeline article,.project,.experience-detail,.education article,.capabilities article,.honors,.contact,#capabilities h2,#credentials h2').forEach((element,index) => {
    element.style.setProperty('--phrase-delay', (index % 3) * 70 + 'ms');
    entrances.observe(element);
  });
  const heroVisibility = new IntersectionObserver(entries => {
    document.documentElement.classList.toggle('hero-away', !entries[0].isIntersecting);
  });
  heroVisibility.observe(document.getElementById('home'));
}
document.documentElement.classList.add('js-ready');
const languageToggle = document.getElementById('language-toggle');
languageToggle.hidden = false;
languageToggle.addEventListener('click',() => setLanguage(currentLanguage === 'en' ? 'zh' : 'en'));
setLanguage(getStoredLanguage());
const menu = document.getElementById('menu-toggle');
const nav = document.getElementById('site-nav');
menu.hidden = false;
function closeMenu(){ nav.classList.remove('is-open'); menu.setAttribute('aria-expanded','false'); }
menu.addEventListener('click',()=>{ const open=nav.classList.toggle('is-open'); menu.setAttribute('aria-expanded',String(open)); });
nav.addEventListener('click',event=>{if(event.target.closest('a'))closeMenu();});
document.addEventListener('keydown',event=>{if(event.key==='Escape' && nav.classList.contains('is-open')){closeMenu();menu.focus();}});
if('IntersectionObserver' in window){
  const links = [...nav.querySelectorAll('a')];
  const observer = new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){links.forEach(link=>{if(link.hash==='#'+entry.target.id)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');});}});},{rootMargin:'-15% 0px -55% 0px'});
  document.querySelectorAll('main > section').forEach(section=>observer.observe(section));
}
