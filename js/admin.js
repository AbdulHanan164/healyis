// ─────────────────────────────────────────────
//  Healyis — Admin Module
// ─────────────────────────────────────────────

const Admin = (() => {

  const CUSTOM_POSTS_KEY   = 'healyis_custom_posts';
  const CUSTOM_QUIZZES_KEY = 'healyis_custom_quizzes';
  const POST_OVERRIDES_KEY = 'healyis_post_overrides';
  const QUIZ_OVERRIDES_KEY = 'healyis_quiz_overrides';

  // ── Data helpers ───────────────────────────
  function getCustomPosts()     { return JSON.parse(localStorage.getItem(CUSTOM_POSTS_KEY)   || '[]'); }
  function saveCustomPosts(p)   { localStorage.setItem(CUSTOM_POSTS_KEY,   JSON.stringify(p)); }
  function getCustomQuizzes()   { return JSON.parse(localStorage.getItem(CUSTOM_QUIZZES_KEY) || '[]'); }
  function saveCustomQuizzes(q) { localStorage.setItem(CUSTOM_QUIZZES_KEY, JSON.stringify(q)); }
  function getPostOverrides()   { return JSON.parse(localStorage.getItem(POST_OVERRIDES_KEY) || '{}'); }
  function savePostOverrides(o) { localStorage.setItem(POST_OVERRIDES_KEY, JSON.stringify(o)); }
  function getQuizOverrides()   { return JSON.parse(localStorage.getItem(QUIZ_OVERRIDES_KEY) || '{}'); }
  function saveQuizOverrides(o) { localStorage.setItem(QUIZ_OVERRIDES_KEY, JSON.stringify(o)); }

  // All posts (builtin + overrides + custom)
  function getAllAdminPosts() {
    const overrides  = getPostOverrides();
    const custom     = getCustomPosts();
    const customIds  = new Set(custom.map(p => p.id));
    const builtin    = (typeof POSTS !== 'undefined' ? POSTS : [])
      .filter(p => !customIds.has(p.id))
      .map(p => overrides[p.id] ? { ...p, ...overrides[p.id] } : p);
    return [...custom, ...builtin];
  }

  // All quizzes (builtin + overrides + custom)
  function getAllAdminQuizzes() {
    const overrides   = getQuizOverrides();
    const custom      = getCustomQuizzes();
    const customIds   = new Set(custom.map(q => q.id));
    const builtinArr  = (typeof QUIZZES !== 'undefined')
      ? Object.entries(QUIZZES).map(([id, q]) => ({ id, ...q }))
      : [];
    const builtin = builtinArr
      .filter(q => !customIds.has(q.id))
      .map(q => overrides[q.id] ? { ...q, ...overrides[q.id] } : q);
    return [...custom, ...builtin];
  }

  // ── Post CRUD ──────────────────────────────
  function createPost(data) {
    const posts = getCustomPosts();
    const post  = {
      id: 'custom-' + Date.now(),
      ...data,
      date: new Date().toISOString().split('T')[0],
      readTime: Math.ceil((data.content || '').split(' ').length / 200) + ' min',
      isCustom: true
    };
    posts.unshift(post);
    saveCustomPosts(posts);
    return post;
  }

  function updateCustomPost(id, data) {
    saveCustomPosts(getCustomPosts().map(p => p.id === id ? { ...p, ...data } : p));
  }

  function updateBuiltinPost(id, data) {
    const overrides = getPostOverrides();
    overrides[id] = { ...overrides[id], ...data };
    savePostOverrides(overrides);
  }

  function deletePost(id) {
    saveCustomPosts(getCustomPosts().filter(p => p.id !== id));
    // Also clear any override
    const overrides = getPostOverrides();
    delete overrides[id];
    savePostOverrides(overrides);
  }

  // ── Quiz CRUD ──────────────────────────────
  function createQuiz(data) {
    const quizzes = getCustomQuizzes();
    const quiz = { id: 'quiz-custom-' + Date.now(), ...data, isCustom: true };
    quizzes.unshift(quiz);
    saveCustomQuizzes(quizzes);
    return quiz;
  }

  function updateCustomQuiz(id, data) {
    saveCustomQuizzes(getCustomQuizzes().map(q => q.id === id ? { ...q, ...data } : q));
  }

  function updateBuiltinQuiz(id, data) {
    const overrides = getQuizOverrides();
    overrides[id] = { ...overrides[id], ...data };
    saveQuizOverrides(overrides);
  }

  function deleteQuiz(id) {
    saveCustomQuizzes(getCustomQuizzes().filter(q => q.id !== id));
    const overrides = getQuizOverrides();
    delete overrides[id];
    saveQuizOverrides(overrides);
  }

  // ── Panel switching ────────────────────────
  let currentPanel = 'dashboard';

  function showPanel(name) {
    currentPanel = name;
    document.querySelectorAll('.admin-panel').forEach(p => p.classList.add('hidden'));
    const panel = document.getElementById('panel-' + name);
    if (panel) panel.classList.remove('hidden');

    document.querySelectorAll('.sidebar-link').forEach(l => {
      l.classList.toggle('active', l.dataset.panel === name);
    });

    const titles = { dashboard:'Dashboard', posts:'Blog Posts', quizzes:'Quizzes', users:'Users' };
    const titleEl = document.getElementById('adminPageTitle');
    if (titleEl) titleEl.textContent = titles[name] || name;

    if (name === 'dashboard') renderDashboard();
    if (name === 'posts')     renderPostsTable();
    if (name === 'quizzes')   renderQuizzesTable();
    if (name === 'users')     renderUsersTable();
  }

  // ── Dashboard ────────────────────────────
  function renderDashboard() {
    const allPosts   = getAllAdminPosts();
    const allQuizzes = getAllAdminQuizzes();
    const users      = Auth.getAllUsers();
    const scores     = JSON.parse(localStorage.getItem('healyis_quiz_scores') || '{}');
    const attempts   = Object.keys(scores).length;

    const el = id => document.getElementById(id);
    if (el('stat-posts'))    el('stat-posts').textContent    = allPosts.length;
    if (el('stat-quizzes'))  el('stat-quizzes').textContent  = allQuizzes.length;
    if (el('stat-users'))    el('stat-users').textContent    = users.length;
    if (el('stat-attempts')) el('stat-attempts').textContent = attempts;

    const recentEl = document.getElementById('recentPostsList');
    if (recentEl) {
      recentEl.innerHTML = allPosts.slice(0, 5).map(p => `
        <div class="recent-post-row">
          <div class="recent-post-icon" style="background:${p.heroColor || '#0d4f6c'};padding:8px;box-sizing:border-box">
            ${typeof p.heroIcon === 'string' && p.heroIcon.startsWith('<svg') ? p.heroIcon : `<svg viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.9)" stroke-width="2" stroke-linecap="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>`}
          </div>
          <div class="recent-post-info">
            <div class="recent-post-title">${escHtml(p.title)}</div>
            <div class="recent-post-meta">${p.category || ''} · ${p.date || ''}</div>
          </div>
          <span class="tag ${p.isCustom ? 'general' : 'cardiology'}" style="font-size:.65rem;flex-shrink:0">${p.isCustom ? 'Custom' : 'Built-in'}</span>
        </div>
      `).join('') || '<p style="color:var(--text-muted);text-align:center;padding:20px">No posts yet.</p>';
    }

    const quizzesEl = document.getElementById('recentQuizzesList');
    if (quizzesEl) {
      quizzesEl.innerHTML = allQuizzes.slice(0, 4).map(q => `
        <div class="recent-post-row">
          <div class="recent-post-icon" style="background:#6366f1;display:flex;align-items:center;justify-content:center">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="rgba(255,255,255,.9)" stroke-width="2" stroke-linecap="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>
          </div>
          <div class="recent-post-info">
            <div class="recent-post-title">${escHtml(q.title)}</div>
            <div class="recent-post-meta">${Array.isArray(q.questions) ? q.questions.length : 0} questions</div>
          </div>
          <button class="btn btn-sm btn-outline" style="font-size:.7rem;padding:3px 10px;flex-shrink:0" onclick="Admin.showPanel('quizzes');Admin.openQuizEditor('${q.id}')">Edit</button>
        </div>
      `).join('') || '<p style="color:var(--text-muted);text-align:center;padding:20px">No quizzes yet.</p>';
    }
  }

  // ── Posts table ────────────────────────────
  function renderPostsTable() {
    const tbody = document.getElementById('postsTableBody');
    if (!tbody) return;
    const all = getAllAdminPosts();

    tbody.innerHTML = all.length ? all.map(p => `
      <tr>
        <td>
          <div style="width:36px;height:36px;border-radius:8px;background:${p.heroColor || '#0d4f6c'};display:flex;align-items:center;justify-content:center;padding:7px;box-sizing:border-box">
            ${typeof p.heroIcon === 'string' && p.heroIcon.startsWith('<svg') ? p.heroIcon : `<svg viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.9)" stroke-width="2" stroke-linecap="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>`}
          </div>
        </td>
        <td><strong>${escHtml(p.title)}</strong></td>
        <td><span class="tag ${(p.category||'general').toLowerCase().replace(/\s+/g,'')}" style="font-size:.7rem">${p.category || '—'}</span></td>
        <td style="font-size:.82rem">${escHtml(typeof p.author === 'object' ? (p.author?.name || '—') : (p.author || '—'))}</td>
        <td style="font-size:.82rem">${p.date || '—'}</td>
        <td>
          <div style="display:flex;gap:6px">
            <button class="btn btn-sm btn-outline" onclick="Admin.openPostEditor('${p.id}')">Edit</button>
            ${p.isCustom ? `<button class="btn btn-sm" style="background:#ef444422;color:#ef4444;border:1px solid #ef444444" onclick="Admin.confirmDeletePost('${p.id}')">Delete</button>` : `<span class="tag" style="font-size:.65rem;padding:2px 8px">Built-in</span>`}
          </div>
        </td>
      </tr>
    `).join('') : '<tr><td colspan="6" style="text-align:center;color:var(--text-muted);padding:32px">No posts yet. Create your first post!</td></tr>';
  }

  // ── Quizzes table ──────────────────────────
  function renderQuizzesTable() {
    const tbody = document.getElementById('quizzesTableBody');
    if (!tbody) return;
    const all = getAllAdminQuizzes();

    tbody.innerHTML = all.length ? all.map(q => {
      const linkedPost = getAllAdminPosts().find(p => p.id === q.postId);
      return `
      <tr>
        <td><strong>${escHtml(q.title || q.id)}</strong></td>
        <td style="font-size:.82rem;color:var(--text-muted)">${escHtml(q.description || '—')}</td>
        <td style="font-size:.82rem">${linkedPost ? `<span class="tag cardiology" style="font-size:.65rem">${escHtml(linkedPost.title)}</span>` : `<span style="color:var(--text-muted)">—</span>`}</td>
        <td style="font-size:.82rem">${Array.isArray(q.questions) ? q.questions.length : '—'} questions</td>
        <td>
          <div style="display:flex;gap:6px">
            <button class="btn btn-sm btn-outline" onclick="Admin.openQuizEditor('${q.id}')">Edit</button>
            ${q.isCustom
              ? `<button class="btn btn-sm" style="background:#ef444422;color:#ef4444;border:1px solid #ef444444" onclick="Admin.confirmDeleteQuiz('${q.id}')">Delete</button>`
              : `<span class="tag" style="font-size:.65rem;padding:2px 8px">Built-in</span>`}
          </div>
        </td>
      </tr>`;
    }).join('') : '<tr><td colspan="5" style="text-align:center;color:var(--text-muted);padding:32px">No quizzes yet. Create your first quiz!</td></tr>';
  }

  // ── Users table ────────────────────────────
  function renderUsersTable() {
    const tbody = document.getElementById('usersTableBody');
    if (!tbody) return;
    const users = Auth.getAllUsers();

    tbody.innerHTML = users.length ? users.map(u => `
      <tr>
        <td>
          <div style="display:flex;align-items:center;gap:10px">
            <div class="nav-avatar" style="width:32px;height:32px;font-size:.7rem">${u.name.split(' ').map(n=>n[0]).join('').slice(0,2).toUpperCase()}</div>
            <strong>${escHtml(u.name)}</strong>
          </div>
        </td>
        <td style="font-size:.85rem">${escHtml(u.email)}</td>
        <td><span class="tag ${u.role === 'admin' ? 'cardiology' : 'general'}" style="font-size:.7rem">${u.role}</span></td>
        <td style="font-size:.82rem;color:var(--text-muted)">${u.createdAt || '—'}</td>
        <td>
          ${u.id !== 'admin-001'
            ? `<button class="btn btn-sm" style="background:#ef444422;color:#ef4444;border:1px solid #ef444444" onclick="Admin.confirmDeleteUser('${u.id}')">Remove</button>`
            : `<span style="color:var(--text-muted);font-size:.8rem">Protected</span>`}
        </td>
      </tr>
    `).join('') : '<tr><td colspan="5" style="text-align:center;color:var(--text-muted);padding:32px">No users yet.</td></tr>';
  }

  // ── Post editor modal ──────────────────────
  let editingPostId      = null;
  let editingPostBuiltin = false;

  // Category → auto SVG icon
  const CATEGORY_ICONS = {
    'Cardiology':         `<svg viewBox="0 0 24 24" fill="rgba(255,255,255,.9)"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>`,
    'Neurology':          `<svg viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.9)" stroke-width="2" stroke-linecap="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
    'Pulmonology':        `<svg viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.9)" stroke-width="2" stroke-linecap="round"><path d="M9.59 4.59A2 2 0 1111 8H2"/><path d="M10.73 19.41A2 2 0 1012.73 16H2"/><path d="M15.73 8.27A2.5 2.5 0 1117.5 12H2"/></svg>`,
    'Endocrinology':      `<svg viewBox="0 0 24 24" fill="rgba(255,255,255,.9)"><path d="M12 2C6.5 10 4 14.5 4 17a8 8 0 0016 0c0-2.5-2.5-7-8-15z"/></svg>`,
    'Oncology':           `<svg viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.9)" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/></svg>`,
    'Gastroenterology':   `<svg viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.9)" stroke-width="2" stroke-linecap="round"><path d="M12 2a7 7 0 017 7c0 5-7 13-7 13S5 14 5 9a7 7 0 017-7z"/></svg>`,
    'Dermatology':        `<svg viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.9)" stroke-width="2" stroke-linecap="round"><path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9"/><path d="M12 3v9l3-3"/></svg>`,
    'Psychiatry':         `<svg viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.9)" stroke-width="2" stroke-linecap="round"><path d="M9.5 2A2.5 2.5 0 017 4.5v0A2.5 2.5 0 014.5 7v0A2.5 2.5 0 012 9.5v5A2.5 2.5 0 004.5 17v0A2.5 2.5 0 007 19.5v0A2.5 2.5 0 009.5 22h5"/><path d="M14.5 22A2.5 2.5 0 0017 19.5v0A2.5 2.5 0 0019.5 17v0A2.5 2.5 0 0022 14.5v-5A2.5 2.5 0 0019.5 7v0A2.5 2.5 0 0017 4.5v0A2.5 2.5 0 0014.5 2"/></svg>`,
    'Infectious Disease': `<svg viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.9)" stroke-width="2" stroke-linecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
    'General':            `<svg viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.9)" stroke-width="2" stroke-linecap="round"><path d="M9 4h6v5h5v6h-5v5H9v-5H4V9h5z"/></svg>`
  };

  function getHeroIconForCategory(cat) {
    return CATEGORY_ICONS[cat] || CATEGORY_ICONS['General'];
  }

  function openPostEditor(id) {
    editingPostId      = id || null;
    editingPostBuiltin = false;
    const modal = document.getElementById('postEditorModal');
    if (!modal) return;

    if (id) {
      // Look in custom first, then built-in
      const overrides = getPostOverrides();
      const custom  = getCustomPosts().find(p => p.id === id);
      const builtin = (typeof POSTS !== 'undefined') ? POSTS.find(p => p.id === id) : null;
      const post    = custom || (builtin ? { ...builtin, ...(overrides[id] || {}) } : null);
      if (!post) { showAdminToast('Post not found', 'error'); return; }

      editingPostBuiltin = !!builtin && !custom;

      document.getElementById('postEditorTitle').value    = post.title || '';
      document.getElementById('postEditorCategory').value = post.category || 'General';
      document.getElementById('postEditorAuthor').value   = typeof post.author === 'object' ? (post.author?.name || '') : (post.author || '');
      document.getElementById('postEditorColor').value    = (post.heroColor || '#0d4f6c').replace(/linear-gradient[^)]+\)/,'#0d4f6c').match(/#[0-9a-fA-F]{6}/)?.[0] || '#0d4f6c';
      document.getElementById('postEditorExcerpt').value  = post.excerpt || post.subtitle || '';
      document.getElementById('postEditorContent').value  = post.content || '';
      document.getElementById('postEditorTags').value     = (post.tags || []).join(', ');
      document.getElementById('postEditorModalTitle').textContent = editingPostBuiltin ? 'Edit Built-in Post' : 'Edit Post';
    } else {
      document.getElementById('postEditorForm').reset();
      document.getElementById('postEditorColor').value = '#0d4f6c';
      document.getElementById('postEditorModalTitle').textContent = 'New Post';
    }
    modal.classList.remove('hidden');
  }

  function closePostEditor() {
    document.getElementById('postEditorModal')?.classList.add('hidden');
    editingPostId      = null;
    editingPostBuiltin = false;
  }

  function savePost() {
    const title    = document.getElementById('postEditorTitle').value.trim();
    const category = document.getElementById('postEditorCategory').value;
    const color    = document.getElementById('postEditorColor').value;
    const author   = document.getElementById('postEditorAuthor').value.trim();
    const excerpt  = document.getElementById('postEditorExcerpt').value.trim();
    const content  = document.getElementById('postEditorContent').value.trim();
    const tags     = document.getElementById('postEditorTags').value.split(',').map(t => t.trim()).filter(Boolean);

    if (!title)   { showAdminToast('Title is required', 'error'); return; }
    if (!content) { showAdminToast('Content is required', 'error'); return; }

    const heroGradients = {
      'Cardiology':         'linear-gradient(135deg,#0d4f6c 0%,#00b4d8 100%)',
      'Neurology':          'linear-gradient(135deg,#3a0ca3 0%,#7209b7 100%)',
      'Pulmonology':        'linear-gradient(135deg,#0a7c5c 0%,#52b788 100%)',
      'Endocrinology':      'linear-gradient(135deg,#7b2d8b 0%,#c77dff 100%)',
      'Oncology':           'linear-gradient(135deg,#7f1d1d 0%,#dc2626 100%)',
      'Gastroenterology':   'linear-gradient(135deg,#78350f 0%,#d97706 100%)',
      'Psychiatry':         'linear-gradient(135deg,#1e1b4b 0%,#6366f1 100%)',
      'Infectious Disease': 'linear-gradient(135deg,#14532d 0%,#16a34a 100%)',
      'Dermatology':        'linear-gradient(135deg,#831843 0%,#ec4899 100%)',
      'General':            'linear-gradient(135deg,#0d4f6c 0%,#00c2d4 100%)'
    };

    const data = {
      title, category, excerpt, content, tags,
      author:    { name: author, credentials: '', avatar: author.split(' ').map(n=>n[0]).join('').slice(0,2).toUpperCase() },
      heroColor: heroGradients[category] || `linear-gradient(135deg,${color} 0%,${color}cc 100%)`,
      heroIcon:  getHeroIconForCategory(category),
      readTime:  Math.ceil(content.split(' ').length / 200) + ' min'
    };

    if (editingPostId && editingPostBuiltin) {
      updateBuiltinPost(editingPostId, data);
      showAdminToast('Built-in post updated!');
    } else if (editingPostId) {
      updateCustomPost(editingPostId, data);
      showAdminToast('Post updated!');
    } else {
      createPost(data);
      showAdminToast('Post published!');
    }
    closePostEditor();
    renderPostsTable();
    if (currentPanel === 'dashboard') renderDashboard();
  }

  function confirmDeletePost(id) {
    if (confirm('Delete this post? This cannot be undone.')) {
      deletePost(id);
      renderPostsTable();
      showAdminToast('Post deleted.');
    }
  }

  // ── Quiz editor ────────────────────────────
  let editingQuizId      = null;
  let editingQuizBuiltin = false;
  let quizQuestions      = [];

  function openQuizEditor(id) {
    editingQuizId      = id || null;
    editingQuizBuiltin = false;
    quizQuestions      = [];

    const modal = document.getElementById('quizEditorModal');
    if (!modal) return;

    if (id) {
      const overrides = getQuizOverrides();
      const custom  = getCustomQuizzes().find(q => q.id === id);
      const builtin = (typeof QUIZZES !== 'undefined' && QUIZZES[id]) ? { id, ...QUIZZES[id] } : null;
      const quiz    = custom || (builtin ? { ...builtin, ...(overrides[id] || {}) } : null);
      if (!quiz) { showAdminToast('Quiz not found', 'error'); return; }

      editingQuizBuiltin = !!builtin && !custom;

      document.getElementById('quizEditorTitle').value       = quiz.title || '';
      document.getElementById('quizEditorDescription').value = quiz.description || '';
      document.getElementById('quizEditorPostId').value      = quiz.postId || '';
      quizQuestions = JSON.parse(JSON.stringify(quiz.questions || []));
      document.getElementById('quizEditorModalTitle').textContent = editingQuizBuiltin ? 'Edit Built-in Quiz' : 'Edit Quiz';
    } else {
      document.getElementById('quizEditorForm').reset();
      quizQuestions = [];
      document.getElementById('quizEditorModalTitle').textContent = 'New Quiz';
    }

    populatePostDropdown();
    renderQuizQuestionsEditor();
    modal.classList.remove('hidden');
  }

  function populatePostDropdown() {
    const sel = document.getElementById('quizEditorPostId');
    if (!sel) return;
    const current = sel.value;
    const posts = getAllAdminPosts();
    sel.innerHTML = `<option value="">— Not linked to a post —</option>` +
      posts.map(p => `<option value="${p.id}" ${p.id === current ? 'selected' : ''}>${escHtml(p.title)}</option>`).join('');
  }

  function closeQuizEditor() {
    document.getElementById('quizEditorModal')?.classList.add('hidden');
    editingQuizId      = null;
    editingQuizBuiltin = false;
    quizQuestions      = [];
  }

  function renderQuizQuestionsEditor() {
    const container = document.getElementById('quizQuestionsContainer');
    if (!container) return;
    if (quizQuestions.length === 0) {
      container.innerHTML = `<div style="text-align:center;padding:32px;color:var(--text-muted);border:2px dashed var(--border);border-radius:var(--radius)">No questions yet — click "+ Add Question" to begin.</div>`;
      return;
    }
    container.innerHTML = quizQuestions.map((q, qi) => `
      <div class="quiz-question-editor">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
          <strong style="font-size:.88rem;color:var(--text-muted)">QUESTION ${qi + 1}</strong>
          <button type="button" class="btn btn-sm" style="background:#ef444422;color:#ef4444;border:1px solid #ef444444;padding:4px 10px" onclick="Admin.removeQuestion(${qi})">Remove</button>
        </div>
        <input class="form-input" type="text" placeholder="Question text…" value="${escHtml(q.question || '')}" oninput="Admin.updateQuestion(${qi},'question',this.value)" style="margin-bottom:10px;font-weight:500" />
        <div style="font-size:.75rem;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--text-muted);margin-bottom:6px">Options — select the correct one</div>
        ${[0,1,2,3].map(oi => `
          <label style="display:flex;align-items:center;gap:10px;margin-bottom:6px;cursor:pointer;padding:8px 12px;border-radius:var(--radius-sm);border:1.5px solid ${q.correct === oi ? 'var(--primary)' : 'var(--border)'};background:${q.correct === oi ? 'rgba(13,79,108,.06)' : 'transparent'};transition:all .15s">
            <input type="radio" name="correct-${qi}" ${q.correct === oi ? 'checked' : ''} onchange="Admin.updateQuestion(${qi},'correct',${oi});Admin.renderQuizQuestionsEditor()" style="accent-color:var(--primary)" />
            <input class="form-input" type="text" placeholder="Option ${oi+1}" value="${escHtml((q.options && q.options[oi]) || '')}" oninput="Admin.updateOption(${qi},${oi},this.value)" style="flex:1;border:none;background:transparent;padding:0;font-size:.875rem" />
          </label>
        `).join('')}
        <textarea class="form-input" placeholder="Explanation shown after answering (optional)" rows="2" oninput="Admin.updateQuestion(${qi},'explanation',this.value)" style="margin-top:8px;font-size:.83rem">${escHtml(q.explanation || '')}</textarea>
      </div>
    `).join('');
  }

  function escHtml(s) {
    return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  function addQuestion() {
    quizQuestions.push({ question: '', options: ['','','',''], correct: 0, explanation: '' });
    renderQuizQuestionsEditor();
    setTimeout(() => {
      const c = document.getElementById('quizQuestionsContainer');
      c?.lastElementChild?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 50);
  }

  function removeQuestion(index) {
    quizQuestions.splice(index, 1);
    renderQuizQuestionsEditor();
  }

  function updateQuestion(index, field, value) {
    if (quizQuestions[index]) quizQuestions[index][field] = field === 'correct' ? Number(value) : value;
  }

  function updateOption(qIndex, oIndex, value) {
    if (quizQuestions[qIndex]) {
      if (!quizQuestions[qIndex].options) quizQuestions[qIndex].options = ['','','',''];
      quizQuestions[qIndex].options[oIndex] = value;
    }
  }

  function saveQuiz() {
    const title       = document.getElementById('quizEditorTitle').value.trim();
    const description = document.getElementById('quizEditorDescription').value.trim();
    const postId      = document.getElementById('quizEditorPostId').value.trim();

    if (!title) { showAdminToast('Quiz title is required', 'error'); return; }
    if (quizQuestions.length === 0) { showAdminToast('Add at least one question', 'error'); return; }

    for (let i = 0; i < quizQuestions.length; i++) {
      const q = quizQuestions[i];
      if (!q.question.trim()) { showAdminToast(`Q${i+1}: question text is required`, 'error'); return; }
      if (q.options.filter(o => o.trim()).length < 2) { showAdminToast(`Q${i+1}: at least 2 options required`, 'error'); return; }
    }

    const data = { title, description, postId, questions: quizQuestions };

    if (editingQuizId && editingQuizBuiltin) {
      updateBuiltinQuiz(editingQuizId, data);
      showAdminToast('Built-in quiz updated!');
    } else if (editingQuizId) {
      updateCustomQuiz(editingQuizId, data);
      showAdminToast('Quiz updated!');
    } else {
      createQuiz(data);
      showAdminToast('Quiz created!');
    }
    closeQuizEditor();
    renderQuizzesTable();
    if (currentPanel === 'dashboard') renderDashboard();
  }

  function confirmDeleteQuiz(id) {
    if (confirm('Delete this quiz? This cannot be undone.')) {
      deleteQuiz(id);
      renderQuizzesTable();
      showAdminToast('Quiz deleted.');
    }
  }

  // ── User management ────────────────────────
  function confirmDeleteUser(id) {
    if (confirm('Remove this user? This cannot be undone.')) {
      Auth.deleteUser(id);
      renderUsersTable();
      showAdminToast('User removed.');
    }
  }

  // ── Toast ──────────────────────────────────
  function showAdminToast(msg, type = 'success') {
    let container = document.querySelector('.toast-container');
    if (!container) { container = document.createElement('div'); container.className = 'toast-container'; document.body.appendChild(container); }
    const toast = document.createElement('div');
    toast.className = 'toast' + (type === 'error' ? ' toast-error' : '');
    const icon = type === 'error'
      ? `<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`
      : `<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>`;
    toast.innerHTML = `<span style="display:flex;align-items:center">${icon}</span> ${msg}`;
    container.appendChild(toast);
    setTimeout(() => { toast.classList.add('out'); setTimeout(() => toast.remove(), 300); }, 3000);
  }

  // ── Init ───────────────────────────────────
  function init() {
    if (!Auth.requireAdmin()) return;

    document.querySelectorAll('.sidebar-link[data-panel]').forEach(link => {
      link.addEventListener('click', e => { e.preventDefault(); showPanel(link.dataset.panel); });
    });

    document.querySelectorAll('.modal-backdrop').forEach(m => {
      m.addEventListener('click', e => {
        if (e.target === m) { closePostEditor(); closeQuizEditor(); }
      });
    });

    showPanel('dashboard');
  }

  return {
    init, showPanel,
    getAllAdminPosts, getAllAdminQuizzes,
    openPostEditor, closePostEditor, savePost, confirmDeletePost,
    openQuizEditor, closeQuizEditor, saveQuiz, confirmDeleteQuiz,
    addQuestion, removeQuestion, updateQuestion, updateOption,
    renderQuizQuestionsEditor,
    confirmDeleteUser,
    renderDashboard, renderPostsTable, renderQuizzesTable, renderUsersTable
  };
})();

document.addEventListener('DOMContentLoaded', Admin.init);
