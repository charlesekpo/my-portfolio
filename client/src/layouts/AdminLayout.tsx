import { Outlet } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

export default function AdminLayout() {
  const {
    user,
    logout
  } = useAuth();

  return (
    <div>
      <header>
        <strong>
          Admin Dashboard
        </strong>

        <span>
          {user?.name}
        </span>

        <button onClick={logout}>
          Logout
        </button>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}