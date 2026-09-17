const articles = [
  {
    title: "Existe um planeta onde pode chover vidro de lado",
    category: "Mundo",
    readingTime: "3 min de leitura",
    description: "Os ventos em um mundo distante são tão intensos que transformam partículas de silicato em uma tempestade extraordinária.",
    image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=900&q=80",
    featured: true,
    popular: true,
  },
  {
    title: "Polvos têm três corações — e dois param quando eles nadam",
    category: "Animais",
    readingTime: "4 min de leitura",
    description: "Por que o corpo de um polvo funciona de uma maneira tão diferente da nossa?",
    image: "https://images.unsplash.com/photo-1545671913-b89ac1b4ac10?auto=format&fit=crop&w=900&q=80",
    featured: true,
    popular: true,
  },
  {
    title: "Seu corpo emite uma luz invisível a olhos humanos",
    category: "Ciência",
    readingTime: "5 min de leitura",
    description: "Células liberam uma pequena quantidade de fótons durante processos naturais do organismo.",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=900&q=80",
    featured: true,
  },
  {
    title: "A floresta que parece conversar por baixo da terra",
    category: "Mundo",
    readingTime: "4 min de leitura",
    description: "Fungos conectam raízes e ajudam árvores a trocar sinais e recursos no subsolo.",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=900&q=80",
    featured: true,
  },
  {
    title: "Por que alguns povos antigos construíam cidades inteiras sem carros?",
    category: "História",
    readingTime: "6 min de leitura",
    description: "O planejamento urbano existe há milênios — e algumas ideias ainda surpreendem arquitetos atuais.",
    image: "https://images.unsplash.com/photo-1564399579883-451a5d44ec08?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "O lugar mais silencioso do planeta pode fazer você ouvir o próprio corpo",
    category: "Mundo",
    readingTime: "3 min de leitura",
    description: "Uma câmara especial absorve quase todo som externo e muda completamente a experiência de escutar.",
    image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&w=900&q=80",
    popular: true,
  },
  {
    title: "A inteligência artificial já ajuda a decifrar línguas perdidas",
    category: "Tecnologia",
    readingTime: "5 min de leitura",
    description: "Algoritmos encontram padrões em inscrições que pareciam impossíveis de interpretar.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Há mais árvores na Terra do que estrelas na nossa galáxia",
    category: "Mundo",
    readingTime: "3 min de leitura",
    description: "Uma comparação que ajuda a imaginar a escala impressionante da vida no planeta.",
    image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=900&q=80",
  },
];

const createFeatureCard = (article) => `
  <article class="feature-card searchable" style="--image: url('${article.image}')" data-search="${article.title} ${article.category} ${article.description}">
    <div class="card-content"><span class="tag">${article.category}</span><h3>${article.title}</h3><p class="card-meta"><span>●</span>${article.readingTime}</p></div>
  </article>`;

const createRecentCard = (article) => `
  <article class="recent-card searchable" data-search="${article.title} ${article.category} ${article.description}">
    <img src="${article.image}" alt="Imagem ilustrativa para: ${article.title}" loading="lazy" />
    <div><span class="tag">${article.category}</span><h3>${article.title}</h3><p>${article.description}</p></div>
    <a class="arrow-link" href="#" aria-label="Ler ${article.title}">→</a>
  </article>`;

const createPopularCard = (article, index) => `
  <article class="popular-card searchable" data-search="${article.title} ${article.category} ${article.description}">
    <span class="popular-number">0${index + 1}</span><div><span class="tag">${article.category}</span><h3>${article.title}</h3><p>${article.readingTime}</p></div>
  </article>`;

document.querySelector('#featured-grid').innerHTML = articles.filter((article) => article.featured).map(createFeatureCard).join('');
document.querySelector('#recent-list').innerHTML = articles.slice(4).map(createRecentCard).join('');
document.querySelector('#popular-grid').innerHTML = articles.filter((article) => article.popular).map(createPopularCard).join('');
document.querySelector('#year').textContent = new Date().getFullYear();

const root = document.documentElement;
const themeToggle = document.querySelector('.theme-toggle');
const savedTheme = localStorage.getItem('ci-theme');

if (savedTheme === 'light') root.dataset.theme = 'light';

function updateThemeLabel() {
  const isLight = root.dataset.theme === 'light';
  themeToggle.setAttribute('aria-label', isLight ? 'Ativar modo escuro' : 'Ativar modo claro');
}

updateThemeLabel();
themeToggle.addEventListener('click', () => {
  const nextTheme = root.dataset.theme === 'light' ? 'dark' : 'light';
  if (nextTheme === 'dark') delete root.dataset.theme;
  else root.dataset.theme = 'light';
  localStorage.setItem('ci-theme', nextTheme);
  updateThemeLabel();
});

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.main-nav');
menuButton.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', isOpen);
  menuButton.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
});
navigation.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  navigation.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Abrir menu');
}));

const searchTrigger = document.querySelector('.search-trigger');
const searchPanel = document.querySelector('.search-panel');
const searchInput = document.querySelector('#search-input');
const searchClose = document.querySelector('.search-close');
const searchMessage = document.querySelector('.search-message');
const searchableItems = [...document.querySelectorAll('.searchable')];

function closeSearch() {
  searchPanel.classList.remove('is-open');
  searchPanel.setAttribute('aria-hidden', 'true');
  searchTrigger.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('search-open');
  searchInput.value = '';
  searchableItems.forEach((item) => (item.hidden = false));
}

searchTrigger.addEventListener('click', () => {
  searchPanel.classList.add('is-open');
  searchPanel.setAttribute('aria-hidden', 'false');
  searchTrigger.setAttribute('aria-expanded', 'true');
  document.body.classList.add('search-open');
  searchInput.focus();
});
searchClose.addEventListener('click', closeSearch);
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeSearch(); });
searchInput.addEventListener('input', () => {
  const term = searchInput.value.trim().toLowerCase();
  const matchingArticles = articles.filter((article) => `${article.title} ${article.category} ${article.description}`.toLowerCase().includes(term));
  searchMessage.textContent = term ? `${matchingArticles.length} resultado(s) encontrado(s). Feche a busca para ver os cards filtrados.` : 'Pesquise entre as curiosidades desta página.';
  searchableItems.forEach((item) => { item.hidden = term && !item.dataset.search.toLowerCase().includes(term); });
});
