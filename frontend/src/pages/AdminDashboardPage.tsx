import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

const AdminDashboardPage = () => {
  const { logout, user } = useAuth();

  return (
    <div>
      <header>
        <h1>Admin Dashboard</h1>
        {user && <p>Welcome, {user.email}!</p>}
      </header>
      <div>
        <button onClick={logout}>Logout</button>
      </div>
      <nav>
        <Link to="/admin/menu">Manage Menu</Link>
        <Link to="/admin/reservations">Manage Reservations</Link>
      </nav>
    </div>
  );
};

export default AdminDashboardPage;