import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import Sidebar from "../components/Sidebar";

function MainLayout({
  children,
}) {

  const navigate =
    useNavigate();

  // =========================
  // DARK MODE
  // =========================
  const [darkMode, setDarkMode] =
    useState(false);

  // =========================
  // MOBILE SIDEBAR
  // =========================
  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  // =========================
  // SEARCH
  // =========================
  const [search, setSearch] =
    useState("");

  // =========================
  // NOTIFICATIONS
  // =========================
  const [notifications] =
    useState([

      {
        id: 1,
        title:
          "New task assigned",
      },

      {
        id: 2,
        title:
          "Project updated",
      },

      {
        id: 3,
        title:
          "Meeting at 5 PM",
      },

    ]);

  // =========================
  // LOAD THEME
  // =========================
  useEffect(() => {

    const savedTheme =
      localStorage.getItem(
        "theme"
      );

    if (
      savedTheme === "dark"
    ) {

      setDarkMode(true);

      document.documentElement.classList.add(
        "dark"
      );

    }

  }, []);

  // =========================
  // TOGGLE THEME
  // =========================
  const toggleDarkMode =
    () => {

      setDarkMode(
        !darkMode
      );

      if (!darkMode) {

        document.documentElement.classList.add(
          "dark"
        );

        localStorage.setItem(
          "theme",
          "dark"
        );

      } else {

        document.documentElement.classList.remove(
          "dark"
        );

        localStorage.setItem(
          "theme",
          "light"
        );

      }
    };

  return (

    <div className="
      flex
      min-h-screen
      bg-gray-100
      dark:bg-[#020617]
      transition-all
      duration-300
    ">

      {/* MOBILE OVERLAY */}
      {
        sidebarOpen && (

          <div
            className="
              fixed
              inset-0
              bg-black/50
              z-40
              lg:hidden
            "
            onClick={() =>
              setSidebarOpen(false)
            }
          />

        )
      }

      {/* SIDEBAR */}
      <div
        className={`
          fixed lg:relative z-50
          h-screen
          transition-all duration-300
          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >

        <Sidebar />

      </div>

      {/* MAIN CONTENT */}
      <div className="
        flex-1
        overflow-auto
      ">

        {/* NAVBAR */}
        <div className="
          sticky
          top-0
          z-30
          flex
          justify-between
          items-center
          px-6
          lg:px-10
          py-5
          bg-slate-900/90
          backdrop-blur-xl
          border-b
          border-slate-800
          shadow-lg
        ">

          {/* LEFT */}
          <div className="
            flex
            items-center
            gap-4
          ">

            {/* MOBILE MENU */}
            <button
              onClick={() =>
                setSidebarOpen(
                  !sidebarOpen
                )
              }
              className="
                lg:hidden
                text-white
                text-3xl
              "
            >

              ☰

            </button>

            {/* TITLE */}
            <div>

              <h1 className="
                text-3xl
                font-bold
                text-white
              ">

                DevConnect AI

              </h1>

              <p className="
                text-gray-400
              ">

                Smart Project Collaboration

              </p>

            </div>

          </div>

          {/* RIGHT */}
          <div className="
            flex
            items-center
            gap-4
          ">

            {/* GLOBAL SEARCH */}
            <div className="
              hidden
              md:block
              relative
            ">

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }

                onKeyDown={(e) => {

                  if (
                    e.key === "Enter"
                  ) {

                    const value =
                      search.toLowerCase();

                    // =========================
                    // PROJECTS
                    // =========================
                    if (
                      value.includes(
                        "project"
                      )
                    ) {

                      navigate(
                        "/projects"
                      );

                    }

                    // =========================
                    // TASKS
                    // =========================
                    else if (
                      value.includes(
                        "task"
                      )
                    ) {

                      navigate(
                        "/tasks"
                      );

                    }

                    // =========================
                    // TEAM
                    // =========================
                    else if (
                      value.includes(
                        "team"
                      )
                    ) {

                      // GET USER ROLE
                      const role =
                        localStorage.getItem(
                          "role"
                        );

                      // ADMIN
                      if (
                        role ===
                        "ADMIN"
                      ) {

                        navigate(
                          "/team"
                        );

                      }

                      // PROJECT MANAGER
                      else if (
                        role ===
                        "PROJECT_MANAGER"
                      ) {

                        navigate(
                          "/team"
                        );

                      }

                      // TEAM MEMBER
                      else {

                        alert(
                          "Access Denied: Only Admin and Project Manager can access Team page."
                        );

                        navigate(
                          "/dashboard"
                        );

                      }

                    }

                    // =========================
                    // FILES
                    // =========================
                    else if (
                      value.includes(
                        "file"
                      )
                    ) {

                      navigate(
                        "/files"
                      );

                    }

                    // =========================
                    // PROFILE
                    // =========================
                    else if (
                      value.includes(
                        "profile"
                      )
                    ) {

                      navigate(
                        "/profile"
                      );

                    }

                    // =========================
                    // NOTIFICATIONS
                    // =========================
                    else if (
                      value.includes(
                        "notification"
                      )
                    ) {

                      navigate(
                        "/notifications"
                      );

                    }

                    // =========================
                    // NO MATCH
                    // =========================
                    else {

                      alert(
                        "No matching page found"
                      );

                    }

                  }

                }}

                placeholder="Search projects, tasks..."

                className="
                  w-80
                  bg-slate-800
                  border
                  border-slate-700
                  text-white
                  px-5
                  py-3
                  rounded-2xl
                  outline-none
                  placeholder:text-gray-400
                  focus:border-blue-500
                  focus:ring-2
                  focus:ring-blue-500/30
                  transition-all
                  duration-300
                "
              />

            </div>

            {/* NOTIFICATIONS */}
            <div className="relative">

              <button
                onClick={() =>
                  navigate(
                    "/notifications"
                  )
                }
                className="
                  w-14
                  h-14
                  rounded-2xl
                  bg-slate-800
                  flex
                  items-center
                  justify-center
                  text-white
                  hover:bg-slate-700
                  hover:scale-105
                  transition-all
                  duration-300
                  shadow-lg
                "
              >

                🔔

              </button>

              {/* BADGE */}
              <span className="
                absolute
                -top-1
                -right-1
                w-6
                h-6
                rounded-full
                bg-red-500
                text-white
                text-xs
                flex
                items-center
                justify-center
                font-bold
              ">

                {
                  notifications.length
                }

              </span>

            </div>

            {/* DARK MODE */}
            <button
              onClick={
                toggleDarkMode
              }
              className="
                bg-slate-800
                text-white
                px-5
                py-3
                rounded-2xl
                font-semibold
                hover:scale-105
                hover:bg-slate-700
                transition-all
                duration-300
                shadow-lg
              "
            >

              {
                darkMode
                  ? "☀️ Light"
                  : "🌙 Dark"
              }

            </button>

            {/* PROFILE */}
            <div className="
              hidden
              sm:flex
              items-center
              gap-3
              bg-white
              dark:bg-[#0f172a]
              px-4
              py-2
              rounded-2xl
              shadow-card
              border
              dark:border-slate-800
              hover:scale-105
              transition-all
              duration-300
            ">

              {/* AVATAR */}
              <div className="
                w-11
                h-11
                rounded-full
                bg-blue-500
                flex
                items-center
                justify-center
                text-white
                font-bold
                text-lg
              ">

                {
                  localStorage
                    .getItem("name")
                    ?.charAt(0)
                    ?.toUpperCase() || "A"
                }

              </div>

              {/* INFO */}
              <div>

                <h3 className="
                  font-semibold
                  text-slate-800
                  dark:text-white
                ">

                  {
                    localStorage.getItem(
                      "role"
                    ) || "Admin"
                  }

                </h3>

                <p className="
                  text-sm
                  text-green-500
                ">

                  <span className="
                    flex
                    items-center
                    gap-2
                  ">

                    <span className="
                      w-3
                      h-3
                      rounded-full
                      bg-green-500
                      animate-pulse
                    " />

                    Online

                  </span>

                </p>

              </div>

            </div>

          </div>

        </div>

        {/* PAGE CONTENT */}
        <div className="
          p-5
          lg:p-10
          bg-gray-100
          dark:bg-[#020617]
          min-h-screen
          transition-all
          duration-500
        ">

          {children}

        </div>

      </div>

    </div>

  );
}

export default MainLayout;