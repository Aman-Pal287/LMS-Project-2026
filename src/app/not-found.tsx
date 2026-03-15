import Link from 'next/link';

export default function NotFound(): React.ReactElement {
  return (
    <section>
      <h1>Course Not Found</h1>
      <p className="muted">The course you requested does not exist.</p>
      <Link href="/" className="primary-btn">
        Back to Home
      </Link>
    </section>
  );
}
