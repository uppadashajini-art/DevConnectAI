import { useEffect, useState } from "react";

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

  // GET ROLE
  const role =
    localStorage.getItem("role");

  // STATES
  const [title, setTitle] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [techStack, setTechStack] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  // FETCH PROJECT
  useEffect(() => {

    fetchProject();

  }, [id]);

  const fetchProject = async () => {

    try {

      const response =
        await axios.get(
          `http://localhost:8080/api/projects/${id}`
        );

      setTitle(
        response.data.title
      );

      setDescription(
        response.data.description
      );

      setTechStack(
        response.data.techStack
      );

    } catch (error) {

      console.log(error);

    }
  };

  // UPDATE
  const handleUpdate = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      await axios.put(
        `http://localhost:8080/api/projects/${id}`,
        {
          title,
          description,
          techStack,
        }
      );

      alert(
        "Project Updated Successfully"
      );

      navigate("/projects");

    } catch (error) {

      console.log(error);

      alert(
        "Error Updating Project"
      );

    } finally {

      setLoading(false);

    }
  };

  // BLOCK TEAM MEMBER
  if (
    role !== "ADMIN" &&
    role !== "PROJECT_MANAGER"
  ) {

    return (

      <MainLayout>

        <div className="flex justify-center items-center h-[80vh]">

          <div className="bg-white rounded-3xl shadow-xl p-12 text-center max-w-lg">

            <div className="bg-red-100 text-red-600 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">

              <FaLock className="text-4xl" />

            </div>

            <h1 className="text-4xl font-bold text-slate-900 mb-4">
              Access Denied
            </h1>

            <p className="text-gray-500 text-lg mb-8">

              Only Admins and Project Managers
              can edit projects.

            </p>

            <button
              onClick={() =>
                navigate("/dashboard")
              }
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-semibold transition"
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

      <div className="flex justify-center items-center py-10">

        <form
          onSubmit={handleUpdate}
          className="bg-white rounded-3xl shadow-xl border border-gray-100 p-10 w-full max-w-2xl"
        >

          {/* HEADER */}
          <div className="flex items-center gap-4 mb-10">

            <div className="bg-yellow-100 text-yellow-600 p-5 rounded-3xl">

              <FaEdit className="text-3xl" />

            </div>

            <div>

              <h1 className="text-5xl font-bold text-slate-900">
                Edit Project
              </h1>

              <p className="text-gray-500 mt-2 text-lg">
                Update your project information
              </p>

            </div>

          </div>

          {/* TITLE */}
          <div className="mb-6">

            <label className="block mb-3 font-semibold text-slate-700">

              Project Title

            </label>

            <div className="relative">

              <FaProjectDiagram className="absolute left-4 top-5 text-gray-400" />

              <input
                type="text"
                placeholder="Project Title"
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
                className="w-full border border-gray-200 pl-12 p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />

            </div>

          </div>

          {/* DESCRIPTION */}
          <div className="mb-6">

            <label className="block mb-3 font-semibold text-slate-700">

              Description

            </label>

            <div className="relative">

              <FaAlignLeft className="absolute left-4 top-5 text-gray-400" />

              <textarea
                placeholder="Project Description"
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
                rows="5"
                className="w-full border border-gray-200 pl-12 p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />

            </div>

          </div>

          {/* TECH STACK */}
          <div className="mb-8">

            <label className="block mb-3 font-semibold text-slate-700">

              Tech Stack

            </label>

            <div className="relative">

              <FaCode className="absolute left-4 top-5 text-gray-400" />

              <input
                type="text"
                placeholder="React, Spring Boot..."
                value={techStack}
                onChange={(e) =>
                  setTechStack(e.target.value)
                }
                className="w-full border border-gray-200 pl-12 p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />

            </div>

          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-500 hover:bg-yellow-600 disabled:bg-yellow-300 text-white py-4 rounded-2xl text-lg font-semibold shadow-lg transition"
          >

            {
              loading
                ? "Updating Project..."
                : "Update Project"
            }

          </button>

        </form>

      </div>

    </MainLayout>
  );
}

export default EditProject;