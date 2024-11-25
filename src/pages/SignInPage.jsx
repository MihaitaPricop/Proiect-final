import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../utils/api"; // Import the axios instance
import Navbar from "../components/Navbar";
import InputField from "../components/InputField";
import useForm from "../hooks/useForm"; // Import the useForm hook

const SignInPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const { values, handleChange, resetForm } = useForm({
    username: "",
    password: "",
  });

  const [error, setError] = useState(null);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError(null);

    const { username, password } = values;

    try {
      const response = await api.get("/users", {
        params: { username, password },
      });
      const users = response.data;

      if (users.length > 0) {
        const userObject = users[0];
        login(userObject);
        resetForm();
        navigate("/user");
        toast.success("Sign in successful!");
      } else {
        setError("Invalid username or password");
        toast.error("Invalid credentials");
      }
    } catch (error) {
      console.error("Error signing in:", error);
      setError("Failed to sign in. Please try again.");
      toast.error("Sign in failed");
    }
  };

  return (
    <>
      <Navbar />
      <div
        className="flex items-center justify-center min-h-screen"
        style={{
          backgroundImage: "url('/images/sign-in-bgimg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="relative w-full max-w-md bg-white bg-opacity-90 rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center text-[#05A8AA] mb-6">
            Sign In
          </h2>

          <form className="space-y-6" onSubmit={handleSignIn}>
            <InputField
              label="Username"
              type="text"
              name="username"
              value={values.username}
              onChange={handleChange}
              placeholder="Enter your username"
            />

            <InputField
              label="Password"
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />

            <button
              type="submit"
              className="w-full py-3 bg-[#05A8AA] text-white font-semibold rounded-lg hover:bg-[#028c8e] transition duration-300"
            >
              Sign In
            </button>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </form>

          <p className="mt-6 text-center text-gray-600">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="text-[#05A8AA] font-semibold hover:underline"
            >
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignInPage;
