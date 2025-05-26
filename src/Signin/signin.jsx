import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { useState } from "react";

const Signin = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:8000/user/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include", 
                body: JSON.stringify(formData)
            });

            const data = await res.json();
            if (res.ok) {
                navigate("/create");
            } else {
                setError(data.error || "Login failed.");
            }
        } catch (err) {
            setError("An unexpected error occurred.");
        }
    };

    return (
        <div className="h-screen flex flex-col bg-gray-100">
            {/* Navbar */}
            <Navbar />
            <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-800 px-4">
                <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
                    <h2 className="text-2xl font-bold mb-6 text-center">Login to your Account</h2>
                    {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <input
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                        <input
                            name="password"
                            type="password"
                            value={formData.password}
                           onChange={handleChange}
                            placeholder="Password"
                            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                        <button
                            type="submit"
                            className="w-full py-2 bg-gradient-to-r from-orange-400 to-purple-600 text-white rounded-xl font-semibold hover:opacity-90"
                        >
                            Sign In
                        </button>
                    </form>
                    <p className="text-center text-sm mt-4">
                        Don’t have an account?{" "}
                        <Link to="/signup" className="text-indigo-600 font-medium hover:underline">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signin;
