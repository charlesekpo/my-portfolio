import {
  useQuery
} from "@tanstack/react-query";

import StatCard from "../../components/admin/StatCard";

import {
  getDashboardStats
} from "../../api/dashboard.api";

export default function Dashboard() {
  const {
    data,
    isLoading,
    isError
  } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: getDashboardStats
  });

  if (isLoading) {
    return <p>Loading dashboard...</p>;
  }

  if (isError || !data) {
    return (
      <p>
        Failed to load dashboard statistics.
      </p>
    );
  }

  return (
    <section>
      <div className="dashboard-intro">
        <h2>
          Welcome back 👋
        </h2>

        <p>
          Manage your portfolio
          content from here.
        </p>
      </div>

      <div className="stats-grid">
        <StatCard
          label="Projects"
          value={data.projects}
        />

        <StatCard
          label="Skills"
          value={data.skills}
        />

        <StatCard
          label="Experience"
          value={data.experience}
        />

        <StatCard
          label="Videos"
          value={data.videos}
        />

        <StatCard
          label="Messages"
          value={data.messages}
        />

        <StatCard
          label="Media"
          value={data.media}
        />
      </div>
    </section>
  );
}