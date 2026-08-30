import {
  createBrowserRouter
} from "react-router-dom";

import PublicLayout from "../layouts/PublicLayout";
import AdminLayout from "../layouts/AdminLayout";
import ProtectedRoute from "./ProtectedRoute";

import Home from "../pages/public/Home";
import About from "../pages/public/About";
import Projects from "../pages/public/Projects";
import ProjectDetails from "../pages/public/ProjectDetails";
import Videos from "../pages/public/Videos";
import Contact from "../pages/public/Contact";

import Login from "../pages/admin/Login";
import Dashboard from "../pages/admin/Dashboard";

export const router =
  createBrowserRouter([
    {
      element: <PublicLayout />,
      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: "/about",
          element: <About />
        },
        {
          path: "/projects",
          element: <Projects />
        },
        {
          path: "/projects/:slug",
          element: <ProjectDetails />
        },
        {
          path: "/videos",
          element: <Videos />
        },
        {
          path: "/contact",
          element: <Contact />
        }
      ]
    },

    {
      path: "/admin/login",
      element: <Login />
    },

    {
      element: <ProtectedRoute />,
      children: [
        {
          element: <AdminLayout />,
          children: [
            {
              path: "/admin",
              element: <Dashboard />
            }
          ]
        }
      ]
    }
  ]);
