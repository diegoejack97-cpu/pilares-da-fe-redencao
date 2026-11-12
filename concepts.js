'use strict';

const esc = value => String(value).replace(/[&<>"']/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character]));
const lines = paths => `<svg class="concept-lines" viewBox="0 0 600 400" preserveAspectRatio="none" aria-hidden="true">${paths}</svg>`;
const path = (d, extra='') => `<path d="${d}" pathLength="1" ${extra}/>`;
const label = (text,x,y,extra='') => `<div class="concept-label ${extra}" style="--x:${x}%;--y:${y}%">${text}</div>`;
const stageWords = words => `<div class="concept-messages">${words.map((word,i)=>`<p data-only="${i}">${word}</p>`).join('')}</div>`;

function flow(items, extra='') {
  return `<div class="concept-flow ${extra}"><div class="flow-track"><i></i></div>${items.map((item,i)=>`<div class="flow-item" data-at="${i}"><span class="flow-number">0${i+1}</span><strong>${item[0]}</strong><small>${item[1]}</small></div>`).join('')}</div>`;
}

function radial(center,items,extra='') {
  const positions = [[50,10],[84,31],[84,69],[50,90],[16,69],[16,31]];
  return `<div class="radial ${extra}">${lines(positions.map(([x,y],i)=>path(`M300 200 L${x*6} ${y*4}`,`data-at="${i%3}"`)).join(''))}${label(center,50,50,'radial-center')}${items.map((item,i)=>label(`<span data-at="${i%3}">${item}</span>`,...positions[i],'radial-leaf')).join('')}</div>`;
}

const conceptRenderers = {
  communion: () => `${lines(path('M90 184 H255','class="bond left-bond"')+path('M345 184 H510','class="bond right-bond"')+path('M255 184 H345','class="bond center-bond"'))}
    ${label('<small>CRIADOS À SUA IMAGEM</small><strong>Humanidade</strong>',18,46,'person-node')}
    ${label('<small>O CRIADOR</small><strong>Deus</strong>',82,46,'god-node')}
    <div class="rupture"><span>Pecado</span><i></i></div><div class="christ-bridge"><span>†</span><strong>Cristo</strong></div>
    ${stageWords(['Comunhão com Deus','O pecado rompe a comunhão','Deus oferece reconciliação em Cristo'])}`,

  need: () => `<div class="all-humanity"><span>Toda a</span><strong>humanidade</strong><small>Todos pecaram</small></div>
    <div class="affected"><span>Pensamentos</span><span>Desejos</span><span>Palavras</span><span>Atitudes</span></div>
    <div class="self-effort" data-only="1">Esforço próprio <span>não remove a culpa</span></div>
    <div class="need-christ" data-only="2"><strong>Cristo</strong><span>perdão e reconciliação</span></div>
    ${stageWords(['O pecado alcança nossa natureza','Precisamos de salvação','A resposta de Deus está em Jesus'])}`,

  consequences: () => `<div class="consequence-origin"><span>O problema é o</span><strong>pecado</strong></div><div class="consequence-list">${[['Culpa','Ofensa contra Deus'],['Condenação','Morte e separação'],['Poder','Domínio sobre a vida'],['Presença','Seus efeitos ainda existem']].map((pair,i)=>`<div data-at="${i}"><i></i><strong>${pair[0]}</strong><small>${pair[1]}</small></div>`).join('')}</div>`,

  complete: () => `<div class="complete-heading">A obra de <strong>Cristo</strong></div><div class="salvation-pairs">${[['Culpa','Perdão','Recebemos perdão'],['Condenação','Justificação','Nova condição diante de Deus'],['Poder','Santificação','Transformação no presente'],['Presença','Glorificação','Restauração futura']].map((pair,i)=>`<div class="salvation-pair" data-at="${i}"><span>${pair[0]}</span><i><b></b></i><strong>${pair[1]}<small>${pair[2]}</small></strong></div>`).join('')}</div>`,

  initiative: () => `<div class="concept-overline">A SALVAÇÃO COMEÇA EM DEUS</div>${flow([['Deus','Toma a iniciativa'],['Jesus Cristo','Realiza a salvação'],['Filhos de Deus','Recebem nova vida']])}<div class="concept-footnote">Graça, reconciliação e transformação</div>`,

  grace: () => `<div class="grace-origin"><small>A ORIGEM</small><strong>Graça de Deus</strong></div><div class="grace-down"></div><div class="grace-debt"><span class="debt-word">Nossa dívida</span><span class="paid-word">Paga por Cristo</span></div><div class="grace-result"><strong>Salvação recebida pela fé</strong><i></i><span>Boas obras</span><small>resultado da nova vida</small></div>`,

  christ: () => `<div class="christ-symbol" aria-hidden="true">†</div><div class="christ-title">Jesus Cristo</div>${flow([['Vida perfeita','Sem pecado'],['Morte substitutiva','Em nosso lugar'],['Ressurreição','Vitória sobre a morte']],'christ-flow')}<div class="concept-footnote">Nossa salvação se fundamenta na sua obra</div>`,

  faith: () => `${label('<small>NOSSA CONFIANÇA</small><strong>Jesus Cristo</strong>',50,20,'faith-center')}${lines(path('M150 275 Q150 100 280 100','class="faith-line" data-at="0"')+path('M450 275 Q450 100 320 100','class="repent-line" data-at="1"'))}<div class="faith-pair"><div data-at="0"><strong>Fé</strong><span>Confiar na obra de Jesus</span></div><div data-at="1"><strong>Arrependimento</strong><span>Abandonar o pecado</span></div></div><div class="faith-together" data-at="2">Uma resposta que envolve a vida</div>`,

  verdict: () => `<div class="verdict-overline">NOSSA CONDIÇÃO DIANTE DE DEUS</div><div class="verdict-document"><span class="old-verdict">Condenação</span><strong class="new-verdict">Justificação</strong><span class="verdict-basis">Pela obra de Jesus Cristo</span><div class="accepted-seal" data-at="1"><span>ACEITO</span><small>em Cristo</small></div></div><div class="new-life" data-at="2"><span>Perdão</span><span>Adoção</span><span>Nova vida</span></div><div class="ongoing" data-at="2"><i></i><span>A santificação continua ao longo da vida</span></div>`,

  identity: () => `<div class="identity-start" data-at="0"><small>EM CRISTO</small><strong>Nova identidade</strong></div><div class="growth-line">${lines(path('M25 290 C90 290 85 230 140 240 S220 200 260 225 S340 105 385 135 S455 85 490 108 S540 45 575 50','class="growth-path"'))}<span class="growth-label start">Nova vida</span><span class="growth-label end">Crescimento contínuo</span></div><div class="growth-details"><span data-at="0">Pertencer a Cristo</span><span data-at="1">Amadurecer nas lutas</span><span data-at="2">Viver para Deus</span></div>`,

  daily: () => `${radial('<small>PERTENCER A</small><strong>Deus</strong>',['Família','Trabalho','Palavras','Relacionamentos','Finanças','Decisões'])}${stageWords(['Refletir o caráter de Deus','A santidade alcança o cotidiano','Obediência como resposta à graça'])}`,

  renewal: () => `<div class="renewal-source"><small>QUEM TRANSFORMA</small><strong>O Espírito Santo</strong></div><div class="renewal-resources" data-at="1"><span>Palavra</span><span>Oração</span><span>Comunhão</span><span>Discipulado</span><span>Serviço</span></div><div class="renewal-pairs">${[['Egoísmo','Serviço'],['Orgulho','Humildade'],['Medo','Confiança'],['Indiferença','Amor']].map((pair,i)=>`<div style="--delay:${i*110}ms"><span>${pair[0]}</span><i></i><strong>${pair[1]}</strong></div>`).join('')}</div><div class="concept-footnote">A transformação alcança o coração e as escolhas</div>`,

  nature: () => `<div class="nature-orbit"><span>Desejos</span><span>Escolhas</span><span>Atitudes</span></div><div class="nature-center"><div class="old-center"><small>A VELHA NATUREZA</small><strong>Eu no centro</strong></div><div class="new-center"><small>A NOVA IDENTIDADE</small><strong>Pertenço a Cristo</strong></div></div><div class="nature-freedom" data-at="2">O pecado não tem o direito de governar minha vida</div>`,

  conflict: () => `<div class="conflict-heading"><span>A CARNE</span><strong>Minhas escolhas</strong><span>O ESPÍRITO</span></div><div class="conflict-directions"><div class="flesh-direction"><i></i><small>Independência de Deus</small></div><div class="spirit-direction"><i></i><small>Obediência a Deus</small></div></div><div class="spirit-dependence" data-only="1">Palavra <span>·</span> oração <span>·</span> comunhão</div><div class="fruit-list" data-at="2">${['Amor','Alegria','Paz','Paciência','Amabilidade','Bondade','Fidelidade','Mansidão','Domínio próprio'].map((name,i)=>`<span style="--delay:${i*65}ms">${name}</span>`).join('')}</div>${stageWords(['Existe uma luta interior','Dependemos diariamente de Deus','O Espírito Santo forma um novo caráter'])}`,

  dependence: () => `<div class="knowledge"><span>Conhecer</span><strong>o que é certo</strong></div><div class="ability"><span>Preciso de graça para</span><strong>viver essa verdade</strong></div><div class="dependence-gap"><i></i><span>Jesus Cristo</span><i></i></div><div class="grace-support" data-at="2"><strong>Perdão</strong><span>Força para resistir</span><span>Esperança para continuar</span></div>`,

  renounce: () => `<div class="renounce-heading">Uma posição firme contra o pecado</div>${flow([['Reconhecer','e confessar'],['Abandonar','o que alimenta o pecado'],['Cultivar','o que fortalece a fé']],'renounce-flow')}<div class="renounce-old" data-only="1"><span>Hábitos e práticas pecaminosas</span><i></i></div><div class="cultivate" data-at="2"><span>Palavra</span><span>Oração</span><span>Comunhão</span><span>Serviço</span><span>Ajuda</span></div>`,

  hope: () => `<div class="hope-title">A caminhada pode continuar</div><div class="hope-route">${lines(path('M40 210 H150 Q190 210 210 160 Q230 110 280 110 H340 Q390 110 410 160 Q430 210 480 210 H560','class="hope-path"'))}<span class="hope-fall">Queda</span><span class="hope-return" data-at="0">Arrependimento</span><span class="hope-grace" data-at="1">Graça de Cristo</span><span class="hope-continue" data-at="2">Perseverança</span></div><div class="concept-footnote">O Espírito Santo fortalece nossa fraqueza</div>`,

  glory: () => `${radial('<small>TUDO PARA A</small><strong>Glória de Deus</strong>',['Casa','Trabalho','Escolhas','Serviço','Relacionamentos','Redes sociais'],'glory-radial')}${stageWords(['Deus orienta todas as áreas da vida','Servimos com o que recebemos','Nossa maneira de viver comunica a fé'])}`,

  reflection: () => `<div class="reflection-core"><small>O QUE LEVO DO ESTUDO</small><strong>Preciso de Cristo</strong></div><div class="reflection-links">${['Para ser salvo','Para confiar na graça','Para viver uma nova vida'].map((text,i)=>`<div data-at="${i}"><span>0${i+1}</span>${text}</div>`).join('')}</div>`
};

function conceptMarkup(topic) {
  const render = conceptRenderers[topic.visual];
  if (!render) throw new Error(`Missing concept: ${topic.visual}`);
  return `<div class="diagram diagram-${topic.visual}" data-phase="-1" role="img" aria-label="${esc(topic.points[0].title+'. '+topic.points[0].text)}">${render()}</div>`;
}
