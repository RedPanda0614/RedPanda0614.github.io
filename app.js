'use strict';

// Preserve the static snapshot until every API page succeeds. Featured links appear only once.
const account = 'RedPanda0614';
const featuredNames = new Set(['oc-sheet', 'PeoplesDaily-RAG', 'BirdStopover-xgboost']);
const descriptions = {
  'oc-sheet': 'Identity-preserving anime expression generation with fine-tuned IP-Adapter and candidate reranking.',
  'MelodyMuse': 'Lyrics collection and retrieval over the NetEase Cloud Music catalog.',
  'PeoplesDaily-RAG': 'News question answering with BM25 retrieval, GTE paragraph reranking, and GPT-4 Turbo.',
  'MovieRoundTable-DB': 'A Django and MySQL film information system built around IMDb and Douban data.',
  'BirdStopover-xgboost': 'Bird migration stopover modeling with XGBoost and SHAP analysis.'
};

function element(tag, className, content) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (content !== undefined) node.textContent = content;
  return node;
}

function repositoryRow(repo) {
  const row = element('a', 'repo-row');
  row.href = `https://github.com/${account}/${encodeURIComponent(repo.name)}`;
  row.target = '_blank';
  row.rel = 'noopener noreferrer';
  const text = element('div', 'repo-text');
  text.append(element('h4', '', repo.name));
  const description = descriptions[repo.name] || repo.description;
  if (description) text.append(element('p', '', description));
  const arrow = element('span', 'arrow', '↗');
  arrow.setAttribute('aria-hidden', 'true');
  row.append(text, element('span', 'repo-language', repo.language || ''), arrow);
  return row;
}

async function refreshRepositories() {
  const status = document.getElementById('repo-status');
  const snapshotLabel = status.textContent;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  try {
    const repositories = [];
    for (let page = 1; ; page += 1) {
      const response = await fetch(`https://api.github.com/users/${account}/repos?type=owner&sort=updated&per_page=100&page=${page}`, {
        signal: controller.signal,
        headers: { Accept: 'application/vnd.github+json' }
      });
      if (!response.ok) throw new Error(`GitHub returned ${response.status}`);
      const batch = await response.json();
      if (!Array.isArray(batch) || batch.some(repo => !repo || typeof repo.name !== 'string')) {
        throw new Error('Unexpected repository response');
      }
      repositories.push(...batch);
      if (batch.length < 100) break;
    }
    const others = repositories.filter(repo => !featuredNames.has(repo.name));
    const fragment = document.createDocumentFragment();
    if (others.length === 0) {
      fragment.append(element('p', 'small', 'No additional public repositories.'));
    } else {
      others.forEach(repo => fragment.append(repositoryRow(repo)));
    }
    document.getElementById('repo-list').replaceChildren(fragment);
    document.getElementById('repo-count').textContent = repositories.length;
    document.getElementById('other-count').textContent = others.length;
    status.textContent = 'Updated ' + new Intl.DateTimeFormat('en', {
      month: 'short', day: 'numeric', year: 'numeric'
    }).format(new Date());
  } catch {
    status.textContent = `${snapshotLabel} · Offline copy`;
  } finally {
    clearTimeout(timeout);
  }
}

document.getElementById('year').textContent = new Date().getFullYear();
refreshRepositories();

// Highlight the section nearest the top without changing scroll or keyboard focus.
const sectionLinks = [...document.querySelectorAll('.section-nav a')];
const sections = sectionLinks.map(link => document.querySelector(link.getAttribute('href')));
let scrollQueued = false;
function updateCurrentSection() {
  let current = sections[0];
  sections.forEach(section => {
    if (section.getBoundingClientRect().top <= 145) current = section;
  });
  if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 3) current = sections[sections.length - 1];
  sectionLinks.forEach(link => {
    if (link.getAttribute('href') === `#${current.id}`) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
  scrollQueued = false;
}
window.addEventListener('scroll', () => {
  if (!scrollQueued) { requestAnimationFrame(updateCurrentSection); scrollQueued = true; }
}, {passive: true});
updateCurrentSection();
