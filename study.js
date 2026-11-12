'use strict';

const $ = selector => document.querySelector(selector);
const stage = $('#stage');
const dialog = $('#dialog');
const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
const phaseDuration = 6500;
let reduced = motionPreference.matches;
let topicIndex = -1;
let phaseIndex = 0;
let elapsed = 0;
let playing = !reduced;
let transitionRequest = 0;

const pageLabel = pages => `Apostila · p. ${pages}`;
const chapterStart = index => topics.findIndex(topic=>topic.chapter===index);

function coverMarkup() {
  return `<section class="cover"><div class="cover-content"><p class="eyebrow">Pilares da Fé · Módulo 1</p><h1>Plano de<br><em>Redenção</em></h1><p class="cover-intro">Meu entendimento sobre a necessidade de salvação, a obra de Cristo e a transformação da vida cristã.</p><div class="cover-actions"><button class="primary" data-topic="1">Começar apresentação →</button><button data-index>Ver os tópicos</button></div><nav class="cover-topics" aria-label="Capítulos da apostila">${chapters.map((chapter,i)=>`<button data-topic="${chapterStart(i)}"><span>0${i+1}</span>${esc(chapter.name)}</button>`).join('')}</nav><p class="page-note">Resumo em palavras próprias · ${pageLabel('3–17')}</p></div></section>`;
}

function endingMarkup(topic) {
  return `<section class="ending"><p class="eyebrow">Experiência interativa</p><h2>${esc(topic.title)}</h2><p class="summary">${esc(topic.summary)}</p><div class="game-route">${['Criação','Queda','Sentença','Espinhos','Cruz','Redenção'].map((word,i)=>`<div><span>0${i+1}</span>${word}</div>`).join('')}</div><p class="page-note">Cenários simbólicos · baseados no estudo da apostila.</p><a class="primary" href="jogo/index.html">Entrar no jogo →</a> <button data-topic="0">Voltar ao início ↺</button></section>`;
}

function pointsMarkup(topic) {
  return `<div class="point-list" role="group" aria-label="Pontos do resumo">${topic.points.map((point,i)=>`<button class="point" data-phase="${i}" aria-pressed="${i===0}" aria-controls="concept-panel"><span class="point-number">0${i+1}</span><span><strong>${esc(point.title)}</strong><span class="point-text">${esc(point.text)}</span><small class="point-page">p. ${esc(point.pages||topic.pages)}</small></span></button>`).join('')}</div>`;
}

function lessonMarkup(topic) {
  const chapter = chapters[topic.chapter];
  const verse = topic.verse ? `<button class="verse-link" data-verse="${topic.verse}">${esc(verses[topic.verse][0])} ↗</button>` : '';
  return `<section class="lesson"><header class="lesson-heading"><p class="eyebrow">0${topic.chapter+1} · ${esc(chapter.name)}</p><h2>${esc(topic.title)}</h2></header><div class="lesson-grid"><div class="reading"><div class="summary-block"><span class="summary-label">O que entendi</span><p class="summary">${esc(topic.summary)}</p></div>${pointsMarkup(topic)}<div class="reading-footer"><p class="page-note">${pageLabel(topic.pages)}</p>${verse}</div></div><section class="visual-panel" id="concept-panel" aria-label="Conceitos do tópico"><div class="visual-meta"><span id="concept-name">${esc(topic.points[0].title)}</span><span id="phase-counter">01 / ${String(topic.points.length).padStart(2,'0')}</span></div>${conceptMarkup(topic)}<div class="motion-track" aria-hidden="true">${topic.points.map(()=>'<span><i></i></span>').join('')}</div><div class="motion-controls"><button id="play" aria-label="Pausar animação">Ⅱ Pausar</button><button id="replay" aria-label="Repetir animação">↺ Repetir</button><button id="next-phase" aria-label="Próximo conceito">Próximo conceito →</button></div><p class="motion-note">Selecione um ponto do resumo para destacar o conceito.</p></section></div></section>`;
}

function renderTopic() {
  const topic = topics[topicIndex];
  phaseIndex = 0;
  elapsed = 0;
  playing = !reduced && Boolean(topic.points);
  stage.innerHTML = topic.cover ? coverMarkup() : topic.ending ? endingMarkup(topic) : lessonMarkup(topic);
  if (topic.points) {
    // Resolve the starting layout once so a diagram can animate its first change of state.
    void $('.diagram').offsetWidth;
    setPhase(0,false);
  }
  $('#counter').textContent = `${String(topicIndex+1).padStart(2,'0')} / ${topics.length}`;
  $('#chapter').textContent = topic.chapter===undefined ? 'Plano de Redenção' : chapters[topic.chapter].short;
  $('#prev').disabled = topicIndex===0;
  $('#next').disabled = topicIndex===topics.length-1;
  $('#deck-progress').style.width = `${(topicIndex+1)/topics.length*100}%`;
  $('#chapters').innerHTML = chapters.map((chapter,i)=>`<button data-topic="${chapterStart(i)}" aria-current="${i===topic.chapter}" aria-label="Capítulo ${i+1}: ${esc(chapter.name)}">0${i+1} · ${esc(chapter.short)}</button>`).join('');
  document.title = `${topic.title} · Pilares da Fé`;
  $('#announcement').textContent = `Tela ${topicIndex+1} de ${topics.length}. ${topic.title}${topic.pages?'. '+pageLabel(topic.pages):''}`;
}

