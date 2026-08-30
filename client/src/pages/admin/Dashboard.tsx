import StatCard from "../../components/admin/StatCard";

export default function Dashboard() {
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
          value={0}
        />

        <StatCard
          label="Skills"
          value={0}
        />

        <StatCard
          label="Experience"
          value={0}
        />

        <StatCard
          label="Videos"
          value={0}
        />

        <StatCard
          label="Messages"
          value={0}
        />

        <StatCard
          label="Media"
          value={0}
        />
      </div>
    </section>
  );
}