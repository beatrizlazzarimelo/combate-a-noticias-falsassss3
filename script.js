const characters = {
  julia: {
    name: 'Júlia Vértice',
    role: 'Analista de fatos',
    perk: 'Olhar clínico: aumenta a chance de desmantelar a mentira.',
    intro: 'Júlia entra na mansão com um gravador digital e uma linha de raciocínio tão afiada quanto uma faca.',
  },
  rafael: {
    name: 'Rafael Chagas',
    role: 'Investigador de origem',
    perk: 'Rastreador de dados: descobre a fonte do rumor antes que ele se espalhe.',
    intro: 'Rafael é um especialista em rastrear metadados, imagens roubadas e vídeos clonados que parecem reais.',
  },
  isabela: {
    name: 'Isabela Nox',
    role: 'Repórter de rua',
    perk: 'Fala com a multidão: converte pânico em ação e atenção em verdade.',
    intro: 'Isabela usa a voz do povo para quebrar a narrativa falsa antes que ela vire medo coletivo.',
  },
};

const paths = [
  {
    id: 'feed',
    title: 'Caminho do Feed Infectado',
    summary: 'Um vídeo “inédito” abre uma porta na mansão e a tela começa a falar com você.',
    description:
      'Você entra na ala das redes sociais, onde cada legenda parece tentar te controlar. O corredor é preenchido por cliques fantasmagóricos, e uma voz robótica repete: “Eu vi, então é verdade”.',
    choices: [
      {
        label: 'Verificar a fonte e comparar com arquivos oficiais',
        result: 'verdade',
        nuance: 'Você ilumina a mentira com evidência. A janela vibra, mas a casa se encolhe.',
      },
      {
        label: 'Usar a própria narrativa falsa para explodir a máquina de rumores',
        result: 'caos',
        nuance: 'Você joga o monstro de volta para o buraco do algoritmo. O custo é a fumaça de uma guerra digital.',
      },
    ],
  },
  {
    id: 'museu',
    title: 'Caminho do Museu dos Mitos',
    summary: 'Falsas memórias e imagens manipuladas cercam uma sala funerária cheias de rostos de celebridades.',
    description:
      'No centro do museu, paredes inteiras mostram imagens de pessoas que “não lembram” do que viram. Cada quadros parece mover uma história falsa em câmera lenta.',
    choices: [
      {
        label: 'Analisar a cadeia do conteúdo e rastrear a origem original',
        result: 'verdade',
        nuance: 'Você descobre que a mentira veio de uma conta vazia. O museu cai em silêncio.',
      },
      {
        label: 'Reagir rápido e espalhar a correção em massa para virar a maré',
        result: 'caos',
        nuance: 'A correção vira um novo rumor. O caos se espalha pelas salas, mas alguém finalmente percebe a verdade.',
      },
    ],
  },
  {
    id: 'igreja',
    title: 'Caminho da Igreja dos Cliques',
    summary: 'Uma cripta de câmeras e discursos falsos te empurra para uma capela que promete a “mensagem definitiva”.',
    description:
      'Uma voz de padre digital anuncia “a verdade será escolhida por quem mais cliques conseguir”. O altar é um monitor de alta resolução conectado a uma rede de acessos ilegítimos.',
    choices: [
      {
        label: 'Desmontar a narrativa com fatos, contexto e provas históricas',
        result: 'verdade',
        nuance: 'A capela desaba em si mesma ao revelar que suas “provas” eram apagadas em segundos.',
      },
      {
        label: 'Quebrar o altar e expor o esquema diante de todos',
        result: 'caos',
        nuance: 'A explosão de luz revela a rede inteira. Há feridas, e também uma nova consciência coletiva.',
      },
    ],
  },
  {
    id: 'porao',
    title: 'Caminho do Porão do Deepfake',
    summary: 'No porão mais profundo, alguém está criando rostos falsos e oferecendo “verdades” só para o seu medo.',
    description:
      'Um laboratório subterrâneo pulsa em neon. Cada IA abana uma máscara de rosto que quer te convencer de que a realidade é um cenário. As paredes têm gravações de pessoas pedindo ajuda antes de desaparecer.',
    choices: [
      {
        label: 'Contrapor a voz sintética com uma checagem em tempo real',
        result: 'verdade',
        nuance: 'O sistema falha quando a origem dos dados cai em mãos humanas. A sala se torna um laboratório de verdade.',
      },
      {
        label: 'Destruir o servidor e deixar o pânico abrir caminho para a verdade',
        result: 'caos',
        nuance: 'O fogo das evidências expõe a escala do crime. A mansão treme, mas a verdade também se levanta.',
      },
    ],
  },
];

