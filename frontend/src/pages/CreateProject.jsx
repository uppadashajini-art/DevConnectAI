import { useState } from "react";

import axios from "../utils/axiosConfig";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import {

  FaProjectDiagram,

  FaCode,

  FaAlignLeft,

  FaTasks,

  FaCheckCircle,

  FaCalendarAlt,

  FaLock,

  FaFlag,

  FaLayerGroup,

  FaArrowRight,

} from "react-icons/fa";

import MainLayout from "../layouts/MainLayout";

function CreateProject() {

  const navigate =
    useNavigate();

  // =========================
  // ROLE
  // =========================
  const role =
    localStorage.getItem("role");

  // =========================
  // LOADING
  // =========================
  const [loading, setLoading] =
    useState(false);

  // =========================
  // PROJECT STATE
  // =========================
  const [project, setProject] =
    useState({

      title: "",

      description: "",

      techStack: "",

      totalTasks: "",

      completedTasks: "",

      deadline: "",

      priority: "MEDIUM",

      status: "Pending",

      userEmail:
        localStorage.getItem(
          "email"
        ),

    });

  // =========================
  // HANDLE CHANGE
  // =========================
  const handleChange = (e) => {

    setProject({

      ...project,

      [e.target.name]:
        e.target.value,

    });
  };

  // =========================
  // SUBMIT
  // =========================
  const handleSubmit = async (e) => {

    e.preventDefault();

    // VALIDATION
    if (

      !project.title ||

      !project.description ||

      !project.techStack ||

      !project.totalTasks ||

      !project.deadline

    ) {

      toast.error(
        "Please fill all fields"
      );

      return;
    }

    try {

      setLoading(true);

      const updatedProject = {

        title:
          project.title,

        description:
          project.description,

        techStack:
          project.techStack,

        totalTasks:
          parseInt(
            project.totalTasks
          ),

        completedTasks:
          parseInt(
            project.completedTasks
          ),

        deadline:
          project.deadline,

        priority:
          project.priority,

        status:
          project.status,

        userEmail:
          project.userEmail,

      };

      console.log(updatedProject);

      // API CALL
      await axios.post(
        "/api/projects",
        updatedProject
      );

      // SUCCESS
      toast.success(
        "Project Created Successfully"
      );

      // REDIRECT
      setTimeout(() => {

        navigate("/projects");

      }, 1000);

    } catch (error) {

      console.log(error);

      // ERROR
      toast.error(
        "Error Creating Project"
      );

    } finally {

      setLoading(false);

    }
  };

  // =========================
  // ACCESS BLOCK
  // =========================
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
            dark:bg-[#0f172a]
            rounded-3xl
            shadow-xl
            dark:border
            dark:border-slate-800
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

              <FaLock className="text-4xl" />

            </div>

            <h1 className="
              text-4xl
              font-bold
              text-slate-900
              dark:text-white
              mb-4
            ">

              Access Denied

            </h1>

            <p className="
              text-gray-500
              dark:text-gray-400
              text-lg
              mb-8
            ">

              Only Admins and Project
              Managers can create projects.

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
                transition-all
                duration-300
                hover:scale-[1.02]
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
        pt-10
        pb-10
      ">

        <form
          onSubmit={handleSubmit}
          className="
            bg-white
            dark:bg-[#0f172a]
            rounded-3xl
            shadow-2xl
            dark:border
            dark:border-slate-800
            p-10
            w-full
            max-w-3xl
            transition-all
            duration-300
          "
        >

          {/* HEADER */}
          <div className="
            flex
            items-center
            gap-5
            mb-10
          ">

            <div className="
              bg-blue-100
              text-blue-600
              p-5
              rounded-3xl
            ">

              <FaProjectDiagram className="text-4xl" />

            </div>

            <div>

              <h1 className="
                text-5xl
                font-bold
                text-slate-900
                dark:text-white
              ">

                Create Project

              </h1>

              <p className="
                text-gray-500
                dark:text-gray-400
                mt-2
                text-lg
              ">

                Add a new project to DevConnect AI

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
              dark:text-gray-300
            ">

              Project Title

            </label>

            <div className="relative">

              <FaProjectDiagram className="
                absolute
                left-4
                top-5
                text-gray-400
              " />

              <input
                type="text"
                name="title"
                placeholder="Enter project title"
                value={project.title}
                onChange={handleChange}
                required
                className="
                  w-full
                  border
                  border-gray-200
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

          {/* DESCRIPTION */}
          <div className="mb-6">

            <label className="
              block
              mb-3
              font-semibold
              text-slate-700
              dark:text-gray-300
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
                placeholder="Enter project description"
                value={project.description}
                onChange={handleChange}
                required
                rows="5"
                className="
                  w-full
                  border
                  border-gray-200
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

          {/* TECH STACK */}
          <div className="mb-6">

            <label className="
              block
              mb-3
              font-semibold
              text-slate-700
              dark:text-gray-300
            ">

              Tech Stack

            </label>

            <div className="relative">

              <FaCode className="
                absolute
                left-4
                top-5
                text-gray-400
              " />

              <input
                type="text"
                name="techStack"
                placeholder="React, Spring Boot, MySQL..."
                value={project.techStack}
                onChange={handleChange}
                required
                className="
                  w-full
                  border
                  border-gray-200
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

          {/* GRID */}
          <div className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-6
          ">

            {/* TOTAL TASKS */}
            <div>

              <label className="
                block
                mb-3
                font-semibold
                text-slate-700
                dark:text-gray-300
              ">

                Total Tasks

              </label>

              <div className="relative">

                <FaTasks className="
                  absolute
                  left-4
                  top-5
                  text-gray-400
                " />

                <input
                  type="number"
                  name="totalTasks"
                  placeholder="Enter total tasks"
                  value={project.totalTasks}
                  onChange={handleChange}
                  required
                  className="
                    w-full
                    border
                    border-gray-200
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

            {/* COMPLETED */}
            <div>

              <label className="
                block
                mb-3
                font-semibold
                text-slate-700
                dark:text-gray-300
              ">

                Completed Tasks

              </label>

              <div className="relative">

                <FaCheckCircle className="
                  absolute
                  left-4
                  top-5
                  text-gray-400
                " />

                <input
                  type="number"
                  name="completedTasks"
                  placeholder="Completed tasks"
                  value={project.completedTasks}
                  onChange={handleChange}
                  required
                  className="
                    w-full
                    border
                    border-gray-200
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

          </div>

          {/* PRIORITY + STATUS */}
          <div className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-6
            mt-6
          ">

            {/* PRIORITY */}
            <div>

              <label className="
                block
                mb-3
                font-semibold
                text-slate-700
                dark:text-gray-300
              ">

                Priority

              </label>

              <div className="relative">

                <FaFlag className="
                  absolute
                  left-4
                  top-5
                  text-gray-400
                " />

                <select
                  name="priority"
                  value={project.priority}
                  onChange={handleChange}
                  className="
                    w-full
                    border
                    border-gray-200
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
                >

                  <option value="HIGH">
                    HIGH
                  </option>

                  <option value="MEDIUM">
                    MEDIUM
                  </option>

                  <option value="LOW">
                    LOW
                  </option>

                </select>

              </div>

            </div>

            {/* STATUS */}
            <div>

              <label className="
                block
                mb-3
                font-semibold
                text-slate-700
                dark:text-gray-300
              ">

                Status

              </label>

              <div className="relative">

                <FaLayerGroup className="
                  absolute
                  left-4
                  top-5
                  text-gray-400
                " />

                <select
                  name="status"
                  value={project.status}
                  onChange={handleChange}
                  className="
                    w-full
                    border
                    border-gray-200
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

            </div>

          </div>

          {/* DEADLINE */}
          <div className="
            mt-6
            mb-8
          ">

            <label className="
              block
              mb-3
              font-semibold
              text-slate-700
              dark:text-gray-300
            ">

              Deadline

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
                name="deadline"
                value={project.deadline}
                onChange={handleChange}
                required
                className="
                  w-full
                  border
                  border-gray-200
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

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              bg-blue-600
              hover:bg-blue-700
              disabled:bg-blue-300
              text-white
              p-4
              rounded-2xl
              font-semibold
              text-lg
              shadow-lg
              transition-all
              duration-300
              hover:scale-[1.02]
              flex
              items-center
              justify-center
              gap-3
            "
          >

            {
              loading
                ? "Creating Project..."
                : (
                  <>
                    Create Project
                    <FaArrowRight />
                  </>
                )
            }

          </button>

        </form>

      </div>

    </MainLayout>

  );
}

export default CreateProject;