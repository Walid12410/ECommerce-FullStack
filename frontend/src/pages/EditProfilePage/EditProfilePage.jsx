import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from '../../components/Navbar';
import { clearUserUpdated, updateUser } from '../../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';

const ProfileUpdatePage = () => {
    const dispatch = useDispatch();
    const navigation = useNavigate();

    const { authUser,
        loadingUpdateUser,
        isUserUpdated,
        loadingChangePassword,
        isPasswordUpdated
    } = useSelector((state) => state.auth);

    // Initialize with empty values to avoid the "undefined" error
    const [formData, setFormData] = useState({
        UserName: "",
        PhoneNumber: "",
    });

    const [formDataPassword, setFormDataPassword] = useState({
        OldPassword: "",
        NewPassword: "",
    });

    // Set form data when authUser is available
    useEffect(() => {
        if (authUser) {
            setFormData({
                UserName: authUser.UserName ?? "Unknown",
                PhoneNumber: authUser.PhoneNumber ?? "Unknown",
            });
        }
    }, [authUser]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleInpuPasswordtChange = (e) => {
        const { name, value } = e.target;
        setFormDataPassword({
            ...formDataPassword,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (authUser) {
            dispatch(updateUser({ userData: formData, id: authUser.UserNo }));
        }
    };

    useEffect(() => {
        if (isUserUpdated) {
            if (authUser) {
                setFormData({
                    UserName: authUser.UserName ?? "Unknown",
                    PhoneNumber: authUser.PhoneNumber ?? "Unknown",
                });
            }
            dispatch(clearUserUpdated());
            navigation('/profile');
        }
    }, [isUserUpdated, dispatch, navigation, authUser]);

    const handleChangePassword = () => {
        // Open the change password modal
        document.getElementById('change-password-modal').checked = true;
    };

    return (
        <div className="flex flex-col min-h-screen">
            <NavBar />
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
                                    name="UserName"
                                    value={formData.UserName}
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
                                    name="PhoneNumber"
                                    value={formData.PhoneNumber}
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
                                <button type="submit" className="btn btn-primary">{loadingUpdateUser ? "Updating..." : "Save Change"}</button>
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
                                <input 
                                type="password"
                                name='OldPassword'
                                value={formDataPassword.OldPassword}
                                onChange={handleInpuPasswordtChange}
                                className="input input-bordered w-full" 
                                required />
                            </div>
                            <div className="form-control w-full mb-4">
                                <label className="label">
                                    <span className="label-text">New Password</span>
                                </label>
                                <input 
                                type="password"
                                name='NewPassword'
                                value={formDataPassword.NewPassword}
                                onChange={handleInpuPasswordtChange}
                                className="input input-bordered w-full"
                                 required />
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
        </div>
    );
};

export default ProfileUpdatePage;