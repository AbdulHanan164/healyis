// ─────────────────────────────────────────────
//  Healyis — Main Application Logic
// ─────────────────────────────────────────────

const App = (() => {

  // ── State ──────────────────────────────────
  let bookmarks = JSON.parse(localStorage.getItem('healyis_bookmarks') || '[]');
  let searchTimeout = null;

  // ── Toast Notifications ─────────────────────
  function toast(message, type = 'info', duration = 3000) {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }
    const t = document.createElement('div');
    t.className = `toast ${type}`;
    const icons = { success: '✅', info: 'ℹ️', warning: '⚠️' };
    t.innerHTML = `<span>${icons[type] || 'ℹ️'}</span> ${message}`;
    container.appendChild(t);
    setTimeout(() => {
      t.classList.add('out');
      setTimeout(() => t.remove(), 300);
    }, duration);
  }

  // ── Bookmarks ───────────────────────────────
  function toggleBookmark(postId, btn) {
    const idx = bookmarks.indexOf(postId);
    if (idx === -1) {
      bookmarks.push(postId);
      btn.textContent = '🔖';
      btn.classList.add('active');
      toast('Saved to bookmarks!', 'success');
    } else {
      bookmarks.splice(idx, 1);
      btn.textContent = '🔖';
      btn.classList.remove('active');
      toast('Removed from bookmarks');
    }
    localStorage.setItem('healyis_bookmarks', JSON.stringify(bookmarks));
    updateAllBookmarkButtons();
  }

  function updateAllBookmarkButtons() {
    document.querySelectorAll('.bookmark-btn').forEach(btn => {
      const id = btn.dataset.postId;
      if (bookmarks.includes(id)) {
        btn.classList.add('active');
        btn.title = 'Saved';
      } else {
        btn.classList.remove('active');
        btn.title = 'Save for later';
      }
    });
  }

  // ── Render Post Cards ────────────────────────
  function renderPostCard(post, featured = false) {
    const isBookmarked = bookmarks.includes(post.id);
    const catClass = post.category.toLowerCase().replace(' ', '');
    return `
      <article class="post-card${featured ? ' featured' : ''} fade-up" onclick="App.openPost('${post.id}')">
        <div class="card-hero" style="background:${post.heroColor}">
          <span style="position:relative;z-index:1">${post.heroIcon}</span>
          <span class="card-category-badge">${post.category}</span>
          ${featured ? '<span class="featured-badge">⭐ Featured</span>' : ''}
          <button class="bookmark-btn ${isBookmarked ? 'active' : ''}"
            data-post-id="${post.id}"
            onclick="event.stopPropagation(); App.handleBookmark('${post.id}', this)"
            title="${isBookmarked ? 'Saved' : 'Save for later'}">🔖</button>
        </div>
        <div class="card-body">
          <div class="card-meta">
            <span>📅 ${formatDate(post.date)}</span>
            <span>⏱ ${post.readTime} read</span>
          </div>
          <h2 class="card-title">${post.title}</h2>
          <p class="card-subtitle">${post.subtitle}</p>
          <div class="card-footer">
            <div class="author-mini">
              <div class="avatar-sm">${post.author.avatar}</div>
              <span class="author-mini-name">${post.author.name}</span>
            </div>
            <span class="read-more-btn">Read more →</span>
          </div>
        </div>
      </article>`;
  }

  // ── Post Grid (Home Page) ────────────────────
  function renderPostGrid(filter = 'All') {
    const grid = document.getElementById('postsGrid');
    if (!grid) return;

    let filtered = filter === 'All'
      ? POSTS
      : POSTS.filter(p => p.category === filter);

    if (!filtered.length) {
      grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1">
        <div class="empty-state-icon">🔍</div>
        <h3>No posts in this category yet</h3>
        <p>Check back soon — we publish daily!</p>
      </div>`;
      return;
    }

    grid.innerHTML = filtered.map((p, i) => renderPostCard(p, i === 0 && filter === 'All')).join('');
    observeFadeUps();
  }

  // ── Filter Buttons ───────────────────────────
  function initFilters() {
    const bar = document.getElementById('filterBar');
    if (!bar) return;

    const categories = ['All', ...new Set(POSTS.map(p => p.category))];
    bar.innerHTML = categories.map(c =>
      `<button class="filter-btn ${c === 'All' ? 'active' : ''}"
        onclick="App.setFilter('${c}', this)">${c}</button>`
    ).join('');
  }

  function setFilter(cat, btn) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderPostGrid(cat);
  }

  // ── Open Post ─────────────────────────────────
  function openPost(postId) {
    window.location.href = `post.html#${postId}`;
  }

  // ── Render Single Post (post.html) ───────────
  function renderPost() {
    const postId = window.location.hash.slice(1);
    const post = POSTS.find(p => p.id === postId);
    const container = document.getElementById('postContainer');
    if (!container) return;

    if (!post) {
      container.innerHTML = `<div class="empty-state">
        <div class="empty-state-icon">😕</div>
        <h3>Post not found</h3>
        <p><a href="index.html">← Back to home</a></p>
      </div>`;
      return;
    }

    document.title = `${post.title} | Healyis`;
    const catClass = post.category.toLowerCase();
    const isBookmarked = bookmarks.includes(post.id);

    container.innerHTML = `
      <div class="container">
        <button class="back-btn" onclick="history.back()">← Back</button>

        <div class="post-layout">
          <!-- Main Content -->
          <main>
            <div class="post-hero" style="background:${post.heroColor}">
              <span style="font-size:5rem">${post.heroIcon}</span>
            </div>

            <div class="post-header">
              <div class="post-cats">
                <span class="tag ${catClass}">${post.category}</span>
                ${post.tags.slice(0,3).map(t => `<span class="tag">${t}</span>`).join('')}
              </div>
              <h1 class="post-title">${post.title}</h1>
              <p class="post-subtitle">${post.subtitle}</p>
            </div>

            <div class="post-meta-bar">
              <div class="author-info">
                <div class="avatar">${post.author.avatar}</div>
                <div>
                  <div class="author-name">${post.author.name}</div>
                  <div class="author-cred">${post.author.credentials}</div>
                </div>
              </div>
              <span class="meta-divider">|</span>
              <span class="meta-item">📅 ${formatDate(post.date)}</span>
              <span class="meta-item">⏱ ${post.readTime} read</span>
              <div class="post-actions-bar">
                <button class="btn btn-ghost btn-sm bookmark-btn ${isBookmarked ? 'active' : ''}"
                  data-post-id="${post.id}"
                  onclick="App.handleBookmark('${post.id}', this)">
                  🔖 ${isBookmarked ? 'Saved' : 'Save'}
                </button>
              </div>
            </div>

            <div class="medical-disclaimer">
              <span class="disclaimer-icon">⚕️</span>
              <span><strong>Educational Content Only.</strong> This article is for informational purposes and does not constitute medical advice. Always consult a qualified healthcare professional for diagnosis and treatment.</span>
            </div>

            <div class="post-content" style="margin-top:28px">
              ${post.content}
            </div>

            <!-- Social Share -->
            <div style="margin-top:32px">
              <h3 style="font-family:'Inter',sans-serif;font-size:.9rem;margin-bottom:12px;color:var(--text-muted);font-weight:600;text-transform:uppercase;letter-spacing:.05em">Share this article</h3>
              <div class="social-share">
                <button class="share-btn whatsapp" onclick="App.share('whatsapp','${post.id}')">📱 WhatsApp</button>
                <button class="share-btn twitter"  onclick="App.share('twitter','${post.id}')">🐦 Twitter</button>
                <button class="share-btn copy"     onclick="App.copyLink()">🔗 Copy Link</button>
              </div>
            </div>

            <!-- References -->
            <div class="references-section">
              <h3>📚 References</h3>
              <ul class="ref-list">
                ${post.references.map(r => `<li><a href="${r.url}" target="_blank" rel="noopener">${r.text}</a></li>`).join('')}
              </ul>
            </div>
          </main>

          <!-- Sidebar -->
          <aside class="sidebar">
            <!-- Quick Facts -->
            <div class="sidebar-card">
              <h3>⚡ Quick Facts</h3>
              <div class="quick-fact-section">
                <div class="quick-fact-label">Symptoms at a Glance</div>
                <ul class="quick-fact-list">
                  ${post.quickFacts.symptoms.map(s => `<li>${s}</li>`).join('')}
                </ul>
              </div>
              <div class="quick-fact-section">
                <div class="quick-fact-label">Common Risk Factors</div>
                <ul class="quick-fact-list">
                  ${post.quickFacts.riskFactors.map(r => `<li>${r}</li>`).join('')}
                </ul>
              </div>
              <div class="quick-fact-section">
                <div class="quick-fact-label">When to See a Doctor</div>
                <div class="when-doctor">🩺 ${post.quickFacts.whenToSeeDoctor}</div>
              </div>
            </div>

            <!-- Quiz -->
            <div class="sidebar-card">
              <h3>🧠 Test Your Knowledge</h3>
              <div id="quizMount"></div>
            </div>

            <!-- Related Posts -->
            <div class="sidebar-card">
              <h3>📖 Related Articles</h3>
              ${POSTS.filter(p => p.id !== post.id && p.category === post.category).slice(0,2)
                .map(p => `
                  <div onclick="App.openPost('${p.id}')" style="cursor:pointer;padding:12px 0;border-bottom:1px solid var(--border);display:flex;gap:12px;align-items:center">
                    <div style="width:40px;height:40px;border-radius:10px;background:${p.heroColor};display:flex;align-items:center;justify-content:center;font-size:1.3rem;flex-shrink:0">${p.heroIcon}</div>
                    <div>
                      <div style="font-size:.85rem;font-weight:600;color:var(--text);line-height:1.3">${p.title}</div>
                      <div style="font-size:.75rem;color:var(--text-muted)">${p.readTime} read</div>
                    </div>
                  </div>`).join('') ||
                POSTS.filter(p => p.id !== post.id).slice(0,2).map(p => `
                  <div onclick="App.openPost('${p.id}')" style="cursor:pointer;padding:12px 0;border-bottom:1px solid var(--border);display:flex;gap:12px;align-items:center">
                    <div style="width:40px;height:40px;border-radius:10px;background:${p.heroColor};display:flex;align-items:center;justify-content:center;font-size:1.3rem;flex-shrink:0">${p.heroIcon}</div>
                    <div>
                      <div style="font-size:.85rem;font-weight:600;color:var(--text);line-height:1.3">${p.title}</div>
                      <div style="font-size:.75rem;color:var(--text-muted)">${p.readTime} read</div>
                    </div>
                  </div>`).join('')}
            </div>
          </aside>
        </div>
      </div>`;

    // Mount quiz into sidebar
    if (post.quizId && QUIZZES[post.quizId]) {
      QuizEngine.mount('quizMount', QUIZZES[post.quizId]);
    }

    observeFadeUps();
  }

  // ── Search ────────────────────────────────────
  function initSearch() {
    const input  = document.getElementById('navSearch');
    const dropdown = document.getElementById('searchDropdown');
    if (!input || !dropdown) return;

    input.addEventListener('input', () => {
      clearTimeout(searchTimeout);
      const q = input.value.trim().toLowerCase();
      if (!q) { dropdown.classList.add('hidden'); return; }
      searchTimeout = setTimeout(() => doSearch(q, dropdown), 200);
    });

    input.addEventListener('focus', () => {
      if (input.value.trim()) doSearch(input.value.trim().toLowerCase(), dropdown);
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.nav-search-wrap')) dropdown.classList.add('hidden');
    });
  }

  function doSearch(q, dropdown) {
    const results = POSTS.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.subtitle.toLowerCase().includes(q) ||
      p.tags.some(t => t.includes(q)) ||
      p.category.toLowerCase().includes(q)
    ).slice(0, 6);

    // Also search glossary
    const glossResults = GLOSSARY.filter(g =>
      g.term.toLowerCase().includes(q) ||
      g.definition.toLowerCase().includes(q)
    ).slice(0, 3);

    if (!results.length && !glossResults.length) {
      dropdown.innerHTML = `<div style="padding:20px;text-align:center;color:var(--text-muted);font-size:.875rem">No results for "${q}"</div>`;
    } else {
      dropdown.innerHTML =
        results.map(p => `
          <a class="search-result-item" href="post.html#${p.id}">
            <span class="search-result-icon">${p.heroIcon}</span>
            <div class="search-result-info">
              <h4>${highlight(p.title, q)}</h4>
              <p>${p.category} · ${p.readTime} read</p>
            </div>
          </a>`).join('') +
        glossResults.map(g => `
          <a class="search-result-item" href="glossary.html#${g.term}">
            <span class="search-result-icon">📖</span>
            <div class="search-result-info">
              <h4>${highlight(g.term, q)}</h4>
              <p>Glossary · ${g.category}</p>
            </div>
          </a>`).join('');
    }
    dropdown.classList.remove('hidden');
  }

  function highlight(text, q) {
    const re = new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return text.replace(re, '<mark style="background:#fef08a;border-radius:2px">$1</mark>');
  }

  // ── Mobile Nav ────────────────────────────────
  function initMobileNav() {
    const btn   = document.getElementById('mobileMenuBtn');
    const nav   = document.getElementById('mobileNav');
    const close = document.getElementById('mobileNavClose');
    if (!btn || !nav) return;
    btn.addEventListener('click',   () => nav.classList.add('open'));
    close?.addEventListener('click', () => nav.classList.remove('open'));
  }

  // ── Share ─────────────────────────────────────
  function share(platform, postId) {
    const post = POSTS.find(p => p.id === postId);
    const url  = `${window.location.origin}${window.location.pathname.replace('post.html', '')}post.html#${postId}`;
    const text = `Check out this article on ${post?.title} at Healyis — your daily medical deep dive!`;
    const urls = {
      whatsapp: `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`,
      twitter:  `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
    };
    window.open(urls[platform], '_blank', 'width=600,height=400');
  }

  function copyLink() {
    navigator.clipboard.writeText(window.location.href)
      .then(() => toast('Link copied to clipboard!', 'success'))
      .catch(() => toast('Could not copy — try manually'));
  }

  // ── Intersection Observer for animations ──────
  function observeFadeUps() {
    const els = document.querySelectorAll('.fade-up');
    if (!('IntersectionObserver' in window)) {
      els.forEach(el => el.classList.add('visible'));
      return;
    }
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
    }, { threshold: 0.1 });
    els.forEach(el => obs.observe(el));
  }

  // ── Newsletter Form ───────────────────────────
  function initNewsletter() {
    const form = document.getElementById('newsletterForm');
    if (!form) return;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = form.querySelector('input[type=email]').value;
      if (email) {
        toast(`🎉 You're subscribed! Daily doses coming to ${email}`, 'success', 4000);
        form.reset();
      }
    });
  }

  // ── Helpers ───────────────────────────────────
  function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  }

  // ── Public API ────────────────────────────────
  function handleBookmark(postId, btn) { toggleBookmark(postId, btn); }

  function init() {
    initSearch();
    initMobileNav();
    initNewsletter();
    updateAllBookmarkButtons();
    observeFadeUps();

    // Page-specific init
    const page = document.body.dataset.page;
    if (page === 'home')     { initFilters(); renderPostGrid(); }
    if (page === 'post')     { renderPost(); }
    if (page === 'quiz-hub') { QuizHub.render(); }
    if (page === 'glossary') { Glossary.render(); }
    if (page === 'resources'){ Resources.render(); }
  }

  return { init, renderPostGrid, setFilter, openPost, handleBookmark, share, copyLink, observeFadeUps, formatDate };
})();

