import { useState } from "react";
// You can get these icons from the lucide-react library
// npm install lucide-react
import { motion } from "framer-motion";
import { ArrowRight, Eye, EyeOff, Loader, Lock, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "../store/useUserStore";

// Main App Component
export default function LoginPage() {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const { login, loading } = useUserStore();


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
    login(email, password);
  };

  // Toggle function for password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    // Main container with a light gray background, covering the full screen
    <div className="flex items-center justify-center min-h-screen bg-gray-500 font-sans">
      {/* Login card container */}
      <motion.div
        className="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-xl m-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Header Section */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl">
            Welcome Back!
          </h1>
          <p className="mt-2 text-gray-500">
            Please enter your details to log in.
          </p>
        </div>

        {/* Form Section */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="relative">
            <div className="absolute top-1/2 left-3 -translate-y-1/2">
              <User className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-12 pr-4 py-3 text-gray-700 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
              required
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <div className="absolute top-1/2 left-3 -translate-y-1/2">
              <Lock className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Password"
              vlaue={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-12 pr-12 py-3 text-gray-700 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              {passwordVisible ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Forgot Password Link */}
          <div className="text-right">
            <a
              href="#"
              className="text-sm font-medium text-blue-600 hover:underline"
            >
              Forgot Password?
            </a>
          </div>

          {/* Login Button */}
          <div>
            <button
              type="submit"
              className="group relative flex justify-center w-full py-3 px-4 border border-transparent text-lg font-semibold rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 ease-in-out"
            >
              <span className="absolute right-0 inset-y-0 flex items-center pr-3">
                <ArrowRight className="h-5 w-5 text-blue-400 group-hover:text-blue-300 group-hover:translate-x-1 transition-transform" />
              </span>
              {loading ? (
                <>
                  <Loader
                    className="mr-2 h-5 w-5 animate-spin mt-1"
                    aria-hidden="true"
                  />
                  Loading...
                </>
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>

        {/* Sign Up Link */}
        <p className="text-center text-gray-500">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-semibold text-blue-600 hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
