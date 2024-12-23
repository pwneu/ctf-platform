import {
  LineChart,
  Tooltip,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", value: 148 },
  { name: "Feb", value: 100 },
  { name: "Marc", value: 205 },
  { name: "April", value: 110 },
  { name: "May", value: 165 },
  { name: "Jun", value: 145 },
  { name: "July", value: 180 },
  { name: "Agust", value: 156 },
  { name: "Sept", value: 148 },
  { name: "Oct", value: 220 },
  { name: "Now", value: 180 },
  { name: "Dec", value: 245 },
];

const Charts = () => {
  const chart = (interval) => (
    <ResponsiveContainer height={250} width="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="" />
        <XAxis tick={{ fontSize: 12 }} dataKey="name" interval={interval} />
        <YAxis
          tick={{ fontSize: 12 }}
          domain={[0, 300]}
          tickCount={7}
          interval={interval}
        />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="value"
          strokeWidth={2}
          stroke="#336CFB"
          fill="#336CFB"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );

  return <>{chart("preserveEnd")}</>;
};

export default Charts;
