import React from "react";
import { BotIcon } from "lucide-react";

export const CardItems = () => {
  return (
    <div className="flex flex-col items-center  bg-gray-50">
      {/* Card Container */}
      <div
        className="p-14 bg-gradient-to-b from-pink-100 via-purple-200 to-blue-200 
                   flex items-center justify-center h-[280px] w-[190px] border-2 
                   border-orange-500 rounded-lg hover:scale-105 transition-all 
                   hover:shadow-lg shadow-orange-300 cursor-pointer"
      >
        <BotIcon size={48} className="text-gray-700" />
      </div>

      {/* Card Title */}
      <h2 className="text-center font-semibold text-lg mt-6 text-gray-800">My Bot</h2>
    </div>
  );
};
