import React, { useState } from "react";
import login from "../assets/logoLogin.png";
import axios from "axios";
import { backend_url } from "../App";
import { toast } from "react-toastify";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backend_url}/api/user/admin`, {
        email,
        password,
      });
      if (response.data.success) {
        setToken(response.data.token);
        toast.success("Login successful!");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-white to-slate-100 flex items-center justify-center p-4">
      <div className="flex flex-col-reverse md:flex-row bg-white shadow-2xl rounded-2xl overflow-hidden max-w-4xl w-full">
        {/* Form */}
        <div className="w-full md:w-1/2 p-8 sm:p-10">
          <h2 className="text-3xl font-bold text-slate-800 mb-6 text-center">
            Admin Login
          </h2>
          <form onSubmit={onSubmitHandler} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-600">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-slate-500 focus:outline-none"
                placeholder="you@example.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-slate-500 focus:outline-none"
                placeholder="••••••••"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-slate-800 text-white py-2 rounded-md hover:bg-slate-700 transition-all duration-200"
            >
              Login
            </button>
          </form>
        </div>

        {/* Image */}
        <div className="hidden md:block w-full md:w-1/2">
          <img
            src={login}
            alt="Login Visual"
            className="object-cover h-full w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
