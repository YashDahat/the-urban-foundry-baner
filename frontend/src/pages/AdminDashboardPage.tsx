import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
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
        <Button onClick={logout}>Logout</Button>
      </div>
      <nav>
        <Button asChild>
          <Link to="/admin/menu">Manage Menu</Link>
        </Button>
        <Button asChild>
          <Link to="/admin/reservations">Manage Reservations</Link>
        </Button>
      </nav>
    </div>
  );
};

export default AdminDashboardPage;