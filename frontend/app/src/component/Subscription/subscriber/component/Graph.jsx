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
  const manualData = [
    { x: new Date("11/22/2025"), y: 3 },
    { x: new Date("11/23/2025"), y: 5 },
    { x: new Date("11/24/2025"), y: 7 },
    { x: new Date("11/25/2025"), y: 2 },
    { x: new Date("11/26/2025"), y: 9 },
    { x: new Date("11/27/2025"), y: 9 },
  ];

  const mergedData = [...manualData, ...dataPreStats, [dataCurrStats]];

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

  return (
    <>
      {/* <div className="lg:w-[70%] md:max-w-96 h-48 w-72 lg:h-[5rem] sm:h-52 p-6 bg-white rounded-2xl shadow-lg border border-gray-200"> */}
      <div className="xs:w-[95%] w-[95%]  ss:w-[90%] sx:w-[95%] sm:w-[95%] md:w-[95%] lg:w-[70%] h-[20rem] sm:h-[25rem] lg:h-[33rem] p-6 bg-white rounded-2xl shadow-lg border border-gray-200 mx-auto mt-2">
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
              legend: { labels: { color: "#374151" } },
              title: {
                display: true,
                text: "Weekly Subscriber Growth",
                color: "#374151",
              },
            },
            scales: {
              x: {
                type: "time",
                time: { unit: "day", displayFormats: { week: "MMM d" } },
                ticks: { color: "#374151" },
                grid: { color: "rgba(0,0,0,0.1)" },
                min: xMin,
                max: xMax,
              },
              y: {
                type: "linear",
                min: 0,
                max: 15,
                ticks: { color: "#374151" },
                grid: { color: "rgba(0,0,0,0.1)" },
              },
            },
          }}
        />
        <div className="flex justify-between ">
          <button
            onClick={() => setpage((prev) => Math.max(prev - 1, 0))}
            disabled={page === 0}
            className="px-4 py-2 bg-blue-200 active:bg-blue-400 text-blue-700 rounded-lg hover:bg-blue-200 disabled:opacity-50 transition w-fit"
          >
            Previous
          </button>
          <button
            onClick={() => setpage((prev) => prev + 1)}
            disabled={end >= groupedData.length}
            className="px-4 py-2 bg-blue-200 active:bg-blue-400 text-blue-700 rounded-lg hover:bg-blue-200 disabled:opacity-50 transition w-fit"
          >
            Next
          </button>
        </div>{" "}
      </div>
    </>
  );
};

export default Graph;
