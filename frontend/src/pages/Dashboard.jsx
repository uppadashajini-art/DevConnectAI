import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../utils/axiosConfig";

import {
  FaProjectDiagram,
  FaTasks,
  FaUsers,
  FaCheckCircle,
  FaBell,
  FaPlus,
  FaUpload,
} from "react-icons/fa";

import {
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import "react-circular-progressbar/dist/styles.css";

import MainLayout from "../layouts/MainLayout";

function Dashboard() {

  const navigate = useNavigate();

  const role =
    localStorage.getItem("role");

  const userName =
    localStorage.getItem("name");

  const [stats, setStats] =
    useState({
      projects: 0,
      tasks: 0,
      completed: 0,
      team: 0,
    });

  const [activities, setActivities] =
    useState([]);

  const [taskData, setTaskData] =
    useState([]);

  useEffect(() => {

    fetchDashboardData();

  }, []);

  // =========================================
  // FETCH DASHBOARD DATA
  // =========================================

  const fetchDashboardData =
    async () => {

      try {

        const email =
          localStorage.getItem("email");

        let projectResponse;
        let taskResponse;

        // =========================================
        // ADMIN & PROJECT_MANAGER
        // =========================================

        if (
          role === "ADMIN" ||
          role === "PROJECT_MANAGER"
        ) {

          projectResponse =
            await axios.get(
              "/api/projects"
            );

          taskResponse =
            await axios.get(
              "/api/tasks"
            );

        }

        // =========================================
        // TEAM_MEMBER
        // =========================================

        else {

          projectResponse =
            await axios.get(
              `/api/projects/${email}`
            );

          taskResponse =
            await axios.get(
              `/api/tasks/${email}`
            );

        }

        const teamResponse =
          await axios.get(
            "/api/team"
          );

        const activityResponse =
          await axios.get(
            "/api/activities"
          );

        let projects =
          projectResponse.data || [];

        let tasks =
          taskResponse.data || [];

        // =========================================
        // TEAM MEMBER FILTER
        // =========================================

        if (
          role === "TEAM_MEMBER"
        ) {

          tasks =
            tasks.filter(
              (task) =>
                task.assignedTo ===
                userName
            );

          const projectIds =
            [
              ...new Set(
                tasks.map(
                  (task) =>
                    Number(
                      task.projectId
                    )
                )
              ),
            ];

          projects =
            projects.filter(
              (project) =>
                projectIds.includes(
                  Number(project.id)
                )
            );

        }

        const completedTasks =
          tasks.filter(
            (task) =>
              task.status ===
              "Completed"
          );

        const pendingTasks =
          tasks.filter(
            (task) =>
              task.status ===
              "Pending"
          );

        const inProgressTasks =
          tasks.filter(
            (task) =>
              task.status ===
              "In Progress"
          );

        setStats({

          projects:
            projects.length,

          tasks:
            tasks.length,

          completed:
            completedTasks.length,

          team:
            teamResponse.data.length,

        });

        setTaskData([

          {
            name: "Pending",
            value:
              pendingTasks.length,
          },

          {
            name: "In Progress",
            value:
              inProgressTasks.length,
          },

          {
            name: "Completed",
            value:
              completedTasks.length,
          },

        ]);

        setActivities(
          activityResponse.data || []
        );

      } catch (error) {

        console.log(error);

      }

    };

  // =========================================
  // PROGRESS
  // =========================================

  const progress =
    stats.tasks > 0
      ? (
          stats.completed /
          stats.tasks
        ) * 100
      : 0;

  const COLORS = [
    "#facc15",
    "#3b82f6",
    "#22c55e",
  ];

  return (

    <MainLayout>

      {/* WELCOME SECTION */}

      <div className="
        enterprise-card
        p-8
        mb-10
        bg-gradient-to-r
        from-blue-600
        to-indigo-700
        text-white
      ">

        <h1 className="
          text-5xl
          font-bold
        ">

          Welcome Back 👋

        </h1>

        <p className="
          mt-3
          text-blue-100
          text-lg
        ">

          Manage your projects,
          tasks and workflow efficiently.

        </p>

        {/* QUICK ACTIONS */}

        {
          (
            role === "ADMIN" ||
            role === "PROJECT_MANAGER"
          ) && (

            <div className="
              flex
              flex-wrap
              gap-4
              mt-8
            ">

              {/* CREATE PROJECT */}

              {
                role === "ADMIN" && (

                  <button
                    onClick={() =>
                      navigate(
                        "/create-project"
                      )
                    }
                    className="
                      bg-white
                      text-blue-700
                      px-6
                      py-3
                      rounded-2xl
                      font-semibold
                    "
                  >

                    <FaPlus className="inline mr-2" />

                    Create Project

                  </button>

                )
              }

              {/* CREATE TASK */}

              <button
                onClick={() =>
                  navigate(
                    "/create-task"
                  )
                }
                className="
                  bg-white/20
                  border
                  border-white/30
                  px-6
                  py-3
                  rounded-2xl
                  font-semibold
                "
              >

                <FaTasks className="inline mr-2" />

                Add Task

              </button>

              {/* UPLOAD FILE */}

              <button
                onClick={() =>
                  navigate("/files")
                }
                className="
                  bg-white/20
                  border
                  border-white/30
                  px-6
                  py-3
                  rounded-2xl
                  font-semibold
                "
              >

                <FaUpload className="inline mr-2" />

                Upload File

              </button>

            </div>

          )
        }

        {/* TEAM MEMBER MESSAGE */}

        {
          role === "TEAM_MEMBER" && (

            <div className="
              mt-6
              bg-yellow-100
              border
              border-yellow-300
              text-yellow-800
              p-5
              rounded-2xl
            ">

              You can only view your
              assigned projects,
              tasks and files.

            </div>

          )
        }

      </div>

      {/* HEADER */}

      <div className="mb-10">

        <h1 className="
          text-5xl
          font-bold
          text-slate-800
          dark:text-white
        ">

          Dashboard

        </h1>

        <p className="
          text-gray-500
          dark:text-gray-400
          mt-2
          text-lg
        ">

          Welcome back to DevConnect AI

        </p>

      </div>

      {/* STATS */}

      <div className="
        grid
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-4
        gap-8
        mb-10
      ">

        {/* PROJECTS */}

        <div
          onClick={() =>
            navigate("/projects")
          }
          className="
            enterprise-card
            p-8
            cursor-pointer
          "
        >

          <div className="
            flex
            justify-between
            items-center
          ">

            <div>

              <p className="text-gray-500">

                Projects

              </p>

              <h2 className="
                text-5xl
                font-bold
              ">

                {stats.projects}

              </h2>

            </div>

            <div className="
              bg-blue-100
              p-5
              rounded-2xl
            ">

              <FaProjectDiagram className="
                text-blue-600
                text-4xl
              " />

            </div>

          </div>

        </div>

        {/* TASKS */}

        <div
          onClick={() =>
            navigate("/tasks")
          }
          className="
            enterprise-card
            p-8
            cursor-pointer
          "
        >

          <div className="
            flex
            justify-between
            items-center
          ">

            <div>

              <p className="text-gray-500">

                Tasks

              </p>

              <h2 className="
                text-5xl
                font-bold
              ">

                {stats.tasks}

              </h2>

            </div>

            <div className="
              bg-green-100
              p-5
              rounded-2xl
            ">

              <FaTasks className="
                text-green-600
                text-4xl
              " />

            </div>

          </div>

        </div>

        {/* TEAM */}

        <div className="
          enterprise-card
          p-8
        ">

          <div className="
            flex
            justify-between
            items-center
          ">

            <div>

              <p className="text-gray-500">

                Team

              </p>

              <h2 className="
                text-5xl
                font-bold
              ">

                {stats.team}

              </h2>

            </div>

            <div className="
              bg-purple-100
              p-5
              rounded-2xl
            ">

              <FaUsers className="
                text-purple-600
                text-4xl
              " />

            </div>

          </div>

        </div>

        {/* COMPLETED */}

        <div className="
          enterprise-card
          p-8
        ">

          <div className="
            flex
            justify-between
            items-center
          ">

            <div>

              <p className="text-gray-500">

                Completed

              </p>

              <h2 className="
                text-5xl
                font-bold
              ">

                {stats.completed}

              </h2>

            </div>

            <div className="
              bg-orange-100
              p-5
              rounded-2xl
            ">

              <FaCheckCircle className="
                text-orange-600
                text-4xl
              " />

            </div>

          </div>

        </div>

      </div>

      {/* ANALYTICS */}

      <div className="
        grid
        grid-cols-1
        xl:grid-cols-2
        gap-8
        mb-10
      ">

        {/* PIE CHART */}

        <div className="
          enterprise-card
          p-8
        ">

          <h2 className="
            text-3xl
            font-bold
            mb-8
          ">

            Task Analytics

          </h2>

          <div className="h-[350px]">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <PieChart>

                <Pie
                  data={taskData}
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  dataKey="value"
                >

                  {taskData.map(
                    (
                      entry,
                      index
                    ) => (

                      <Cell
                        key={index}
                        fill={
                          COLORS[index]
                        }
                      />

                    )
                  )}

                </Pie>

                <Tooltip />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* PROGRESS */}

        <div className="
          enterprise-card
          p-8
        ">

          <h2 className="
            text-3xl
            font-bold
            text-center
            mb-8
          ">

            Project Completion

          </h2>

          <div className="
            w-72
            h-72
            mx-auto
          ">

            <CircularProgressbar
              value={progress}
              text={`${progress.toFixed(0)}%`}
              styles={buildStyles({

                pathColor:
                  "#22c55e",

                textColor:
                  "#111827",

                trailColor:
                  "#e5e7eb",

              })}
            />

          </div>

        </div>

      </div>

      {/* RECENT ACTIVITIES */}

      <div className="
        enterprise-card
        p-8
      ">

        <div className="
          flex
          items-center
          gap-3
          mb-8
        ">

          <FaBell className="
            text-blue-600
            text-2xl
          " />

          <h2 className="
            text-3xl
            font-bold
          ">

            Recent Activities

          </h2>

        </div>

        <div className="
          space-y-5
        ">

          {
            activities.length > 0
              ? (
                  activities
                    .slice(0, 5)
                    .map(
                      (
                        activity,
                        index
                      ) => (

                        <div
                          key={index}
                          className="
                            border
                            rounded-2xl
                            p-5
                          "
                        >

                          <h3 className="
                            font-bold
                            text-lg
                          ">

                            {activity.title}

                          </h3>

                          <p className="
                            text-gray-500
                          ">

                            {
                              activity.description
                            }

                          </p>

                        </div>

                      )
                    )
                )
              : (

                <p className="
                  text-gray-500
                ">

                  No recent activities

                </p>

              )
          }

        </div>

      </div>

      {/* FLOATING BUTTON */}

      {
        role === "ADMIN" && (

          <button
            onClick={() =>
              navigate(
                "/create-project"
              )
            }
            className="
              fixed
              bottom-8
              right-8
              w-16
              h-16
              rounded-full
              bg-blue-600
              text-white
              text-3xl
              shadow-2xl
              z-50
            "
          >

            +

          </button>

        )
      }

    </MainLayout>

  );
}

export default Dashboard;