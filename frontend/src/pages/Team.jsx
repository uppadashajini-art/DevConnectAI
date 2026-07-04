import { useEffect, useState } from "react";

import axios from "../utils/axiosConfig";

import toast from "react-hot-toast";

import {
  FaTrash,
  FaEnvelope,
  FaBriefcase,
  FaProjectDiagram,
  FaPlus,
  FaEdit,
  FaUsers,
  FaCode,
} from "react-icons/fa";

import { motion } from "framer-motion";

import MainLayout from "../layouts/MainLayout";

function Team() {

  const [members, setMembers] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  // ROLE
  const role =
    localStorage.getItem("role");

  // EDIT ID
  const [editId, setEditId] =
    useState(null);

  const [team, setTeam] =
    useState({
      memberName: "",
      memberEmail: "",
      role: "",
      projectName: "",
    });

  // =========================
  // FETCH MEMBERS
  // =========================
  const fetchMembers = async () => {

    try {

      setLoading(true);

      const response =
        await axios.get(
          "/api/team"
        );

      setMembers(response.data);

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to Fetch Team Members"
      );

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {

    fetchMembers();

  }, []);

  // =========================
  // HANDLE CHANGE
  // =========================
  const handleChange = (e) => {

    setTeam({
      ...team,
      [e.target.name]:
        e.target.value,
    });
  };

  // =========================
  // EDIT MEMBER
  // =========================
  const editMember = (member) => {

    setTeam({

      memberName:
        member.memberName,

      memberEmail:
        member.memberEmail,

      role:
        member.role,

      projectName:
        member.projectName,

    });

    setEditId(member.id);

    toast.success(
      "Edit Mode Enabled"
    );
  };

  // =========================
  // ADD / UPDATE
  // =========================
  const addMember = async (e) => {

    e.preventDefault();

    // VALIDATION
    if (

      !team.memberName ||

      !team.memberEmail ||

      !team.role ||

      !team.projectName

    ) {

      toast.error(
        "Please Fill All Fields"
      );

      return;
    }

    try {

      // UPDATE
      if (editId) {

        await axios.put(
          `/api/team/${editId}`,
          team
        );

        toast.success(
          "Member Updated Successfully"
        );

      } else {

        // ADD
        await axios.post(
          "/api/team",
          team
        );

        toast.success(
          "Member Added Successfully"
        );
      }

      // RESET
      setTeam({
        memberName: "",
        memberEmail: "",
        role: "",
        projectName: "",
      });

      setEditId(null);

      fetchMembers();

    } catch (error) {

      console.log(error);

      toast.error(
        "Error Saving Member"
      );

    }
  };

  // =========================
  // DELETE
  // =========================
  const deleteMember = async (id) => {

    const confirmDelete =
      window.confirm(
        "Delete this member?"
      );

    if (!confirmDelete) return;

    try {

      await axios.delete(
        `/api/team/${id}`
      );

      toast.success(
        "Member Deleted Successfully"
      );

      fetchMembers();

    } catch (error) {

      console.log(error);

      toast.error(
        "Delete Failed"
      );

    }
  };

  return (

    <MainLayout>

      {/* HEADER */}
      <div className="
        flex
        flex-col
        xl:flex-row
        justify-between
        gap-8
        mb-10
      ">

        <div>

          <h1 className="
            text-5xl
            font-bold
            text-slate-900
            dark:text-white
          ">

            Team Members

          </h1>

          <p className="
            text-gray-500
            dark:text-gray-400
            mt-3
            text-lg
          ">

            Manage collaboration and development teams

          </p>

        </div>

        <div className="
          flex
          items-center
          gap-4
          flex-wrap
        ">

          {/* TOTAL */}
          <div className="
            bg-blue-100
            text-blue-700
            px-5
            py-3
            rounded-2xl
            font-bold
          ">

            {members.length}
            {" "}
            Members

          </div>

        </div>

      </div>

      {/* ANALYTICS */}
      <div className="
        grid
        grid-cols-1
        md:grid-cols-3
        gap-8
        mb-10
      ">

        {/* MEMBERS */}
        <div className="enterprise-card p-8">

          <div className="
            bg-blue-100
            w-20
            h-20
            rounded-3xl
            flex
            items-center
            justify-center
            mb-6
          ">

            <FaUsers className="
              text-blue-600
              text-4xl
            " />

          </div>

          <h2 className="
            text-5xl
            font-bold
            text-slate-900
            dark:text-white
          ">

            {members.length}

          </h2>

          <p className="
            text-gray-500
            dark:text-gray-400
            text-lg
            mt-3
          ">

            Total Members

          </p>

        </div>

        {/* DEVELOPERS */}
        <div className="enterprise-card p-8">

          <div className="
            bg-green-100
            w-20
            h-20
            rounded-3xl
            flex
            items-center
            justify-center
            mb-6
          ">

            <FaCode className="
              text-green-600
              text-4xl
            " />

          </div>

          <h2 className="
            text-5xl
            font-bold
            text-slate-900
            dark:text-white
          ">

            {
              members.filter(
                (member) =>
                  member.role?.includes(
                    "Developer"
                  )
              ).length
            }

          </h2>

          <p className="
            text-gray-500
            dark:text-gray-400
            text-lg
            mt-3
          ">

            Developers

          </p>

        </div>

        {/* PROJECTS */}
        <div className="enterprise-card p-8">

          <div className="
            bg-purple-100
            w-20
            h-20
            rounded-3xl
            flex
            items-center
            justify-center
            mb-6
          ">

            <FaProjectDiagram className="
              text-purple-600
              text-4xl
            " />

          </div>

          <h2 className="
            text-5xl
            font-bold
            text-slate-900
            dark:text-white
          ">

            {
              [
                ...new Set(
                  members.map(
                    (member) =>
                      member.projectName
                  )
                ),
              ].length
            }

          </h2>

          <p className="
            text-gray-500
            dark:text-gray-400
            text-lg
            mt-3
          ">

            Active Projects

          </p>

        </div>

      </div>

      {/* FORM */}
      {
        (
          role === "ADMIN" ||
          role ===
          "PROJECT_MANAGER"
        ) && (

          <motion.form
            initial={{
              opacity: 0,
              y: 40,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            onSubmit={addMember}
            className="enterprise-card p-8 mb-12"
          >

            <div className="
              flex
              items-center
              gap-4
              mb-8
            ">

              <div className="
                bg-blue-100
                text-blue-600
                p-4
                rounded-2xl
                text-2xl
              ">

                {
                  editId
                    ? <FaEdit />
                    : <FaPlus />
                }

              </div>

              <h2 className="
                text-3xl
                font-bold
                text-slate-800
                dark:text-white
              ">

                {
                  editId
                    ? "Edit Team Member"
                    : "Add New Member"
                }

              </h2>

            </div>

            <div className="
              grid
              md:grid-cols-2
              gap-6
            ">

              {/* NAME */}
              <div>

                <label className="
                  block
                  mb-2
                  font-semibold
                  text-slate-700
                  dark:text-gray-300
                ">

                  Member Name

                </label>

                <input
                  type="text"
                  name="memberName"
                  placeholder="Enter member name"
                  value={team.memberName}
                  onChange={handleChange}
                  required
                  className="input-style"
                />

              </div>

              {/* EMAIL */}
              <div>

                <label className="
                  block
                  mb-2
                  font-semibold
                  text-slate-700
                  dark:text-gray-300
                ">

                  Email Address

                </label>

                <input
                  type="email"
                  name="memberEmail"
                  placeholder="Enter email"
                  value={team.memberEmail}
                  onChange={handleChange}
                  required
                  className="input-style"
                />

              </div>

              {/* ROLE */}
              <div>

                <label className="
                  block
                  mb-2
                  font-semibold
                  text-slate-700
                  dark:text-gray-300
                ">

                  Role

                </label>

                <select
                  name="role"
                  value={team.role}
                  onChange={handleChange}
                  required
                  className="input-style"
                >

                  <option value="">
                    Select Role
                  </option>

                  <option>
                    Frontend Developer
                  </option>

                  <option>
                    Backend Developer
                  </option>

                  <option>
                    Full Stack Developer
                  </option>

                  <option>
                    UI/UX Designer
                  </option>

                  <option>
                    Project Manager
                  </option>

                  <option>
                    QA Engineer
                  </option>

                </select>

              </div>

              {/* PROJECT */}
              <div>

                <label className="
                  block
                  mb-2
                  font-semibold
                  text-slate-700
                  dark:text-gray-300
                ">

                  Project Name

                </label>

                <input
                  type="text"
                  name="projectName"
                  placeholder="DevConnect AI"
                  value={team.projectName}
                  onChange={handleChange}
                  required
                  className="input-style"
                />

              </div>

            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className={`
                mt-8
                text-white
                px-8
                py-4
                rounded-2xl
                font-semibold
                shadow-lg
                transition-all
                duration-300
                hover:scale-105

                ${
                  editId
                    ? "bg-yellow-500 hover:bg-yellow-600"
                    : "bg-blue-600 hover:bg-blue-700"
                }
              `}
            >

              {
                editId
                  ? "Update Member"
                  : "Add Member"
              }

            </button>

          </motion.form>

        )
      }

      {/* LOADING */}
      {
        loading ? (

          <div className="
            grid
            md:grid-cols-2
            xl:grid-cols-3
            gap-8
          ">

            {[1,2,3].map((item) => (

              <div
                key={item}
                className="enterprise-card animate-pulse h-72"
              />

            ))}

          </div>

        ) : (

          <div className="
            grid
            md:grid-cols-2
            xl:grid-cols-3
            gap-8
          ">

            {members.map((member) => (

              <motion.div
                key={member.id}
                whileHover={{
                  y: -5,
                }}
                className="enterprise-card p-7"
              >

                <div className="
                  flex
                  items-center
                  gap-5
                  mb-6
                ">

                  <div className="
                    w-20
                    h-20
                    rounded-full
                    bg-blue-600
                    text-white
                    flex
                    items-center
                    justify-center
                    text-2xl
                    font-bold
                    shadow-lg
                  ">

                    {
                      member.memberName
                        ?.split(" ")
                        .map(
                          (word) =>
                            word[0]
                        )
                        .join("")
                        .toUpperCase()
                    }

                  </div>

                  <div>

                    <h2 className="
                      text-2xl
                      font-bold
                      text-slate-900
                      dark:text-white
                    ">

                      {member.memberName}

                    </h2>

                    <p className="
                      text-gray-500
                      dark:text-gray-400
                    ">

                      Team Member

                    </p>

                  </div>

                </div>

                <div className="
                  space-y-4
                ">

                  <div className="
                    flex
                    items-center
                    gap-3
                    text-gray-700
                    dark:text-gray-300
                  ">

                    <FaEnvelope className="text-blue-500" />

                    <span>
                      {member.memberEmail}
                    </span>

                  </div>

                  <div className="
                    flex
                    items-center
                    gap-3
                    text-gray-700
                    dark:text-gray-300
                  ">

                    <FaBriefcase className="text-green-500" />

                    <span>
                      {member.role}
                    </span>

                  </div>

                  <div className="
                    flex
                    items-center
                    gap-3
                    text-gray-700
                    dark:text-gray-300
                  ">

                    <FaProjectDiagram className="text-purple-500" />

                    <span>
                      {member.projectName}
                    </span>

                  </div>

                </div>

                {
                  (
                    role === "ADMIN" ||
                    role ===
                    "PROJECT_MANAGER"
                  ) && (

                    <div className="
                      flex
                      gap-4
                      mt-8
                    ">

                      {/* EDIT */}
                      <button
                        onClick={() =>
                          editMember(member)
                        }
                        className="
                          flex-1
                          bg-yellow-500
                          hover:bg-yellow-600
                          hover:scale-105
                          text-white
                          py-3
                          rounded-2xl
                          font-semibold
                          flex
                          items-center
                          justify-center
                          gap-2
                          transition-all
                          duration-300
                        "
                      >

                        <FaEdit />

                        Edit

                      </button>

                      {/* DELETE */}
                      {
                        role === "ADMIN" && (

                          <button
                            onClick={() =>
                              deleteMember(
                                member.id
                              )
                            }
                            className="
                              flex-1
                              bg-red-500
                              hover:bg-red-600
                              hover:scale-105
                              text-white
                              py-3
                              rounded-2xl
                              font-semibold
                              flex
                              items-center
                              justify-center
                              gap-2
                              transition-all
                              duration-300
                            "
                          >

                            <FaTrash />

                            Delete

                          </button>

                        )
                      }

                    </div>

                  )
                }

              </motion.div>

            ))}

          </div>

        )
      }

      {/* EMPTY */}
      {
        !loading &&
        members.length === 0 && (

          <div className="enterprise-card p-16 text-center mt-10">

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

              <FaUsers className="
                text-6xl
                text-gray-300
              " />

            </div>

            <h2 className="
              text-4xl
              font-bold
              text-slate-800
              dark:text-white
              mb-4
            ">

              No Team Members Found

            </h2>

            <p className="
              text-gray-500
              dark:text-gray-400
              text-xl
            ">

              Add your first team member to get started.

            </p>

          </div>

        )
      }

    </MainLayout>

  );
}

export default Team;
