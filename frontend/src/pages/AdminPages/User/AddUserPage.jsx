import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCreateUser, createNewUser } from "../../../redux/slices/userSlice";
import Header from "../../../admin-components/Header";

const AddUserPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loadingCreateUser, successCreate } = useSelector((state) => state.user);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [fullName, setFullName] = useState("");
    const [errors, setErrors] = useState({});

    const validate = () => {
        let tempErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            tempErrors.email = "Invalid email format";
        }
        if (password.length < 8) {
            tempErrors.password = "Password must be at least 8 characters";
        }
        if (phoneNumber.length > 15 || !/^\d+$/.test(phoneNumber)) {
            tempErrors.phoneNumber = "Phone number must be up to 15 digits";
        }
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0; // Returns true if no errors
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validate()) {
            const userData = {
                "UserName": fullName,
                "Email": email,
                "Password": password,
                "PhoneNumber": phoneNumber,
            };

            dispatch(createNewUser({ userData: userData }))
        }
    };

    const handlePrint = () => {
        const userInfo = `Full Name: ${fullName}\nEmail: ${email}\nPhone Number: ${phoneNumber}\nPassword: ${password}`;
        window.alert(userInfo); // You can replace this with a print window if needed
    };

    useEffect(() => {
        if (successCreate) {
            dispatch(clearCreateUser());
            navigate("/admin/view-user");
        }
    }, [successCreate]);

    return (
        <div className="flex flex-col  min-h-screen">
            <Header />
            <div className="flex justify-center items-center min-h-screen">
                <div className="w-full max-w-md p-8 rounded-lg shadow-lg">
                    <h2 className="text-3xl font-bold text-center mb-6">Create new user</h2>

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
                            {errors.email && <p className="text-secondary text-sm">{errors.email}</p>}
                        </div>

                        <div className="form-control">
                            <label className="label font-medium">Phone Number</label>
                            <input
                                type="number"
                                placeholder="Enter your phone number"
                                className="input input-bordered w-full"
                                required
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                            {errors.phoneNumber && <p className="text-secondary text-sm">{errors.phoneNumber}</p>}
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
                            {errors.password && <p className="text-secondary text-sm">{errors.password}</p>}
                        </div>

                        <button type="submit" className="btn w-full">
                            {loadingCreateUser ? "Loading..." : "Create Account"}
                        </button>

                        <button
                            type="button"
                            className="btn w-full btn-outline"
                            onClick={handlePrint}
                        >
                            Print Info
                        </button>
                    </form>
                </div>
            </div>

        </div>
    );
}

export default AddUserPage;
