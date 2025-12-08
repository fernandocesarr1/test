// ========================================
// CONFIGURAÇÃO FIREBASE
// ========================================
const firebaseConfig = {
    apiKey: "AIzaSyAgopSuSjeQ26UL85eYb11w4BbbNtBg5QE",
    authDomain: "orcamento-familiar-dc2e6.firebaseapp.com",
    databaseURL: "https://orcamento-familiar-dc2e6-default-rtdb.firebaseio.com",
    projectId: "orcamento-familiar-dc2e6",
    storageBucket: "orcamento-familiar-dc2e6.firebasestorage.app",
    messagingSenderId: "21809188621",
    appId: "1:21809188621:web:103d45c3353106ebf5aa44",
    measurementId: "G-4E95DZRK3F"
};

let database;
let isFirebaseInitialized = false;

function initFirebase() {
    try {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        database = firebase.database();
        isFirebaseInitialized = true;
        console.log("✅ Firebase inicializado");
        return true;
    } catch (error) {
        console.error("❌ Erro ao inicializar Firebase:", error);
        return false;
    }
}

// ========================================
// SISTEMA DE TOAST NOTIFICATIONS
// ========================================
function showToast(message, type = 'info', duration = 3000) {
    const container = document.getElementById('toast-container') || createToastContainer();
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    const icons = {
        success: '✓',
        error: '✕',
        warning: '⚠',
        info: 'ℹ'
    };
    
    toast.innerHTML = `
        <span class="toast-icon">${icons[type] || icons.info}</span>
        <span class="toast-message">${message}</span>
    `;
    
    container.appendChild(toast);
    
    // Trigger animation
    setTimeout(() => toast.classList.add('show'), 10);
    
    // Remove after duration
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

function createToastContainer() {
    const container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
    return container;
}

// ========================================
// AUTENTICAÇÃO
// ========================================
function checkAuth() {
    if (sessionStorage.getItem('authenticated') !== 'true') {
        window.location.href = 'index.html';
        return false;
    }
    return true;
}

function logout() {
    sessionStorage.removeItem('authenticated');
    sessionStorage.removeItem('userName');
    showToast('Logout realizado!', 'info');
    setTimeout(() => window.location.href = 'index.html', 500);
}

function getCurrentUser() {
    return sessionStorage.getItem('userName') || 'Usuário';
}

// ========================================
// UTILITÁRIOS DE DATA
// ========================================
function formatDate(dateStr) {
    if (!dateStr) return '';
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
}

function formatDateISO(date) {
    return date.toISOString().split('T')[0];
}

function getTodayDateString() {
    return formatDateISO(new Date());
}

function getMonthName(month) {
    const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
                    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    return months[month];
}

function getMonthYear(dateStr) {
    const [year, month] = dateStr.split('-');
    return `${getMonthName(parseInt(month) - 1)} ${year}`;
}

// ========================================
// UTILITÁRIOS DE MOEDA
// ========================================
function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value || 0);
}

function parseCurrency(str) {
    if (!str) return 0;
    return parseFloat(str.replace(/[^\d,.-]/g, '').replace(',', '.')) || 0;
}

// ========================================
// LOADING STATE
// ========================================
function showLoading(elementId) {
    const el = document.getElementById(elementId);
    if (el) {
        el.innerHTML = `
            <div class="loading-skeleton">
                <div class="skeleton-line"></div>
                <div class="skeleton-line short"></div>
                <div class="skeleton-line"></div>
            </div>
        `;
    }
}

function hideLoading(elementId) {
    const el = document.getElementById(elementId);
    if (el) {
        el.querySelector('.loading-skeleton')?.remove();
    }
}

// ========================================
// DARK MODE
// ========================================
function initDarkMode() {
    const saved = localStorage.getItem('darkMode');
    if (saved === 'true' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
    }
}

function toggleDarkMode() {
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('darkMode', document.documentElement.classList.contains('dark'));
    showToast(document.documentElement.classList.contains('dark') ? 'Modo escuro ativado' : 'Modo claro ativado', 'info');
}

// ========================================
// GERAR ID ÚNICO
// ========================================
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// ========================================
// DEBOUNCE
// ========================================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ========================================
// LOG DE AÇÕES (NOTIFICAÇÕES)
// ========================================
function logAction(action, data, oldData = null) {
    if (!isFirebaseInitialized) return;
    
    const log = {
        id: generateId(),
        action: action,
        data: data,
        oldData: oldData,
        user: getCurrentUser(),
        timestamp: new Date().toISOString()
    };
    
    database.ref('logs/' + log.id).set(log);
}

// ========================================
// INICIALIZAÇÃO
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    initDarkMode();
});
