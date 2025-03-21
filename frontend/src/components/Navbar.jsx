import { Link } from "react-router-dom";
import { CircleUser, ShoppingBag, Store, Moon, Sun } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../redux/slices/themeSlice";
import { logOutAuth } from "../redux/slices/authSlice";


const NavBar = () => {

    const dispatch = useDispatch();
    const { authUser } = useSelector((state) => state.auth);
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const { theme } = useSelector((state) => state.theme);

    return (
        <nav className="px-4 py-2 flex items-center justify-between relative">
            {/* Logo */}
            <Link to={"/"} className="flex items-center ml-5">
                <Store className="w-6 h-10 cursor-pointer" />
            </Link>

            {/* Middle section: Navigation Links */}
            <div className="hidden md:flex gap-4 pt-2">
                <Link to={"/"} className="font-semibold text-xl mr-1">Home</Link>
                <Link to={"/collection/0"} className="font-semibold text-xl mr-1">Collections</Link>
                <Link to={"/category"} className="font-semibold text-xl mr-1">Categories</Link>
                <Link to={"/brand"} className="font-semibold text-xl mr-1">Brands</Link>
                <Link to={"/offer"} className="font-semibold text-xl mr-1">Sales</Link>
                <Link to={"/company"} className="font-semibold text-xl mr-1">Stores</Link>
            </div>

            {/* Right section: Search & Icons */}
            <div className="flex items-center gap-4 pt-2 relative">
                {theme === "dark" ? (
                    <Sun
                        onClick={() => dispatch(setTheme("light"))}
                        className="w-6 h-10 cursor-pointer" />
                ) : (
                    <Moon
                        onClick={() => dispatch(setTheme("dark"))}
                        className="w-6 1-10 cursor-pointer" />
                )}

                <Link to={authUser ? "/cart" : "/login"} >
                    <ShoppingBag className="w-6 h-10 cursor-pointer" />
                </Link>

                {/* User Icon & Dropdown */}
                <div className="relative">
                    <CircleUser
                        className="w-6 h-10 cursor-pointer"
                        onClick={() => setDropdownOpen(!isDropdownOpen)}
                    />

                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-base-200 shadow-lg rounded-lg p-2 z-10">
                            {authUser ? (
                                <>
                                    <p className="text-primary px-4 py-2 font-semibold">
                                        {authUser?.UserName}
                                    </p>
                                    <hr className="my-1" />
                                    <Link
                                        to="/profile"
                                        className="block px-4 py-2 font-bold text-sm"
                                    >
                                        Edit Profile
                                    </Link>
                                    <Link
                                        to="/"
                                        className="block px-4 py-2 font-bold text-sm"
                                    >
                                        My Orders
                                    </Link>
                                    <Link
                                        onClick={() => dispatch(logOutAuth())}
                                        className="block px-4 py-2 font-bold text-sm "
                                    >
                                        Log Out
                                    </Link>

                                </>
                            ) : (
                                <>
                                    <Link
                                        to="/login"
                                        className="block px-4 py-2 font-bold text-sm "
                                    >
                                        Login
                                    </Link>

                                    <Link
                                        to="/register"
                                        className="block px-4 py-2 font-bold text-sm "
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
