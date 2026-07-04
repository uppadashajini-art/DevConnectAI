import { useState } from "react";

import axios from "../utils/axiosConfig";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import {

  FaUserShield,

  FaUsers,

  FaUserTie,

  FaEnvelope,

  FaLock,

  FaUser,

  FaArrowRight,

} from "react-icons/fa";

function Register() {

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [role, setRole] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const navigate =
    useNavigate();

  // =========================
  // REGISTER
  // =========================
  const handleRegister = async (e) => {

    e.preventDefault();

    // VALIDATION
    if (

      !name ||

      !email ||

      !password ||

      !role

    ) {

      toast.error(
        "Please fill all fields"
      );

      return;
    }

    try {

      setLoading(true);

      // API CALL
      await axios.post(
        "/api/auth/register",
        {
          name,
          email,
          password,
          role,
        }
      );

      // SUCCESS
      toast.success(
        "Registered Successfully"
      );

      // REDIRECT
      setTimeout(() => {

        navigate("/");

      }, 1000);

    } catch (error) {

      console.log(error);

      // BACKEND ERROR
      if (error.response) {

        toast.error(

          error.response.data.message ||

          "Registration Failed"

        );

      } else {

        toast.error(
          "Server not responding"
        );
      }

    } finally {

      setLoading(false);

    }
  };

  // =========================
  // ROLE CARD
  // =========================
  const getRoleCard = () => {

    if (role === "ADMIN") {

      return (

        <div className="
          bg-red-50
          dark:bg-red-500/10
          border
          border-red-200
          dark:border-red-500/20
          rounded-3xl
          p-5
          flex
          gap-5
          transition-all
          duration-300
          hover:scale-[1.02]
        ">

          <div className="
            bg-red-500
            text-white
            p-5
            rounded-2xl
            h-fit
          ">

            <FaUserShield className="text-3xl" />

          </div>

          <div>

            <h3 className="
              text-2xl
              font-bold
              text-slate-800
              dark:text-white
            ">

              Admin

            </h3>

            <p className="
              text-gray-500
              dark:text-gray-400
              mt-2
            ">

              Full system access including
              projects, tasks, analytics,
              team management, and notifications.

            </p>

          </div>

        </div>

      );
    }

    if (
      role ===
      "PROJECT_MANAGER"
    ) {

      return (

        <div className="
          bg-blue-50
          dark:bg-blue-500/10
          border
          border-blue-200
          dark:border-blue-500/20
          rounded-3xl
          p-5
          flex
          gap-5
          transition-all
          duration-300
          hover:scale-[1.02]
        ">

          <div className="
            bg-blue-500
            text-white
            p-5
            rounded-2xl
            h-fit
          ">

            <FaUserTie className="text-3xl" />

          </div>

          <div>

            <h3 className="
              text-2xl
              font-bold
              text-slate-800
              dark:text-white
            ">

              Project Manager

            </h3>

            <p className="
              text-gray-500
              dark:text-gray-400
              mt-2
            ">

              Create projects, assign tasks,
              manage workflow, and monitor
              development progress.

            </p>

          </div>

        </div>

      );
    }

    if (
      role ===
      "TEAM_MEMBER"
    ) {

      return (

        <div className="
          bg-green-50
          dark:bg-green-500/10
          border
          border-green-200
          dark:border-green-500/20
          rounded-3xl
          p-5
          flex
          gap-5
          transition-all
          duration-300
          hover:scale-[1.02]
        ">

          <div className="
            bg-green-500
            text-white
            p-5
            rounded-2xl
            h-fit
          ">

            <FaUsers className="text-3xl" />

          </div>

          <div>

            <h3 className="
              text-2xl
              font-bold
              text-slate-800
              dark:text-white
            ">

              Team Member

            </h3>

            <p className="
              text-gray-500
              dark:text-gray-400
              mt-2
            ">

              Work on assigned tasks,
              update progress, and collaborate
              with the development team.

            </p>

          </div>

        </div>

      );
    }
  };

  return (

    <div className="
      min-h-screen
      bg-gradient-to-br
      from-slate-100
      via-slate-200
      to-slate-300
      dark:from-[#020617]
      dark:via-[#0f172a]
      dark:to-[#020617]
      flex
      items-center
      justify-center
      p-6
      transition-all
      duration-300
    ">

      <div className="
        grid
        grid-cols-1
        xl:grid-cols-2
        gap-12
        w-full
        max-w-7xl
      ">

        {/* LEFT SIDE */}
        <div className="
          hidden
          xl:flex
          flex-col
          justify-center
        ">

          <h1 className="
            text-7xl
            font-extrabold
            text-slate-900
            dark:text-white
            leading-tight
          ">

            Join
            <br />
            DevConnect AI

          </h1>

          <p className="
            text-2xl
            text-slate-600
            dark:text-gray-400
            mt-6
            leading-relaxed
          ">

            Build smarter teams,
            manage projects,
            track tasks, and collaborate
            with enterprise-level workflow
            management.

          </p>

          {/* FEATURE CARDS */}
          <div className="
            grid
            grid-cols-1
            md:grid-cols-3
            gap-6
            mt-12
          ">

            {/* ADMIN */}
            <div className="
              bg-white
              dark:bg-[#0f172a]
              rounded-3xl
              p-6
              shadow-xl
              dark:border
              dark:border-slate-800
              transition-all
              duration-300
              hover:scale-[1.03]
              hover:shadow-2xl
            ">

              <div className="
                bg-red-100
                text-red-600
                w-16
                h-16
                rounded-2xl
                flex
                items-center
                justify-center
                mb-5
              ">

                <FaUserShield className="text-3xl" />

              </div>

              <h3 className="
                text-2xl
                font-bold
                text-slate-800
                dark:text-white
                mb-3
              ">

                Admin

              </h3>

              <p className="
                text-gray-500
                dark:text-gray-400
              ">

                Full platform management
                and analytics access.

              </p>

            </div>

            {/* PM */}
            <div className="
              bg-white
              dark:bg-[#0f172a]
              rounded-3xl
              p-6
              shadow-xl
              dark:border
              dark:border-slate-800
              transition-all
              duration-300
              hover:scale-[1.03]
              hover:shadow-2xl
            ">

              <div className="
                bg-blue-100
                text-blue-600
                w-16
                h-16
                rounded-2xl
                flex
                items-center
                justify-center
                mb-5
              ">

                <FaUserTie className="text-3xl" />

              </div>

              <h3 className="
                text-2xl
                font-bold
                text-slate-800
                dark:text-white
                mb-3
              ">

                Manager

              </h3>

              <p className="
                text-gray-500
                dark:text-gray-400
              ">

                Manage tasks, projects,
                and collaboration.

              </p>

            </div>

            {/* TEAM */}
            <div className="
              bg-white
              dark:bg-[#0f172a]
              rounded-3xl
              p-6
              shadow-xl
              dark:border
              dark:border-slate-800
              transition-all
              duration-300
              hover:scale-[1.03]
              hover:shadow-2xl
            ">

              <div className="
                bg-green-100
                text-green-600
                w-16
                h-16
                rounded-2xl
                flex
                items-center
                justify-center
                mb-5
              ">

                <FaUsers className="text-3xl" />

              </div>

              <h3 className="
                text-2xl
                font-bold
                text-slate-800
                dark:text-white
                mb-3
              ">

                Team

              </h3>

              <p className="
                text-gray-500
                dark:text-gray-400
              ">

                Work on assigned tasks
                and projects efficiently.

              </p>

            </div>

          </div>

        </div>

        {/* REGISTER FORM */}
        <div className="
          flex
          items-center
          justify-center
        ">

          <form
            onSubmit={handleRegister}
            className="
              bg-white
              dark:bg-[#0f172a]
              w-full
              max-w-xl
              p-10
              rounded-[35px]
              shadow-2xl
              dark:border
              dark:border-slate-800
            "
          >

            {/* TITLE */}
            <div className="text-center mb-10">

              <h1 className="
                text-5xl
                font-extrabold
                text-slate-900
                dark:text-white
              ">

                Create Account

              </h1>

              <p className="
                text-gray-500
                dark:text-gray-400
                mt-4
                text-lg
              ">

                Register your DevConnect AI account

              </p>

            </div>

            {/* NAME */}
            <div className="mb-6">

              <label className="
                block
                mb-3
                font-semibold
                text-slate-700
                dark:text-gray-300
              ">

                Full Name

              </label>

              <div className="relative">

                <FaUser className="
                  absolute
                  left-4
                  top-5
                  text-gray-400
                " />

                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) =>
                    setName(
                      e.target.value
                    )
                  }
                  className="
                    w-full
                    border
                    border-gray-300
                    dark:border-slate-700
                    dark:bg-slate-900
                    dark:text-white
                    pl-12
                    p-4
                    rounded-2xl
                    focus:outline-none
                    focus:ring-2
                    focus:ring-blue-500
                  "
                />

              </div>

            </div>

            {/* EMAIL */}
            <div className="mb-6">

              <label className="
                block
                mb-3
                font-semibold
                text-slate-700
                dark:text-gray-300
              ">

                Email Address

              </label>

              <div className="relative">

                <FaEnvelope className="
                  absolute
                  left-4
                  top-5
                  text-gray-400
                " />

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) =>
                    setEmail(
                      e.target.value
                    )
                  }
                  className="
                    w-full
                    border
                    border-gray-300
                    dark:border-slate-700
                    dark:bg-slate-900
                    dark:text-white
                    pl-12
                    p-4
                    rounded-2xl
                    focus:outline-none
                    focus:ring-2
                    focus:ring-blue-500
                  "
                />

              </div>

            </div>

            {/* PASSWORD */}
            <div className="mb-6">

              <label className="
                block
                mb-3
                font-semibold
                text-slate-700
                dark:text-gray-300
              ">

                Password

              </label>

              <div className="relative">

                <FaLock className="
                  absolute
                  left-4
                  top-5
                  text-gray-400
                " />

                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) =>
                    setPassword(
                      e.target.value
                    )
                  }
                  className="
                    w-full
                    border
                    border-gray-300
                    dark:border-slate-700
                    dark:bg-slate-900
                    dark:text-white
                    pl-12
                    p-4
                    rounded-2xl
                    focus:outline-none
                    focus:ring-2
                    focus:ring-blue-500
                  "
                />

              </div>

            </div>

            {/* ROLE */}
            <div className="mb-8">

              <label className="
                block
                mb-3
                font-semibold
                text-slate-700
                dark:text-gray-300
              ">

                Select Role

              </label>

              <select
                value={role}
                onChange={(e) =>
                  setRole(
                    e.target.value
                  )
                }
                className="
                  w-full
                  border
                  border-gray-300
                  dark:border-slate-700
                  dark:bg-slate-900
                  dark:text-white
                  p-4
                  rounded-2xl
                  focus:outline-none
                  focus:ring-2
                  focus:ring-blue-500
                "
              >

                <option value="">
                  Choose Role
                </option>

                <option value="ADMIN">
                  Admin
                </option>

                <option value="PROJECT_MANAGER">
                  Project Manager
                </option>

                <option value="TEAM_MEMBER">
                  Team Member
                </option>

              </select>

            </div>

            {/* ROLE CARD */}
            {role && (

              <div className="mb-8">

                {getRoleCard()}

              </div>

            )}

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                bg-slate-900
                hover:bg-slate-800
                disabled:bg-slate-500
                transition-all
                duration-300
                text-white
                p-4
                rounded-2xl
                text-lg
                font-bold
                shadow-xl
                flex
                items-center
                justify-center
                gap-3
                hover:scale-[1.02]
              "
            >

              {
                loading
                  ? "Creating Account..."
                  : (
                    <>
                      Create Account
                      <FaArrowRight />
                    </>
                  )
              }

            </button>

            {/* LOGIN */}
            <p className="
              text-center
              mt-8
              text-gray-600
              dark:text-gray-400
              text-lg
            ">

              Already have an account?{" "}

              <span
                onClick={() =>
                  navigate("/")
                }
                className="
                  text-blue-600
                  font-semibold
                  cursor-pointer
                  hover:underline
                "
              >

                Login

              </span>

            </p>

          </form>

        </div>

      </div>

    </div>
  );
}

export default Register;