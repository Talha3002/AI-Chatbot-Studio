import React from "react";

export const Navbar = () => {
  return (
    <nav className="w-full max-w-6xl flex justify-between items-center py-4 px-6">
      {/* Logo Section */}
      <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
        <span className="bg-black text-white px-3 py-1 rounded-md">AI</span>
        Chatbot Studio
      </h1>

      {/* Navigation Links */}
      <div className="flex gap-12 text-gray-700 font-medium">
        <a href="#" className="hover:text-gray-900">Home</a>
        <a href="#" className="hover:text-gray-900">Sign In</a>
        <a href="#" className="hover:text-gray-900">Sign Up</a>
      </div>
    </nav>
  );
};
