import { useEffect, useState } from "react";

import axios from "../utils/axiosConfig";

import {
  FaBell,
  FaTasks,
  FaCheckCircle,
  FaProjectDiagram,
  FaUsers,
  FaTrash,
} from "react-icons/fa";

import MainLayout from "../layouts/MainLayout";

function Notifications() {

  // =========================================
  // ROLE
  // =========================================

  const role =
    localStorage.getItem("role");

  // =========================================
  // STATE
  // =========================================

  const [notifications, setNotifications] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  // =========================================
  // FETCH NOTIFICATIONS
  // =========================================

  const fetchNotifications =
    async () => {

      try {

        setLoading(true);

        const response =
          await axios.get(
            "/api/notifications"
          );

        // NEWEST FIRST

        setNotifications(

          response.data.reverse() || []

        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

  useEffect(() => {

    fetchNotifications();

  }, []);

  // =========================================
  // DELETE NOTIFICATION
  // ONLY ADMIN
  // =========================================

  const deleteNotification =
    async (id) => {

      // BLOCK NON ADMIN

      if (role !== "ADMIN") {

        return;

      }

      const confirmDelete =
        window.confirm(
          "Delete this notification?"
        );

      if (!confirmDelete)
        return;

      try {

        await axios.delete(
          `/api/notifications/${id}`
        );

        setNotifications(

          notifications.filter(
            (notification) =>
              notification.id !== id
          )

        );

      } catch (error) {

        console.log(error);

        alert(
          "Delete Failed"
        );

      }

    };

  // =========================================
  // ICON HANDLER
  // =========================================

  const getIcon = (type) => {

    switch (type) {

      case "project":
        return <FaProjectDiagram />;

      case "task":
        return <FaTasks />;

      case "team":
        return <FaUsers />;

      case "completed":
        return <FaCheckCircle />;

      default:
        return <FaBell />;

    }

  };

  // =========================================
  // COLOR HANDLER
  // =========================================

  const getColor = (type) => {

    switch (type) {

      case "project":
        return "bg-purple-500";

      case "task":
        return "bg-green-500";

      case "team":
        return "bg-blue-500";

      case "completed":
        return "bg-yellow-500";

      default:
        return "bg-gray-500";

    }

  };

  return (

    <MainLayout>

      {/* HEADER */}

      <div className="
        flex
        flex-col
        md:flex-row
        justify-between
        items-start
        md:items-center
        gap-6
        mb-10
      ">

        <div>

          <h1 className="
            text-5xl
            font-bold
            text-slate-800
            dark:text-white
          ">

            Notifications

          </h1>

          <p className="
            text-gray-500
            dark:text-gray-400
            mt-2
            text-lg
          ">

            Stay updated with project activity

          </p>

        </div>

        {/* COUNT */}

        <div className="
          bg-blue-100
          text-blue-700
          px-5
          py-3
          rounded-2xl
          font-bold
        ">

          {notifications.length}
          {" "}
          Notifications

        </div>

      </div>

      {/* TEAM MEMBER MESSAGE */}

      {
        role === "TEAM_MEMBER" && (

          <div className="
            bg-yellow-100
            border
            border-yellow-300
            text-yellow-800
            p-5
            rounded-2xl
            mb-8
          ">

            You can only view notifications.

          </div>

        )
      }

      {/* LOADING */}

      {
        loading && (

          <div className="
            space-y-6
          ">

            {[1,2,3].map((item) => (

              <div
                key={item}
                className="
                  bg-white
                  rounded-3xl
                  h-32
                  animate-pulse
                "
              />

            ))}

          </div>

        )
      }

      {/* EMPTY STATE */}

      {
        !loading &&
        notifications.length === 0 && (

          <div className="
            bg-white
            dark:bg-slate-900
            rounded-3xl
            shadow-lg
            p-16
            text-center
          ">

            <div className="
              bg-slate-100
              dark:bg-slate-800
              w-28
              h-28
              rounded-full
              flex
              items-center
              justify-center
              mx-auto
              mb-8
            ">

              <FaBell className="
                text-6xl
                text-gray-300
              " />

            </div>

            <h2 className="
              text-4xl
              font-bold
              text-gray-700
              dark:text-white
            ">

              No Notifications

            </h2>

            <p className="
              text-gray-500
              mt-4
              text-lg
            ">

              Notifications will appear here automatically.

            </p>

          </div>

        )
      }

      {/* NOTIFICATIONS */}

      {
        !loading &&
        notifications.length > 0 && (

          <div className="
            space-y-6
          ">

            {notifications.map((notification) => (

              <div
                key={notification.id}
                className="
                  bg-white
                  dark:bg-slate-900
                  rounded-3xl
                  shadow-lg
                  hover:shadow-2xl
                  hover:-translate-y-1
                  transition
                  duration-300
                  p-7
                  flex
                  flex-col
                  xl:flex-row
                  justify-between
                  gap-6
                  items-start
                  xl:items-center
                  border
                  border-gray-100
                  dark:border-slate-700
                "
              >

                {/* LEFT */}

                <div className="
                  flex
                  items-center
                  gap-6
                ">

                  {/* ICON */}

                  <div
                    className={`
                      ${getColor(notification.type)}
                      p-5
                      rounded-3xl
                      text-white
                      text-3xl
                      shadow-lg
                    `}
                  >

                    {getIcon(notification.type)}

                  </div>

                  {/* CONTENT */}

                  <div>

                    <h2 className="
                      text-2xl
                      font-bold
                      text-slate-800
                      dark:text-white
                    ">

                      {notification.title}

                    </h2>

                    <p className="
                      text-gray-500
                      dark:text-gray-400
                      mt-2
                      text-lg
                    ">

                      {notification.message}

                    </p>

                    <div className="
                      flex
                      items-center
                      gap-3
                      mt-3
                    ">

                      <div className="
                        w-3
                        h-3
                        rounded-full
                        bg-green-500
                        animate-pulse
                      " />

                      <p className="
                        text-sm
                        text-gray-400
                      ">

                        {
                          notification.time ||
                          "Just Now"
                        }

                      </p>

                    </div>

                  </div>

                </div>

                {/* RIGHT */}

                <div className="
                  flex
                  items-center
                  gap-4
                ">

                  {/* DELETE BUTTON ONLY ADMIN */}

                  {
                    role === "ADMIN" && (

                      <button
                        onClick={() =>
                          deleteNotification(
                            notification.id
                          )
                        }
                        className="
                          bg-red-500
                          hover:bg-red-600
                          text-white
                          px-6
                          py-3
                          rounded-2xl
                          flex
                          items-center
                          gap-3
                          transition
                          shadow-lg
                        "
                      >

                        <FaTrash />

                        Delete

                      </button>

                    )
                  }

                </div>

              </div>

            ))}

          </div>

        )
      }

    </MainLayout>

  );

}

export default Notifications;