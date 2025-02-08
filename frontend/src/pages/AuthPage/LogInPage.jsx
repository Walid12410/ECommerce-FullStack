import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const LogInPage = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  
  const validateForm = () => {
    if (!password.trim()) return toast.error("Full name is required");
    if (!email.trim()) return toast.error("Email is required");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return toast.error("Please enter a valid email address");
    }
    if (!password) return toast.error("Password is required");
    if (password.length < 6) return toast.error("Password must be at least 6 characters");

    return true;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    validateForm();

    // login
  }


  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6">Log In</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="form-control">
            <label className="label font-medium">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-full"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-control">
            <label className="label font-medium">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="input input-bordered w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn w-full">Sign In</button>
        </form>

        <p className="mt-4 text-center ">
          Don't have an account?
          <Link
            to={"/register"}
            className="text-primary ml-1 font-medium">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default LogInPage;