const endings = {
  verdade: {
    title: 'Final: A Verdade Acendeu',
    text:
      'Você não apenas desmascara o rumor: você desmonta a estrutura que o alimentava. A casa da desinformação cai em ruínas, e a cidade começa a entender que o poder de uma notícia está em checar a fonte antes de sentir medo. As pessoas param de compartilhar o veneno e começam a perguntar: “De onde veio isso?”',
  },
  equilibrio: {
    title: 'Final: O Filtro de Fatos',
    text:
      'A batalha foi dura, mas você não destruiu apenas a mentira: você ensinou a comunidade a pensar. O filtro da verdade não é uma bomba, é um hábito. A mansão se fecha, mas a vigilância crítica permanece viva. O pânico cede, e a inteligência coletiva ganha a guerra contra o caos digital.',
  },
  caos: {
    title: 'Final: A Casa dos Mitos',
    text:
      'Você derruba o rumor, mas a violência da exposição abre um novo abismo. O medo ainda circula, o algoritmo sobrevive e a população se divide entre quem acredita e quem desconfia. A mansão vence um pouco, mas você revela a verdade: a maior ameaça não é só a notícia falsa, é quem se aproveita do medo para vender a confusão.',
  },
};

const routeResults = {
  feed: { verdade: 'verdade', caos: 'equilibrio' },
  museu: { verdade: 'equilibrio', caos: 'caos' },
  igreja: { verdade: 'verdade', caos: 'caos' },
  porao: { verdade: 'equilibrio', caos: 'verdade' },
};

const state = {
  characterId: null,
  currentPathId: null,
};

const startScreen = document.getElementById('start-screen');
const storyScreen = document.getElementById('story-screen');
const characterGrid = document.getElementById('character-grid');
const pathMeta = document.getElementById('path-meta');
const storyPanel = document.getElementById('story-panel');

function buildCharacterCards() {
  characterGrid.innerHTML = Object.entries(characters)
    .map(
      ([id, character]) => `
        <button class="character-card" data-character="${id}">
          <div class="character-badge">Personagem</div>
          <h3>${character.name}</h3>
          <p><strong>${character.role}</strong></p>
          <p>${character.perk}</p>
        </button>
      `,
    )
    .join('');

  characterGrid.querySelectorAll('.character-card').forEach((button) => {
    button.addEventListener('click', () => {
      state.characterId = button.dataset.character;
      renderStorySelection();
    });
  });
}

function renderStorySelection() {
  startScreen.classList.add('hidden');
  storyScreen.classList.remove('hidden');

  const activeCharacter = characters[state.characterId];
  pathMeta.innerHTML = `
    <div class="character-highlight">
      <div>
        <span>Personagem ativo</span>
        <strong>${activeCharacter.name}</strong>
        <small>${activeCharacter.role}</small>
      </div>
    </div>
  `;

  storyPanel.innerHTML = `
    <p class="story-tag">Rota disponível</p>
    <h2>Escolha um caminho para enfrentar a casa do rumor</h2>
    <div class="story-copy">
      <p>${activeCharacter.intro}</p>
      <p>As portas da mansão se abrem em quatro corredores absurdos. Cada um leva a uma forma diferente de desmascarar a mentira.</p>
    </div>
    <div class="path-grid">
      ${paths
        .map(
          (path) => `
            <button class="path-card" data-path="${path.id}">
              <div class="character-badge">Caminho</div>
              <h3>${path.title}</h3>
              <p>${path.summary}</p>
            </button>
          `,
        )
        .join('')}
    </div>
  `;

  storyPanel.querySelectorAll('.path-card').forEach((button) => {
    button.addEventListener('click', () => {
      state.currentPathId = button.dataset.path;
      renderPathScene();
    });
  });
}

function renderPathScene() {
  const activeCharacter = characters[state.characterId];
  const activePath = paths.find((path) => path.id === state.currentPathId);

  storyPanel.innerHTML = `
    <p class="story-tag">${activeCharacter.name}</p>
    <h2>${activePath.title}</h2>
    <div class="story-copy">
      <p>${activePath.description}</p>
    </div>
    <div class="choices">
      ${activePath.choices
        .map(
          (choice) => `
            <button class="choice-btn" data-result="${choice.result}">
              <strong>${choice.label}</strong>
              <span>${choice.nuance}</span>
            </button>
          `,
        )
        .join('')}
    </div>
  `;

  storyPanel.querySelectorAll('.choice-btn').forEach((button) => {
    button.addEventListener('click', () => {
      revealEnding(button.dataset.result);
    });
  });
}

function revealEnding(selectedResult) {
  const activeCharacter = characters[state.characterId];
  const activePath = paths.find((path) => path.id === state.currentPathId);
  const endingKey = routeResults[state.currentPathId][selectedResult];
  const ending = endings[endingKey];

  storyPanel.innerHTML = `
    <p class="final-tag">Final do caminho</p>
    <h2>${ending.title}</h2>
    <div class="story-copy">
      <p><strong>${activeCharacter.name}</strong> escolheu o ${activePath.title.toLowerCase()}.</p>
      <p>O horror da desinformação foi exposto e a decisão que você tomou mudou o rumo da cidade.</p>
    </div>
    <div class="ending-box">
      <h3>${ending.title}</h3>
      <p>${ending.text}</p>
    </div>
    <button id="restart-button" class="secondary-btn">Reiniciar a história</button>
  `;

  document.getElementById('restart-button').addEventListener('click', () => {
    state.characterId = null;
    state.currentPathId = null;
    startScreen.classList.remove('hidden');
    storyScreen.classList.add('hidden');
    buildCharacterCards();
  });
}

buildCharacterCards();
