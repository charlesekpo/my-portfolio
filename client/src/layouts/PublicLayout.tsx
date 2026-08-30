import { Outlet } from "react-router-dom";

export default function PublicLayout() {
  return (
    <div>
      <header>
        Portfolio Navigation
      </header>

      <main>
        <Outlet />
      </main>

      <footer>
        Portfolio Footer
      </footer>
    </div>
  );
}