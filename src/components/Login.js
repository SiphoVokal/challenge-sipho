import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    window.location.href = "http://localhost:8080/auth/google/login";
  };

  const handleEmailLogin = async () => {
    const response = await fetch("http://localhost:8080/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (response.ok) {
      alert("Login successful!");
      console.log("Token:", data.token);
    } else {
      alert("Login failed: " + data.error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 text-gray-800 font-sans">
      <div className="max-w-md w-full">
        <h1 className="text-3xl font-semibold mb-8">Log into Forms</h1>

        <div className="mb-6">
          <label className="text-xs tracking-widest text-gray-600">EMAIL</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border-b border-gray-400 py-2 focus:outline-none focus:border-black transition"
          />
        </div>

        <div className="mb-6">
          <label className="text-xs tracking-widest text-gray-600">PASSWORD</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border-b border-gray-400 py-2 focus:outline-none focus:border-black transition"
          />
        </div>

        <button
          onClick={handleEmailLogin}
          className="flex items-center gap-2 border-b border-black mb-6 text-gray-700 hover:text-black transition"
        >
          Login with Email <ArrowRight size={18} />
        </button>

        <p className="text-center text-sm mb-6 text-gray-500">OR</p>

        <button
          onClick={handleLogin}
          className="flex items-center gap-2 border-b border-black mb-6 text-gray-700 hover:text-black transition"
        >
          Sign In with Google <ArrowRight size={18} />
        </button>

        <p className="text-sm text-gray-600">
          Don’t have an account?{" "}
          <span
            className="text-black underline cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Create one
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
