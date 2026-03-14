'use client';

import { useRouter } from 'next/navigation';

export default function LogoutButton(): React.ReactElement {
  const router = useRouter();

  const handleLogout = async (): Promise<void> => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/');
    router.refresh();
  };

  return (
    <button className="secondary-btn" onClick={handleLogout} type="button">
      Logout
    </button>
  );
}
