'use strict';

// The headings and page references follow the supplied workbook. Body copy is a paraphrase.
const chapters = [
  {name:'A Queda e o Resultado do Pecado',short:'A queda e o pecado',pages:'3–6'},
  {name:'A Obra de Cristo',short:'A obra de Cristo',pages:'7–11'},
  {name:'Estilo de Vida Cristã (Santificação)',short:'A vida cristã',pages:'11–17'}
];

const point = (title, text, pages) => ({title,text,pages});
const topics = [
  {id:'inicio',cover:true,title:'Plano de Redenção',pages:'3–17'},
  {
    id:'criacao',chapter:0,title:'A Criação e a Queda',pages:'3–4',verse:'creation',visual:'communion',
    summary:'Entendi que Deus nos criou para viver em comunhão com ele. O pecado rompeu esse relacionamento e afetou nossa maneira de pensar, desejar e agir. A nossa necessidade de salvação começa nessa ruptura.',
    points:[
      point('Criados para Deus','Nossa vida tem dignidade, propósito e responsabilidade diante do Criador.','3'),
      point('A comunhão foi rompida','A desobediência de Adão atingiu a humanidade e corrompeu nossa relação com Deus.','3–4'),
      point('Deus abriu o caminho de volta','Em Cristo, Deus oferece perdão, reconciliação e uma nova vida.','4')]
  },
  {
    id:'necessidade',chapter:0,title:'Por Que Precisamos de Salvação?',pages:'4–5',verse:'sin',visual:'need',
    summary:'Compreendi que o pecado alcança o nosso coração e toda a humanidade. Por isso, melhorar alguns comportamentos não resolve nossa condição diante de Deus. Eu preciso reconhecer minha dependência da graça de Cristo.',
    points:[
      point('O pecado alcança todos','A queda deixou suas marcas em toda a humanidade. Todos precisamos da mesma salvação.','4–5'),
      point('Nossas forças são insuficientes','Não conseguimos apagar a culpa ou restaurar sozinhos a comunhão com Deus.','4–5'),
      point('Precisamos de Cristo','Deus providenciou em Jesus o perdão e a reconciliação que não conseguiríamos alcançar.','5')]
  },
  {
    id:'do-que',chapter:0,title:'Do Que Precisamos Ser Salvos?',pages:'5–6',verse:'life',visual:'consequences',
    summary:'Entendi que a salvação trata do pecado e de todas as suas consequências. Ela alcança minha culpa, minha condição diante de Deus e o domínio do pecado sobre a vida. Também inclui a esperança de uma restauração completa no futuro.',
    points:[
      point('Culpa','O pecado é uma ofensa contra Deus, e precisamos do seu perdão.','5–6'),
      point('Condenação','O pecado traz morte e separação de Deus. Precisamos que essa condição seja resolvida.','6'),
      point('Poder','O pecado influencia desejos, pensamentos e atitudes. Precisamos de uma nova vida.','6'),
      point('Presença','Ainda convivemos com o pecado e seus efeitos, aguardando a restauração que Cristo completará.','6')]
  },
  {
    id:'salvacao-completa',chapter:0,title:'A salvação em Cristo é completa',pages:'6',verse:'life',visual:'complete',
    summary:'Para mim, essa parte mostra o alcance da obra de Cristo: recebemos perdão, uma nova condição diante de Deus e transformação para o presente. A glorificação é a esperança de que ele concluirá essa obra.',
    points:[
      point('Perdão','Deus trata a culpa do pecado.','6'),
      point('Justificação','Deus remove a condenação e declara justo quem confia em Cristo.','6'),
      point('Santificação','Deus nos transforma e nos ensina a resistir ao poder do pecado.','6'),
      point('Glorificação','Na volta de Cristo, a presença do pecado e seus efeitos terão fim para os seus filhos.','6')]
  },
  {
    id:'como',chapter:1,title:'Como Podemos Ser Salvos?',pages:'7',verse:'way',visual:'initiative',
    summary:'Entendi que a salvação começa na iniciativa de Deus. Ele veio ao nosso encontro por meio de Jesus e nos oferece reconciliação. Ser salvo envolve receber uma nova posição diante dele e uma nova vida como seu filho.',
    points:[
      point('Deus toma a iniciativa','Seu amor e sua misericórdia dão origem à nossa salvação.','7'),
      point('Cristo realiza a salvação','Deus providenciou em Jesus o perdão e o reencontro com ele.','7'),
      point('Recebemos uma nova vida','A salvação muda nossa relação com Deus e a maneira como passamos a viver.','7')]
  },
  {
    id:'graca',chapter:1,title:'Somos salvos pela graça de Deus',pages:'7–8',verse:'grace',visual:'grace',
    summary:'Compreendi a graça como um presente que eu não consigo merecer ou comprar. Minha salvação depende da misericórdia de Deus e da obra de Cristo. As boas obras aparecem como resposta a essa graça.',
    points:[
      point('Um presente de Deus','A graça revela o favor de Deus a quem não tem como salvar a si mesmo.','7'),
      point('Uma dívida que Cristo pagou','O exemplo da apostila me ajuda a entender que Jesus fez por nós o que não conseguiríamos fazer.','8'),
      point('Boas obras como resultado','Uma vida transformada expressa a salvação recebida. Ela não compra o favor de Deus.','8')]
  },
  {
    id:'somente-cristo',chapter:1,title:'Somos salvos somente por meio de Jesus Cristo',pages:'8–9',verse:'risen',visual:'christ',
    summary:'Entendi que minha confiança precisa estar na obra completa de Jesus. Ele viveu sem pecado, assumiu nossa condenação na cruz e ressuscitou. É por causa dele que podemos receber perdão e vida nova.',
    points:[
      point('Sua vida perfeita','Jesus viveu entre nós e obedeceu ao Pai sem pecado.','8'),
      point('Sua morte em nosso lugar','Na cruz, Cristo recebeu a condenação que cabia ao pecador.','8'),
      point('Sua ressurreição','Jesus venceu a morte. Sua obra é suficiente para salvar quem está unido a ele.','8–9')]
  },
  {
    id:'fe',chapter:1,title:'Recebemos a salvação por meio da fé',pages:'9',verse:'faith',visual:'faith',
    summary:'Para mim, ter fé é reconhecer que preciso de Jesus e confiar no que ele fez. Essa confiança vem acompanhada de arrependimento: reconhecer o pecado, deixar a antiga maneira de viver e voltar-me para Cristo.',
    points:[
      point('Confiar em Jesus','A fé deixa de apoiar a salvação na própria capacidade e descansa na obra de Cristo.','9'),
      point('Arrepender-se','Reconhecer o pecado diante de Deus envolve disposição para abandoná-lo.','9'),
      point('Responder com obediência','Fé e arrependimento caminham juntos e dão início a uma nova maneira de viver.','9')]
  },
  {
    id:'justificacao',chapter:1,title:'Em Cristo, somos justificados e recebemos nova vida',pages:'9–10',verse:'justified',visual:'verdict',
    summary:'Entendi que Deus me aceita por causa da obra de Cristo. A justificação muda minha condição diante dele, enquanto a santificação transforma minha maneira de viver. O perdão recebido dá início a uma vida nova.',
    points:[
      point('Justificação','Deus declara justo o pecador que confia em Jesus, porque Cristo assumiu sua culpa.','9'),
      point('Aceitação em Cristo','A condenação foi removida. Nossa aceitação diante de Deus se apoia na obra de Jesus.','9–10'),
      point('Nova vida','Deus também nos transforma, nos recebe como filhos e conduz nosso crescimento pelo Espírito Santo.','10')]
  },
  {
    id:'estilo',chapter:2,title:'Qual é o Estilo de Vida de uma Pessoa Salva?',pages:'11',verse:'holy',visual:'identity',
    summary:'Compreendi que a salvação transforma a vida presente. Quem recebe uma nova vida em Cristo passa a amadurecer, mesmo enfrentando fraquezas e tentações. A santificação é essa obra contínua de Deus em nós.',
    points:[
      point('Uma nova identidade','Pertencer a Cristo muda nossos afetos, escolhas e maneira de viver.','11'),
      point('Um crescimento contínuo','Ainda há lutas e falhas. O cristão aprende a deixar a antiga maneira de viver.','11'),
      point('Uma vida voltada a Deus','Santidade, transformação e renúncia ao pecado fazem parte de viver para a glória de Deus.','11')]
  },
  {
    id:'santidade',chapter:2,title:'Uma vida de santidade',pages:'12',verse:'holiness',visual:'daily',
    summary:'Entendi que ser santo é pertencer a Deus e viver de forma coerente com essa identidade. Isso alcança minha família, meu trabalho, minhas palavras e minhas escolhas. A obediência nasce da salvação que recebi.',
    points:[
      point('Refletir o caráter de Deus','A santidade se expressa em honestidade, amor, humildade, pureza e fidelidade.','12'),
      point('Viver a fé no cotidiano','Cada área da vida oferece oportunidades para amar, servir, perdoar e agir com integridade.','12'),
      point('Obedecer por gratidão','Viver em santidade é uma resposta à graça de Deus, sem tentar comprar sua aceitação.','12')]
  },
  {
    id:'transformacao',chapter:2,title:'Uma vida em constante transformação',pages:'12–13',verse:'renewal',visual:'renewal',
    summary:'Entendi que Deus transforma a pessoa por dentro e que esse crescimento acontece ao longo do tempo. O Espírito Santo atua em nós, e participamos dessa caminhada quando a Palavra orienta nossas escolhas e cultivamos a vida com Deus.',
    points:[
      point('O Espírito Santo transforma','Ele convence do pecado, fortalece nas tentações e forma um novo caráter.','13'),
      point('Participamos do crescimento','Palavra, oração, comunhão, discipulado, ceia, serviço e correção fraterna fazem parte dessa caminhada.','13'),
      point('As atitudes começam a mudar','A mente renovada aprende a trocar o egoísmo pelo serviço e o orgulho pela humildade.','13')]
  },
  {
    id:'velha-natureza',chapter:2,title:'Renunciando à velha natureza',pages:'13–14',verse:'old',visual:'nature',
    summary:'Compreendi que receber uma nova identidade em Cristo também exige uma nova postura diante do pecado. Ainda enfrentamos tentações, mas o pecado já não tem o direito de governar nossa vida. Renunciar é deixar de alimentar essa antiga maneira de viver.',
    points:[
      point('Reconhecer a velha natureza','Ela se manifesta numa vida centrada em si mesma e em desejos contrários à vontade de Deus.','13'),
      point('Lembrar a nova identidade','Em Cristo, não precisamos continuar vivendo como escravos do pecado.','13–14'),
      point('Renunciar diariamente','A mudança envolve abandonar hábitos e escolhas que se opõem à vontade de Deus.','13–14')]
  },
  {
    id:'carne-espirito',chapter:2,title:'A luta entre a carne e o Espírito',pages:'14',verse:'fruit',visual:'conflict',
    summary:'Entendi que a vida cristã inclui uma luta interior. A carne nos inclina à independência de Deus, enquanto o Espírito nos conduz à obediência. Depender dele muda nossas escolhas e produz um novo caráter.',
    points:[
      point('A luta é real','A carne é a inclinação ao pecado. Reconhecer essa luta faz parte da caminhada cristã.','14'),
      point('Dependemos do Espírito','Precisamos submeter pensamentos e desejos à Palavra, buscar a Deus em oração e viver em comunhão.','14'),
      point('O fruto aparece no caráter','O Espírito produz amor, alegria, paz, paciência, amabilidade, bondade, fidelidade, mansidão e domínio próprio.','14')]
  },
  {
    id:'conflito-interior',chapter:2,title:'O conflito interior e a necessidade da graça',pages:'14–15',verse:'justified',visual:'dependence',
    summary:'A reflexão sobre Romanos 7 me fez entender que conhecer o que é certo não basta para transformar o coração. Preciso de Cristo para receber perdão, resistir ao pecado e continuar crescendo. Essa luta permanece amparada pela graça.',
    points:[
      point('Conhecer não é suficiente','A Lei mostra a santidade de Deus e revela nosso pecado, mas não nos salva.','15'),
      point('A resposta está em Cristo','Nele encontramos perdão para as quedas e força para resistir ao pecado.','15'),
      point('A graça sustenta a caminhada','Quem está em Cristo pode continuar lutando sem esquecer que foi amado e perdoado.','15')]
  },
  {
    id:'crucificando',chapter:2,title:'Crucificando a carne',pages:'15–16',verse:'crucified',visual:'renounce',
    summary:'Entendi que crucificar a carne é tomar uma posição firme contra o pecado. Isso envolve reconhecer o erro, confessá-lo e mudar atitudes concretas. Também preciso buscar ajuda e cultivar aquilo que fortalece minha fé.',
    points:[
      point('Reconhecer e confessar','Admitir o pecado diante de Deus e pedir perdão quando ferimos alguém.','15'),
      point('Abandonar o que alimenta o pecado','Romper com práticas desonestas e hábitos que fortalecem desejos contrários a Deus.','15'),
      point('Buscar ajuda e cultivar o bem','Discipulado, Palavra, oração, comunhão e serviço ajudam a sustentar a mudança.','16')]
  },
  {
    id:'esperanca',chapter:2,title:'Uma luta marcada por esperança',pages:'16',verse:'hope',versePages:'17',visual:'hope',
    summary:'Compreendi que uma queda não precisa encerrar a caminhada. O caminho é voltar para Cristo com arrependimento e confiar novamente em sua graça. O Espírito Santo fortalece nossa fraqueza e nos ajuda a perseverar.',
    points:[
      point('Voltar para Cristo','Diante do erro, somos chamados ao arrependimento, em vez de esconder o pecado.','16'),
      point('Confiar novamente na graça','Deus nos oferece perdão e sustenta o processo de transformação.','16'),
      point('Perseverar com esperança','Seguimos buscando ajuda e lutando contra o pecado, confiando na vitória final de Cristo.','16')]
  },
  {
    id:'gloria',chapter:2,title:'Vivendo para a Glória de Deus',pages:'16–17',verse:'glory',visual:'glory',
    summary:'Para mim, viver para a glória de Deus é permitir que a fé alcance tudo o que faço. Isso aparece nas responsabilidades, no cuidado com as pessoas e na disposição para servir. Até reconhecer meus erros e pedir perdão faz parte dessa vida.',
    points:[
      point('Deus no centro da vida','A fé orienta as escolhas em casa, no trabalho, nas redes sociais e quando ninguém está olhando.','16'),
      point('Servir com o que recebemos','Dons, recursos, tempo e oportunidades podem abençoar outras pessoas.','17'),
      point('Testemunhar com sinceridade','Nossas atitudes revelam a fé. Quando erramos, reconhecer o pecado também mostra nossa dependência de Cristo.','17')]
  },
  {
    id:'reflexao',chapter:2,title:'Para Refletir',pages:'6, 10–11 e 17',visual:'reflection',
    summary:'O que levo desse estudo é que preciso da graça de Cristo para ser salvo e para continuar crescendo. A resposta a essa graça deve aparecer na minha confiança em Jesus e na forma como vivo.',
    points:[
      point('Minha necessidade de salvação','Reconheço que preciso de Cristo ou ainda tento resolver o pecado apenas com minhas próprias forças?','6'),
      point('Minha confiança em Cristo','Minha fé se apoia na obra de Jesus e vem acompanhada de arrependimento?','10–11'),
      point('Minha vida diante de Deus','Minhas escolhas mostram uma santidade prática e o desejo de glorificar a Deus?','17')]
  },
  {id:'proxima-etapa',ending:true,title:'Caminho da Redenção',pages:null,
    summary:'Explore o conteúdo do estudo em uma jornada interativa: da criação à nova vida em Cristo. Escolha seu avatar e descubra os seis cenários, com reflexões e referências à apostila.'}
];
