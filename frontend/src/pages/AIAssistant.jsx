import { useState } from "react";
import axios from "../utils/axiosConfig";

function AIAssistant() {
  const [description, setDescription] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const generateTasks = async () => {
    if (!description.trim()) {
      alert("Please enter a project description");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post("/api/ai/generate-tasks", {
        projectDescription: description,
      });

      console.log("RAW RESPONSE:", res.data);

      // ✅ SAFE EXTRACTION (fix for your error)
      const text =
        res.data?.candidates?.[0]?.content?.parts?.[0]?.text;

      setResponse(text || "No response from AI");

    } catch (err) {
      console.error(err);
      alert("Failed to generate tasks");
    }

    setLoading(false);
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">

      <h1 className="text-3xl font-bold mb-6">
        AI Task Generator
      </h1>

      <textarea
        rows="6"
        className="w-full border rounded-lg p-3"
        placeholder="Describe your project..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button
        onClick={generateTasks}
        className="mt-4 bg-blue-600 text-white px-6 py-2 rounded"
      >
        {loading ? "Generating..." : "Generate Tasks"}
      </button>

      {/* OUTPUT SAFE */}
      {response && (
        <div className="mt-6 bg-gray-100 p-4 rounded whitespace-pre-wrap">
          {response}
        </div>
      )}

    </div>
  );
}

export default AIAssistant;