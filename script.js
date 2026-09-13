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
  try { localStorage.setItem('yh-language', language); } catch { /* Restricted storage does not block the page. */ }
  window.scrollTo({top:y,behavior:'instant'});
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
