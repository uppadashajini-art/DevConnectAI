
import { useCallback, useEffect, useState } from "react";

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

  const [status, setStatus] = useState("");

  const [dueDate, setDueDate] = useState("");

  const [loading, setLoading] = useState(false);

  const [fetching, setFetching] = useState(true);

  const [error, setError] = useState("");

  // =========================================
  // FETCH EXISTING TASK
  // =========================================

  const fetchTask = useCallback(async () => {

    try {

      setFetching(true);

      setError("");

      console.log(
        "Fetching task with ID:",
        id
      );

      // IMPORTANT:
      // axios baseURL already contains /api
      //
      // baseURL:
      // https://devconnectai.onrender.com/api
      //
      // Final URL:
      // https://devconnectai.onrender.com/api/tasks/1

      const response = await axios.get(
        `/tasks/${id}`
      );

      console.log(
        "Task data received:",
        response.data
      );

      const task = response.data;

      // =====================================
      // PUT EXISTING DATA INTO FORM
      // =====================================

      setTitle(task.title || "");

      setDescription(
        task.description || ""
      );

      setStatus(
        task.status || "Pending"
      );

      setDueDate(
        task.dueDate || ""
      );

    } catch (error) {

      console.error(
        "FETCH TASK ERROR:",
        error
      );

      console.error(
        "STATUS:",
        error.response?.status
      );

      if (
        error.response?.status === 404
      ) {

        setError(
          "Task not found."
        );

      } else if (
        error.response?.status === 403
      ) {

        setError(
          "You are not authorized to view this task."
        );

      } else {

        setError(
          "Failed to load task."
        );
      }

    } finally {

      setFetching(false);

    }

  }, [id]);


  // =========================================
  // LOAD TASK WHEN PAGE OPENS
  // =========================================

  useEffect(() => {

    fetchTask();

  }, [fetchTask]);


  // =========================================
  // UPDATE TASK
  // =========================================

  const handleUpdate = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      setError("");

      // =====================================
      // TEAM MEMBER
      // ONLY STATUS CAN BE UPDATED
      // =====================================

      if (role === "TEAM_MEMBER") {

        const updateData = {
          status: status,
        };

        console.log(
          "Updating task status:",
          updateData
        );

        await axios.put(
          `/tasks/${id}`,
          updateData
        );

      }

      // =====================================
      // ADMIN / PROJECT MANAGER
      // FULL TASK UPDATE
      // =====================================

      else {

        const updateData = {

          title: title.trim(),

          description:
            description.trim(),

          status: status,

          dueDate: dueDate,

        };

        console.log(
          "Updating complete task:",
          updateData
        );

        await axios.put(
          `/tasks/${id}`,
          updateData
        );
      }

      // =====================================
      // SUCCESS
      // =====================================

      alert(
        "Task Updated Successfully"
      );

      navigate("/tasks");

    } catch (error) {

      console.error(
        "UPDATE TASK ERROR:",
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
          "Access Denied. You are not authorized to update this task."
        );

      } else if (
        error.response?.status === 404
      ) {

        alert(
          "Task not found."
        );

      } else {

        alert(
          "Error updating task."
        );
      }

    } finally {

      setLoading(false);

    }
  };


  // =========================================
  // LOADING SCREEN
  // =========================================

  if (fetching) {

    return (

      <MainLayout>

        <div className="flex justify-center items-center py-20">

          <div className="text-center">

            <div className="text-2xl font-semibold text-slate-700">

              Loading Task...

            </div>

            <p className="text-gray-500 mt-2">

              Please wait while we fetch the task details.

            </p>

          </div>

        </div>

      </MainLayout>
    );
  }


  // =========================================
  // ERROR SCREEN
  // =========================================

  if (error) {

    return (

      <MainLayout>

        <div className="flex justify-center items-center py-20">

          <div className="bg-white rounded-3xl shadow-xl p-10 text-center max-w-lg w-full">

            <h2 className="text-2xl font-bold text-red-600 mb-4">

              Unable to Load Task

            </h2>

            <p className="text-gray-600 mb-6">

              {error}

            </p>

            <button
              type="button"
              onClick={() => navigate("/tasks")}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-xl font-semibold"
            >

              Back to Tasks

            </button>

          </div>

        </div>

      </MainLayout>
    );
  }


  // =========================================
  // MAIN UI
  // =========================================

  return (

    <MainLayout>

      <div className="flex justify-center items-center py-10">

        <form
          onSubmit={handleUpdate}
          className="bg-white rounded-3xl shadow-xl border border-gray-100 p-10 w-full max-w-2xl"
        >

          {/* ================================= */}
          {/* HEADER */}
          {/* ================================= */}

          <div className="flex items-center gap-4 mb-10">

            <div className="bg-yellow-100 text-yellow-600 p-5 rounded-3xl">

              <FaEdit className="text-3xl" />

            </div>

            <div>

              <h1 className="text-5xl font-bold text-slate-900">

                Edit Task

              </h1>

              <p className="text-gray-500 mt-2 text-lg">

                {role === "TEAM_MEMBER"
                  ? "Update your task status"
                  : "Manage and update task details"}

              </p>

            </div>

          </div>


          {/* ================================= */}
          {/* TASK TITLE */}
          {/* ================================= */}

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
                required
                className={`w-full border border-gray-200 pl-12 p-4 rounded-2xl focus:outline-none focus:ring-2 ${
                  role === "TEAM_MEMBER"
                    ? "bg-gray-100 cursor-not-allowed"
                    : "focus:ring-yellow-500"
                }`}
              />

            </div>

          </div>


          {/* ================================= */}
          {/* DESCRIPTION */}
          {/* ================================= */}

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
                  setDescription(
                    e.target.value
                  )
                }
                rows="5"
                disabled={
                  role === "TEAM_MEMBER"
                }
                required
                className={`w-full border border-gray-200 pl-12 p-4 rounded-2xl focus:outline-none focus:ring-2 ${
                  role === "TEAM_MEMBER"
                    ? "bg-gray-100 cursor-not-allowed"
                    : "focus:ring-yellow-500"
                }`}
              />

            </div>

          </div>


          {/* ================================= */}
          {/* STATUS */}
          {/* ================================= */}

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


          {/* ================================= */}
          {/* DUE DATE */}
          {/* ================================= */}

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
                  setDueDate(
                    e.target.value
                  )
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


          {/* ================================= */}
          {/* BUTTON */}
          {/* ================================= */}

          <button
            type="submit"
            disabled={
              loading || !status
            }
            className="w-full bg-yellow-500 hover:bg-yellow-600 disabled:bg-yellow-300 text-white py-4 rounded-2xl text-lg font-semibold shadow-lg transition"
          >

            {loading
              ? "Updating Task..."
              : role === "TEAM_MEMBER"
              ? "Update Status"
              : "Update Task"}

          </button>

        </form>

      </div>

    </MainLayout>
  );
}


export default EditTask;
