import { useState } from "react";
import { Navbar } from "../components/Navbar";


export const Home = () => {

    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-50 px-6">
           
           <Navbar />

            {/* Hero Section */}
            <div className="flex flex-col md:flex-row items-center w-full max-w-6xl mt-10">
                {/* Left Content */}
                <div className="flex-1 text-left">
                    <h2 className="text-5xl font-extrabold text-gray-900 leading-tight">
                    Build Custom AI Chatbots for <br />
                    Seamless Conversations
                    </h2>
                    <p className="text-gray-600 mt-4 text-lg">
                        AI Chatbot Studio is the complete platform for building & deploying AI agents to
                        enhance customer support & drive more revenue.
                    </p>
                    <button className="mt-6 bg-gradient-to-r from-orange-500 to-purple-600 text-white px-6 py-3 rounded-lg shadow-md text-lg font-semibold hover:scale-105 transition-all">
                        Get Started
                    </button>
                   
                </div>

                {/* Right Content - Video UI */}
                <div className="flex-1 flex justify-center items-center mt-10 md:mt-0">
                    <div className="w-full max-w-md bg-gray-100 p-6 rounded-xl shadow-md relative">
                        {/* Video Placeholder */}
                        <div className="relative w-full h-50 bg-gray-200 rounded-xl flex items-center justify-center">
                            <video
                                className="w-full h-full object-cover rounded-xl"
                                autoPlay
                                loop
                                muted
                                playsInline
                            >
                                <source src="/build-and-deploy.webm" type="video/webm" />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
