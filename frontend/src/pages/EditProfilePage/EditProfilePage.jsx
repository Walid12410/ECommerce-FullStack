import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const ProfileUpdatePage = () => {


    const {authUser} = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    fullName: authUser.UserName ?? "Unknown",
    phoneNumber: authUser.PhoneNumber ?? "Unknown",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the updated profile data to your API
    console.log('Profile data submitted:', formData);
    // Show success toast
  };

  const handleChangePassword = () => {
    // Open the change password modal
    document.getElementById('change-password-modal').checked = true;
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold text-center mb-6">Update Profile</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="form-control w-full mb-4">
              <label className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="input input-bordered w-full"
                required
              />
            </div>
            
            <div className="form-control w-full mb-6">
              <label className="label">
                <span className="label-text font-medium">Phone Number</span>
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="input input-bordered w-full"
                required
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <button 
                type="button" 
                className="btn btn-outline"
                onClick={handleChangePassword}
              >
                Change Password
              </button>
              <button type="submit" className="btn btn-primary">Save Changes</button>
            </div>
          </form>
        </div>
      </div>
      
      {/* Change Password Modal */}
      <input type="checkbox" id="change-password-modal" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Change Password</h3>
          <form>
            <div className="form-control w-full mb-4">
              <label className="label">
                <span className="label-text">Current Password</span>
              </label>
              <input type="password" className="input input-bordered w-full" required />
            </div>
            <div className="form-control w-full mb-4">
              <label className="label">
                <span className="label-text">New Password</span>
              </label>
              <input type="password" className="input input-bordered w-full" required />
            </div>
            <div className="form-control w-full mb-6">
              <label className="label">
                <span className="label-text">Confirm New Password</span>
              </label>
              <input type="password" className="input input-bordered w-full" required />
            </div>
          </form>
          <div className="modal-action">
            <label htmlFor="change-password-modal" className="btn btn-outline">Cancel</label>
            <button className="btn btn-primary">Update Password</button>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default ProfileUpdatePage;