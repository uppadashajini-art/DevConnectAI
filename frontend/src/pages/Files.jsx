import { useEffect, useState } from "react";

import axios from "../utils/axiosConfig";

import {
  FaFileUpload,
  FaFileAlt,
  FaTrash,
  FaDownload,
  FaLock,
} from "react-icons/fa";

import MainLayout from "../layouts/MainLayout";

function Files() {

  // GET ROLE
  const role =
    localStorage.getItem("role");

  const [file, setFile] =
    useState(null);

  const [files, setFiles] =
    useState([]);

  const [uploading, setUploading] =
    useState(false);

  // FETCH FILES
  useEffect(() => {

    fetchFiles();

  }, []);

  const fetchFiles = async () => {

    try {

      const response =
        await axios.get("/api/files");

      setFiles(response.data);

    } catch (error) {

      console.log(error);

    }
  };

  // UPLOAD FILE
  const handleUpload = async () => {

    if (!file) {

      alert("Select a file");

      return;
    }

    const formData = new FormData();

    formData.append("file", file);

    try {

      setUploading(true);

      await axios.post(
        "/api/files/upload",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      alert(
        "File Uploaded Successfully"
      );

      fetchFiles();

      setFile(null);

      // CLEAR INPUT
      document.getElementById(
        "fileInput"
      ).value = "";

    } catch (error) {

      console.log(error);

      alert("Upload Failed");

    } finally {

      setUploading(false);
    }
  };

  // DELETE FILE
  const deleteFile = async (id) => {

    const confirmDelete =
      window.confirm(
        "Delete this file?"
      );

    if (!confirmDelete) return;

    try {

      await axios.delete(
        `/api/files/${id}`
      );

      fetchFiles();

    } catch (error) {

      console.log(error);

      alert("Delete Failed");
    }
  };

  return (

    <MainLayout>

      <div className="bg-white rounded-3xl shadow-xl p-10">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-10">

          <div className="flex items-center gap-5">

            <div className="bg-blue-100 p-5 rounded-3xl shadow">

              <FaFileUpload className="text-blue-600 text-4xl" />

            </div>

            <div>

              <h1 className="text-5xl font-bold text-slate-800">
                File Uploads
              </h1>

              <p className="text-gray-500 mt-2 text-lg">
                Upload and manage project resources
              </p>

            </div>

          </div>

        </div>

        {/* TEAM MEMBER NOTICE */}
        {
          role === "TEAM_MEMBER" && (

            <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 p-5 rounded-2xl mb-8 flex items-center gap-3">

              <FaLock />

              Team Members can only view/download files.

            </div>

          )
        }

        {/* FILE INPUT */}
        {
          (
            role === "ADMIN" ||
            role === "PROJECT_MANAGER"
          ) && (

            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 flex flex-col lg:flex-row gap-5 items-start lg:items-center">

              <input
                id="fileInput"
                type="file"
                onChange={(e) =>
                  setFile(
                    e.target.files[0]
                  )
                }
                className="border border-gray-300 p-4 rounded-2xl w-full lg:w-auto bg-white"
              />

              <button
                onClick={handleUpload}
                disabled={uploading}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white px-8 py-4 rounded-2xl shadow-lg transition font-semibold"
              >

                {
                  uploading
                    ? "Uploading..."
                    : "Upload File"
                }

              </button>

            </div>

          )
        }

        {/* FILE LIST */}
        <div className="mt-14">

          <div className="flex items-center justify-between mb-8">

            <h2 className="text-3xl font-bold text-slate-800">
              Uploaded Files
            </h2>

            <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-xl font-semibold">
              {files.length} Files
            </div>

          </div>

          {files.length === 0 ? (

            <div className="bg-slate-100 rounded-3xl p-14 text-center">

              <FaFileAlt className="text-7xl text-gray-300 mx-auto mb-6" />

              <h2 className="text-3xl font-bold text-slate-700">
                No Files Uploaded
              </h2>

              <p className="text-gray-500 mt-3 text-lg">
                Upload project documents,
                PDFs, images, and resources.
              </p>

            </div>

          ) : (

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">

              {files.map((uploadedFile) => (

                <div
                  key={uploadedFile.id}
                  className="bg-slate-50 border border-slate-200 rounded-3xl p-6 hover:shadow-2xl transition duration-300"
                >

                  {/* TOP */}
                  <div className="flex gap-4">

                    <div className="bg-blue-100 p-4 rounded-2xl h-fit">

                      <FaFileAlt className="text-blue-600 text-3xl" />

                    </div>

                    <div className="flex-1 min-w-0">

                      <h3
                        className="font-bold text-slate-800 text-lg truncate"
                        title={uploadedFile.fileName}
                      >
                        {uploadedFile.fileName}
                      </h3>

                      <p className="text-gray-500 text-sm mt-2">
                        {uploadedFile.fileType}
                      </p>

                    </div>

                  </div>

                  {/* ACTIONS */}
                  <div className="flex gap-3 mt-6">

                    {/* VIEW */}
                    <a
                      href={`http://localhost:8080/api/files/view/${uploadedFile.id}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-2xl flex items-center justify-center gap-2 transition font-semibold"
                    >

                      <FaDownload />

                      View

                    </a>

                    {/* DELETE */}
                    {
                      (
                        role === "ADMIN" ||
                        role === "PROJECT_MANAGER"
                      ) && (

                        <button
                          onClick={() =>
                            deleteFile(
                              uploadedFile.id
                            )
                          }
                          className="bg-red-500 hover:bg-red-600 text-white px-5 rounded-2xl transition"
                        >

                          <FaTrash />

                        </button>

                      )
                    }

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>

    </MainLayout>
  );
}

export default Files;