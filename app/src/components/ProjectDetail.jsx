export default function ProjectDetail({ project, onVisit, isAdmin, onEdit, onDelete }) {
    const getInitials = (name) => {
        return name
            .split(/[\s\-_]+/)
            .map((w) => w[0])
            .join('')
            .toUpperCase()
            .substring(0, 3);
    };

    return (
        <div className="project-detail">
            {/* Hero Image */}
            <div className="project-detail__hero">
                {project.imageUrl ? (
                    <img src={project.imageUrl} alt={project.name} />
                ) : (
                    <div
                        className="project-detail__hero-placeholder"
                        style={{
                            background: `linear-gradient(135deg, ${project.color || '#6366f1'}, ${project.color || '#8b5cf6'}66)`,
                        }}
                    >
                        {getInitials(project.name)}
                    </div>
                )}
            </div>

            {/* Tags */}
            {project.tags && project.tags.length > 0 && (
                <div className="project-detail__meta">
                    {project.tags.map((tag, i) => (
                        <span key={i} className="project-detail__tag">
                            {tag}
                        </span>
                    ))}
                </div>
            )}

            {/* Description */}
            <p className="project-detail__description">{project.description || 'Açıklama eklenmemiş.'}</p>

            {/* Actions */}
            <div className="project-detail__actions">
                {project.projectUrl && project.projectUrl !== '#' && (
                    <button className="btn btn--primary" onClick={() => onVisit?.(project.projectUrl)}>
                        🚀 Projeyi Aç
                    </button>
                )}
                {project.projectUrl === '#' && (
                    <button className="btn btn--secondary" disabled style={{ opacity: 0.5, cursor: 'not-allowed' }}>
                        🔗 Link henüz eklenmedi
                    </button>
                )}
                {isAdmin && (
                    <>
                        <button className="btn btn--secondary" onClick={() => onEdit?.(project)}>
                            ✏️ Düzenle
                        </button>
                        <button className="btn btn--danger" onClick={() => onDelete?.(project.id)}>
                            🗑️ Sil
                        </button>
                    </>
                )}
            </div>

            {/* Info Footer */}
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: 'var(--space-sm)' }}>
                Oluşturulma: {new Date(project.createdAt).toLocaleDateString('tr-TR')}
            </div>
        </div>
    );
}
