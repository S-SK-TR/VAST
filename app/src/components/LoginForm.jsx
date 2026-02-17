import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function LoginForm({ onSuccess, onClose }) {
    const { login } = useAuth();
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // Simulate async login
        await new Promise((r) => setTimeout(r, 400));

        const success = login(password);
        setIsLoading(false);

        if (success) {
            onSuccess?.();
        } else {
            setError('Hatalı şifre. Tekrar deneyin.');
            setPassword('');
        }
    };

    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <div className="login-form__title">🔐 Admin Giriş</div>
            <p className="login-form__subtitle">Proje yönetimi için giriş yapın</p>

            {error && <div className="login-form__error">{error}</div>}

            <div className="form-group">
                <label htmlFor="admin-password">Şifre</label>
                <input
                    id="admin-password"
                    type="password"
                    className="form-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Admin şifresini girin..."
                    autoFocus
                    required
                />
            </div>

            <button
                type="submit"
                className="btn btn--primary btn--lg"
                disabled={isLoading || !password}
                style={{ width: '100%' }}
            >
                {isLoading ? '⏳ Giriş yapılıyor...' : '🔓 Giriş Yap'}
            </button>
        </form>
    );
}
