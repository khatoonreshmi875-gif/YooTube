import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
  subscriberPreviousStats,
  subscriberstats,
} from "../../../../Api/Subscription";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-date-fns"; // required for time scale
import Chart from "chart.js/auto";

const Graph = () => {
  const [dataCurrStats, setdataCurrStats] = useState([]);
  const [dataPreStats, setdataPreStats] = useState([]);
  const [page, setpage] = useState(0);
  useEffect(() => {
    const fetchstats = async () => {
      const response = await subscriberstats();
      setdataCurrStats(response.data.data);

      const res = await subscriberPreviousStats();
      setdataPreStats(res.data.data.stats);
    };

    fetchstats();
  }, []);
  const pagesize = 7;

  const mergedData = [...dataPreStats, [dataCurrStats]];

  const groupedData = Array.from(
    new Map(
      mergedData.map((m) => {
        const dateObj = m.x instanceof Date ? m.x : new Date(m.x);
        return [dateObj.toDateString(), { x: dateObj, y: m.y }];
      }),
    ).values(),
  );

  const start = page * pagesize;
  const end = start + pagesize;
  const currentData = groupedData.slice(start, end);
  const xMin = currentData.length > 0 ? currentData[0].x : undefined;
  const xMax =
    currentData.length > 0 ? currentData[currentData.length - 1].x : undefined;
  const isSmallScreen = window.innerWidth < 640;
  return (
    <>
      <div className="w-full flex justify-center">
        <div
          className="w-[95%] lg:w-[95%] h-[20rem] sm:h-[25rem] lg:h-[33rem] 
                 p-6 bg-white rounded-2xl shadow-sm hover:shadow-md 
                 border border-slate-200 mx-auto mt-4 transition"
        >
          <Line
            data={{
              datasets: [
                {
                  label: "Subscribers",
                  data: currentData,
                  borderColor: "#EC4899",
                  backgroundColor: "rgba(236, 72, 153, 0.3)",
                  tension: 0.3,
                  fill: true,
                  pointRadius: 5,
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  labels: {
                    color: "#374151",
                    font: { size: isSmallScreen ? 8 : 11 },
                  },
                },
                title: {
                  display: true,
                  text: "Weekly Subscriber Growth",
                  color: "#374151",
                  font: { size: isSmallScreen ? 12 : 16, weight: "600" },
                },
              },
              scales: {
                x: {
                  type: "time",
                  time: { unit: "day", displayFormats: { week: "MMM d" } },
                  ticks: {
                    color: "#374151",
                    font: { size: isSmallScreen ? 8 : 11 },
                  },
                  grid: { color: "rgba(0,0,0,0.05)" },
                  min: xMin,
                  max: xMax,
                },
                y: {
                  type: "linear",
                  min: 0,
                  max: 15,
                  ticks: {
                    color: "#374151",
                    font: { size: isSmallScreen ? 8 : 11 },
                  },
                  grid: { color: "rgba(0,0,0,0.05)" },
                },
              },
            }}
          />

          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => setpage((prev) => Math.max(prev - 1, 0))}
              disabled={page === 0}
              className=" sm:px-4 sm:py-2 p-1 bg-white border border-slate-300 
                     text-slate-700 sm:text-sm rounded-lg shadow-sm text-xs 
                     hover:bg-blue-50 hover:text-blue-600 
                     disabled:opacity-50 transition"
            >
              Previous
            </button>
            <button
              onClick={() => setpage((prev) => prev + 1)}
              disabled={end >= groupedData.length}
              className="sm:px-4 sm:py-2 p-1  bg-white border border-slate-300 
                     text-slate-700 sm:text-sm rounded-lg shadow-sm text-xs
                     hover:bg-blue-50 hover:text-blue-600 
                     disabled:opacity-50 transition"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Graph;
