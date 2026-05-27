import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

function LoginPage() {

  const navigate = useNavigate();

  // SHOW ADMIN FIRST
  const [showGuardLogin, setShowGuardLogin] =
    useState(false);

  // ADMIN PASSWORD
  const [adminPassword, setAdminPassword] =
    useState("");

  // GUARD DATA
  const [guardData, setGuardData] = useState({
    username: "",
    password: "",
  });

  // ADMIN LOGIN
  const handleAdminLogin = async (e) => {

    e.preventDefault();

    if (!adminPassword) {

      alert("Please enter password");

      return;
    }

    try {

      const response = await api.post(
        "/auth/admin-login",
        {
          name: "admin",
          password: adminPassword,
        }
      );

      localStorage.setItem(
        "token",
        response.data.jwtToken
      );

      localStorage.setItem(
        "role",
        "admin"
      );

      localStorage.setItem("name", "admin");

      alert(response.data.message);

      navigate("/admin-dashboard");

    } catch (err) {

      alert(
        err.response?.data?.message ||
        "Login failed"
      );
    }
  };

  // GUARD LOGIN
  const handleGuardLogin = async (e) => {

    e.preventDefault();

    const username = guardData.username.trim();
    const password = guardData.password;

    if (
      !username ||
      !password
    ) {

      alert("Please fill all fields");

      return;
    }

    try {

      const response = await api.post(
        "/auth/login",
        {
          username,
          password,
        }
      );

      localStorage.setItem(
        "token",
        response.data.jwtToken
      );

      localStorage.setItem(
        "role",
        "guard"
      );

      localStorage.setItem(
        "contact",
        response.data?.user?.contact || ""
      );

      localStorage.setItem(
        "username",
        response.data?.user?.username || guardData.username
      );

      // store full name for display in dashboard
      localStorage.setItem(
        "name",
        `${response.data?.user?.firstName || ""} ${response.data?.user?.lastName || ""}`.trim()
      );

      alert(response.data.message);

      navigate("/guard-dashboard");

    } catch (err) {

      alert(
        err.response?.data?.message ||
        "Login failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-slate-300 to-slate-500 p-4">

      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-8">

        {/* TITLE */}
        <div className="text-center mb-8">

          <h1 className="text-4xl font-bold text-slate-800">
            Security System
          </h1>

          <p className="text-slate-500 mt-2">
            Login to continue
          </p>

        </div>

        {/* SWITCH BUTTONS */}
        <div className="flex justify-center gap-6 mb-8">

          <button
            onClick={() =>
              setShowGuardLogin(false)
            }
            className={`font-bold text-lg ${
              !showGuardLogin
                ? "text-indigo-600 border-b-2 border-indigo-600"
                : "text-slate-500"
            }`}
          >
            Admin
          </button>

          <button
            onClick={() =>
              setShowGuardLogin(true)
            }
            className={`font-bold text-lg ${
              showGuardLogin
                ? "text-indigo-600 border-b-2 border-indigo-600"
                : "text-slate-500"
            }`}
          >
            Guard
          </button>

        </div>

        {/* ADMIN LOGIN */}
        {!showGuardLogin && (

          <form
            onSubmit={handleAdminLogin}
            className="space-y-5"
          >

            <div>

              <label className="block mb-2 font-semibold text-slate-700">
                Admin Name
              </label>

              <input
                type="text"
                value="admin"
                disabled
                className="w-full border border-slate-300 rounded-xl p-3 bg-slate-100"
              />

            </div>

            <div>

              <label className="block mb-2 font-semibold text-slate-700">
                Password
              </label>

              <input
                type="password"
                placeholder="Enter Admin Password"
                value={adminPassword}
                onChange={(e) =>
                  setAdminPassword(
                    e.target.value
                  )
                }
                className="w-full border border-slate-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-indigo-400"
              />

            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-bold"
            >
              Login as Admin
            </button>

          </form>
        )}

        {/* GUARD LOGIN */}
        {showGuardLogin && (

          <form
            onSubmit={handleGuardLogin}
            className="space-y-5"
          >

            <div>

              <label className="block mb-2 font-semibold text-slate-700">
                Username
              </label>

              <input
                type="text"
                placeholder="Enter Username"
                value={guardData.username}
                onChange={(e) =>
                  setGuardData({
                    ...guardData,
                    username:
                      e.target.value,
                  })
                }
                className="w-full border border-slate-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-indigo-400"
              />

            </div>

            <div>

              <label className="block mb-2 font-semibold text-slate-700">
                Password
              </label>

              <input
                type="password"
                placeholder="Enter Password"
                value={guardData.password}
                onChange={(e) =>
                  setGuardData({
                    ...guardData,
                    password:
                      e.target.value,
                  })
                }
                className="w-full border border-slate-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-indigo-400"
              />

            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-bold"
            >
              Login as Guard
            </button>

          </form>
        )}

      </div>
    </div>
  );
}

export default LoginPage;
