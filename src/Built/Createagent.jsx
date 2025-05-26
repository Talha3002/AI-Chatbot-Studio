import { useState } from "react";
import { Navbar } from "../components/Navbar";
import { Upload, File, Text, Globe } from "lucide-react";

export const CreateAgent = () => {
  const [selectedOption, setSelectedOption] = useState("Pdf");
  const [websiteURL, setWebsiteURL] = useState("");
  const [loading, setLoading] = useState(false); // Added loading state

  const menuItems = [
    { name: "Pdf", icon: <File className="w-5 h-5" /> },
    { name: "Text", icon: <Text className="w-5 h-5" /> },
    { name: "Website", icon: <Globe className="w-5 h-5" /> },
  ];

  const handleURLChange = (e) => {
    setWebsiteURL(e.target.value);
  };

  const handleURLSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loading message or spinner

    try {
      const response = await fetch("https://4158-34-125-255-247.ngrok-free.app/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: websiteURL }),
      });

      if (response.ok) {
        window.location.href = "/chatbot";
      } else {
        alert("Failed to generate bot. Please check the URL or try again.");
      }
    } catch (error) {
      console.error("Error submitting URL:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false); // Hide loading after completion
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <Navbar />

      <div className="flex flex-1 p-10 gap-6 mt-20">
        {/* Sidebar */}
        <div className="w-1/5 bg-white p-5 rounded-xl shadow-md h-fit">
          <h1 className="text-2xl font-bold mb-6">Create new agent</h1>
          <ul className="space-y-4">
            {menuItems.map((item) => (
              <li
                key={item.name}
                onClick={() => setSelectedOption(item.name)}
                className={`flex items-center gap-3 p-3 cursor-pointer rounded-lg text-gray-700 
                  ${selectedOption === item.name ? "bg-purple-100 text-purple-600 font-semibold" : "hover:bg-gray-100"}
                `}
              >
                {item.icon}
                {item.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Main Content */}
        <div className="w-4/5">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">{selectedOption}</h2>

            {/* File Upload Section */}
            {selectedOption === "Pdf" && (
              <div className="border-2 border-dashed border-gray-300 p-10 flex flex-col items-center justify-center rounded-lg">
                <Upload className="w-10 h-10 text-gray-400 mb-3" />
                <p className="text-gray-500">Drag & drop files here, or click to select files</p>
                <p className="text-sm text-gray-400">Supported File Types: .pdf</p>
              </div>
            )}

            {/* Website URL Input Section */}
            {selectedOption === "Website" && (
              <form onSubmit={handleURLSubmit}>
                <label className="block text-gray-700 mb-2">Enter Website URL:</label>
                <input
                  type="url"
                  placeholder="https://example.com"
                  value={websiteURL}
                  onChange={handleURLChange}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-300"
                  required
                />
                <button
                  type="submit"
                  className="mt-4 px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                      </svg>
                      Finetuning...
                    </div>
                  ) : (
                    "Submit"
                  )}
                </button>
              </form>
            )}

            <p className="text-gray-400 text-sm mt-4">
              {selectedOption === "Pdf" &&
                "If you are uploading a PDF, make sure you can select/highlight the text."}
              {selectedOption === "Website" &&
                "Please ensure the URL is reachable and contains readable content."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
