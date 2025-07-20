import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const GraphPage = () => {
  const data = useSelector((state) => state.expense); // your redux data
  const navigate = useNavigate();

  // Transform and group data
  const groupedData = {};

  data.forEach((entry) => {
    const date = new Date(entry.date).toISOString().split("T")[0];
    if (!groupedData[date]) {
      groupedData[date] = {
        date,
        salary: 0,
        expense: 0,
        details: [],
      };
    }
    if (entry.type === "salary") {
      groupedData[date].salary += Number(entry.amount);
    } else {
      groupedData[date].expense += Number(entry.amount);
    }
    groupedData[date].details.push({
      time: entry.time,
      description: entry.description,
      type: entry.type,
    });
  });

  const chartData = Object.values(groupedData);

  return (
    <div className="w-full bg-slate-900 text-white flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-5 mt-5">Salary vs Expense Over Time</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
          <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            stroke="#ccc"
            angle={-45}
            textAnchor="end"
            interval={0}
            height={70}
          />
          <YAxis stroke="#ccc" />
          <Tooltip
            contentStyle={{ backgroundColor: "#1f2937", borderColor: "#4b5563", color: "#fff" }}
            formatter={(value, name, props) => [value, name === "salary" ? "Salary" : "Expense"]}
            labelFormatter={(label, payload) => {
              const details = chartData.find((item) => item.date === label)?.details || [];
              return (
                <div>
                  <strong>{label}</strong>
                  {details.map((d, index) => (
                    <div key={index}>
                      {d.type.toUpperCase()} - {d.time} : {d.description}
                    </div>
                  ))}
                </div>
              );
            }}
          />
          <Line
            type="monotone"
            dataKey="salary"
            stroke="#10B981" // bright green
            strokeWidth={3}
            dot={{ r: 5, fill: "#10B981" }}
          />
          <Line
            type="monotone"
            dataKey="expense"
            stroke="#EF4444" // bright red
            strokeWidth={3}
            dot={{ r: 5, fill: "#EF4444" }}
          />
        </LineChart>
      </ResponsiveContainer>

      <button
        onClick={() => navigate("/")}
        className="mb-5 bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-xl"
      >
         Back to Home
      </button>
    </div>
  );
};

export default GraphPage;
