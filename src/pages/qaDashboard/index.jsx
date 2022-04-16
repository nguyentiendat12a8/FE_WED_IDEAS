import { AreaChartOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { useEffect } from "react";
import { getQaDashboardDataRequest } from "../../store/request";
import "./index.scss";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
} from "chart.js";
import { Pie, Line, Bar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  Title,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement
);

export const viewOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
    },
  },
};

const QaDashboard = () => {
  const [dashboardData, setDashboardData] = useState({});

  useEffect(() => {
    getQaDashboardDataRequest()
      .then(({ data }) => {
        console.log(data);
        setDashboardData(data);
      })
      .then((err) => {
        console.log(err);
      });
  }, []);

  const ideasData = {
    labels: dashboardData?.dataIdeas?.labels,
    datasets: [
      {
        label: "# of Ideas Per Department",
        data: dashboardData?.dataIdeas
          ? [
              dashboardData?.dataIdeas?.dataIdeas?.[0],
              dashboardData?.dataIdeas?.dataIdeas?.[1],
              dashboardData?.dataIdeas?.dataIdeas?.[2],
            ]
          : [],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const viewsData = {
    labels: dashboardData?.dataView?.labels,
    datasets: [
      {
        label: "# of Views Per Department",
        data: dashboardData?.dataView?.dataCountView,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <section className="qa-dashboard main-content-dashboard">
      <h1 className="title">
        <AreaChartOutlined />
        <span>Dashboard</span>
      </h1>
      <div className="top-info">
        <div className="info-card">
          <span className="badge">{dashboardData.countCategories || 0}</span>
          <p>Number category</p>
        </div>
        <div className="info-card">
          <span className="badge">{dashboardData.countDepartments || 0}</span>
          <p>Number department</p>
        </div>
        <div className="info-card">
          <span className="badge">{dashboardData.countIdeas || 0}</span>
          <p>Number idea</p>
        </div>
      </div>
      <div className="bottom-info">
        <div className="info-card">
          <Pie data={ideasData} />
          <p>
            Numbers of contributors (staffs with idea submission) per
            departments
          </p>
        </div>
        <div className="info-card">
          <Bar
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "top",
                },
                title: {
                  display: true,
                },
              },
            }}
            data={{
              labels: ["2022"],
              datasets: [
                {
                  label: "IT",
                  data: [dashboardData?.dataCountUser?.dataCountUser?.[0]],
                  backgroundColor: "rgba(255, 99, 132, 0.5)",
                },
                {
                  label: "GD",
                  data: [dashboardData?.dataCountUser?.dataCountUser?.[1]],
                  backgroundColor: "rgba(53, 162, 235, 0.5)",
                },
                {
                  label: "BI",
                  data: [dashboardData?.dataCountUser?.dataCountUser?.[2]],
                  backgroundColor: "rgba(255, 206, 86, 0.5)",
                },
              ],
            }}
            style={{
              width: "100%",
            }}
          />
          <p>Number of idea per department/ year</p>
        </div>
        <div className="info-card">
          <Line options={viewOptions} data={viewsData} width={300} />
          <p>Numbers of views (staffs with idea submission) per departments</p>
        </div>
      </div>
    </section>
  );
};

export default QaDashboard;
