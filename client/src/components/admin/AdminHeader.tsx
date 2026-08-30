import { useAuth } from "../../context/AuthContext";

export default function AdminHeader() {
  const {
    user,
    logout
  } = useAuth();

  return (
    <header className="admin-header">
      <div>
        <h1>Dashboard</h1>
      </div>

      <div className="admin-header-user">
        <div>
          <strong>
            {user?.name}
          </strong>

          <span>
            {user?.email}
          </span>
        </div>

        <button
          type="button"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </header>
  );
}