import { useState } from "react";

const SignUpPage = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [fullName, setFullName] = useState("");

    const handleSubmit = (e) => {

    }

    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-full max-w-md p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center mb-6">Sign Up</h2>
          
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
              <label className="label font-medium">Phone Number</label>
              <input 
                type="text" 
                placeholder="Enter your phone number" 
                className="input input-bordered w-full"
                required
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>

            <div className="form-control">
              <label className="label font-medium">Full Name</label>
              <input 
                type="text" 
                placeholder="Enter your full name" 
                className="input input-bordered w-full"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
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
  
            <button type="submit" className="btn w-full">Sign Up</button>
          </form>
  
          <p className="mt-4 text-center ">
            Already have account? 
            <a href="/login" className="text-primary ml-1 font-medium">Log In</a>
          </p>
        </div>
      </div>
    );
  }
  
  export default SignUpPage;
  