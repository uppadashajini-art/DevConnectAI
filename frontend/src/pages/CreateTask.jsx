
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

  // =========================================================
  // USER INFORMATION
  // =========================================================

  const role = localStorage.getItem("role");
  const userEmail = localStorage.getItem("email");


  // =========================================================
  // STATES
  // =========================================================

  const [loading, setLoading] = useState(false);

  const [projects, setProjects] = useState([]);

  const [teamMembers, setTeamMembers] = useState([]);

  const [loadingProjects, setLoadingProjects] = useState(true);

  const [loadingTeam, setLoadingTeam] = useState(true);


  // =========================================================
  // TASK STATE
  // =========================================================

  const [task, setTask] = useState({

    title: "",

    description: "",

    status: "Pending",

    dueDate: "",

    assignedTo: "",

    userEmail: userEmail || "",

    projectId: "",
  });


  // =========================================================
  // FETCH PROJECTS + TEAM MEMBERS
  // =========================================================

  useEffect(() => {

    if (
      role === "ADMIN" ||
      role === "PROJECT_MANAGER"
    ) {

      fetchProjects();

      fetchTeamMembers();

    }

  }, [role]);


  // =========================================================
  // FETCH PROJECTS
  // =========================================================

  const fetchProjects = async () => {

    try {

      setLoadingProjects(true);

      const response = await axios.get("/projects");

      console.log(
        "PROJECTS FROM BACKEND:",
        response.data
      );

      setProjects(
        Array.isArray(response.data)
          ? response.data
          : []
      );

    } catch (error) {

      console.error(
        "PROJECT FETCH ERROR:",
        error
      );

      setProjects([]);

    } finally {

      setLoadingProjects(false);

    }
  };


  // =========================================================
  // FETCH TEAM MEMBERS
  // =========================================================
  //
  // IMPORTANT:
  //
  // We use /team instead of /users.
  //
  // Your Team entity has:
  //
  // memberName
  // memberEmail
  // role
  // projectName
  //
  // =========================================================

  const fetchTeamMembers = async () => {

    try {

      setLoadingTeam(true);

      const response = await axios.get("/team");

      console.log(
        "TEAM MEMBERS FROM BACKEND:",
        response.data
      );


      const members = Array.isArray(response.data)
        ? response.data
        : [];


      console.log(
        "TEAM MEMBERS:",
        members
      );


      setTeamMembers(members);

    } catch (error) {

      console.error(
        "TEAM MEMBER FETCH ERROR:",
        error
      );

      setTeamMembers([]);

    } finally {

      setLoadingTeam(false);

    }
  };


  // =========================================================
  // HANDLE INPUT CHANGE
  // =========================================================

  const handleChange = (e) => {

    const {
      name,
      value
    } = e.target;


    setTask((previousTask) => ({

      ...previousTask,

      [name]: value,

    }));

  };


  // =========================================================
  // HANDLE CREATE TASK
  // =========================================================

  const handleSubmit = async (e) => {

    e.preventDefault();


    // -------------------------------------------------------
    // Prevent double click
    // -------------------------------------------------------

    if (loading) {
      return;
    }


    // -------------------------------------------------------
    // Validate title
    // -------------------------------------------------------

    if (!task.title.trim()) {

      alert("Please enter task title");

      return;
    }


    // -------------------------------------------------------
    // Validate description
    // -------------------------------------------------------

    if (!task.description.trim()) {

      alert("Please enter task description");

      return;
    }


    // -------------------------------------------------------
    // Validate project
    // -------------------------------------------------------

    if (!task.projectId) {

      alert("Please select a project");

      return;
    }


    // -------------------------------------------------------
    // Validate team member
    // -------------------------------------------------------

    if (!task.assignedTo) {

      alert("Please select a team member");

      return;
    }


    // -------------------------------------------------------
    // Validate due date
    // -------------------------------------------------------

    if (!task.dueDate) {

      alert("Please select a due date");

      return;
    }


    try {

      setLoading(true);


      // =====================================================
      // PREPARE DATA FOR BACKEND
      // =====================================================

      const taskToSend = {

        title: task.title.trim(),

        description: task.description.trim(),

        status: task.status,

        dueDate: task.dueDate,

        assignedTo: task.assignedTo,

        userEmail: userEmail || "",

        projectId: Number(task.projectId),

      };


      console.log(
        "TASK TO SEND:",
        taskToSend
      );


      // =====================================================
      // CREATE TASK
      // =====================================================

      const response = await axios.post(
        "/tasks",
        taskToSend
      );


      console.log(
        "TASK CREATED:",
        response.data
      );


      // =====================================================
      // SUCCESS
      // =====================================================

      alert("Task Created Successfully");


      // Go to Tasks page

      navigate("/tasks");


    } catch (error) {

      console.error(
        "TASK CREATION ERROR:",
        error
      );


      if (error.response) {

        console.error(
          "STATUS:",
          error.response.status
        );

        console.error(
          "DATA:",
          error.response.data
        );

      }


      if (
        error.response &&
        error.response.status === 400
      ) {

        alert(
          "Invalid task data. Please check all fields."
        );

      } else if (
        error.response &&
        error.response.status === 401
      ) {

        alert(
          "Your session has expired. Please login again."
        );

      } else if (
        error.response &&
        error.response.status === 403
      ) {

        alert(
          "You do not have permission to create tasks."
        );

      } else if (
        error.response &&
        error.response.status === 404
      ) {

        alert(
          "Selected project was not found."
        );

      } else {

        alert(
          "Error Creating Task"
        );

      }

    } finally {

      setLoading(false);

    }

  };


  // =========================================================
  // ACCESS CONTROL
  // =========================================================

  if (
    role !== "ADMIN" &&
    role !== "PROJECT_MANAGER"
  ) {

    return (

      <MainLayout>

        <div
          className="
            flex
            justify-center
            items-center
            h-[80vh]
            px-6
          "
        >

          <div
            className="
              bg-white
              rounded-3xl
              shadow-xl
              p-12
              text-center
              max-w-lg
              w-full
            "
          >

            <div
              className="
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
              "
            >

              <FaLock className="text-4xl" />

            </div>


            <h1
              className="
                text-4xl
                font-bold
                text-slate-900
                mb-4
              "
            >

              Access Denied

            </h1>


            <p
              className="
                text-gray-500
                text-lg
                mb-8
              "
            >

              Only Admins and Project Managers
              can create tasks.

            </p>


            <button
              onClick={() =>
                navigate("/dashboard")
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


  // =========================================================
  // MAIN PAGE
  // =========================================================

  return (

    <MainLayout>

      <div
        className="
          flex
          justify-center
          items-center
          py-10
          px-4
        "
      >

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


          {/* ================================================= */}
          {/* HEADER */}
          {/* ================================================= */}

          <div
            className="
              flex
              items-center
              gap-4
              mb-10
            "
          >

            <div
              className="
                bg-blue-100
                text-blue-600
                p-5
                rounded-3xl
              "
            >

              <FaTasks className="text-3xl" />

            </div>


            <div>

              <h1
                className="
                  text-5xl
                  font-bold
                  text-slate-900
                "
              >

                Create Task

              </h1>


              <p
                className="
                  text-gray-500
                  mt-2
                  text-lg
                "
              >

                Manage workflow efficiently

              </p>

            </div>

          </div>


          {/* ================================================= */}
          {/* TASK TITLE */}
          {/* ================================================= */}

          <div className="mb-6">

            <label
              className="
                block
                mb-3
                font-semibold
                text-slate-700
              "
            >

              Task Title

            </label>


            <div className="relative">

              <FaTasks
                className="
                  absolute
                  left-4
                  top-5
                  text-gray-400
                "
              />


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


          {/* ================================================= */}
          {/* DESCRIPTION */}
          {/* ================================================= */}

          <div className="mb-6">

            <label
              className="
                block
                mb-3
                font-semibold
                text-slate-700
              "
            >

              Description

            </label>


            <div className="relative">

              <FaAlignLeft
                className="
                  absolute
                  left-4
                  top-5
                  text-gray-400
                "
              />


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


          {/* ================================================= */}
          {/* SELECT PROJECT */}
          {/* ================================================= */}

          <div className="mb-6">

            <label
              className="
                block
                mb-3
                font-semibold
                text-slate-700
              "
            >

              Select Project

            </label>


            <div className="relative">

              <FaProjectDiagram
                className="
                  absolute
                  left-4
                  top-5
                  text-gray-400
                  z-10
                "
              />


              <select
                name="projectId"
                value={task.projectId}
                onChange={handleChange}
                required
                disabled={loadingProjects}
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
                  disabled:bg-gray-100
                "
              >

                <option value="">

                  {loadingProjects
                    ? "Loading Projects..."
                    : "Choose Project"
                  }

                </option>


                {projects.map((project) => (

                  <option
                    key={project.id}
                    value={project.id}
                  >

                    {project.title}

                  </option>

                ))}

              </select>

            </div>


            {/* No projects */}

            {!loadingProjects &&
              projects.length === 0 && (

                <p
                  className="
                    text-red-500
                    text-sm
                    mt-2
                  "
                >

                  No projects available.

                </p>

              )}

          </div>


          {/* ================================================= */}
          {/* STATUS */}
          {/* ================================================= */}

          <div className="mb-6">

            <label
              className="
                block
                mb-3
                font-semibold
                text-slate-700
              "
            >

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


          {/* ================================================= */}
          {/* ASSIGN TO TEAM MEMBER */}
          {/* ================================================= */}

          <div className="mb-6">

            <label
              className="
                block
                mb-3
                font-semibold
                text-slate-700
              "
            >

              Assign To

            </label>


            <div className="relative">

              <FaUser
                className="
                  absolute
                  left-4
                  top-5
                  text-gray-400
                  z-10
                "
              />


              <select
                name="assignedTo"
                value={task.assignedTo}
                onChange={handleChange}
                required
                disabled={loadingTeam}
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
                  disabled:bg-gray-100
                "
              >

                <option value="">

                  {loadingTeam
                    ? "Loading Team Members..."
                    : "Select Team Member"
                  }

                </option>


                {teamMembers.map((member) => (

                  <option
                    key={member.id}
                    value={member.memberEmail}
                  >

                    {member.memberName}
                    {" - "}
                    {member.role}

                  </option>

                ))}

              </select>

            </div>


            {/* No team members */}

            {!loadingTeam &&
              teamMembers.length === 0 && (

                <p
                  className="
                    text-red-500
                    text-sm
                    mt-2
                  "
                >

                  No team members available.

                </p>

              )}

          </div>


          {/* ================================================= */}
          {/* DUE DATE */}
          {/* ================================================= */}

          <div className="mb-8">

            <label
              className="
                block
                mb-3
                font-semibold
                text-slate-700
              "
            >

              Due Date

            </label>


            <div className="relative">

              <FaCalendarAlt
                className="
                  absolute
                  left-4
                  top-5
                  text-gray-400
                "
              />


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


          {/* ================================================= */}
          {/* CREATE BUTTON */}
          {/* ================================================= */}

          <button
            type="submit"
            disabled={
              loading ||
              projects.length === 0 ||
              teamMembers.length === 0
            }
            className="
              w-full
              bg-blue-600
              hover:bg-blue-700
              disabled:bg-blue-300
              disabled:cursor-not-allowed
              text-white
              py-4
              rounded-2xl
              text-lg
              font-semibold
              shadow-lg
              transition
            "
          >

            {loading
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
