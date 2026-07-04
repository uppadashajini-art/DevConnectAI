import {

  FaTachometerAlt,

  FaProjectDiagram,

  FaTasks,

  FaUser,

  FaUsers,

  FaBell,

  FaFileUpload,

  FaSignOutAlt,

} from "react-icons/fa";

import {

  NavLink,

  useNavigate,

} from "react-router-dom";

function Sidebar() {

  const navigate =
    useNavigate();

  // =========================
  // USER ROLE
  // =========================
  const role =
    localStorage.getItem("role");

  // =========================
  // LOGOUT
  // =========================
  const handleLogout = () => {

    // CLEAR STORAGE
    localStorage.clear();

    // REDIRECT
    navigate("/");
  };

  // =========================
  // MENU ITEMS
  // =========================
  const menuItems = [

    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <FaTachometerAlt />,
      roles: [
        "ADMIN",
        "PROJECT_MANAGER",
        "TEAM_MEMBER",
      ],
    },

    {
      name: "Projects",
      path: "/projects",
      icon: <FaProjectDiagram />,
      roles: [
        "ADMIN",
        "PROJECT_MANAGER",
        "TEAM_MEMBER",
      ],
    },

    {
      name: "Tasks",
      path: "/tasks",
      icon: <FaTasks />,
      roles: [
        "ADMIN",
        "PROJECT_MANAGER",
        "TEAM_MEMBER",
      ],
    },

    // =========================
    // TEAM ACCESS
    // ONLY ADMIN & PM
    // =========================
    {
      name: "Team",
      path: "/team",
      icon: <FaUsers />,
      roles: [
        "ADMIN",
        "PROJECT_MANAGER",
      ],
    },

    {
      name: "Notifications",
      path: "/notifications",
      icon: <FaBell />,
      roles: [
        "ADMIN",
        "PROJECT_MANAGER",
        "TEAM_MEMBER",
      ],
    },

    {
      name: "Files",
      path: "/files",
      icon: <FaFileUpload />,
      roles: [
        "ADMIN",
        "PROJECT_MANAGER",
        "TEAM_MEMBER",
      ],
    },

    {
      name: "Profile",
      path: "/profile",
      icon: <FaUser />,
      roles: [
        "ADMIN",
        "PROJECT_MANAGER",
        "TEAM_MEMBER",
      ],
    },

  ];

  return (

    <div className="
      w-72
      h-screen
      sticky
      top-0
      bg-gradient-to-b
      from-slate-950
      to-slate-900
      border-r
      border-slate-800
      flex
      flex-col
      justify-between
      shadow-2xl
      overflow-y-auto
    ">

      {/* TOP */}
      <div>

        {/* LOGO */}
        <div className="
          px-8
          py-8
          border-b
          border-slate-800
        ">

          <h1 className="
            text-4xl
            font-extrabold
            text-blue-500
            leading-tight
          ">

            DevConnect

          </h1>

          <p className="
            text-gray-400
            mt-2
            text-lg
          ">

            AI Dashboard

          </p>

        </div>

        {/* NAVIGATION */}
        <nav className="
          flex
          flex-col
          gap-3
          px-5
          py-8
        ">

          {
            menuItems

              // =========================
              // FILTER BASED ON ROLE
              // =========================
              .filter((item) =>
                item.roles.includes(role)
              )

              // =========================
              // RENDER MENU
              // =========================
              .map((item) => (

                <NavLink
                  key={item.name}
                  to={item.path}

                  className={({ isActive }) =>

                    `
                    flex
                    items-center
                    gap-4
                    px-5
                    py-4
                    rounded-2xl
                    text-lg
                    font-semibold
                    transition-all
                    duration-300

                    ${
                      isActive

                        ? `
                          bg-blue-600/20
                          text-blue-400
                          border
                          border-blue-500/30
                          shadow-lg
                          shadow-blue-500/10
                          scale-[1.02]
                        `

                        : `
                          text-gray-300
                          hover:bg-slate-800
                          hover:text-white
                          hover:translate-x-1
                        `
                    }
                    `
                  }
                >

                  {/* ICON */}
                  <span className="text-xl">

                    {item.icon}

                  </span>

                  {/* NAME */}
                  {item.name}

                </NavLink>

              ))
          }

        </nav>

      </div>

      {/* BOTTOM */}
      <div className="
        p-5
        border-t
        border-slate-800
      ">

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="
            w-full
            flex
            items-center
            justify-center
            gap-4
            bg-red-500
            hover:bg-red-600
            text-white
            py-4
            rounded-2xl
            text-lg
            font-bold
            transition-all
            duration-300
            hover:scale-[1.02]
            shadow-lg
          "
        >

          <FaSignOutAlt />

          Logout

        </button>

      </div>

    </div>

  );
}

export default Sidebar;