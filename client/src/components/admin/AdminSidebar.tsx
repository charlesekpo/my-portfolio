import {
  NavLink
} from "react-router-dom";

const navigation = [
  {
    label: "Dashboard",
    path: "/admin"
  },
  {
    label: "Projects",
    path: "/admin/projects"
  },
  {
    label: "Skills",
    path: "/admin/skills"
  },
  {
    label: "Experience",
    path: "/admin/experience"
  },
  {
    label: "Videos",
    path: "/admin/videos"
  },
  {
    label: "Site Settings",
    path: "/admin/settings"
  },
  {
    label: "Messages",
    path: "/admin/messages"
  },
  {
    label: "Media",
    path: "/admin/media"
  }
];

export default function AdminSidebar() {
  return (
    <aside className="admin-sidebar">
      <div className="admin-logo">
        CHARLES.DEV
      </div>

      <nav>
        {navigation.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/admin"}
            className={({ isActive }) =>
              isActive
                ? "admin-nav-link active"
                : "admin-nav-link"
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}