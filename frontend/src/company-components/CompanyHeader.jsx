import { useDispatch, useSelector } from "react-redux";
import { Moon, Sun } from "lucide-react";
import { setTheme } from "../redux/slices/themeSlice";
import CompanySideBar from "./CompanySideBar";

const CompanyHeader = () => {
    const dispatch = useDispatch();

    const { theme } = useSelector((state) => state.theme);

    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <CompanySideBar />
            </div>
            <div className="flex-none gap-2">

            {theme === "dark" ? (
                    <Sun
                        onClick={() => dispatch(setTheme("light"))}
                        className="w-10 h-15 cursor-pointer" />
                ) : (
                    <Moon
                        onClick={() => dispatch(setTheme("dark"))}
                        className="w-10 1-15 cursor-pointer" />
                )}

                <div className="form-control">
                    <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
                </div>
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt="Tailwind CSS Navbar component"
                                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li>
                            <a className="justify-between">
                                Change Password
                            </a>
                        </li>
                        <li><a>Settings</a></li>
                        <li><a>Logout</a></li>
                    </ul>
                </div>
            </div>
        </div>

    );
}

export default CompanyHeader;