function setPhase(index,manual=true) {
  const topic = topics[topicIndex];
  if (!topic?.points) return;
  phaseIndex = Math.max(0,Math.min(topic.points.length-1,index));
  elapsed = 0;
  if (manual) playing = false;
  const diagram = $('.diagram');
  const point = topic.points[phaseIndex];
  diagram.dataset.phase = String(phaseIndex);
  diagram.style.setProperty('--progress',phaseIndex/Math.max(1,topic.points.length-1));
  diagram.setAttribute('aria-label',`${point.title}. ${point.text}`);
  diagram.querySelectorAll('[data-at]').forEach(element=>{
    const at=Number(element.dataset.at);
    element.classList.toggle('is-reached',at<=phaseIndex);
    element.classList.toggle('is-current',at===phaseIndex);
  });
  diagram.querySelectorAll('[data-only]').forEach(element=>{
    const current=Number(element.dataset.only)===phaseIndex;
    element.classList.toggle('is-current',current);
    element.setAttribute('aria-hidden',String(!current));
  });
  document.querySelectorAll('.point').forEach((button,i)=>button.setAttribute('aria-pressed',String(i===phaseIndex)));
  $('#concept-name').textContent=point.title;
  $('#phase-counter').textContent=`${String(phaseIndex+1).padStart(2,'0')} / ${String(topic.points.length).padStart(2,'0')}`;
  if(manual) $('#announcement').textContent=`${point.title}. ${point.text} ${pageLabel(point.pages||topic.pages)}`;
  updatePlayback();
}

function updatePlayback() {
  const topic = topics[topicIndex];
  if(!topic?.points || !$('#play')) return;
  const ended=phaseIndex===topic.points.length-1 && elapsed>=phaseDuration;
  $('#play').textContent=ended?'▷ Rever':playing?'Ⅱ Pausar':'▷ Reproduzir';
  $('#play').setAttribute('aria-label',ended?'Rever animação':playing?'Pausar animação':'Reproduzir animação');
  $('#next-phase').disabled=phaseIndex===topic.points.length-1;
  document.querySelectorAll('.motion-track i').forEach((bar,i)=>bar.style.width=`${i<phaseIndex?100:i===phaseIndex?Math.min(100,elapsed/phaseDuration*100):0}%`);
}

function readHash() {
  const value=Number(location.hash.slice(1));
  return Number.isInteger(value)&&value>=1&&value<=topics.length ? value-1 : 0;
}

function navigate(index) {
  const target=Math.max(0,Math.min(topics.length-1,index));
  if(dialog.open) dialog.close();
  if(target!==topicIndex) location.hash=String(target+1);
}

async function animate(element,keyframes,options) {
  if(!element?.animate || reduced) return;
  try { await element.animate(keyframes,options).finished; } catch { /* Navigation cancelled an older animation. */ }
}

async function changeTopic() {
  const next=readHash();
  if(next===topicIndex) return;
  const request=++transitionRequest;
  const direction=next>topicIndex?1:-1;
  playing=false;
  stage.getAnimations().forEach(animation=>animation.cancel());
  if(topicIndex>=0) await animate(stage,[{opacity:1,transform:'translateX(0)'},{opacity:0,transform:`translateX(${-12*direction}px)`}],{duration:150,easing:'ease-in',fill:'forwards'});
  if(request!==transitionRequest) return;
  stage.getAnimations().forEach(animation=>animation.cancel());
  topicIndex=next;
  renderTopic();
  window.scrollTo(0,0);
  stage.focus({preventScroll:true});
  await animate(stage,[{opacity:0,transform:`translateX(${16*direction}px)`},{opacity:1,transform:'translateX(0)'}],{duration:350,easing:'cubic-bezier(.2,.7,.2,1)'});
}

function openDialog(title,body) {
  $('#dialog-content').innerHTML=`<h2 id="dialog-title">${esc(title)}</h2>${body}`;
  dialog.showModal();
  dialog.scrollTop=0;
}

function indexButton(topic,i) {
  return `<button data-topic="${i}"><span>${String(i+1).padStart(2,'0')}</span><div>${esc(topic.title)}${topic.pages?`<small>p. ${esc(topic.pages)}</small>`:''}</div></button>`;
}

function openIndex() {
  const sections=chapters.map((chapter,chapterIndex)=>`<h3>0${chapterIndex+1} · ${esc(chapter.name)}</h3><div class="index-list">${topics.map((topic,i)=>topic.chapter===chapterIndex?indexButton(topic,i):'').join('')}</div>`).join('');
  openDialog('Tópicos da apostila',`<div class="index-list">${indexButton(topics[0],0)}</div>${sections}<h3>Próxima etapa</h3><div class="index-list">${indexButton(topics.at(-1),topics.length-1)}</div>`);
}

