
package com.devconnect.backend.controller;

import com.devconnect.backend.entity.Task;
import com.devconnect.backend.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "*")
public class TaskController {

    @Autowired
    private TaskService service;

    // ========================================
    // CREATE TASK
    // ========================================

    @PostMapping
    public Task createTask(@RequestBody Task task) {
        return service.createTask(task);
    }

    // ========================================
    // GET ALL TASKS
    // ========================================

    @GetMapping
    public List<Task> getAllTasks() {
        return service.getAllTasks();
    }

    // ========================================
    // GET TASKS BY USER EMAIL
    // ========================================

    @GetMapping("/user/{email}")
    public List<Task> getTasksByUserEmail(
            @PathVariable String email) {

        return service.getAllTasks(email);
    }

    // ========================================
    // GET TASKS BY PROJECT ID
    // ========================================

    @GetMapping("/project/{projectId}")
    public List<Task> getTasksByProjectId(
            @PathVariable Long projectId) {

        return service.getTasksByProjectId(projectId);
    }

    // ========================================
    // GET TASK BY ID
    // ========================================
    // Example:
    // GET /api/tasks/1

    @GetMapping("/{id}")
    public ResponseEntity<Task> getTaskById(
            @PathVariable Long id) {

        Optional<Task> task = service.getTaskById(id);

        if (task.isPresent()) {
            return ResponseEntity.ok(task.get());
        }

        return ResponseEntity.notFound().build();
    }

    // ========================================
    // UPDATE TASK
    // ========================================
    // Example:
    // PUT /api/tasks/1

    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(
            @PathVariable Long id,
            @RequestBody Task task) {

        Task updatedTask = service.updateTask(id, task);

        if (updatedTask == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(updatedTask);
    }

    // ========================================
    // DELETE TASK
    // ========================================

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTask(
            @PathVariable Long id) {

        String result = service.deleteTask(id);

        if (result.equals("Task not found")) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(result);
    }
}
```

### 2. `EditTask.jsx`

This will automatically load the existing task.

For example, if you click **Edit** for task ID `1`, it requests:

```text
GET https://devconnectai.onrender.com/api/tasks/1
```

The returned data is placed into the form.

```jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../api/axiosConfig";

const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState({
    title: "",
    description: "",
    status: "Pending",
    dueDate: "",
    assignedTo: "",
    userEmail: "",
    projectId: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // ========================================
  // FETCH EXISTING TASK
  // ========================================

  useEffect(() => {
    fetchTask();
  }, [id]);

  const fetchTask = async () => {
    try {
      setLoading(true);
      setError("");

      console.log("Fetching task ID:", id);

      // axios baseURL already contains /api
      const response = await axios.get(`/tasks/${id}`);

      console.log("TASK DATA:", response.data);

      const data = response.data;

      setTask({
        title: data.title || "",
        description: data.description || "",
        status: data.status || "Pending",
        dueDate: data.dueDate || "",
        assignedTo: data.assignedTo || "",
        userEmail: data.userEmail || "",
        projectId: data.projectId || "",
      });
    } catch (err) {
      console.error("FETCH TASK ERROR:", err);

      if (err.response?.status === 404) {
        setError("Task not found.");
      } else if (err.response?.status === 403) {
        setError("Access denied.");
      } else {
        setError("Failed to load task.");
      }
    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // HANDLE INPUT CHANGE
  // ========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ========================================
  // UPDATE TASK
  // ========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");

      const updatedTask = {
        title: task.title.trim(),
        description: task.description.trim(),
        status: task.status,
        dueDate: task.dueDate,
        assignedTo: task.assignedTo,
        userEmail: task.userEmail,
        projectId: Number(task.projectId),
      };

      console.log("UPDATING TASK:", updatedTask);

      await axios.put(`/tasks/${id}`, updatedTask);

      alert("Task updated successfully!");

      navigate("/tasks");
    } catch (err) {
      console.error("UPDATE TASK ERROR:", err);

      if (err.response?.status === 403) {
        setError("Access denied.");
      } else if (err.response?.status === 404) {
        setError("Task not found.");
      } else {
        setError("Failed to update task.");
      }
    } finally {
      setSaving(false);
    }
  };

  // ========================================
  // LOADING
  // ========================================

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">
          Loading task...
        </p>
      </div>
    );
  }

  // ========================================
  // UI
  // ========================================

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-6">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">

          <h1 className="text-2xl font-bold">
            Edit Task
          </h1>

          <button
            type="button"
            onClick={() => navigate("/tasks")}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
            Back
          </button>

        </div>

        <p className="text-gray-500 mb-6">
          Manage and update task details
        </p>

        {/* ERROR */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* TASK TITLE */}

          <div>
            <label className="block font-medium mb-2">
              Task Title
            </label>

            <input
              type="text"
              name="title"
              value={task.title}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              placeholder="Enter task title"
            />
          </div>

          {/* DESCRIPTION */}

          <div>
            <label className="block font-medium mb-2">
              Description
            </label>

            <textarea
              name="description"
              value={task.description}
              onChange={handleChange}
              rows="4"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              placeholder="Enter task description"
            />
          </div>

          {/* STATUS */}

          <div>
            <label className="block font-medium mb-2">
              Status
            </label>

            <select
              name="status"
              value={task.status}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
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

          {/* DUE DATE */}

          <div>
            <label className="block font-medium mb-2">
              Due Date
            </label>

            <input
              type="date"
              name="dueDate"
              value={task.dueDate || ""}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>

          {/* ASSIGNED TO */}

          <div>
            <label className="block font-medium mb-2">
              Assigned To
            </label>

            <input
              type="text"
              name="assignedTo"
              value={task.assignedTo}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              placeholder="Assigned member email"
            />
          </div>

          {/* PROJECT ID */}

          <div>
            <label className="block font-medium mb-2">
              Project ID
            </label>

            <input
              type="number"
              name="projectId"
              value={task.projectId}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>

          {/* BUTTONS */}

          <div className="flex gap-3 pt-4">

            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {saving ? "Updating..." : "Update Task"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/tasks")}
              className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            >
              Cancel
            </button>

          </div>

        </form>
      </div>
    </div>
  );
};

export default EditTask;
