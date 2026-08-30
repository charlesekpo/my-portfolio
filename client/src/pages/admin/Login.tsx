import {
  useState
} from "react";

import type {
  FormEvent
} from "react";

import {
  useLocation,
  useNavigate
} from "react-router-dom";

import { login } from "../../api/auth.api";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    loginUser
  } = useAuth();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");

    if (!email.trim()) {
      setError(
        "Please enter your email address."
      );
      return;
    }

    if (!password) {
      setError(
        "Please enter your password."
      );
      return;
    }

    try {
      setLoading(true);

      const response =
        await login({
          email: email.trim(),
          password
        });

      if (!response.success) {
        throw new Error(
          "Login failed."
        );
      }

      const {
        token,
        user
      } = response.data;

      loginUser(
        token,
        user
      );

      const state = location.state as
  | {
      from?: {
        pathname?: string;
      };
    }
  | null;

  const from =
    state?.from?.pathname ??
    "/admin";

      navigate(
        from,
        { replace: true }
      );
    } catch (error: unknown) {
      if (
        error &&
        typeof error === "object" &&
        "response" in error
      ) {
        const axiosError =
          error as {
            response?: {
              data?: {
                message?: string;
              };
            };
          };

        setError(
          axiosError.response?.data
            ?.message ??
            "Invalid email or password."
        );
      } else {
        setError(
          "Unable to login. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="login-page">
      <div className="login-card">
        <div className="login-header">
          <p className="login-brand">
            CHARLES.DEV
          </p>

          <h1>
            Admin Login
          </h1>

          <p>
            Sign in to manage your
            portfolio.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="login-form"
        >
          {error && (
            <div
              className="login-error"
              role="alert"
            >
              {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">
              Email
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(
                  event.target.value
                )
              }
              placeholder="you@example.com"
              autoComplete="email"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">
              Password
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(
                  event.target.value
                )
              }
              placeholder="Enter your password"
              autoComplete="current-password"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Signing in..."
              : "Sign In"}
          </button>
        </form>
      </div>
    </main>
  );
}