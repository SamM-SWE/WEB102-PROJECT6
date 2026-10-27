import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function GameCharts({ games }) {
  const statusData = [
    {
      name: "Upcoming",
      count: games.filter(game => game.status.short === "NS").length
    },
    {
      name: "Completed",
      count: games.filter(game => game.status.short === "FT").length
    },
    {
      name: "Other",
      count: games.filter(
        game => !["NS", "FT"].includes(game.status.short)
      ).length
    }
  ];

  const leagueCounts = {};

  games.forEach(game => {
    const league = game.league.name;

    leagueCounts[league] = (leagueCounts[league] || 0) + 1;
  });

  const leagueData = Object.entries(leagueCounts).map(
    ([name, count]) => ({ name, count })
  );

  return (
    <div className="charts-container">
      <div className="chart-card">
        <h2>Games by Status</h2>

        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={statusData}>
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-card">
        <h2>Games by League</h2>

        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={leagueData}
              dataKey="count"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {leagueData.map((entry, index) => (
                <Cell
                  key={entry.name}
                  fill={["#8884d8", "#82ca9d", "#ffc658", "#ff8042"][index % 4]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}