import {
  useEffect,
  useState,
} from "react";

import axios from "../utils/axiosConfig";

import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";

import toast from "react-hot-toast";

import {
  FaTasks,
  FaEdit,
  FaTrash,
  FaCalendarAlt,
  FaUser,
  FaSearch,
  FaFolderOpen,
  FaCheckCircle,
  FaClock,
  FaSpinner,
} from "react-icons/fa";

import MainLayout from "../layouts/MainLayout";

function Tasks() {

  // =========================================
  // STATES
  // =========================================

  const [tasks, setTasks] =
    useState([]);

  const [filter, setFilter] =
    useState("All");

  const [search, setSearch] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const navigate =
    useNavigate();

  // =========================================
  // USER INFO
  // =========================================

  const role =
    localStorage.getItem("role");

  const email =
    localStorage.getItem("email");

  // =========================================
  // FETCH TASKS
  // =========================================

  useEffect(() => {

    fetchTasks();

  }, []);

  // =========================================
  // FETCH TASKS FUNCTION
  // =========================================

  const fetchTasks =
    async () => {

      try {

        setLoading(true);

        // =========================================
        // ADMIN & PROJECT_MANAGER
        // SEE ALL TASKS
        // =========================================

        if (

          role === "ADMIN" ||

          role === "PROJECT_MANAGER"

        ) {

          const response =
            await axios.get(
              "/api/tasks"
            );

          setTasks(
            response.data || []
          );

        }

        // =========================================
        // TEAM_MEMBER
        // ONLY ASSIGNED TASKS
        // =========================================

        else {

          const response =
            await axios.get(
              "/api/tasks"
            );

          const userTasks =
            response.data.filter(
              (task) =>

                task.assignedTo ===
                email
            );

          setTasks(
            userTasks || []
          );

        }

      } catch (error) {

        console.log(error);

        toast.error(
          "Failed to Fetch Tasks"
        );

      } finally {

        setLoading(false);

      }

    };

  // =========================================
  // DELETE TASK
  // ONLY ADMIN
  // =========================================

  const deleteTask =
    async (id) => {

      if (role !== "ADMIN") {

        toast.error(
          "Only Admin Can Delete Tasks"
        );

        return;

      }

      const confirmDelete =
        window.confirm(
          "Delete this task?"
        );

      if (!confirmDelete)
        return;

      try {

        await axios.delete(
          `/api/tasks/${id}`
        );

        setTasks(

          tasks.filter(
            (task) =>
              task.id !== id
          )

        );

        toast.success(
          "Task Deleted Successfully"
        );

      } catch (error) {

        console.log(error);

        toast.error(
          "Delete Failed"
        );

      }

    };

  // =========================================
  // SEARCH + FILTER
  // =========================================

  const filteredTasks =
    tasks.filter((task) => {

      const matchesSearch =

        task.title
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||

        task.description
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||

        task.assignedTo
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesFilter =

        filter === "All" ||

        task.status === filter;

      return (

        matchesSearch &&
        matchesFilter

      );

    });

  // =========================================
  // STATUS COLORS
  // =========================================

  const getStatusStyle =
    (status) => {

      switch (status) {

        case "Completed":

          return `
            bg-green-100
            text-green-700
          `;

        case "In Progress":

          return `
            bg-blue-100
            text-blue-700
          `;

        case "Pending":

          return `
            bg-yellow-100
            text-yellow-700
          `;

        default:

          return `
            bg-gray-100
            text-gray-700
          `;
      }

    };

  // =========================================
  // ANALYTICS
  // =========================================

  const completedTasks =
    tasks.filter(
      (task) =>
        task.status ===
        "Completed"
    ).length;

  const inProgressTasks =
    tasks.filter(
      (task) =>
        task.status ===
        "In Progress"
    ).length;

  return (

    <MainLayout>

      {/* HEADER */}

      <div className="
        flex
        flex-col
        xl:flex-row
        justify-between
        gap-8
        mb-10
      ">

        <div>

          <h1 className="
            text-5xl
            font-bold
            text-slate-900
            dark:text-white
          ">

            Tasks

          </h1>

          <p className="
            text-gray-500
            dark:text-gray-400
            mt-3
            text-lg
          ">

            Track and manage workflow efficiently

          </p>

        </div>

        {/* CREATE TASK */}

        {
          (
            role === "ADMIN" ||
            role === "PROJECT_MANAGER"
          ) && (

            <button
              onClick={() =>
                navigate(
                  "/create-task"
                )
              }
              className="
                bg-blue-600
                hover:bg-blue-700
                text-white
                px-8
                py-4
                rounded-2xl
                shadow-lg
                transition-all
                duration-300
                font-semibold
              "
            >

              + Create Task

            </button>

          )
        }

      </div>

      {/* TEAM MEMBER MESSAGE */}

      {
        role === "TEAM_MEMBER" && (

          <div className="
            bg-yellow-100
            border
            border-yellow-300
            text-yellow-800
            p-5
            rounded-2xl
            mb-8
          ">

            You can only view and update
            tasks assigned to you.

          </div>

        )
      }

      {/* ANALYTICS */}

      <div className="
        grid
        grid-cols-1
        md:grid-cols-3
        gap-8
        mb-10
      ">

        <div className="enterprise-card p-8">

          <div className="
            bg-blue-100
            w-20
            h-20
            rounded-3xl
            flex
            items-center
            justify-center
            mb-6
          ">

            <FaTasks className="
              text-blue-600
              text-4xl
            " />

          </div>

          <h2 className="
            text-5xl
            font-bold
          ">

            {tasks.length}

          </h2>

          <p className="
            text-gray-500
            mt-3
            text-lg
          ">

            Total Tasks

          </p>

        </div>

        <div className="enterprise-card p-8">

          <div className="
            bg-yellow-100
            w-20
            h-20
            rounded-3xl
            flex
            items-center
            justify-center
            mb-6
          ">

            <FaSpinner className="
              text-yellow-600
              text-4xl
            " />

          </div>

          <h2 className="
            text-5xl
            font-bold
          ">

            {inProgressTasks}

          </h2>

          <p className="
            text-gray-500
            mt-3
            text-lg
          ">

            In Progress

          </p>

        </div>

        <div className="enterprise-card p-8">

          <div className="
            bg-green-100
            w-20
            h-20
            rounded-3xl
            flex
            items-center
            justify-center
            mb-6
          ">

            <FaCheckCircle className="
              text-green-600
              text-4xl
            " />

          </div>

          <h2 className="
            text-5xl
            font-bold
          ">

            {completedTasks}

          </h2>

          <p className="
            text-gray-500
            mt-3
            text-lg
          ">

            Completed Tasks

          </p>

        </div>

      </div>

      {/* SEARCH */}

      <div className="
        mb-8
        relative
        w-full
        md:w-[450px]
      ">

        <FaSearch className="
          absolute
          left-4
          top-5
          text-gray-400
        " />

        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          className="
            w-full
            border
            border-gray-200
            pl-12
            p-4
            rounded-2xl
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
          "
        />

      </div>

      {/* FILTERS */}

      <div className="
        flex
        flex-wrap
        gap-4
        mb-10
      ">

        {[
          "All",
          "Pending",
          "In Progress",
          "Completed",
        ].map((item) => (

          <button
            key={item}
            onClick={() =>
              setFilter(item)
            }
            className={`
              px-6
              py-3
              rounded-2xl
              font-semibold
              transition-all
              duration-300

              ${
                filter === item
                  ? "bg-blue-600 text-white"
                  : "bg-white shadow"
              }
            `}
          >

            {item}

          </button>

        ))}

      </div>

      {/* TASK CARDS */}

      <div className="
        grid
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-3
        gap-8
      ">

        {filteredTasks.map((task) => (

          <motion.div
            key={task.id}
            whileHover={{ y: -5 }}
            className="
              enterprise-card
              p-7
            "
          >

            <h2 className="
              text-2xl
              font-bold
              mb-4
            ">

              {task.title}

            </h2>

            <p className="
              text-gray-500
              mb-4
            ">

              {task.description}

            </p>

            <div className="
              flex
              items-center
              gap-2
              mb-3
            ">

              <FaUser />

              {task.assignedTo}

            </div>

            <div className="
              flex
              items-center
              gap-2
              mb-3
            ">

              <FaCalendarAlt />

              {task.dueDate}

            </div>

            <span
              className={`
                px-4
                py-2
                rounded-full
                text-sm
                font-semibold
                ${getStatusStyle(task.status)}
              `}
            >

              {task.status}

            </span>

            <div className="
              flex
              gap-3
              mt-6
            ">

              <button
                onClick={() =>
                  navigate(
                    `/edit-task/${task.id}`
                  )
                }
                className="
                  bg-yellow-500
                  hover:bg-yellow-600
                  text-white
                  px-4
                  py-2
                  rounded-xl
                "
              >

                <FaEdit />

              </button>

              {
                role === "ADMIN" && (

                  <button
                    onClick={() =>
                      deleteTask(task.id)
                    }
                    className="
                      bg-red-500
                      hover:bg-red-600
                      text-white
                      px-4
                      py-2
                      rounded-xl
                    "
                  >

                    <FaTrash />

                  </button>

                )
              }

            </div>

          </motion.div>

        ))}

      </div>

    </MainLayout>

  );

}

export default Tasks;