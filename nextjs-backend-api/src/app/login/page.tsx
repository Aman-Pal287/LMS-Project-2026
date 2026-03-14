'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

export default function LoginPage(): React.ReactElement {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setError('');
    setLoading(true);

    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.error || 'Login failed.');
      setLoading(false);
      return;
    }

    router.push('/');
    router.refresh();
  };

  return (
    <section className="auth-card">
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="error-text">{error}</p>}
        <button type="submit" className="primary-btn" disabled={loading}>
          {loading ? 'Please wait...' : 'Login'}
        </button>
      </form>
      <p className="muted">
        No account? <Link href="/register">Register</Link>
      </p>
    </section>
  );
}
