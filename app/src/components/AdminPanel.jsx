import { useState, useEffect } from 'react';

const PRESET_COLORS = [
    '#6366f1', '#8b5cf6', '#06b6d4', '#10b981',
    '#f59e0b', '#ef4444', '#ec4899', '#14b8a6',
    '#f97316', '#3b82f6', '#a855f7', '#22d3ee',
];

export default function AdminPanel({ projects, onAdd, onUpdate, onDelete, onClose }) {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        imageUrl: '',
        projectUrl: '',
        tags: '',
        color: '#6366f1',
    });
    const [editingId, setEditingId] = useState(null);
    const [message, setMessage] = useState(null);

    const resetForm = () => {
        setFormData({
            name: '',
            description: '',
            imageUrl: '',
            projectUrl: '',
            tags: '',
            color: '#6366f1',
        });
        setEditingId(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name.trim()) {
            setMessage({ type: 'error', text: 'Proje adı zorunludur!' });
            return;
        }

        const projectData = {
            name: formData.name.trim(),
            description: formData.description.trim(),
            imageUrl: formData.imageUrl.trim(),
            projectUrl: formData.projectUrl.trim() || '#',
            tags: formData.tags
                .split(',')
                .map((t) => t.trim())
                .filter(Boolean),
            color: formData.color,
        };

        if (editingId) {
            onUpdate(editingId, projectData);
            setMessage({ type: 'success', text: `"${projectData.name}" güncellendi!` });
        } else {
            onAdd(projectData);
            setMessage({ type: 'success', text: `"${projectData.name}" eklendi!` });
        }

        resetForm();
        setTimeout(() => setMessage(null), 3000);
    };

    const handleEdit = (project) => {
        setEditingId(project.id);
        setFormData({
            name: project.name,
            description: project.description || '',
            imageUrl: project.imageUrl || '',
            projectUrl: project.projectUrl || '',
            tags: (project.tags || []).join(', '),
            color: project.color || '#6366f1',
        });
    };

    const handleDelete = (id, name) => {
        if (window.confirm(`"${name}" projesini silmek istediğinize emin misiniz?`)) {
            onDelete(id);
            setMessage({ type: 'success', text: `"${name}" silindi.` });
            if (editingId === id) resetForm();
            setTimeout(() => setMessage(null), 3000);
        }
    };

    const handleInputChange = (field) => (e) => {
        setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    };

    return (
        <div className="admin-panel">
            {message && (
                <div className={`toast toast--${message.type}`} style={{ position: 'static', animation: 'none' }}>
                    {message.type === 'success' ? '✅' : '❌'} {message.text}
                </div>
            )}

            {/* Add/Edit Form */}
            <div className="admin-panel__section">
                <h3 className="admin-panel__section-title">
                    {editingId ? '✏️ Proje Düzenle' : '➕ Yeni Proje Ekle'}
                </h3>
                <form className="admin-panel__form" onSubmit={handleSubmit}>
                    <div className="admin-panel__form-row">
                        <div className="form-group">
                            <label htmlFor="project-name">Proje Adı *</label>
                            <input
                                id="project-name"
                                type="text"
                                className="form-input"
                                value={formData.name}
                                onChange={handleInputChange('name')}
                                placeholder="Proje adını girin..."
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="project-url">Proje URL</label>
                            <input
                                id="project-url"
                                type="url"
                                className="form-input"
                                value={formData.projectUrl}
                                onChange={handleInputChange('projectUrl')}
                                placeholder="https://..."
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="project-desc">Açıklama</label>
                        <textarea
                            id="project-desc"
                            className="form-input"
                            value={formData.description}
                            onChange={handleInputChange('description')}
                            placeholder="Proje hakkında kısa bir açıklama..."
                            rows={3}
                        />
                    </div>

                    <div className="admin-panel__form-row">
                        <div className="form-group">
                            <label htmlFor="project-image">Görsel URL</label>
                            <input
                                id="project-image"
                                type="url"
                                className="form-input"
                                value={formData.imageUrl}
                                onChange={handleInputChange('imageUrl')}
                                placeholder="https://... (opsiyonel)"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="project-tags">Etiketler (virgülle ayırın)</label>
                            <input
                                id="project-tags"
                                type="text"
                                className="form-input"
                                value={formData.tags}
                                onChange={handleInputChange('tags')}
                                placeholder="React, Dashboard, API..."
                            />
                        </div>
                    </div>

                    {/* Color Picker */}
                    <div className="form-group">
                        <label>İkon Rengi</label>
                        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                            {PRESET_COLORS.map((color) => (
                                <button
                                    key={color}
                                    type="button"
                                    onClick={() => setFormData((prev) => ({ ...prev, color }))}
                                    style={{
                                        width: 28,
                                        height: 28,
                                        borderRadius: '6px',
                                        background: color,
                                        border: formData.color === color ? '2px solid white' : '2px solid transparent',
                                        cursor: 'pointer',
                                        transition: 'transform 0.15s',
                                        transform: formData.color === color ? 'scale(1.15)' : 'scale(1)',
                                    }}
                                    title={color}
                                />
                            ))}
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
                        <button type="submit" className="btn btn--primary">
                            {editingId ? '💾 Güncelle' : '➕ Ekle'}
                        </button>
                        {editingId && (
                            <button type="button" className="btn btn--secondary" onClick={resetForm}>
                                ✖ İptal
                            </button>
                        )}
                    </div>
                </form>
            </div>

            {/* Project List */}
            <div className="admin-panel__section">
                <h3 className="admin-panel__section-title">
                    📦 Projeler ({projects.length})
                </h3>
                <div className="admin-panel__project-list">
                    {projects.length === 0 ? (
                        <div className="empty-state">
                            <div className="empty-state__icon">📂</div>
                            <div className="empty-state__text">Henüz proje yok. Yukarıdan ekleyin!</div>
                        </div>
                    ) : (
                        projects.map((project) => (
                            <div key={project.id} className="admin-panel__project-item">
                                <div
                                    className="admin-panel__project-item-icon"
                                    style={{
                                        background: `linear-gradient(135deg, ${project.color || '#6366f1'}, ${project.color || '#6366f1'}88)`,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'white',
                                        fontWeight: 700,
                                        fontSize: '0.75rem',
                                    }}
                                >
                                    {project.imageUrl ? (
                                        <img src={project.imageUrl} alt={project.name} />
                                    ) : (
                                        project.name.substring(0, 2).toUpperCase()
                                    )}
                                </div>
                                <div className="admin-panel__project-item-info">
                                    <div className="admin-panel__project-item-name">{project.name}</div>
                                    <div className="admin-panel__project-item-url">{project.projectUrl || 'URL yok'}</div>
                                </div>
                                <div className="admin-panel__project-item-actions">
                                    <button
                                        className="btn btn--secondary btn--sm"
                                        onClick={() => handleEdit(project)}
                                        title="Düzenle"
                                    >
                                        ✏️
                                    </button>
                                    <button
                                        className="btn btn--danger btn--sm"
                                        onClick={() => handleDelete(project.id, project.name)}
                                        title="Sil"
                                    >
                                        🗑️
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
