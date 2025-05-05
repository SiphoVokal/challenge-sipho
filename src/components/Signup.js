import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    const res = await fetch("http://localhost:8080/auth/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (res.ok) {
      alert("Signup successful!");
      navigate("/login");
    } else {
      const data = await res.json();
      alert(data.error || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 font-sans text-gray-800">
      <div className="max-w-md w-full">
        <h2 className="text-3xl font-semibold mb-8">Create an account</h2>

        <div className="mb-6">
          <label className="text-xs tracking-widest text-gray-600">NAME</label>
          <input
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border-b border-gray-400 py-2 focus:outline-none focus:border-black transition"
          />
        </div>

        <div className="mb-6">
          <label className="text-xs tracking-widest text-gray-600">EMAIL</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border-b border-gray-400 py-2 focus:outline-none focus:border-black transition"
          />
        </div>

        <div className="mb-6">
          <label className="text-xs tracking-widest text-gray-600">PASSWORD</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border-b border-gray-400 py-2 focus:outline-none focus:border-black transition"
          />
        </div>

        <button
          onClick={handleSignup}
          className="flex items-center gap-2 border-b border-black text-gray-700 hover:text-black transition"
        >
          Sign Up <ArrowRight size={18} />
        </button>

        <p className="text-sm mt-6 text-gray-600">
          Already have an account?{" "}
          <span
            className="underline cursor-pointer text-black"
            onClick={() => navigate("/login")}
          >
            Log in
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
