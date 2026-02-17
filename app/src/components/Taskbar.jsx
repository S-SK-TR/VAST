import { useState, useEffect, useCallback, useRef } from 'react';

export default function Taskbar({ onStartToggle, isStartOpen, onAdminClick, isAdmin, openWindows, activeWindowId, onWindowSelect }) {
    const [time, setTime] = useState('');
    const [date, setDate] = useState('');

    useEffect(() => {
        const updateClock = () => {
            const now = new Date();
            setTime(now.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }));
            setDate(now.toLocaleDateString('tr-TR', { day: '2-digit', month: '2-digit', year: 'numeric' }));
        };
        updateClock();
        const interval = setInterval(updateClock, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="taskbar" role="navigation" aria-label="Taskbar">
            {/* Start Button */}
            <button
                id="start-button"
                className={`taskbar__start-btn ${isStartOpen ? 'active' : ''}`}
                onClick={onStartToggle}
                aria-label="Start Menu"
                title="Start Menu"
            >
                ⬡
            </button>

            <div className="taskbar__divider" />

            {/* Open App Buttons */}
            <div className="taskbar__apps">
                {openWindows.map((win) => (
                    <button
                        key={win.id}
                        className={`taskbar__app-btn ${activeWindowId === win.id ? 'active' : ''}`}
                        onClick={() => onWindowSelect(win.id)}
                        title={win.title}
                    >
                        {win.icon && <span style={{ fontSize: '0.85rem' }}>{win.icon}</span>}
                        {win.title}
                    </button>
                ))}
            </div>

            {/* Right Section */}
            <div className="taskbar__right">
                <button
                    id="admin-button"
                    className={`taskbar__admin-btn ${isAdmin ? 'authenticated' : ''}`}
                    onClick={onAdminClick}
                    aria-label={isAdmin ? 'Admin Panel' : 'Admin Login'}
                    title={isAdmin ? 'Admin Panel (Giriş yapıldı)' : 'Admin Girişi'}
                >
                    {isAdmin ? '🔓' : '🔒'}
                </button>

                <div className="taskbar__divider" />

                <div className="taskbar__clock" title={date}>
                    <div style={{ textAlign: 'right', lineHeight: 1.2 }}>
                        <div>{time}</div>
                        <div style={{ fontSize: '0.6rem', opacity: 0.7 }}>{date}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