// ─────────────────────────────────────────────
//  Quiz Hub
// ─────────────────────────────────────────────
const QuizHub = (() => {
  function render() {
    const grid = document.getElementById('quizHubGrid');
    if (!grid) return;

    const scores = JSON.parse(localStorage.getItem('healyis_quiz_scores') || '{}');

    grid.innerHTML = Object.entries(QUIZZES).map(([id, quiz]) => {
      const post  = POSTS.find(p => p.id === quiz.postId);
      const score = scores[id];
      const hasScore = score !== undefined;
      return `
        <div class="quiz-hub-card fade-up" onclick="QuizHub.openModal('${id}')">
          <div class="quiz-card-icon" style="background:${post?.heroColor || 'var(--bg)'}">
            ${post?.heroIcon || '❓'}
          </div>
          <span class="tag ${(post?.category || 'general').toLowerCase().replace(' ','')}" style="margin-bottom:12px;width:fit-content">${post?.category || 'General'}</span>
          <h3>${quiz.title}</h3>
          <p>${quiz.description}</p>
          <div class="quiz-card-footer">
            <span class="quiz-score-badge ${hasScore ? 'has-score' : ''}">
              ${hasScore ? `✅ Best: ${score}/${quiz.questions.length}` : `${quiz.questions.length} Questions`}
            </span>
            <button class="btn btn-primary btn-sm">${hasScore ? 'Retake' : 'Start Quiz'}</button>
          </div>
        </div>`;
    }).join('');

    App.observeFadeUps();
  }

  function openModal(quizId) {
    const quiz = QUIZZES[quizId];
    if (!quiz) return;
    const overlay = document.getElementById('quizModal');
    const title   = document.getElementById('quizModalTitle');
    const body    = document.getElementById('quizModalBody');
    if (!overlay) return;
    title.textContent = quiz.title;
    body.innerHTML = '';
    QuizEngine.mount('quizModalBody', quiz);
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    const overlay = document.getElementById('quizModal');
    overlay?.classList.remove('open');
    document.body.style.overflow = '';
  }

  return { render, openModal, closeModal };
})();

