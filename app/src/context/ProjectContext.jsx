import { createContext, useContext, useState, useCallback } from 'react';

const ProjectContext = createContext(null);

const STORAGE_KEY = 'smd_projects';

// Default projectss
const DEFAULT_PROJECTS = [
    {
        id: 'proj_test_001',
        name: 'Test Project',
        description: 'Bu bir test projesidir. Admin panelinden düzenleme veya silme yapabilirsiniz. Yeni projeler ekleyerek portfolyonuzu zenginleştirebilirsiniz.',
        imageUrl: '',
        projectUrl: 'https://example.com',
        tags: ['Test', 'Demo'],
        color: '#6366f1',
        createdAt: new Date().toISOString(),
        order: 0,
    },
    {
        id: 'proj_smd_dashboard',
        name: 'SMD Dashboard',
        description: 'Dinamik dashboard portalı. GridStack ile sürükle-bırak widget sistemi, Kendo UI ile grafikler ve veri görselleştirme.',
        imageUrl: '',
        projectUrl: '#',
        tags: ['Dashboard', 'Kendo UI', 'GridStack'],
        color: '#8b5cf6',
        createdAt: new Date().toISOString(),
        order: 1,
    },
    {
        id: 'proj_btc_charts',
        name: 'BTC Charts',
        description: 'Gerçek zamanlı Bitcoin fiyat charting uygulaması. SMA, Fibonacci seviyeleri ve 5 dakikalık fiyat tahmini.',
        imageUrl: '',
        projectUrl: '#',
        tags: ['Crypto', 'Real-time', 'Chart.js'],
        color: '#f59e0b',
        createdAt: new Date().toISOString(),
        order: 2,
    },
    {
        id: 'proj_password_mgr',
        name: 'Password Manager',
        description: 'Client-side şifreli parola yöneticisi. AES-GCM encryption, Web Crypto API ile güvenli depolama.',
        imageUrl: '',
        projectUrl: '#',
        tags: ['Security', 'React', 'Encryption'],
        color: '#10b981',
        createdAt: new Date().toISOString(),
        order: 3,
    },
];

function loadProjects() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            return JSON.parse(stored);
        }
    } catch (e) {
        console.error('Failed to load projects:', e);
    }
    // First-time: save defaults
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_PROJECTS));
    return DEFAULT_PROJECTS;
}

function saveProjects(projects) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    } catch (e) {
        console.error('Failed to save projects:', e);
    }
}

export function ProjectProvider({ children }) {
    const [projects, setProjects] = useState(loadProjects);

    const addProject = useCallback((project) => {
        const newProject = {
            ...project,
            id: 'proj_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 6),
            createdAt: new Date().toISOString(),
            order: 0,
        };
        setProjects((prev) => {
            const updated = [newProject, ...prev];
            saveProjects(updated);
            return updated;
        });
        return newProject;
    }, []);

    const updateProject = useCallback((id, updates) => {
        setProjects((prev) => {
            const updated = prev.map((p) => (p.id === id ? { ...p, ...updates } : p));
            saveProjects(updated);
            return updated;
        });
    }, []);

    const deleteProject = useCallback((id) => {
        setProjects((prev) => {
            const updated = prev.filter((p) => p.id !== id);
            saveProjects(updated);
            return updated;
        });
    }, []);

    const getProject = useCallback(
        (id) => projects.find((p) => p.id === id) || null,
        [projects]
    );

    return (
        <ProjectContext.Provider value={{ projects, addProject, updateProject, deleteProject, getProject }}>
            {children}
        </ProjectContext.Provider>
    );
}

export function useProjects() {
    const context = useContext(ProjectContext);
    if (!context) {
        throw new Error('useProjects must be used within ProjectProvider');
    }
    return context;
}
