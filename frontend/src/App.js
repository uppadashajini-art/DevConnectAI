import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// TOAST
import {
  Toaster,
} from "react-hot-toast";

// AUTH
import Login from "./pages/Login";
import Register from "./pages/Register";

// MAIN PAGES
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";

// PROJECTS
import Projects from "./pages/Projects";
import CreateProject from "./pages/CreateProject";
import EditProject from "./pages/EditProject";

// TASKS
import Tasks from "./pages/Tasks";
import CreateTask from "./pages/CreateTask";
import EditTask from "./pages/EditTask";

// TEAM
import Team from "./pages/Team";

// OTHER PAGES
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";
import Files from "./pages/Files";

// PROTECTED ROUTE
import ProtectedRoute from "./components/ProtectedRoute";

function App() {

  return (

    <BrowserRouter>

      {/* ========================= */}
      {/* GLOBAL TOASTER */}
      {/* ========================= */}
      <Toaster

        position="top-right"

        reverseOrder={false}

        toastOptions={{

          style: {

            background: "#0f172a",

            color: "#ffffff",

            border:
              "1px solid #1e293b",

            padding: "16px",

            borderRadius: "18px",

            fontWeight: "600",

            boxShadow:
              "0 8px 25px rgba(0,0,0,0.35)",

          },

          success: {

            iconTheme: {

              primary: "#22c55e",

              secondary: "#ffffff",

            },

          },

          error: {

            iconTheme: {

              primary: "#ef4444",

              secondary: "#ffffff",

            },

          },

        }}

      />

      {/* ========================= */}
      {/* ROUTES */}
      {/* ========================= */}
      <Routes>

        {/* ========================= */}
        {/* PUBLIC ROUTES */}
        {/* ========================= */}

        {/* LOGIN */}
        <Route
          path="/"
          element={<Login />}
        />

        {/* REGISTER */}
        <Route
          path="/register"
          element={<Register />}
        />

        {/* ========================= */}
        {/* HOME */}
        {/* ========================= */}

        <Route
          path="/home"
          element={

            <ProtectedRoute
              allowedRoles={[
                "ADMIN",
                "PROJECT_MANAGER",
                "TEAM_MEMBER",
              ]}
            >

              <Home />

            </ProtectedRoute>

          }
        />

        {/* ========================= */}
        {/* DASHBOARD */}
        {/* ========================= */}

        <Route
          path="/dashboard"
          element={

            <ProtectedRoute
              allowedRoles={[
                "ADMIN",
                "PROJECT_MANAGER",
                "TEAM_MEMBER",
              ]}
            >

              <Dashboard />

            </ProtectedRoute>

          }
        />

        {/* ========================= */}
        {/* PROJECTS */}
        {/* ========================= */}

        {/* VIEW PROJECTS */}
        <Route
          path="/projects"
          element={

            <ProtectedRoute
              allowedRoles={[
                "ADMIN",
                "PROJECT_MANAGER",
                "TEAM_MEMBER",
              ]}
            >

              <Projects />

            </ProtectedRoute>

          }
        />

        {/* CREATE PROJECT */}
        <Route
          path="/create-project"
          element={

            <ProtectedRoute
              allowedRoles={[
                "ADMIN",
                "PROJECT_MANAGER",
              ]}
            >

              <CreateProject />

            </ProtectedRoute>

          }
        />

        {/* EDIT PROJECT */}
        <Route
          path="/edit-project/:id"
          element={

            <ProtectedRoute
              allowedRoles={[
                "ADMIN",
                "PROJECT_MANAGER",
              ]}
            >

              <EditProject />

            </ProtectedRoute>

          }
        />

        {/* ========================= */}
        {/* TASKS */}
        {/* ========================= */}

        {/* VIEW TASKS */}
        <Route
          path="/tasks"
          element={

            <ProtectedRoute
              allowedRoles={[
                "ADMIN",
                "PROJECT_MANAGER",
                "TEAM_MEMBER",
              ]}
            >

              <Tasks />

            </ProtectedRoute>

          }
        />

        {/* CREATE TASK */}
        <Route
          path="/create-task"
          element={

            <ProtectedRoute
              allowedRoles={[
                "ADMIN",
                "PROJECT_MANAGER",
              ]}
            >

              <CreateTask />

            </ProtectedRoute>

          }
        />

        {/* EDIT TASK */}
        <Route
          path="/edit-task/:id"
          element={

            <ProtectedRoute
              allowedRoles={[
                "ADMIN",
                "PROJECT_MANAGER",
                "TEAM_MEMBER",
              ]}
            >

              <EditTask />

            </ProtectedRoute>

          }
        />

        {/* ========================= */}
        {/* TEAM */}
        {/* ========================= */}

        <Route
          path="/team"
          element={

            <ProtectedRoute
              allowedRoles={[
                "ADMIN",
                "PROJECT_MANAGER",
              ]}
            >

              <Team />

            </ProtectedRoute>

          }
        />

        {/* ========================= */}
        {/* NOTIFICATIONS */}
        {/* ========================= */}

        <Route
          path="/notifications"
          element={

            <ProtectedRoute
              allowedRoles={[
                "ADMIN",
                "PROJECT_MANAGER",
                "TEAM_MEMBER",
              ]}
            >

              <Notifications />

            </ProtectedRoute>

          }
        />

        {/* ========================= */}
        {/* FILES */}
        {/* ========================= */}

        <Route
          path="/files"
          element={

            <ProtectedRoute
              allowedRoles={[
                "ADMIN",
                "PROJECT_MANAGER",
                "TEAM_MEMBER",
              ]}
            >

              <Files />

            </ProtectedRoute>

          }
        />

        {/* ========================= */}
        {/* PROFILE */}
        {/* ========================= */}

        <Route
          path="/profile"
          element={

            <ProtectedRoute
              allowedRoles={[
                "ADMIN",
                "PROJECT_MANAGER",
                "TEAM_MEMBER",
              ]}
            >

              <Profile />

            </ProtectedRoute>

          }
        />

        {/* ========================= */}
        {/* FALLBACK */}
        {/* ========================= */}

        <Route
          path="*"
          element={
            <Navigate to="/" />
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;