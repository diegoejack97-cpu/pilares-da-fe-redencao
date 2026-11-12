# Pilares da Fé · apresentação e jogo

Abra `index.html` no Chrome ou Edge. A última tela contém o botão **Entrar no jogo**. Também é possível abrir `jogo/index.html` diretamente.

## Caminho da Redenção

Escolha um avatar masculino ou feminino. Percorra seis etapas: Jardim, Queda, Sentença, Espinhos, Cruz e Redenção. Cada uma contém uma ação e uma reflexão fundamentada na apostila. Os cenários são simbólicos.

- WASD ou setas: caminhar.
- Arrastar o cenário: orientar a câmera.
- E ou botão na tela: interagir próximo ao círculo dourado.
- Ir até o ponto: caminhada automática para facilitar a apresentação.
- Pausar: continuar, trocar avatar ou recomeçar.
- No celular: botões de direção e “Ler resumo”.

O jogo não usa pontuação. As atividades ilustram o estudo e não representam conquistar a salvação. Ao recarregar a página, a jornada começa novamente. Não há contas ou salvamento de progresso.

## Conteúdo e funcionamento

A apresentação mantém seus 19 tópicos, com resumos e referências às páginas 3–17. O jogo utiliza os mesmos versículos e distingue as páginas do versículo das páginas do tema.

O jogo funciona sem baixar bibliotecas durante a execução. Exige navegador atual com WebGL2 e aceleração gráfica. As fontes da apresentação podem usar fontes locais quando não houver internet.

## Verificação em 12/11/2026

Percurso completo concluído no navegador: todas as seis atividades, conclusão e reinício. Verificados seleção dos dois avatares, troca durante a jornada, caminhada por teclado, caminhada automática, pausa, versículo e links de ida e volta à apresentação. Layout móvel conferido em 390 × 844, com resumo recolhível e controles na tela. Não foram observados erros de JavaScript durante os testes. A verificação automatizada da apresentação passou: 21 telas, 19 tópicos e 59 conceitos.

## Desenvolvimento

`jogo/source.js` contém o código-fonte legível. Dentro de `jogo`, execute `npm install` e `npm run build` para atualizar `game.js`. Three.js 0.187.0, licença MIT em `jogo/THREE-LICENSE.txt`. O arquivo compilado já está incluído; nenhuma instalação é necessária para jogar.
