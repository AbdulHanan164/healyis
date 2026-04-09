// ─────────────────────────────────────────────
//  Healyis — Authentication System
// ─────────────────────────────────────────────

const Auth = (() => {

  const USERS_KEY   = 'healyis_users';
  const SESSION_KEY = 'healyis_session';

  // Default admin account (seeded on first load)
  const DEFAULT_ADMIN = {
    id: 'admin-001',
    name: 'Admin',
    email: 'admin@healyis.com',
    password: 'admin123',
    role: 'admin',
    createdAt: '2026-01-01'
  };

  // ── Helpers ────────────────────────────────
  function getUsers() {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  }
  function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }
  function seed() {
    const users = getUsers();
    if (!users.find(u => u.email === DEFAULT_ADMIN.email)) {
      users.push(DEFAULT_ADMIN);
      saveUsers(users);
    }
  }

  // ── Session ────────────────────────────────
  function getSession() {
    return JSON.parse(sessionStorage.getItem(SESSION_KEY) || 'null');
  }
  function setSession(user) {
    const { password, ...safe } = user; // never store password in session
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(safe));
  }
  function clearSession() {
    sessionStorage.removeItem(SESSION_KEY);
  }

  // ── Public API ─────────────────────────────
  function isLoggedIn() { return !!getSession(); }
  function isAdmin()    { return getSession()?.role === 'admin'; }
  function getUser()    { return getSession(); }

  function register({ name, email, password }) {
    const users = getUsers();
    if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
      return { ok: false, error: 'An account with this email already exists.' };
    }
    if (password.length < 6) {
      return { ok: false, error: 'Password must be at least 6 characters.' };
    }
    const newUser = {
      id: 'user-' + Date.now(),
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password,
      role: 'user',
      createdAt: new Date().toISOString().split('T')[0]
    };
    users.push(newUser);
    saveUsers(users);
    setSession(newUser);
    return { ok: true, user: newUser };
  }

  function login({ email, password }) {
    const users = getUsers();
    const user  = users.find(
      u => u.email.toLowerCase() === email.toLowerCase().trim() && u.password === password
    );
    if (!user) {
      return { ok: false, error: 'Incorrect email or password.' };
    }
    setSession(user);
    return { ok: true, user };
  }

  function logout() {
    clearSession();
    window.location.href = 'index.html';
  }

  function requireLogin(redirectTo = 'login.html') {
    if (!isLoggedIn()) {
      window.location.href = redirectTo + '?next=' + encodeURIComponent(window.location.pathname + window.location.hash);
      return false;
    }
    return true;
  }

  function requireAdmin() {
    if (!isAdmin()) {
      window.location.href = 'index.html';
      return false;
    }
    return true;
  }

  function getAllUsers() {
    return getUsers().map(u => { const { password, ...safe } = u; return safe; });
  }

  function deleteUser(userId) {
    const users = getUsers().filter(u => u.id !== userId);
    saveUsers(users);
  }

  // ── Nav rendering ──────────────────────────
  const SVG = {
    chevron:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg>`,
    settings: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>`,
    quiz:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>`,
    logout:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>`
  };

  function renderNavAuth() {
    const container = document.getElementById('navAuth');
    if (!container) return;

    const user = getSession();
    if (!user) {
      container.innerHTML = `
        <a href="login.html" class="btn btn-glass btn-sm" style="border-color:rgba(255,255,255,.3)">Log in</a>
        <a href="login.html?tab=register" class="btn btn-accent btn-sm">Sign up free</a>`;
    } else {
      const initials = user.name.split(' ').map(n => n[0]).join('').slice(0,2).toUpperCase();
      container.innerHTML = `
        <div class="nav-user-wrap" id="navUserWrap">
          <div class="nav-user-pill" onclick="Auth.toggleUserMenu()">
            <div class="nav-avatar">${initials}</div>
            <span class="nav-user-name">${user.name.split(' ')[0]}</span>
            <span class="nav-chevron">${SVG.chevron}</span>
          </div>
          <div class="nav-dropdown hidden" id="navUserDropdown">
            <div class="nav-dropdown-header">
              <div class="nav-dropdown-name">${user.name}</div>
              <div class="nav-dropdown-email">${user.email}</div>
              <span class="tag ${user.role === 'admin' ? 'cardiology' : 'general'}" style="font-size:.65rem;padding:2px 8px;margin-top:6px;display:inline-flex">${user.role}</span>
            </div>
            ${user.role === 'admin' ? `<a href="admin.html" class="nav-dropdown-item">${SVG.settings}<span>Admin Panel</span></a><div class="nav-dropdown-divider"></div>` : ''}
            <a href="quiz-hub.html" class="nav-dropdown-item">${SVG.quiz}<span>My Quizzes</span></a>
            <div class="nav-dropdown-divider"></div>
            <button class="nav-dropdown-item nav-dropdown-logout" onclick="Auth.logout()">${SVG.logout}<span>Log out</span></button>
          </div>
        </div>`;
    }
  }

  function toggleUserMenu() {
    const dd = document.getElementById('navUserDropdown');
    dd?.classList.toggle('hidden');
  }

  // Close dropdown on outside click
  document.addEventListener('click', (e) => {
    if (!e.target.closest('#navUserWrap')) {
      document.getElementById('navUserDropdown')?.classList.add('hidden');
    }
  });

  // ── Init ───────────────────────────────────
  function init() {
    seed();
    renderNavAuth();
    // Handle navbar scroll state
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      const updateNav = () => {
        if (window.scrollY > 20) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');
      };
      window.addEventListener('scroll', updateNav, { passive: true });
      updateNav();

      // If page has no hero, start scrolled
      if (!document.querySelector('.home-hero')) navbar.classList.add('scrolled');
    }
  }

  return { init, isLoggedIn, isAdmin, getUser, register, login, logout, requireLogin, requireAdmin, getAllUsers, deleteUser, renderNavAuth, toggleUserMenu };
})();

document.addEventListener('DOMContentLoaded', Auth.init);
