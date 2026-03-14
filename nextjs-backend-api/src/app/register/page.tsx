'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

export default function RegisterPage(): React.ReactElement {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setError('');
    setLoading(true);

    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.error || 'Register failed.');
      setLoading(false);
      return;
    }

    router.push('/');
    router.refresh();
  };

  return (
    <section className="auth-card">
      <h1>Register</h1>
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="text"
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password (min 6 chars)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
        />
        {error && <p className="error-text">{error}</p>}
        <button type="submit" className="primary-btn" disabled={loading}>
          {loading ? 'Please wait...' : 'Register'}
        </button>
      </form>
      <p className="muted">
        Already have account? <Link href="/login">Login</Link>
      </p>
    </section>
  );
}
