export default function DesktopIcon({ project, onClick, onDoubleClick }) {
    const getInitials = (name) => {
        return name
            .split(/[\s\-_]+/)
            .map((w) => w[0])
            .join('')
            .toUpperCase()
            .substring(0, 2);
    };

    const handleClick = (e) => {
        e.stopPropagation();
        onClick?.(project);
    };

    const handleDoubleClick = (e) => {
        e.stopPropagation();
        onDoubleClick?.(project);
    };

    return (
        <div
            className="desktop-icon"
            onClick={handleClick}
            onDoubleClick={handleDoubleClick}
            role="button"
            tabIndex={0}
            aria-label={`Open ${project.name}`}
            title={project.name}
            onKeyDown={(e) => {
                if (e.key === 'Enter') handleDoubleClick(e);
            }}
        >
            {project.imageUrl ? (
                <div className="desktop-icon__image">
                    <img
                        src={project.imageUrl}
                        alt={project.name}
                        loading="lazy"
                        onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.parentElement.innerHTML = `<div class="desktop-icon__placeholder" style="background: linear-gradient(135deg, ${project.color || '#6366f1'}, ${project.color || '#8b5cf6'}88)">${getInitials(project.name)}</div>`;
                        }}
                    />
                </div>
            ) : (
                <div
                    className="desktop-icon__placeholder"
                    style={{
                        background: `linear-gradient(135deg, ${project.color || '#6366f1'}, ${project.color || '#8b5cf6'}88)`,
                    }}
                >
                    {getInitials(project.name)}
                </div>
            )}
            <span className="desktop-icon__label">{project.name}</span>
        </div>
    );
}
