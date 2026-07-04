import { useEffect, useState } from "react";

import axios from "../utils/axiosConfig";

import { useNavigate } from "react-router-dom";

import {
  FaTasks,
  FaAlignLeft,
  FaUser,
  FaCalendarAlt,
  FaLock,
  FaProjectDiagram,
} from "react-icons/fa";

import MainLayout from "../layouts/MainLayout";

function CreateTask() {

  const navigate = useNavigate();

  // =========================================
  // ROLE
  // =========================================

  const role =
    localStorage.getItem("role");

  // =========================================
  // USER EMAIL
  // =========================================

  const userEmail =
    localStorage.getItem("email");

  // =========================================
  // STATES
  // =========================================

  const [loading, setLoading] =
    useState(false);

  const [projects, setProjects] =
    useState([]);

  const [teamMembers, setTeamMembers] =
    useState([]);

  // =========================================
  // TASK STATE
  // =========================================

  const [task, setTask] =
    useState({

      title: "",

      description: "",

      status: "Pending",

      dueDate: "",

      assignedTo: "",

      userEmail: userEmail,

      projectId: "",

    });

  // =========================================
  // FETCH DATA
  // =========================================

  useEffect(() => {

    fetchProjects();

    fetchTeamMembers();

  }, []);

  // =========================================
  // FETCH PROJECTS
  // =========================================

  const fetchProjects =
    async () => {

      try {

        const response =
          await axios.get(
            "/api/projects"
          );

        setProjects(
          response.data || []
        );

      } catch (error) {

        console.log(error);

      }

    };

  // =========================================
  // FETCH TEAM MEMBERS
  // =========================================

  const fetchTeamMembers =
    async () => {

      try {

        const response =
          await axios.get(
            "/api/users"
          );

        console.log(
          response.data
        );

        // ONLY TEAM MEMBERS

        const members =
          response.data.filter(
            (user) =>

              user.role ===
              "TEAM_MEMBER"
          );

        console.log(members);

        setTeamMembers(
          members || []
        );

      } catch (error) {

        console.log(error);

        alert(
          "Failed to Load Team Members"
        );

      }

    };

  // =========================================
  // HANDLE CHANGE
  // =========================================

  const handleChange = (e) => {

    setTask({

      ...task,

      [e.target.name]:
        e.target.value,

    });

  };

  // =========================================
  // HANDLE SUBMIT
  // =========================================

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);

        const updatedTask = {

          ...task,

          projectId:
            Number(
              task.projectId
            ),

        };

        console.log(updatedTask);

        await axios.post(

          "/api/tasks",

          updatedTask

        );

        alert(
          "Task Created Successfully"
        );

        navigate("/tasks");

      } catch (error) {

        console.log(error);

        alert(
          "Error Creating Task"
        );

      } finally {

        setLoading(false);

      }

    };

  // =========================================
  // BLOCK TEAM MEMBER
  // =========================================

  if (

    role !== "ADMIN" &&

    role !== "PROJECT_MANAGER"

  ) {

    return (

      <MainLayout>

        <div className="
          flex
          justify-center
          items-center
          h-[80vh]
        ">

          <div className="
            bg-white
            rounded-3xl
            shadow-xl
            p-12
            text-center
            max-w-lg
          ">

            <div className="
              bg-red-100
              text-red-600
              w-24
              h-24
              rounded-full
              flex
              items-center
              justify-center
              mx-auto
              mb-6
            ">

              <FaLock className="
                text-4xl
              " />

            </div>

            <h1 className="
              text-4xl
              font-bold
              text-slate-900
              mb-4
            ">

              Access Denied

            </h1>

            <p className="
              text-gray-500
              text-lg
              mb-8
            ">

              Only Admins and
              Project Managers
              can create tasks.

            </p>

            <button
              onClick={() =>
                navigate(
                  "/dashboard"
                )
              }
              className="
                bg-blue-600
                hover:bg-blue-700
                text-white
                px-8
                py-4
                rounded-2xl
                font-semibold
                transition
              "
            >

              Back to Dashboard

            </button>

          </div>

        </div>

      </MainLayout>

    );

  }

  return (

    <MainLayout>

      <div className="
        flex
        justify-center
        items-center
        py-10
      ">

        <form
          onSubmit={handleSubmit}
          className="
            bg-white
            rounded-3xl
            shadow-xl
            border
            border-gray-100
            p-10
            w-full
            max-w-2xl
          "
        >

          {/* HEADER */}

          <div className="
            flex
            items-center
            gap-4
            mb-10
          ">

            <div className="
              bg-blue-100
              text-blue-600
              p-5
              rounded-3xl
            ">

              <FaTasks className="
                text-3xl
              " />

            </div>

            <div>

              <h1 className="
                text-5xl
                font-bold
                text-slate-900
              ">

                Create Task

              </h1>

              <p className="
                text-gray-500
                mt-2
                text-lg
              ">

                Manage workflow efficiently

              </p>

            </div>

          </div>

          {/* TITLE */}

          <div className="mb-6">

            <label className="
              block
              mb-3
              font-semibold
              text-slate-700
            ">

              Task Title

            </label>

            <div className="relative">

              <FaTasks className="
                absolute
                left-4
                top-5
                text-gray-400
              " />

              <input
                type="text"
                name="title"
                placeholder="Enter task title"
                value={task.title}
                onChange={handleChange}
                required
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

          </div>

          {/* DESCRIPTION */}

          <div className="mb-6">

            <label className="
              block
              mb-3
              font-semibold
              text-slate-700
            ">

              Description

            </label>

            <div className="relative">

              <FaAlignLeft className="
                absolute
                left-4
                top-5
                text-gray-400
              " />

              <textarea
                name="description"
                placeholder="Enter task description"
                value={task.description}
                onChange={handleChange}
                required
                rows="5"
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

          </div>

          {/* PROJECT */}

          <div className="mb-6">

            <label className="
              block
              mb-3
              font-semibold
              text-slate-700
            ">

              Select Project

            </label>

            <div className="relative">

              <FaProjectDiagram className="
                absolute
                left-4
                top-5
                text-gray-400
              " />

              <select
                name="projectId"
                value={task.projectId}
                onChange={handleChange}
                required
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
              >

                <option value="">
                  Choose Project
                </option>

                {
                  projects.map(
                    (project) => (

                      <option
                        key={project.id}
                        value={project.id}
                      >

                        {project.title}

                      </option>

                    )
                  )
                }

              </select>

            </div>

          </div>

          {/* STATUS */}

          <div className="mb-6">

            <label className="
              block
              mb-3
              font-semibold
              text-slate-700
            ">

              Status

            </label>

            <select
              name="status"
              value={task.status}
              onChange={handleChange}
              required
              className="
                w-full
                border
                border-gray-200
                p-4
                rounded-2xl
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
              "
            >

              <option value="Pending">
                Pending
              </option>

              <option value="In Progress">
                In Progress
              </option>

              <option value="Completed">
                Completed
              </option>

            </select>

          </div>

          {/* ASSIGN TO */}

          <div className="mb-6">

            <label className="
              block
              mb-3
              font-semibold
              text-slate-700
            ">

              Assign To

            </label>

            <div className="relative">

              <FaUser className="
                absolute
                left-4
                top-5
                text-gray-400
                z-10
              " />

              <select
                name="assignedTo"
                value={task.assignedTo}
                onChange={handleChange}
                required
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
              >

                <option value="">
                  Select Team Member
                </option>

                {
                  teamMembers.map(
                    (member) => (

                      <option
                        key={member.id}
                        value={member.email}
                      >

                        {member.name}
                        {" "}
                        (
                        {member.email}
                        )

                      </option>

                    )
                  )
                }

              </select>

            </div>

          </div>

          {/* DUE DATE */}

          <div className="mb-8">

            <label className="
              block
              mb-3
              font-semibold
              text-slate-700
            ">

              Due Date

            </label>

            <div className="relative">

              <FaCalendarAlt className="
                absolute
                left-4
                top-5
                text-gray-400
              " />

              <input
                type="date"
                name="dueDate"
                value={task.dueDate}
                onChange={handleChange}
                required
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

          </div>

          {/* SUBMIT BUTTON */}

          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              bg-blue-600
              hover:bg-blue-700
              disabled:bg-blue-300
              text-white
              py-4
              rounded-2xl
              text-lg
              font-semibold
              shadow-lg
              transition
            "
          >

            {
              loading
                ? "Creating Task..."
                : "Create Task"
            }

          </button>

        </form>

      </div>

    </MainLayout>

  );

}

export default CreateTask;