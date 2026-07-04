import { useEffect, useState } from "react";

import axios from "../utils/axiosConfig";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  FaTasks,
  FaAlignLeft,
  FaCalendarAlt,
  FaEdit,
} from "react-icons/fa";

import MainLayout from "../layouts/MainLayout";

function EditTask() {

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

  const [status, setStatus] =
    useState("");

  const [dueDate, setDueDate] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  // FETCH TASK
  useEffect(() => {

    fetchTask();

  }, [id]);

  const fetchTask = async () => {

    try {

      const response =
        await axios.get(
          `http://localhost:8080/api/tasks/${id}`
        );

      setTitle(
        response.data.title
      );

      setDescription(
        response.data.description
      );

      setStatus(
        response.data.status
      );

      setDueDate(
        response.data.dueDate
      );

    } catch (error) {

      console.log(error);

    }
  };

  // UPDATE TASK
  const handleUpdate = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      // TEAM MEMBER
      // ONLY STATUS UPDATE
      if (
        role === "TEAM_MEMBER"
      ) {

        await axios.put(
          `http://localhost:8080/api/tasks/${id}`,
          {
            status,
          }
        );

      } else {

        // ADMIN + PROJECT MANAGER
        await axios.put(
          `http://localhost:8080/api/tasks/${id}`,
          {
            title,
            description,
            status,
            dueDate,
          }
        );
      }

      alert(
        "Task Updated Successfully"
      );

      navigate("/tasks");

    } catch (error) {

      console.log(error);

      alert(
        "Error updating task"
      );

    } finally {

      setLoading(false);

    }
  };

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
                Edit Task
              </h1>

              <p className="text-gray-500 mt-2 text-lg">

                {
                  role === "TEAM_MEMBER"
                    ? "Update your task status"
                    : "Manage and update task details"
                }

              </p>

            </div>

          </div>

          {/* TITLE */}
          <div className="mb-6">

            <label className="block mb-3 font-semibold text-slate-700">

              Task Title

            </label>

            <div className="relative">

              <FaTasks className="absolute left-4 top-5 text-gray-400" />

              <input
                type="text"
                placeholder="Task Title"
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
                disabled={
                  role === "TEAM_MEMBER"
                }
                className={`w-full border border-gray-200 pl-12 p-4 rounded-2xl focus:outline-none focus:ring-2 ${
                  role === "TEAM_MEMBER"
                    ? "bg-gray-100 cursor-not-allowed"
                    : "focus:ring-yellow-500"
                }`}
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
                placeholder="Task Description"
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
                rows="5"
                disabled={
                  role === "TEAM_MEMBER"
                }
                className={`w-full border border-gray-200 pl-12 p-4 rounded-2xl focus:outline-none focus:ring-2 ${
                  role === "TEAM_MEMBER"
                    ? "bg-gray-100 cursor-not-allowed"
                    : "focus:ring-yellow-500"
                }`}
              />

            </div>

          </div>

          {/* STATUS */}
          <div className="mb-6">

            <label className="block mb-3 font-semibold text-slate-700">

              Status

            </label>

            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value)
              }
              className="w-full border border-gray-200 p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            >

              <option value="">
                Select Status
              </option>

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

          {/* DUE DATE */}
          <div className="mb-8">

            <label className="block mb-3 font-semibold text-slate-700">

              Due Date

            </label>

            <div className="relative">

              <FaCalendarAlt className="absolute left-4 top-5 text-gray-400" />

              <input
                type="date"
                value={dueDate}
                onChange={(e) =>
                  setDueDate(e.target.value)
                }
                disabled={
                  role === "TEAM_MEMBER"
                }
                className={`w-full border border-gray-200 pl-12 p-4 rounded-2xl focus:outline-none focus:ring-2 ${
                  role === "TEAM_MEMBER"
                    ? "bg-gray-100 cursor-not-allowed"
                    : "focus:ring-yellow-500"
                }`}
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
                ? "Updating Task..."
                : role === "TEAM_MEMBER"
                ? "Update Status"
                : "Update Task"
            }

          </button>

        </form>

      </div>

    </MainLayout>
  );
}

export default EditTask;