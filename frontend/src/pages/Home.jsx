import {
  FaProjectDiagram,
  FaTasks,
  FaUsers,
  FaBell,
  FaFolderOpen,
  FaUserShield,
  FaUserTie,
  FaUser,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

function Home() {

  const navigate =
    useNavigate();

  // USER DETAILS
  const name =
    localStorage.getItem("name");

  const role =
    localStorage.getItem("role");

  // ROLE BADGE
  const getRoleBadge = () => {

    if (role === "ADMIN") {

      return (
        <div className="bg-red-100 text-red-600 px-5 py-2 rounded-2xl flex items-center gap-2 font-semibold">

          <FaUserShield />

          Admin

        </div>
      );
    }

    if (
      role ===
      "PROJECT_MANAGER"
    ) {

      return (
        <div className="bg-blue-100 text-blue-600 px-5 py-2 rounded-2xl flex items-center gap-2 font-semibold">

          <FaUserTie />

          Project Manager

        </div>
      );
    }

    return (
      <div className="bg-green-100 text-green-600 px-5 py-2 rounded-2xl flex items-center gap-2 font-semibold">

        <FaUser />

        Team Member

      </div>
    );
  };

  return (

    <MainLayout>

      {/* HERO */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-700 rounded-3xl p-12 text-white shadow-2xl">

        <div className="flex flex-col xl:flex-row justify-between gap-10">

          <div>

            <h1 className="text-6xl font-extrabold leading-tight">

              Welcome,
              {" "}
              {name || "User"}

            </h1>

            <p className="text-2xl text-slate-300 mt-5">

              {
                role === "ADMIN"
                  ? "Manage your organization, projects, teams, and workflow efficiently."
                  : role === "PROJECT_MANAGER"
                  ? "Track projects, assign tasks, and monitor team productivity."
                  : "View tasks, update progress, and collaborate with your team."
              }

            </p>

          </div>

          {/* ROLE */}
          <div>

            {getRoleBadge()}

          </div>

        </div>

      </div>

      {/* QUICK ACCESS */}
      <div className="mt-12">

        <h2 className="text-4xl font-bold text-slate-800 mb-8">

          Quick Access

        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">

          {/* PROJECTS */}
          {
            (
              role === "ADMIN" ||
              role === "PROJECT_MANAGER"
            ) && (

              <div
                onClick={() =>
                  navigate("/projects")
                }
                className="bg-white rounded-3xl p-8 shadow-lg hover:scale-105 transition cursor-pointer"
              >

                <div className="bg-blue-100 w-20 h-20 rounded-3xl flex items-center justify-center mb-6">

                  <FaProjectDiagram className="text-blue-600 text-4xl" />

                </div>

                <h3 className="text-3xl font-bold text-slate-800 mb-3">

                  Projects

                </h3>

                <p className="text-gray-500 text-lg">

                  Create and manage development projects.

                </p>

              </div>

            )
          }

          {/* TASKS */}
          <div
            onClick={() =>
              navigate("/tasks")
            }
            className="bg-white rounded-3xl p-8 shadow-lg hover:scale-105 transition cursor-pointer"
          >

            <div className="bg-green-100 w-20 h-20 rounded-3xl flex items-center justify-center mb-6">

              <FaTasks className="text-green-600 text-4xl" />

            </div>

            <h3 className="text-3xl font-bold text-slate-800 mb-3">

              Tasks

            </h3>

            <p className="text-gray-500 text-lg">

              Manage daily tasks and progress tracking.

            </p>

          </div>

          {/* TEAM */}
          {
            (
              role === "ADMIN" ||
              role === "PROJECT_MANAGER"
            ) && (

              <div
                onClick={() =>
                  navigate("/team")
                }
                className="bg-white rounded-3xl p-8 shadow-lg hover:scale-105 transition cursor-pointer"
              >

                <div className="bg-purple-100 w-20 h-20 rounded-3xl flex items-center justify-center mb-6">

                  <FaUsers className="text-purple-600 text-4xl" />

                </div>

                <h3 className="text-3xl font-bold text-slate-800 mb-3">

                  Team

                </h3>

                <p className="text-gray-500 text-lg">

                  Collaborate and manage team members.

                </p>

              </div>

            )
          }

          {/* FILES */}
          <div
            onClick={() =>
              navigate("/files")
            }
            className="bg-white rounded-3xl p-8 shadow-lg hover:scale-105 transition cursor-pointer"
          >

            <div className="bg-orange-100 w-20 h-20 rounded-3xl flex items-center justify-center mb-6">

              <FaFolderOpen className="text-orange-600 text-4xl" />

            </div>

            <h3 className="text-3xl font-bold text-slate-800 mb-3">

              Files

            </h3>

            <p className="text-gray-500 text-lg">

              Upload and manage project resources.

            </p>

          </div>

        </div>

      </div>

      {/* NOTIFICATIONS */}
      <div className="bg-white rounded-3xl shadow-lg p-10 mt-12">

        <div className="flex items-center gap-4 mb-8">

          <div className="bg-yellow-100 p-5 rounded-3xl">

            <FaBell className="text-yellow-600 text-4xl" />

          </div>

          <div>

            <h2 className="text-4xl font-bold text-slate-800">

              Smart Collaboration

            </h2>

            <p className="text-gray-500 mt-2 text-lg">

              DevConnect AI helps teams collaborate efficiently with projects, tasks, analytics, and notifications.

            </p>

          </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          <div className="bg-slate-100 rounded-2xl p-6">

            <h3 className="text-2xl font-bold text-slate-800 mb-3">

              Real-Time Workflow

            </h3>

            <p className="text-gray-500">

              Monitor tasks, progress, and deadlines efficiently.

            </p>

          </div>

          <div className="bg-slate-100 rounded-2xl p-6">

            <h3 className="text-2xl font-bold text-slate-800 mb-3">

              Team Collaboration

            </h3>

            <p className="text-gray-500">

              Work together with organized team management.

            </p>

          </div>

          <div className="bg-slate-100 rounded-2xl p-6">

            <h3 className="text-2xl font-bold text-slate-800 mb-3">

              Secure Access

            </h3>

            <p className="text-gray-500">

              Role-based access ensures enterprise-grade security.

            </p>

          </div>

        </div>

      </div>

    </MainLayout>
  );
}

export default Home;