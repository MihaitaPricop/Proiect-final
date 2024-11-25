import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../utils/api";
import Navbar from "../components/Navbar";
import useForm from "../hooks/useForm";
import InputField from "../components/InputField";

const SignUpPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const { values, handleChange, resetForm } = useForm({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState(null);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(null);

    const { username, email, password, confirmPassword } = values;

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      toast.error("Passwords do not match");
      return;
    }

    try {
      const { data: users } = await api.get("/users");
      const isUsernameTaken = users.some((user) => user.username === username);
      const isEmailTaken = users.some((user) => user.email === email);

      if (isUsernameTaken) {
        setError("Username already taken");
        toast.error("Username already exists");
        return;
      }

      if (isEmailTaken) {
        setError("Email already in use");
        toast.error("Email already exists");
        return;
      }

      const newUser = {
        id: `user-${Date.now()}`,
        username,
        email,
        password,
        profilePicture: "default-profile.jpg",
        groupsOwned: [],
        groupsMemberOf: [],
      };

      // salveaza user nou pe JSON server
      const { data: createdUser } = await api.post("/users", newUser);

      // Log in userul nou
      login(createdUser); // Update context cu userul nou
      localStorage.setItem("user", JSON.stringify(createdUser)); // pastram userul in local storage

      resetForm();
      navigate("/user");
      toast.success("Sign up successful!");
    } catch (error) {
      console.error("Error signing up:", error);
      setError("Failed to sign up. Please try again.");
      toast.error("Sign up failed");
    }
  };

  return (
    <>
      <Navbar />
      <div
        className="flex items-center justify-center min-h-screen overflow-hidden"
        style={{
          backgroundImage: "url('/images/sign-in-bgimg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="relative w-full max-w-md bg-white bg-opacity-90 rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center text-[#05A8AA] mb-6">
            Sign Up
          </h2>

          <form className="space-y-6" onSubmit={handleSignUp}>
            <InputField
              label="Username"
              type="text"
              name="username"
              value={values.username}
              onChange={handleChange}
              placeholder="Enter your username"
            />
            <InputField
              label="Email"
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
            <InputField
              label="Password"
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
            <InputField
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={values.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
            />

            <button
              type="submit"
              className="w-full py-3 bg-[#05A8AA] text-white font-semibold rounded-lg hover:bg-[#028c8e] transition duration-300"
            >
              Sign Up
            </button>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </form>

          <p className="mt-6 text-center text-gray-600">
            Already have an account?{" "}
            <a
              href="/signin"
              className="text-[#05A8AA] font-semibold hover:underline"
            >
              Sign In
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