function setReduced(value) {
  reduced=value;
  document.body.classList.toggle('reduced',reduced);
  $('#motion').setAttribute('aria-pressed',String(reduced));
  $('#motion').textContent=reduced?'Ativar movimento':'Pausar movimento';
  $('#motion').title=reduced?'Ativar a reprodução automática':'Pausar a reprodução automática';
  if(reduced) document.getAnimations().forEach(animation=>{try { animation.finish(); } catch { animation.cancel(); }});
  playing=!reduced&&Boolean(topics[topicIndex]?.points);
  if(playing) setPhase(0,false);
  updatePlayback();
}

document.addEventListener('click',event=>{
  const button=event.target.closest('button');
  if(!button) return;
  if(button.hasAttribute('data-topic')) navigate(Number(button.dataset.topic));
  if(button.hasAttribute('data-index')) openIndex();
  if(button.hasAttribute('data-phase')) {
    setPhase(Number(button.dataset.phase),true);
    if(window.innerWidth<=760) $('#concept-panel').scrollIntoView({behavior:reduced?'auto':'smooth',block:'start'});
  }
  if(button.hasAttribute('data-verse')) {
    const [reference,text]=verses[button.dataset.verse];
    const topic=topics[topicIndex];
    openDialog(reference,`<blockquote>“${esc(text)}”<cite>${esc(reference)} · NAA</cite></blockquote><p class="page-note">Versículo citado na apostila · p. ${esc(topic.versePages||topic.pages)}.</p>`);
  }
  if(button.id==='play') {
    const topic=topics[topicIndex];
    if(phaseIndex===topic.points.length-1 && elapsed>=phaseDuration) setPhase(0,false);
    playing=!playing;
    updatePlayback();
  }
  if(button.id==='replay') {
    const diagram=$('.diagram');
    diagram.dataset.phase='-1';
    diagram.querySelectorAll('[data-at],[data-only]').forEach(element=>element.classList.remove('is-reached','is-current'));
    diagram.style.setProperty('--progress','0');
    void diagram.offsetWidth;
    setPhase(0,false);
    playing=!reduced;
    updatePlayback();
  }
  if(button.id==='next-phase') setPhase(phaseIndex+1,true);
});

$('#index').onclick=openIndex;
$('#motion').onclick=()=>setReduced(!reduced);
$('#prev').onclick=()=>navigate(readHash()-1);
$('#next').onclick=()=>navigate(readHash()+1);
$('.close-dialog').onclick=()=>dialog.close();
dialog.addEventListener('click',event=>{
  if(event.target!==dialog) return;
  const rect=dialog.getBoundingClientRect();
  if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom) dialog.close();
});
$('#fullscreen').onclick=async()=>{
  try { if(document.fullscreenElement)await document.exitFullscreen();else await document.documentElement.requestFullscreen(); }
  catch { openDialog('Tela cheia','<p>Use a opção de tela cheia do seu navegador para ampliar a apresentação.</p>'); }
};
document.addEventListener('fullscreenchange',()=>{
  const active=Boolean(document.fullscreenElement);
  $('#fullscreen').textContent=active?'Sair da tela cheia ↙':'Tela cheia ↗';
  $('#fullscreen').setAttribute('aria-label',active?'Sair da tela cheia':'Entrar em tela cheia');
});
document.addEventListener('keydown',event=>{
  if(dialog.open||event.altKey||event.ctrlKey||event.metaKey||event.target.matches('input,textarea,select'))return;
  if(['ArrowLeft','ArrowRight','PageUp','PageDown','Home','End'].includes(event.key)){
    event.preventDefault();
    navigate(event.key==='Home'?0:event.key==='End'?topics.length-1:readHash()+(['ArrowRight','PageDown'].includes(event.key)?1:-1));
  }
});

let previousTime=0;
function tick(now) {
  const delta=Math.min(Math.max(0,now-previousTime),100);
  previousTime=now;
  const diagram=$('.diagram');
  const bounds=diagram?.getBoundingClientRect();
  const visible=bounds&&bounds.top<innerHeight*.88&&bounds.bottom>innerHeight*.12;
  if(playing&&visible&&!document.hidden&&!dialog.open){
    elapsed+=delta;
    const topic=topics[topicIndex];
    if(elapsed>=phaseDuration){
      if(phaseIndex<topic.points.length-1)setPhase(phaseIndex+1,false);
      else { elapsed=phaseDuration; playing=false; }
    }
    updatePlayback();
  }
  requestAnimationFrame(tick);
}

window.addEventListener('hashchange',changeTopic);
motionPreference.addEventListener('change',event=>setReduced(event.matches));
setReduced(reduced);
changeTopic();
requestAnimationFrame(tick);
