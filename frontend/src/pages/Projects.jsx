import { useEffect, useState } from "react";
import axios from "../utils/axiosConfig";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import {
  FaProjectDiagram,
  FaEdit,
  FaTrash,
  FaTasks,
  FaCheckCircle,
  FaChartLine,
  FaClock,
} from "react-icons/fa";

import MainLayout from "../layouts/MainLayout";

function Projects() {

  // =========================================
  // STATE
  // =========================================
  const [projects, setProjects] =
    useState([]);

  const [tasks, setTasks] =
    useState([]);

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

  const userName =
    localStorage.getItem("name");

  // =========================================
  // FETCH DATA
  // =========================================
  useEffect(() => {

    fetchProjects();

  }, []);

  // =========================================
  // FETCH PROJECTS
  // =========================================
  const fetchProjects =
    async () => {

      try {

        setLoading(true);

        // =========================================
        // ADMIN & PROJECT_MANAGER
        // SEE ALL PROJECTS & TASKS
        // =========================================
        if (
          role === "ADMIN" ||
          role === "PROJECT_MANAGER"
        ) {

          const [
            projectResponse,
            taskResponse,
          ] = await Promise.all([

            axios.get(
              "/api/projects"
            ),

            axios.get(
              "/api/tasks"
            ),

          ]);

          setProjects(
            projectResponse.data || []
          );

          setTasks(
            taskResponse.data || []
          );

        }

        // =========================================
        // TEAM_MEMBER
        // ONLY ASSIGNED PROJECTS
        // =========================================
        else {

          const [
            projectResponse,
            taskResponse,
          ] = await Promise.all([

            axios.get(
              `/api/projects/${email}`
            ),

            axios.get(
              `/api/tasks/${email}`
            ),

          ]);

          // FILTER USER TASKS
          const userTasks =
            taskResponse.data.filter(
              (task) =>

                task.assignedTo ===
                userName
            );

          setTasks(userTasks);

          // GET PROJECT IDS
          const projectIds =
            [
              ...new Set(
                userTasks.map(
                  (task) =>
                    Number(
                      task.projectId
                    )
                )
              ),
            ];

          // FILTER PROJECTS
          const userProjects =
            projectResponse.data.filter(
              (project) =>

                projectIds.includes(
                  Number(project.id)
                )
            );

          setProjects(
            userProjects
          );

        }

      } catch (error) {

        console.log(error);

        toast.error(
          "Failed to load projects"
        );

      } finally {

        setLoading(false);

      }

    };

  // =========================================
  // DELETE PROJECT
  // ONLY ADMIN
  // =========================================
  const deleteProject =
    async (id) => {

      // BLOCK NON-ADMIN
      if (role !== "ADMIN") {

        toast.error(
          "Only Admin Can Delete Projects"
        );

        return;

      }

      const confirmDelete =
        window.confirm(
          "Are you sure you want to delete this project?"
        );

      if (!confirmDelete)
        return;

      try {

        await axios.delete(
          `/api/projects/${id}`
        );

        setProjects((prev) =>
          prev.filter(
            (project) =>
              project.id !== id
          )
        );

        toast.success(
          "Project deleted successfully"
        );

      } catch (error) {

        console.log(error);

        toast.error(
          "Delete failed"
        );

      }

    };

  // =========================================
  // STATS
  // =========================================
  const totalTasks =
    tasks.length;

  const completedTasks =
    tasks.filter(
      (task) =>
        task.status ===
        "Completed"
    ).length;

  // =========================================
  // UI
  // =========================================
  return (

    <MainLayout>

      {/* HEADER */}
      <div className="
        flex
        flex-col
        xl:flex-row
        justify-between
        items-start
        xl:items-center
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

            Projects

          </h1>

          <p className="
            text-gray-500
            dark:text-gray-400
            mt-3
            text-lg
          ">

            Manage development workflow and team collaboration

          </p>

        </div>

        {/* CREATE PROJECT ONLY ADMIN */}
        {role === "ADMIN" && (

          <button
            onClick={() =>
              navigate(
                "/create-project"
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
              hover:scale-105
              transition-all
              duration-300
              font-semibold
            "
          >

            + Create Project

          </button>

        )}

      </div>

      {/* STATS */}
      <div className="
        grid
        grid-cols-1
        md:grid-cols-3
        gap-8
        mb-10
      ">

        {/* TOTAL PROJECTS */}
        <div className="
          enterprise-card
          p-8
        ">

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

            <FaProjectDiagram className="
              text-blue-600
              text-4xl
            " />

          </div>

          <h2 className="
            text-5xl
            font-bold
            text-slate-900
            dark:text-white
          ">

            {projects.length}

          </h2>

          <p className="
            text-gray-500
            dark:text-gray-400
            text-lg
            mt-3
          ">

            Total Projects

          </p>

        </div>

        {/* TOTAL TASKS */}
        <div className="
          enterprise-card
          p-8
        ">

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

            <FaTasks className="
              text-green-600
              text-4xl
            " />

          </div>

          <h2 className="
            text-5xl
            font-bold
            text-slate-900
            dark:text-white
          ">

            {totalTasks}

          </h2>

          <p className="
            text-gray-500
            dark:text-gray-400
            text-lg
            mt-3
          ">

            Total Tasks

          </p>

        </div>

        {/* COMPLETED TASKS */}
        <div className="
          enterprise-card
          p-8
        ">

          <div className="
            bg-purple-100
            w-20
            h-20
            rounded-3xl
            flex
            items-center
            justify-center
            mb-6
          ">

            <FaChartLine className="
              text-purple-600
              text-4xl
            " />

          </div>

          <h2 className="
            text-5xl
            font-bold
            text-slate-900
            dark:text-white
          ">

            {completedTasks}

          </h2>

          <p className="
            text-gray-500
            dark:text-gray-400
            text-lg
            mt-3
          ">

            Completed Tasks

          </p>

        </div>

      </div>

      {/* EMPTY STATE */}
      {!loading &&
        projects.length === 0 && (

          <div className="
            enterprise-card
            p-16
            text-center
          ">

            <FaProjectDiagram className="
              text-7xl
              text-gray-300
              mx-auto
              mb-6
            " />

            <h2 className="
              text-4xl
              font-bold
              text-slate-800
              dark:text-white
              mb-4
            ">

              No Projects Found

            </h2>

            <p className="
              text-gray-500
              dark:text-gray-400
              text-lg
            ">

              Start by creating a project.

            </p>

          </div>

        )}

      {/* PROJECT LIST */}
      {!loading &&
        projects.length > 0 && (

          <div className="
            grid
            grid-cols-1
            lg:grid-cols-2
            2xl:grid-cols-3
            gap-8
          ">

            {projects.map((project) => {

              const projectTasks =
                tasks.filter(
                  (task) =>
                    Number(
                      task.projectId
                    ) ===
                    Number(project.id)
                );

              const completed =
                projectTasks.filter(
                  (task) =>
                    task.status ===
                    "Completed"
                ).length;

              const total =
                projectTasks.length;

              const progress =
                total > 0
                  ? Math.round(
                      (completed / total) * 100
                    )
                  : 0;

              return (

                <motion.div
                  key={project.id}
                  whileHover={{
                    y: -6,
                  }}
                  className="
                    enterprise-card
                    p-8
                  "
                >

                  {/* TITLE */}
                  <h2 className="
                    text-3xl
                    font-bold
                    text-slate-900
                    dark:text-white
                    mb-4
                  ">

                    {project.title}

                  </h2>

                  {/* DESCRIPTION */}
                  <p className="
                    text-gray-500
                    dark:text-gray-400
                    mb-6
                  ">

                    {project.description}

                  </p>

                  {/* TECH STACK */}
                  <div className="
                    flex
                    flex-wrap
                    gap-3
                    mb-6
                  ">

                    <span className="
                      bg-blue-100
                      text-blue-700
                      px-4
                      py-2
                      rounded-full
                      font-semibold
                    ">

                      {project.techStack}

                    </span>

                  </div>

                  {/* TASK DETAILS */}
                  <div className="
                    space-y-4
                    mb-6
                  ">

                    <div className="
                      flex
                      items-center
                      gap-3
                    ">

                      <FaTasks className="
                        text-blue-600
                      " />

                      Total Tasks :
                      {total}

                    </div>

                    <div className="
                      flex
                      items-center
                      gap-3
                    ">

                      <FaCheckCircle className="
                        text-green-600
                      " />

                      Completed :
                      {completed}

                    </div>

                    <div className="
                      flex
                      items-center
                      gap-3
                    ">

                      <FaClock className="
                        text-red-500
                      " />

                      Deadline :
                      {project.deadline}

                    </div>

                  </div>

                  {/* PROGRESS */}
                  <div className="mb-8">

                    <div className="
                      flex
                      justify-between
                      mb-2
                    ">

                      <span>
                        Progress
                      </span>

                      <span className="
                        font-bold
                        text-blue-600
                      ">

                        {progress}%

                      </span>

                    </div>

                    <div className="
                      w-full
                      bg-gray-200
                      h-3
                      rounded-full
                    ">

                      <div
                        className="
                          bg-blue-600
                          h-3
                          rounded-full
                        "
                        style={{
                          width:
                            `${progress}%`,
                        }}
                      />

                    </div>

                  </div>

                  {/* ACTIONS */}
                  <div className="
                    flex
                    gap-4
                    flex-wrap
                  ">

                    {/* EDIT ONLY ADMIN */}
                    {role === "ADMIN" && (

                      <button
                        onClick={() =>
                          navigate(
                            `/edit-project/${project.id}`
                          )
                        }
                        className="
                          bg-yellow-500
                          hover:bg-yellow-600
                          text-white
                          px-6
                          py-3
                          rounded-2xl
                          font-semibold
                        "
                      >

                        <FaEdit />

                      </button>

                    )}

                    {/* DELETE ONLY ADMIN */}
                    {role === "ADMIN" && (

                      <button
                        onClick={() =>
                          deleteProject(
                            project.id
                          )
                        }
                        className="
                          bg-red-500
                          hover:bg-red-600
                          text-white
                          px-6
                          py-3
                          rounded-2xl
                          font-semibold
                        "
                      >

                        <FaTrash />

                      </button>

                    )}

                  </div>

                </motion.div>

              );

            })}

          </div>

        )}

    </MainLayout>

  );

}

export default Projects;