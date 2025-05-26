import { useState } from "react";
import { Upload, Image, MessageCircle, Palette, Settings, Send } from "lucide-react";
import { Navbar } from "../components/Navbar";

export const ChatbotCustomizer = () => {
  const [theme, setTheme] = useState("dark");
  const [userMessageColor, setUserMessageColor] = useState("#FFD700");
  const [chatIcon, setChatIcon] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! What can I help you with?" },
  ]);

  const handleImageUpload = (event, setImage) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSendPrompt = async () => {
    if (prompt.trim() === "") return;

    const newMessages = [...messages, { sender: "user", text: prompt }];
    setMessages(newMessages);
    setPrompt("");

    try {
      const response = await fetch("https://4158-34-125-255-247.ngrok-free.appp/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: prompt }),
      });

      const raw = await response.text();
      console.log("Server raw response:", raw);

      const data = JSON.parse(raw);

      if (data && data.answer) {
        setMessages([...newMessages, { sender: "bot", text: data.answer }]);
      } else {
        setMessages([...newMessages, { sender: "bot", text: "No response from bot." }]);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessages([...newMessages, { sender: "bot", text: "Error getting response from server." }]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSendPrompt();
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <Navbar />

      <div className="flex flex-1 p-10">
        {/* Left Panel */}
        <div className="w-1/2 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Customize Chatbot</h2>

          {/* Theme Selection */}
          <div className="mb-4">
            <label className="block font-medium">Theme</label>
            <select
              className="border p-2 rounded w-full mt-2"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
            >
              <option value="dark">Dark</option>
              <option value="light">Light</option>
            </select>
          </div>

          {/* Upload Profile Picture */}
          <div className="mb-4">
            <label className="block font-medium">Profile Picture</label>
            <input
              type="file"
              className="hidden"
              id="profile-upload"
              onChange={(e) => handleImageUpload(e, setChatIcon)}
            />
            <label htmlFor="profile-upload" className="flex items-center gap-2 cursor-pointer text-blue-500">
              <Upload className="w-5 h-5" /> Upload Image
            </label>
          </div>

          {/* User Message Color */}
          <div className="mb-4">
            <label className="block font-medium">User Message Color</label>
            <input
              type="color"
              className="w-12 h-8 cursor-pointer border rounded"
              value={userMessageColor}
              onChange={(e) => setUserMessageColor(e.target.value)}
            />
          </div>
        </div>

        {/* Chatbot Preview */}
        <div className="w-1/2 flex justify-center items-center">
          <div className={`w-[350px] h-[500px] rounded-xl shadow-md flex flex-col ${theme === "dark" ? "bg-black text-white" : "bg-white text-black"}`}>
            {/* Header */}
            <div className="flex items-center justify-between p-3 rounded-t-lg" style={{ background: userMessageColor }}>
              <div className="flex items-center gap-2">
                {chatIcon ? <img src={chatIcon} alt="Chat Icon" className="w-8 h-8 rounded-full" /> : <Image className="w-8 h-8" />}
                <span className="font-bold">Chatbot</span>
              </div>
              <Settings className="w-5 h-5 cursor-pointer" />
            </div>

            {/* Chat Messages */}
            <div className="flex-1 flex flex-col gap-2 p-3 overflow-y-auto">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`p-2 rounded-lg w-max max-w-[75%] ${msg.sender === "user" ? "self-end" : "self-start"}`}
                  style={{
                    background: msg.sender === "user" ? userMessageColor : theme === "dark" ? "#444" : "#eee",
                    color: msg.sender === "user" ? "#000" : theme === "dark" ? "#fff" : "#000",
                  }}
                >
                  {msg.text}
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-3 border-t border-gray-300 flex items-center gap-2">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Type your prompt..."
                className={`flex-1 p-2 rounded border focus:outline-none focus:ring ${theme === "dark" ? "text-white bg-black" : "text-black bg-white"}`}
              />
              <button
                onClick={handleSendPrompt}
                className="bg-purple-600 p-2 rounded hover:bg-purple-700"
              >
                <Send className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