// ─────────────────────────────────────────────
//  Glossary
// ─────────────────────────────────────────────
const Glossary = (() => {
  let currentFilter = 'All';
  let searchQ = '';

  function render() {
    renderAZ();
    renderTerms();

    const searchEl = document.getElementById('glossarySearch');
    searchEl?.addEventListener('input', (e) => {
      searchQ = e.target.value.trim().toLowerCase();
      renderTerms();
    });
  }

  function renderAZ() {
    const container = document.getElementById('azFilter');
    if (!container) return;
    const letters = [...new Set(GLOSSARY.map(g => g.term[0].toUpperCase()))].sort();
    container.innerHTML =
      `<button class="az-btn all active" onclick="Glossary.filterAZ('All', this)">All</button>` +
      letters.map(l =>
        `<button class="az-btn" onclick="Glossary.filterAZ('${l}', this)">${l}</button>`
      ).join('');
  }

  function filterAZ(letter, btn) {
    currentFilter = letter;
    document.querySelectorAll('.az-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderTerms();
  }

  function renderTerms() {
    const container = document.getElementById('glossaryContent');
    if (!container) return;

    let items = GLOSSARY.filter(g => {
      const matchLetter = currentFilter === 'All' || g.term[0].toUpperCase() === currentFilter;
      const matchSearch = !searchQ ||
        g.term.toLowerCase().includes(searchQ) ||
        g.definition.toLowerCase().includes(searchQ) ||
        g.category.toLowerCase().includes(searchQ);
      return matchLetter && matchSearch;
    });

    if (!items.length) {
      container.innerHTML = `<div class="no-results"><span style="font-size:3rem">🔍</span><p style="margin-top:12px">No terms found for "${searchQ}"</p></div>`;
      return;
    }

    // Group by first letter
    const grouped = items.reduce((acc, g) => {
      const letter = g.term[0].toUpperCase();
      (acc[letter] = acc[letter] || []).push(g);
      return acc;
    }, {});

    container.innerHTML = Object.entries(grouped).sort(([a],[b]) => a.localeCompare(b)).map(([letter, terms]) => `
      <div class="glossary-section" id="${letter}">
        <div class="glossary-letter-header">${letter}</div>
        <ul class="glossary-list">
          ${terms.map(g => `
            <li class="glossary-item" id="${g.term}">
              <div class="glossary-term">${searchQ ? highlight(g.term, searchQ) : g.term}</div>
              <div class="glossary-def">${searchQ ? highlight(g.definition, searchQ) : g.definition}</div>
              <span class="tag ${g.category.toLowerCase().replace(' ','')} glossary-cat">${g.category}</span>
            </li>`).join('')}
        </ul>
      </div>`).join('');

    // Scroll to anchor if present
    const anchor = window.location.hash.slice(1);
    if (anchor) {
      setTimeout(() => document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 100);
    }
  }

  function highlight(text, q) {
    const re = new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return text.replace(re, '<mark style="background:#fef08a;border-radius:2px">$1</mark>');
  }

  return { render, filterAZ };
})();

// ─────────────────────────────────────────────
//  Resources
// ─────────────────────────────────────────────
const Resources = (() => {
  function render() {
    const grid = document.getElementById('resourcesGrid');
    if (!grid) return;
    grid.innerHTML = RESOURCES.map(r => `
      <div class="resource-card fade-up">
        <div class="resource-icon-wrap">${r.icon}</div>
        <div class="resource-type">${r.type} · ${r.category}</div>
        <h3>${r.title}</h3>
        <p>${r.description}</p>
        <div class="resource-footer">
          <span class="resource-meta">📄 ${r.pages} page${r.pages > 1 ? 's' : ''} · PDF</span>
          <button class="download-btn" onclick="Resources.download('${r.id}','${r.title}')">
            ⬇ Download
          </button>
        </div>
      </div>`).join('');
    App.observeFadeUps();
  }

  function download(id, title) {
    // Generate a simple PDF-like text content in a Blob for demo
    const content = generatePDFContent(RESOURCES.find(r => r.id === id));
    const blob = new Blob([content], { type: 'text/plain' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = `Healyis_${title.replace(/\s+/g,'_')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    App.toast ? App.toast(`Downloading: ${title}`, 'success') : alert(`Downloading: ${title}`);
  }

  function generatePDFContent(resource) {
    if (!resource) return '';
    return `
═══════════════════════════════════════════════════════════
  HEALYIS — ${resource.title.toUpperCase()}
  Category: ${resource.category} | Type: ${resource.type}
═══════════════════════════════════════════════════════════

${resource.description}

─────────────────────────────────────────────────────────
  ⚕️ MEDICAL DISCLAIMER
─────────────────────────────────────────────────────────
This document is for educational and informational purposes
only and does not constitute medical advice. Always consult
a qualified healthcare professional for diagnosis and
treatment decisions.

─────────────────────────────────────────────────────────
  📋 CONTENT PLACEHOLDER
─────────────────────────────────────────────────────────
[This is a demonstration download from Healyis. In the
 full production version, this would be a professionally
 formatted PDF with all relevant clinical checklists,
 tracking tables, and patient-friendly guidance.]

─────────────────────────────────────────────────────────
  🌐 Healyis.com — Your Daily Medical Deep Dive
  © ${new Date().getFullYear()} Healyis. All rights reserved.
─────────────────────────────────────────────────────────
`;
  }

  return { render, download };
})();

// Boot when DOM is ready
document.addEventListener('DOMContentLoaded', App.init);
