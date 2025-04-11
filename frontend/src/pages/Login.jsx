import React, { useContext, useEffect, useState } from "react";
import login from "../assets/logoLogin.png";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [currState, setCurrState] = useState("Login");
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (currState === "Sign Up") {
        // SIGN UP API
        const response = await axios.post(backendUrl + "/api/user/register", {
          name,
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
        } else {
          toast.error(response.data.message);
        }
      } else {
        // LOGIN API
        const response = await axios.post(backendUrl + "/api/user/login", {
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-white to-slate-100 flex items-center justify-center p-4">
      <div className="flex flex-col-reverse md:flex-row bg-white shadow-2xl rounded-2xl overflow-hidden max-w-4xl w-full">
        {/* Form Side */}
        <div className="w-full md:w-1/2 p-8 sm:p-10">
          <h2 className="text-3xl font-bold text-slate-800 mb-6 text-center">
            {currState === "Sign Up" ? "Create Account" : "User Login"}
          </h2>
          <form onSubmit={onSubmitHandler} className="space-y-5">
            {currState === "Sign Up" && (
              <div>
                <label className="block text-sm font-medium text-slate-600">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-slate-500 focus:outline-none"
                  placeholder="Your name"
                  required
                />
              </div>
            )}
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
              {currState === "Sign Up" ? "Sign Up" : "Login"}
            </button>
            <div className="text-sm text-center text-slate-600 pt-2">
              {currState === "Login" ? (
                <>
                  Don't have an account?
                  <span
                    className="text-blue-600 cursor-pointer pl-1 hover:underline"
                    onClick={() => setCurrState("Sign Up")}
                  >
                    Sign Up
                  </span>
                </>
              ) : (
                <>
                  Already have an account?
                  <span
                    className="text-blue-600 cursor-pointer pl-1 hover:underline"
                    onClick={() => setCurrState("Login")}
                  >
                    Login
                  </span>
                </>
              )}
            </div>
          </form>
        </div>

        {/* Image Side */}
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
