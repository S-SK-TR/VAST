import { useState, useRef, useEffect } from 'react';

export default function StartMenu({ projects, onProjectClick, onClose, isAdmin, onAdminClick, onLogout }) {
    const [search, setSearch] = useState('');
    const menuRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                // Don't close if clicking the start button
                const startBtn = document.getElementById('start-button');
                if (startBtn && startBtn.contains(e.target)) return;
                onClose?.();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [onClose]);

    const getInitials = (name) =>
        name
            .split(/[\s\-_]+/)
            .map((w) => w[0])
            .join('')
            .toUpperCase()
            .substring(0, 2);

    const filteredProjects = projects.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        (p.description || '').toLowerCase().includes(search.toLowerCase()) ||
        (p.tags || []).some((t) => t.toLowerCase().includes(search.toLowerCase()))
    );

    return (
        <div className="start-menu" ref={menuRef} role="menu" aria-label="Start Menu">
            {/* Header */}
            <div className="start-menu__header">
                <div className="start-menu__brand">⬡ S-M-D HOME</div>
                <div className="start-menu__subtitle">Proje Launcher v1.0</div>
                <div className="start-menu__search">
                    <input
                        ref={inputRef}
                        type="text"
                        className="start-menu__search-input"
                        placeholder="🔍 Proje ara..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            {/* Projects */}
            <div className="start-menu__content">
                <div className="start-menu__section-title">
                    {search ? `Sonuçlar (${filteredProjects.length})` : 'Tüm Projeler'}
                </div>

                {filteredProjects.length === 0 ? (
                    <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                        Proje bulunamadı
                    </div>
                ) : (
                    filteredProjects.map((project) => (
                        <div
                            key={project.id}
                            className="start-menu__item"
                            onClick={() => {
                                onProjectClick(project);
                                onClose();
                            }}
                            role="menuitem"
                        >
                            <div
                                className="start-menu__item-icon"
                                style={{
                                    background: project.imageUrl
                                        ? 'transparent'
                                        : `linear-gradient(135deg, ${project.color || '#6366f1'}, ${project.color || '#6366f1'}88)`,
                                    color: 'white',
                                    fontWeight: 700,
                                    fontSize: '0.8rem',
                                }}
                            >
                                {project.imageUrl ? (
                                    <img src={project.imageUrl} alt={project.name} />
                                ) : (
                                    getInitials(project.name)
                                )}
                            </div>
                            <div>
                                <div className="start-menu__item-name">{project.name}</div>
                                <div className="start-menu__item-desc">
                                    {project.description?.substring(0, 50) || 'Açıklama yok'}
                                    {(project.description?.length || 0) > 50 ? '...' : ''}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Footer */}
            <div className="start-menu__footer">
                <button
                    className="btn btn--secondary btn--sm"
                    onClick={() => {
                        onAdminClick();
                        onClose();
                    }}
                >
                    {isAdmin ? '⚙️ Admin Panel' : '🔒 Giriş Yap'}
                </button>
                {isAdmin && (
                    <button
                        className="btn btn--danger btn--sm"
                        onClick={() => {
                            onLogout();
                            onClose();
                        }}
                    >
                        🚪 Çıkış
                    </button>
                )}
            </div>
        </div>
    );
}
