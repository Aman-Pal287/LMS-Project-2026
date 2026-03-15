import Link from 'next/link';
import { getCurrentSession } from '@/lib/auth';
import LogoutButton from '@/components/LogoutButton';

export default async function NavBar(): Promise<React.ReactElement> {
  const session = await getCurrentSession();

  return (
    <header className="topbar">
      <div className="container topbar-inner">
        <Link href="/" className="logo">
          LearnHub
        </Link>
        <nav className="nav-actions">
          {session ? (
            <>
              <span className="welcome">Hi, {session.name}</span>
              <LogoutButton />
            </>
          ) : (
            <>
              <Link href="/login" className="secondary-btn">
                Login
              </Link>
              <Link href="/register" className="primary-btn">
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
