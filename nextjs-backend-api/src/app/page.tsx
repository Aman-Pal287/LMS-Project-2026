/**
 * API Root Page
 * 
 * Serves as the homepage/root endpoint.
 * Provides basic information about the API.
 */

export default function Home() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        padding: '20px',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      <h1>Next.js Backend API Server</h1>
      <p style={{ fontSize: '16px', color: '#666', marginBottom: '30px' }}>
        RESTful API built with TypeScript and App Router
      </p>

      <div
        style={{
          backgroundColor: '#f5f5f5',
          padding: '20px',
          borderRadius: '8px',
          maxWidth: '600px',
          marginBottom: '30px',
        }}
      >
        <h2 style={{ marginTop: 0 }}>API Endpoints</h2>
        <ul style={{ lineHeight: '1.8' }}>
          <li>
            <strong>GET /api/users</strong> - Retrieve all users
          </li>
          <li>
            <strong>GET /api/users?search=term</strong> - Search users by name
            or email
          </li>
          <li>
            <strong>GET /api/users/:id</strong> - Retrieve a single user by ID
          </li>
          <li>
            <strong>POST /api/users</strong> - Create a new user
          </li>
        </ul>
      </div>

      <div
        style={{
          backgroundColor: '#f0f9ff',
          padding: '20px',
          borderRadius: '8px',
          maxWidth: '600px',
        }}
      >
        <h3 style={{ marginTop: 0 }}>Example Request</h3>
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        <pre
          style={{
            backgroundColor: '#fff',
            padding: '10px',
            borderRadius: '4px',
            overflow: 'auto',
            fontSize: '13px',
          }}
        >
          {`POST /api/users\nContent-Type: application/json\n\n{\n  "name": "Alice Williams",\n  "email": "alice@example.com"\n}`}
        </pre>
      </div>

      <footer style={{ marginTop: '40px', color: '#999', fontSize: '12px' }}>
        Run &quot;npm run dev&quot; to start the development server
      </footer>
    </div>
  );
}
