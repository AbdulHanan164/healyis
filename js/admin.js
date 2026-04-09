// ─────────────────────────────────────────────
//  Healyis — Admin Module
// ─────────────────────────────────────────────

const Admin = (() => {

  const CUSTOM_POSTS_KEY   = 'healyis_custom_posts';
  const CUSTOM_QUIZZES_KEY = 'healyis_custom_quizzes';

  // ── Data helpers ───────────────────────────
  function getPosts()        { return JSON.parse(localStorage.getItem(CUSTOM_POSTS_KEY)   || '[]'); }
  function savePosts(p)      { localStorage.setItem(CUSTOM_POSTS_KEY,   JSON.stringify(p)); }
  function getQuizzes()      { return JSON.parse(localStorage.getItem(CUSTOM_QUIZZES_KEY) || '[]'); }
  function saveQuizzes(q)    { localStorage.setItem(CUSTOM_QUIZZES_KEY, JSON.stringify(q)); }

  // ── Post CRUD ──────────────────────────────
  function createPost(data) {
    const posts = getPosts();
    const post  = {
      id: 'custom-' + Date.now(),
      ...data,
      date: new Date().toISOString().split('T')[0],
      readTime: data.readTime || Math.ceil((data.content || '').split(' ').length / 200) + ' min read',
      isCustom: true
    };
    posts.unshift(post);
    savePosts(posts);
    return post;
  }

  function updatePost(id, data) {
    const posts = getPosts().map(p => p.id === id ? { ...p, ...data } : p);
    savePosts(posts);
  }

  function deletePost(id) {
    savePosts(getPosts().filter(p => p.id !== id));
  }

  // ── Quiz CRUD ──────────────────────────────
  function createQuiz(data) {
    const quizzes = getQuizzes();
    const quiz = {
      id: 'quiz-custom-' + Date.now(),
      ...data,
      isCustom: true
    };
    quizzes.unshift(quiz);
    saveQuizzes(quizzes);
    return quiz;
  }

  function updateQuiz(id, data) {
    const quizzes = getQuizzes().map(q => q.id === id ? { ...q, ...data } : q);
    saveQuizzes(quizzes);
  }

  function deleteQuiz(id) {
    saveQuizzes(getQuizzes().filter(q => q.id !== id));
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
    if (name === 'dashboard') renderDashboard();
    if (name === 'posts')     renderPostsTable();
    if (name === 'quizzes')   renderQuizzesTable();
    if (name === 'users')     renderUsersTable();
  }

  // ── Dashboard stats ────────────────────────
  function renderDashboard() {
    const customPosts   = getPosts().length;
    const builtinPosts  = (typeof POSTS !== 'undefined') ? POSTS.length : 0;
    const customQuizzes = getQuizzes().length;
    const builtinQuiz   = (typeof QUIZZES !== 'undefined') ? Object.keys(QUIZZES).length : 0;
    const users         = Auth.getAllUsers();
    const scores        = JSON.parse(localStorage.getItem('healyis_quiz_scores') || '{}');
    const attempts      = Object.values(scores).length;

    const el = id => document.getElementById(id);
    if (el('stat-posts'))    el('stat-posts').textContent    = builtinPosts + customPosts;
    if (el('stat-quizzes'))  el('stat-quizzes').textContent  = builtinQuiz  + customQuizzes;
    if (el('stat-users'))    el('stat-users').textContent    = users.length;
    if (el('stat-attempts')) el('stat-attempts').textContent = attempts;

    // Recent posts list
    const recentEl = document.getElementById('recentPostsList');
    if (recentEl) {
      const allPosts = [
        ...(typeof POSTS !== 'undefined' ? POSTS : []),
        ...getPosts()
      ].slice(0, 5);
      recentEl.innerHTML = allPosts.map(p => `
        <div class="recent-post-row">
          <div class="recent-post-icon" style="background:${p.heroColor || '#0d4f6c'}22;color:${p.heroColor || '#0d4f6c'}">${p.heroIcon || '📄'}</div>
          <div class="recent-post-info">
            <div class="recent-post-title">${p.title}</div>
            <div class="recent-post-meta">${p.category || ''} · ${p.date || ''}</div>
          </div>
          <span class="tag ${p.isCustom ? 'general' : 'cardiology'}" style="font-size:.65rem">${p.isCustom ? 'Custom' : 'Built-in'}</span>
        </div>
      `).join('');
    }
  }

  // ── Posts table ────────────────────────────
  function renderPostsTable() {
    const tbody = document.getElementById('postsTableBody');
    if (!tbody) return;
    const builtin = (typeof POSTS !== 'undefined') ? POSTS : [];
    const custom  = getPosts();
    const all     = [...builtin, ...custom];

    tbody.innerHTML = all.length ? all.map(p => `
      <tr>
        <td><span style="font-size:1.4rem">${p.heroIcon || '📄'}</span></td>
        <td><strong>${p.title}</strong></td>
        <td><span class="tag ${p.category?.toLowerCase() || 'general'}" style="font-size:.7rem">${p.category || '—'}</span></td>
        <td>${p.author || '—'}</td>
        <td>${p.date || '—'}</td>
        <td>
          ${p.isCustom ? `
            <button class="btn btn-sm btn-outline" onclick="Admin.openPostEditor('${p.id}')">Edit</button>
            <button class="btn btn-sm" style="background:#ef444422;color:#ef4444;border:1px solid #ef444444" onclick="Admin.confirmDeletePost('${p.id}')">Delete</button>
          ` : `<span style="color:var(--text-muted);font-size:.8rem">Built-in</span>`}
        </td>
      </tr>
    `).join('') : '<tr><td colspan="6" style="text-align:center;color:var(--text-muted)">No posts yet.</td></tr>';
  }

  // ── Quizzes table ──────────────────────────
  function renderQuizzesTable() {
    const tbody = document.getElementById('quizzesTableBody');
    if (!tbody) return;
    const builtin = (typeof QUIZZES !== 'undefined') ? Object.entries(QUIZZES).map(([id, q]) => ({ id, ...q, isBuiltin: true })) : [];
    const custom  = getQuizzes();
    const all     = [...builtin, ...custom];

    tbody.innerHTML = all.length ? all.map(q => `
      <tr>
        <td><strong>${q.title || q.id}</strong></td>
        <td>${Array.isArray(q.questions) ? q.questions.length : '—'} questions</td>
        <td>
          ${!q.isBuiltin ? `
            <button class="btn btn-sm btn-outline" onclick="Admin.openQuizEditor('${q.id}')">Edit</button>
            <button class="btn btn-sm" style="background:#ef444422;color:#ef4444;border:1px solid #ef444444" onclick="Admin.confirmDeleteQuiz('${q.id}')">Delete</button>
          ` : `<span style="color:var(--text-muted);font-size:.8rem">Built-in</span>`}
        </td>
      </tr>
    `).join('') : '<tr><td colspan="3" style="text-align:center;color:var(--text-muted)">No quizzes yet.</td></tr>';
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
            <strong>${u.name}</strong>
          </div>
        </td>
        <td>${u.email}</td>
        <td><span class="tag ${u.role === 'admin' ? 'cardiology' : 'general'}" style="font-size:.7rem">${u.role}</span></td>
        <td>${u.createdAt || '—'}</td>
        <td>
          ${u.id !== 'admin-001' ? `
            <button class="btn btn-sm" style="background:#ef444422;color:#ef4444;border:1px solid #ef444444" onclick="Admin.confirmDeleteUser('${u.id}')">Remove</button>
          ` : `<span style="color:var(--text-muted);font-size:.8rem">Protected</span>`}
        </td>
      </tr>
    `).join('') : '<tr><td colspan="5" style="text-align:center;color:var(--text-muted)">No users.</td></tr>';
  }

  // ── Post editor modal ──────────────────────
  let editingPostId = null;

  function openPostEditor(id) {
    editingPostId = id || null;
    const modal = document.getElementById('postEditorModal');
    if (!modal) return;

    if (id) {
      const post = getPosts().find(p => p.id === id);
      if (!post) return;
      document.getElementById('postEditorTitle').value     = post.title || '';
      document.getElementById('postEditorCategory').value  = post.category || 'General';
      document.getElementById('postEditorAuthor').value    = post.author || '';
      document.getElementById('postEditorIcon').value      = post.heroIcon || '📄';
      document.getElementById('postEditorColor').value     = post.heroColor || '#0d4f6c';
      document.getElementById('postEditorExcerpt').value   = post.excerpt || '';
      document.getElementById('postEditorContent').value   = post.content || '';
      document.getElementById('postEditorTags').value      = (post.tags || []).join(', ');
      document.getElementById('postEditorModalTitle').textContent = 'Edit Post';
    } else {
      document.getElementById('postEditorForm').reset();
      document.getElementById('postEditorIcon').value  = '📄';
      document.getElementById('postEditorColor').value = '#0d4f6c';
      document.getElementById('postEditorModalTitle').textContent = 'New Post';
    }
    modal.classList.remove('hidden');
    modal.classList.add('modal-open');
  }

  function closePostEditor() {
    const modal = document.getElementById('postEditorModal');
    if (modal) { modal.classList.add('hidden'); modal.classList.remove('modal-open'); }
    editingPostId = null;
  }

  function savePost() {
    const data = {
      title:     document.getElementById('postEditorTitle').value.trim(),
      category:  document.getElementById('postEditorCategory').value,
      author:    document.getElementById('postEditorAuthor').value.trim(),
      heroIcon:  document.getElementById('postEditorIcon').value.trim() || '📄',
      heroColor: document.getElementById('postEditorColor').value,
      excerpt:   document.getElementById('postEditorExcerpt').value.trim(),
      content:   document.getElementById('postEditorContent').value.trim(),
      tags:      document.getElementById('postEditorTags').value.split(',').map(t => t.trim()).filter(Boolean)
    };
    if (!data.title) { showAdminToast('Title is required', 'error'); return; }
    if (!data.content) { showAdminToast('Content is required', 'error'); return; }

    if (editingPostId) {
      updatePost(editingPostId, data);
      showAdminToast('Post updated!');
    } else {
      createPost(data);
      showAdminToast('Post created!');
    }
    closePostEditor();
    renderPostsTable();
  }

  function confirmDeletePost(id) {
    if (confirm('Delete this post? This cannot be undone.')) {
      deletePost(id);
      renderPostsTable();
      showAdminToast('Post deleted.');
    }
  }

  // ── Quiz editor modal ──────────────────────
  let editingQuizId   = null;
  let quizQuestions   = [];

  function openQuizEditor(id) {
    editingQuizId = id || null;
    quizQuestions = [];

    const modal = document.getElementById('quizEditorModal');
    if (!modal) return;

    if (id) {
      const quiz = getQuizzes().find(q => q.id === id);
      if (!quiz) return;
      document.getElementById('quizEditorTitle').value   = quiz.title || '';
      document.getElementById('quizEditorPostId').value  = quiz.postId || '';
      quizQuestions = JSON.parse(JSON.stringify(quiz.questions || []));
      document.getElementById('quizEditorModalTitle').textContent = 'Edit Quiz';
    } else {
      document.getElementById('quizEditorForm').reset();
      quizQuestions = [];
      document.getElementById('quizEditorModalTitle').textContent = 'New Quiz';
    }
    renderQuizQuestionsEditor();
    modal.classList.remove('hidden');
  }

  function closeQuizEditor() {
    const modal = document.getElementById('quizEditorModal');
    if (modal) modal.classList.add('hidden');
    editingQuizId = null;
    quizQuestions = [];
  }

  function renderQuizQuestionsEditor() {
    const container = document.getElementById('quizQuestionsContainer');
    if (!container) return;
    container.innerHTML = quizQuestions.map((q, qi) => `
      <div class="quiz-question-editor" data-index="${qi}">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
          <strong style="font-size:.9rem">Question ${qi + 1}</strong>
          <button type="button" class="btn btn-sm" style="background:#ef444422;color:#ef4444;border:1px solid #ef444444;padding:4px 10px" onclick="Admin.removeQuestion(${qi})">Remove</button>
        </div>
        <input class="form-input" type="text" placeholder="Question text" value="${escHtml(q.question || '')}" oninput="Admin.updateQuestion(${qi},'question',this.value)" style="margin-bottom:8px" />
        ${[0,1,2,3].map(oi => `
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">
            <input type="radio" name="correct-${qi}" ${q.correct === oi ? 'checked' : ''} onchange="Admin.updateQuestion(${qi},'correct',${oi})" title="Mark as correct" />
            <input class="form-input" type="text" placeholder="Option ${oi+1}" value="${escHtml((q.options && q.options[oi]) || '')}" oninput="Admin.updateOption(${qi},${oi},this.value)" style="flex:1" />
          </div>
        `).join('')}
        <textarea class="form-input" placeholder="Explanation (optional)" rows="2" oninput="Admin.updateQuestion(${qi},'explanation',this.value)" style="margin-top:4px;font-size:.85rem">${escHtml(q.explanation || '')}</textarea>
      </div>
    `).join('') + (quizQuestions.length === 0 ? '<p style="color:var(--text-muted);text-align:center;padding:20px">No questions yet. Add one below.</p>' : '');
  }

  function escHtml(s) {
    return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  function addQuestion() {
    quizQuestions.push({ question: '', options: ['','','',''], correct: 0, explanation: '' });
    renderQuizQuestionsEditor();
    // Scroll to bottom of questions
    const c = document.getElementById('quizQuestionsContainer');
    if (c) c.lastElementChild?.scrollIntoView({ behavior: 'smooth' });
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
    const title  = document.getElementById('quizEditorTitle').value.trim();
    const postId = document.getElementById('quizEditorPostId').value.trim();

    if (!title) { showAdminToast('Quiz title is required', 'error'); return; }
    if (quizQuestions.length === 0) { showAdminToast('Add at least one question', 'error'); return; }

    // Validate questions
    for (let i = 0; i < quizQuestions.length; i++) {
      const q = quizQuestions[i];
      if (!q.question.trim()) { showAdminToast(`Question ${i+1} text is required`, 'error'); return; }
      if (q.options.some(o => !o.trim())) { showAdminToast(`All options for Q${i+1} are required`, 'error'); return; }
    }

    const data = { title, postId, questions: quizQuestions };

    if (editingQuizId) {
      updateQuiz(editingQuizId, data);
      showAdminToast('Quiz updated!');
    } else {
      createQuiz(data);
      showAdminToast('Quiz created!');
    }
    closeQuizEditor();
    renderQuizzesTable();
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
    const container = document.querySelector('.toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast' + (type === 'error' ? ' toast-error' : '');
    toast.textContent = msg;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3200);
  }

  // ── Init ───────────────────────────────────
  function init() {
    if (!Auth.requireAdmin()) return;

    // Sidebar links
    document.querySelectorAll('.sidebar-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        showPanel(link.dataset.panel);
      });
    });

    // Close modals on backdrop click
    document.querySelectorAll('.modal-backdrop').forEach(m => {
      m.addEventListener('click', (e) => {
        if (e.target === m) {
          closePostEditor();
          closeQuizEditor();
        }
      });
    });

    showPanel('dashboard');
  }

  return {
    init,
    showPanel,
    getPosts, getQuizzes,
    openPostEditor, closePostEditor, savePost, confirmDeletePost,
    openQuizEditor, closeQuizEditor, saveQuiz, confirmDeleteQuiz,
    addQuestion, removeQuestion, updateQuestion, updateOption,
    confirmDeleteUser,
    renderDashboard, renderPostsTable, renderQuizzesTable, renderUsersTable
  };
})();

document.addEventListener('DOMContentLoaded', Admin.init);
