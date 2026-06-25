import { useState } from "react";
import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

const UploadProject = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    technologies: "",
    githubLink: "",
    liveDemoLink: "",
    imageUrl: "",
    category: "",
    featured: false,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setMessage("");

      const payload = {
        ...formData,
        technologies: formData.technologies
          .split(",")
          .map((tech) => tech.trim())
          .filter(Boolean),
      };

      const response = await axios.post(
        `${API_URL}/api/projects`,
        payload
      );

      console.log(response.data);

      setMessage("Project added successfully!");

      setFormData({
        title: "",
        description: "",
        technologies: "",
        githubLink: "",
        liveDemoLink: "",
        imageUrl: "",
        category: "",
        featured: false,
      });
    } catch (error) {
      console.error(error);
      setMessage("Failed to add project.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-3xl p-8">
        <h1 className="text-3xl font-bold mb-8">
          Add New Project
        </h1>

        {message && (
          <div className="mb-6 p-4 rounded-xl bg-slate-100">
            {message}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* Project Name */}
          <div>
            <label className="block mb-2 font-medium">
              Project Name
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full border rounded-xl px-4 py-3"
              placeholder="Code Nova"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-2 font-medium">
              Description
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="5"
              className="w-full border rounded-xl px-4 py-3"
              placeholder="Describe your project..."
            />
          </div>

          {/* Technologies */}
          <div>
            <label className="block mb-2 font-medium">
              Technologies Used
            </label>

            <input
              type="text"
              name="technologies"
              value={formData.technologies}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3"
              placeholder="React, Node.js, MongoDB"
            />
          </div>

          {/* GitHub */}
          <div>
            <label className="block mb-2 font-medium">
              GitHub Link
            </label>

            <input
              type="url"
              name="githubLink"
              value={formData.githubLink}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3"
              placeholder="https://github.com/..."
            />
          </div>

          {/* Live Demo */}
          <div>
            <label className="block mb-2 font-medium">
              Live Demo Link
            </label>

            <input
              type="url"
              name="liveDemoLink"
              value={formData.liveDemoLink}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3"
              placeholder="https://yourproject.com"
            />
          </div>

          {/* Image */}
          <div>
            <label className="block mb-2 font-medium">
              Project Image URL
            </label>

            <input
              type="url"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3"
              placeholder="https://..."
            />
          </div>

          {/* Category */}
          <div>
            <label className="block mb-2 font-medium">
              Category
            </label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3"
            >
              <option value="">
                Select Category
              </option>
              <option value="Full Stack">
                Full Stack
              </option>
              <option value="Frontend">
                Frontend
              </option>
              <option value="Backend">
                Backend
              </option>
              <option value="AI/ML">
                AI/ML
              </option>
            </select>
          </div>

          {/* Featured */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
            />

            <label>Featured Project</label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              py-4
              rounded-xl
              bg-blue-600
              text-white
              font-semibold
              hover:bg-blue-700
              transition
            "
          >
            {loading
              ? "Adding Project..."
              : "Add Project"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadProject;