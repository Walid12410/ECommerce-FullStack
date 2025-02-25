import { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { checkAdminLogin } from "../../../redux/slices/authSlice";

const AdminLoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    const { isAdminLoggingIn, authUser } = useSelector((state) => state.auth);
  
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
  
      if(isAdminLoggingIn) return;
  
      validateForm();
  
      const data = {
        Email: email,
        Password: password
      }
  
      dispatch(checkAdminLogin({ userData: data }));
    }
  
    useEffect(()=>{
      if(authUser && authUser.IsAdmin === true){
        navigate("/admin/dashboard");
      }
    },[authUser]);
  
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-full max-w-md p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center mb-6">Direct Admin</h2>
  
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
  
            <button type="submit" className="btn w-full">{ isAdminLoggingIn? "Checking..." :"Sign In" }</button>
          </form>
        </div>
      </div>
    );
}
 
export default AdminLoginPage;