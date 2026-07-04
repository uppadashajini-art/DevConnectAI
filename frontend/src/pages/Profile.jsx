import { useState } from "react";

import {
  FaEnvelope,
  FaUser,
  FaCode,
  FaProjectDiagram,
  FaTasks,
  FaSignOutAlt,
  FaSave,
} from "react-icons/fa";

import MainLayout from "../layouts/MainLayout";

function Profile() {

  const [username, setUsername] =
    useState(
      localStorage.getItem("name") ||
      "Bhargavi"
    );

  const [email, setEmail] =
    useState(
      localStorage.getItem("email") ||
      ""
    );

  // ROLE
  const role =
    localStorage.getItem("role") ||
    "TEAM_MEMBER";

  // SAVE
  const handleSave = () => {

    localStorage.setItem(
      "name",
      username
    );

    localStorage.setItem(
      "email",
      email
    );

    alert(
      "Profile Updated Successfully"
    );
  };

  // LOGOUT
  const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("email");

    localStorage.removeItem("name");

    localStorage.removeItem("role");

    window.location.href = "/";
  };

  // ROLE DESCRIPTION
  const getRoleDescription = () => {

    if (role === "ADMIN") {

      return (
        "Full access to projects, teams, analytics, and system management."
      );
    }

    if (
      role ===
      "PROJECT_MANAGER"
    ) {

      return (
        "Manage projects, tasks, deadlines, and collaboration."
      );
    }

    return (
      "Work on assigned tasks and collaborate with the team."
    );
  };

  return (

    <MainLayout>

      {/* HEADER */}
      <div className="flex justify-between items-center mb-10">

        <div>

          <h1 className="text-5xl font-bold text-slate-800">
            Profile
          </h1>

          <p className="text-slate-500 mt-2 text-lg">
            Manage your DevConnect AI account
          </p>

        </div>

      </div>

      {/* PROFILE CARD */}
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">

        {/* TOP SECTION */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-700 p-12 text-white">

          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10">

            {/* AVATAR */}
            <div className="w-40 h-40 rounded-full bg-white text-slate-900 flex items-center justify-center text-6xl font-extrabold shadow-2xl">

              {
                username
                  ? username
                      .charAt(0)
                      .toUpperCase()
                  : "U"
              }

            </div>

            {/* INFO */}
            <div className="flex-1">

              <h2 className="text-5xl font-extrabold">

                {username}

              </h2>

              <p className="text-slate-300 text-xl mt-4 flex items-center gap-3">

                <FaEnvelope />

                {email}

              </p>

              <p className="text-slate-300 text-lg mt-5 max-w-3xl leading-relaxed">

                {getRoleDescription()}

              </p>

              {/* SKILLS */}
              <div className="flex flex-wrap gap-4 mt-8">

                <span className="bg-white/20 px-5 py-2 rounded-2xl font-semibold">
                  React
                </span>

                <span className="bg-white/20 px-5 py-2 rounded-2xl font-semibold">
                  Spring Boot
                </span>

                <span className="bg-white/20 px-5 py-2 rounded-2xl font-semibold">
                  MySQL
                </span>

                <span className="bg-white/20 px-5 py-2 rounded-2xl font-semibold">
                  JWT Security
                </span>

              </div>

            </div>

          </div>

        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-10">

          <div className="bg-slate-100 rounded-3xl p-8">

            <div className="bg-blue-100 w-20 h-20 rounded-3xl flex items-center justify-center mb-6">

              <FaProjectDiagram className="text-blue-600 text-4xl" />

            </div>

            <h3 className="text-4xl font-bold text-slate-800">
              12
            </h3>

            <p className="text-gray-500 mt-2 text-lg">
              Projects Managed
            </p>

          </div>

          <div className="bg-slate-100 rounded-3xl p-8">

            <div className="bg-green-100 w-20 h-20 rounded-3xl flex items-center justify-center mb-6">

              <FaTasks className="text-green-600 text-4xl" />

            </div>

            <h3 className="text-4xl font-bold text-slate-800">
              48
            </h3>

            <p className="text-gray-500 mt-2 text-lg">
              Tasks Completed
            </p>

          </div>

          <div className="bg-slate-100 rounded-3xl p-8">

            <div className="bg-purple-100 w-20 h-20 rounded-3xl flex items-center justify-center mb-6">

              <FaCode className="text-purple-600 text-4xl" />

            </div>

            <h3 className="text-4xl font-bold text-slate-800">
              4+
            </h3>

            <p className="text-gray-500 mt-2 text-lg">
              Technologies Used
            </p>

          </div>

        </div>

        {/* FORM */}
        <div className="p-10 border-t border-slate-200">

          {/* USERNAME */}
          <div className="mb-7">

            <label className="block text-slate-700 mb-3 font-semibold text-lg">

              Username

            </label>

            <div className="relative">

              <FaUser className="absolute left-4 top-5 text-gray-400" />

              <input
                type="text"
                value={username}
                onChange={(e) =>
                  setUsername(
                    e.target.value
                  )
                }
                className="w-full border border-slate-300 pl-12 p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-900"
              />

            </div>

          </div>

          {/* EMAIL */}
          <div className="mb-7">

            <label className="block text-slate-700 mb-3 font-semibold text-lg">

              Email Address

            </label>

            <div className="relative">

              <FaEnvelope className="absolute left-4 top-5 text-gray-400" />

              <input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
                className="w-full border border-slate-300 pl-12 p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-900"
              />

            </div>

          </div>

          {/* ROLE */}
          <div className="mb-10">

            <label className="block text-slate-700 mb-3 font-semibold text-lg">

              Account Role

            </label>

            <input
              type="text"
              value={role.replace("_", " ")}
              disabled
              className="w-full border border-slate-300 bg-slate-100 p-4 rounded-2xl cursor-not-allowed"
            />

          </div>

          {/* BUTTONS */}
          <div className="flex flex-wrap gap-5">

            {/* SAVE */}
            <button
              onClick={handleSave}
              className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-2xl font-semibold transition shadow-xl flex items-center gap-3"
            >

              <FaSave />

              Save Profile

            </button>

            {/* LOGOUT */}
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-2xl font-semibold transition shadow-xl flex items-center gap-3"
            >

              <FaSignOutAlt />

              Logout

            </button>

          </div>

        </div>

      </div>

    </MainLayout>
  );
}

export default Profile;