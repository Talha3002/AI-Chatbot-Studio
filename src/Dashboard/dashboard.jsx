import React from "react";
import { Navbar } from "../components/Navbar";
import { CardItems } from "./dashboard_components/CardItems";

export const Dashboard = () => {
  return (
    <div className=" bg-gray-50">
      <Navbar />
      <div className="p-10 md:px-20 lg:px-32 mt-20">
        <h2 className="font-bold text-3xl">My Resume</h2>
        <p>Start Creating AI resume to your next job role</p>

        {/* Increased gap between cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 mt-10">
          <CardItems />
          <CardItems />
          <CardItems />
          <CardItems />
          <CardItems />
        </div>
      </div>
    </div>
  );
};
