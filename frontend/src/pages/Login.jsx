import { useState } from "react";

import API from "../utils/axiosConfig";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import {

  FaUserShield,

  FaUserTie,

  FaUsers,

  FaLock,

  FaEnvelope,

  FaArrowRight,

} from "react-icons/fa";

function Login() {

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const navigate =
    useNavigate();

  // =========================
  // LOGIN FUNCTION
  // =========================
  const handleLogin = async (e) => {

    e.preventDefault();

    // VALIDATION
    if (!email || !password) {

      toast.error(
        "Please fill all fields"
      );

      return;
    }

    try {

      setLoading(true);

      console.log(
        "Sending Login Request..."
      );

      // API CALL
      const response =
        await API.post(
          "/api/auth/login",
          {
            email: email,
            password: password,
          }
        );

      console.log(
        "LOGIN RESPONSE:"
      );

      console.log(response.data);

      // INVALID LOGIN
      if (

        !response.data ||

        !response.data.token

      ) {

        toast.error(
          "Invalid Credentials"
        );

        return;
      }

      // SAVE TOKEN
      localStorage.setItem(
        "token",
        response.data.token
      );

      // SAVE USER DATA
      localStorage.setItem(
        "name",
        response.data.name
      );

      localStorage.setItem(
        "email",
        response.data.email
      );

      localStorage.setItem(
        "role",
        response.data.role
      );

      // SUCCESS TOAST
      toast.success(
        "Login Successful"
      );

      // REDIRECT
      setTimeout(() => {

        navigate("/dashboard");

      }, 1000);

    } catch (error) {

      console.log(
        "LOGIN ERROR:"
      );

      console.log(error);

      // BACKEND ERROR
      if (error.response) {

        console.log(
          error.response.data
        );

        toast.error(
          `Backend Error: ${error.response.status}`
        );

      } else {

        toast.error(
          "Server Connection Failed"
        );
      }

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-gradient-to-br
      from-slate-100
      via-slate-200
      to-slate-300
      dark:from-[#020617]
      dark:via-[#0f172a]
      dark:to-[#020617]
      p-6
      transition-all
      duration-300
    ">

      <div className="
        grid
        grid-cols-1
        xl:grid-cols-2
        gap-10
        w-full
        max-w-7xl
      ">

        {/* LEFT SIDE */}
        <div className="
          hidden
          xl:flex
          flex-col
          justify-center
          animate-fade
        ">

          <h1 className="
            text-7xl
            font-extrabold
            text-slate-900
            dark:text-white
            leading-tight
          ">

            DevConnect
            <br />
            AI

          </h1>

          <p className="
            text-2xl
            text-slate-600
            dark:text-gray-400
            mt-6
            leading-relaxed
          ">

            Enterprise-level project
            management platform with
            role-based collaboration,
            analytics, task management,
            notifications, and secure
            workflow.

          </p>

          {/* ROLE CARDS */}
          <div className="
            grid
            grid-cols-1
            md:grid-cols-3
            gap-5
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
                leading-relaxed
              ">

                Full access to projects,
                teams, analytics,
                and system management.

              </p>

            </div>

            {/* PROJECT MANAGER */}
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

                Project Manager

              </h3>

              <p className="
                text-gray-500
                dark:text-gray-400
                leading-relaxed
              ">

                Manage projects,
                tasks, deadlines,
                and team collaboration.

              </p>

            </div>

            {/* TEAM MEMBER */}
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

                Team Member

              </h3>

              <p className="
                text-gray-500
                dark:text-gray-400
                leading-relaxed
              ">

                Work on assigned tasks
                and collaborate with
                the development team.

              </p>

            </div>

          </div>

        </div>

        {/* LOGIN FORM */}
        <div className="
          flex
          items-center
          justify-center
        ">

          <form
            onSubmit={handleLogin}
            className="
              bg-white
              dark:bg-[#0f172a]
              w-full
              max-w-md
              p-10
              rounded-[35px]
              shadow-2xl
              dark:border
              dark:border-slate-800
              animate-slide
            "
          >

            {/* TITLE */}
            <div className="text-center mb-10">

              <h2 className="
                text-5xl
                font-extrabold
                text-slate-900
                dark:text-white
              ">

                Welcome Back

              </h2>

              <p className="
                text-gray-500
                dark:text-gray-400
                mt-4
                text-lg
              ">

                Login to continue to
                DevConnect AI

              </p>

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
                    focus:ring-slate-900
                    transition-all
                  "
                  required
                />

              </div>

            </div>

            {/* PASSWORD */}
            <div className="mb-8">

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
                    focus:ring-slate-900
                    transition-all
                  "
                  required
                />

              </div>

            </div>

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="
                bg-slate-900
                hover:bg-slate-800
                disabled:bg-slate-500
                transition-all
                duration-300
                text-white
                w-full
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
                  ? "Logging In..."
                  : (
                    <>
                      Login
                      <FaArrowRight />
                    </>
                  )
              }

            </button>

            {/* REGISTER */}
            <p className="
              text-center
              mt-8
              text-gray-600
              dark:text-gray-400
              text-lg
            ">

              Don't have an account?{" "}

              <span
                onClick={() =>
                  navigate("/register")
                }
                className="
                  text-blue-600
                  font-semibold
                  cursor-pointer
                  hover:underline
                "
              >

                Register

              </span>

            </p>

          </form>

        </div>

      </div>

    </div>
  );
}

export default Login;