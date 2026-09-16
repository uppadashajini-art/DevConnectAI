
import { useCallback, useEffect, useState } from "react";

import axios from "../utils/axiosConfig";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  FaProjectDiagram,
  FaAlignLeft,
  FaCode,
  FaLock,
  FaEdit,
} from "react-icons/fa";

import MainLayout from "../layouts/MainLayout";


function EditProject() {

  const { id } = useParams();

  const navigate = useNavigate();

  // =========================================
  // GET USER ROLE
  // =========================================

  const storedRole = localStorage.getItem("role");

  const role = storedRole
    ? storedRole.trim().toUpperCase()
    : "";

  // =========================================
  // STATES
  // =========================================

  const [title, setTitle] = useState("");

  const [description, setDescription] =
    useState("");

  const [techStack, setTechStack] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [fetching, setFetching] =
    useState(true);

  const [error, setError] =
    useState("");

  // =========================================
  // FETCH PROJECT
  // =========================================

  const fetchProject = useCallback(async () => {

    try {

      setFetching(true);

      setError("");

      console.log(
        "Fetching project ID:",
        id
      );

      // IMPORTANT:
      //
      // axiosConfig baseURL:
      // https://devconnectai.onrender.com/api
      //
      // Therefore use:
      // /projects/1
      //
      // NOT:
      // /api/projects/1

      const response = await axios.get(
        `/projects/${id}`
      );

      console.log(
        "PROJECT DATA:",
        response.data
      );

      const project = response.data;

      // =====================================
      // LOAD EXISTING DATA INTO FORM
      // =====================================

      setTitle(
        project.title || ""
      );

      setDescription(
        project.description || ""
      );

      setTechStack(
        project.techStack || ""
      );

    } catch (error) {

      console.error(
        "FETCH PROJECT ERROR:",
        error
      );

      console.error(
        "STATUS:",
        error.response?.status
      );

      console.error(
        "DATA:",
        error.response?.data
      );

      if (
        error.response?.status === 403
      ) {

        setError(
          "Access denied. Please login again."
        );

      } else if (
        error.response?.status === 404
      ) {

        setError(
          "Project not found."
        );

      } else {

        setError(
          "Unable to load project."
        );
      }

    } finally {

      setFetching(false);

    }

  }, [id]);


  // =========================================
  // LOAD PROJECT WHEN PAGE OPENS
  // =========================================

  useEffect(() => {

    if (id) {
      fetchProject();
    }

  }, [fetchProject, id]);


  // =========================================
  // UPDATE PROJECT
  // =========================================

  const handleUpdate = async (e) => {

    e.preventDefault();

    // =====================================
    // VALIDATION
    // =====================================

    if (!title.trim()) {

      alert(
        "Project title is required."
      );

      return;
    }

    if (!description.trim()) {

      alert(
        "Project description is required."
      );

      return;
    }

    if (!techStack.trim()) {

      alert(
        "Tech stack is required."
      );

      return;
    }

    try {

      setLoading(true);

      setError("");

      // =====================================
      // DATA TO SEND
      // =====================================

      const projectData = {

        title: title.trim(),

        description:
          description.trim(),

        techStack:
          techStack.trim(),

      };

      console.log(
        "UPDATING PROJECT:",
        projectData
      );

      // =====================================
      // UPDATE PROJECT
      // =====================================

      // Correct:
      // /projects/1
      //
      // Axios automatically adds /api
      //
      // Final:
      // /api/projects/1

      const response = await axios.put(
        `/projects/${id}`,
        projectData
      );

      console.log(
        "UPDATE RESPONSE:",
        response.data
      );

      // =====================================
      // SUCCESS
      // =====================================

      alert(
        "Project Updated Successfully"
      );

      navigate("/projects");

    } catch (error) {

      console.error(
        "UPDATE PROJECT ERROR:",
        error
      );

      console.error(
        "STATUS:",
        error.response?.status
      );

      console.error(
        "DATA:",
        error.response?.data
      );

      if (
        error.response?.status === 403
      ) {

        alert(
          "Access denied. You are not authorized to update this project."
        );

      } else if (
        error.response?.status === 404
      ) {

        alert(
          "Project not found."
        );

      } else {

        alert(
          "Error updating project."
        );
      }

    } finally {

      setLoading(false);

    }
  };


  // =========================================
  // ACCESS CONTROL
  // =========================================

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
            px-4
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

            {/* LOCK ICON */}

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


            {/* TITLE */}

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


            {/* MESSAGE */}

            <p
              className="
                text-gray-500
                text-lg
                mb-8
              "
            >
              Only Admins and Project Managers
              can edit projects.
            </p>


            {/* BUTTON */}

            <button
              type="button"
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


  // =========================================
  // LOADING PROJECT
  // =========================================

  if (fetching) {

    return (

      <MainLayout>

        <div
          className="
            flex
            justify-center
            items-center
            h-[70vh]
          "
        >

          <div className="text-center">

            <div
              className="
                text-gray-500
                text-xl
                font-semibold
              "
            >
              Loading project...
            </div>

            <p className="text-gray-400 mt-2">
              Please wait.
            </p>

          </div>

        </div>

      </MainLayout>
    );
  }


  // =========================================
  // ERROR
  // =========================================

  if (error) {

    return (

      <MainLayout>

        <div
          className="
            flex
            justify-center
            items-center
            h-[70vh]
            px-4
          "
        >

          <div
            className="
              bg-white
              rounded-3xl
              shadow-xl
              p-10
              text-center
              max-w-lg
              w-full
            "
          >

            <h2
              className="
                text-2xl
                font-bold
                text-red-600
                mb-4
              "
            >
              Unable to Load Project
            </h2>

            <p
              className="
                text-gray-500
                mb-6
              "
            >
              {error}
            </p>

            <button
              type="button"
              onClick={() =>
                navigate("/projects")
              }
              className="
                bg-yellow-500
                hover:bg-yellow-600
                text-white
                px-6
                py-3
                rounded-xl
                font-semibold
              "
            >
              Back to Projects
            </button>

          </div>

        </div>

      </MainLayout>
    );
  }


  // =========================================
  // EDIT PROJECT FORM
  // =========================================

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
          onSubmit={handleUpdate}
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

          {/* ================================= */}
          {/* HEADER */}
          {/* ================================= */}

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
                bg-yellow-100
                text-yellow-600
                p-5
                rounded-3xl
              "
            >

              <FaEdit className="text-3xl" />

            </div>


            <div>

              <h1
                className="
                  text-5xl
                  font-bold
                  text-slate-900
                "
              >
                Edit Project
              </h1>

              <p
                className="
                  text-gray-500
                  mt-2
                  text-lg
                "
              >
                Update your project information
              </p>

            </div>

          </div>


          {/* ================================= */}
          {/* PROJECT TITLE */}
          {/* ================================= */}

          <div className="mb-6">

            <label
              className="
                block
                mb-3
                font-semibold
                text-slate-700
              "
            >
              Project Title
            </label>

            <div className="relative">

              <FaProjectDiagram
                className="
                  absolute
                  left-4
                  top-5
                  text-gray-400
                "
              />

              <input
                type="text"
                placeholder="Project Title"
                value={title}
                onChange={(e) =>
                  setTitle(
                    e.target.value
                  )
                }
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
                  focus:ring-yellow-500
                "
              />

            </div>

          </div>


          {/* ================================= */}
          {/* DESCRIPTION */}
          {/* ================================= */}

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
                placeholder="Project Description"
                value={description}
                onChange={(e) =>
                  setDescription(
                    e.target.value
                  )
                }
                rows="5"
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
                  focus:ring-yellow-500
                "
              />

            </div>

          </div>


          {/* ================================= */}
          {/* TECH STACK */}
          {/* ================================= */}

          <div className="mb-8">

            <label
              className="
                block
                mb-3
                font-semibold
                text-slate-700
              "
            >
              Tech Stack
            </label>

            <div className="relative">

              <FaCode
                className="
                  absolute
                  left-4
                  top-5
                  text-gray-400
                "
              />

              <input
                type="text"
                placeholder="React, Spring Boot, MySQL..."
                value={techStack}
                onChange={(e) =>
                  setTechStack(
                    e.target.value
                  )
                }
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
                  focus:ring-yellow-500
                "
              />

            </div>

          </div>


          {/* ================================= */}
          {/* BUTTONS */}
          {/* ================================= */}

          <div
            className="
              flex
              gap-4
            "
          >

            {/* UPDATE */}

            <button
              type="submit"
              disabled={loading}
              className="
                flex-1
                bg-yellow-500
                hover:bg-yellow-600
                disabled:bg-yellow-300
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
                ? "Updating Project..."
                : "Update Project"}

            </button>


            {/* CANCEL */}

            <button
              type="button"
              disabled={loading}
              onClick={() =>
                navigate("/projects")
              }
              className="
                flex-1
                bg-gray-500
                hover:bg-gray-600
                disabled:bg-gray-400
                text-white
                py-4
                rounded-2xl
                text-lg
                font-semibold
                shadow-lg
                transition
              "
            >
              Cancel
            </button>

          </div>

        </form>

      </div>

    </MainLayout>
  );
}


export default EditProject;
