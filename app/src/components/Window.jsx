import { useEffect, useRef } from 'react';

export default function Window({ title, icon, children, onClose, isLarge, id }) {
    const overlayRef = useRef(null);

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') onClose?.();
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [onClose]);

    const handleOverlayClick = (e) => {
        if (e.target === overlayRef.current) {
            onClose?.();
        }
    };

    return (
        <div className="window-overlay" ref={overlayRef} onClick={handleOverlayClick}>
            <div
                className={`window ${isLarge ? 'window--large' : ''}`}
                role="dialog"
                aria-modal="true"
                aria-label={title}
                id={id}
            >
                <div className="window__header">
                    {icon && (
                        typeof icon === 'string' && icon.startsWith('http') ? (
                            <img className="window__icon" src={icon} alt="" />
                        ) : (
                            <span style={{ fontSize: '0.9rem' }}>{icon}</span>
                        )
                    )}
                    <span className="window__title">{title}</span>
                    <div className="window__controls">
                        <button
                            className="window__control-btn window__control-btn--minimize"
                            onClick={() => { }}
                            aria-label="Minimize"
                            title="Minimize"
                        />
                        <button
                            className="window__control-btn window__control-btn--maximize"
                            onClick={() => { }}
                            aria-label="Maximize"
                            title="Maximize"
                        />
                        <button
                            className="window__control-btn window__control-btn--close"
                            onClick={onClose}
                            aria-label="Close"
                            title="Close"
                        />
                    </div>
                </div>
                <div className="window__body">
                    {children}
                </div>
            </div>
        </div>
    );
}
