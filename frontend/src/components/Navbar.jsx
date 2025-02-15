import { Link } from "react-router-dom";
import { CircleUser, ShoppingBag, Store,Search } from "lucide-react";

const NavBar = () => {
    return (
        <nav className="px-4 py-2 flex item-center justify-between ">
            { /* Logo */}
            <Link 
                to={"/"}
                className="flex items-center ml-5">
                <Store className='w-6 h-10 cursor-pointer' />
            </Link>

            {/** Middle section: Navigation Links */}
            <div className="hidden md:flex gap-4 pt-2 ">
                <Link to={"/"} className="font-semibold text-xl mr-1"> Home </Link>
                <Link to={"/collection/0"} className="font-semibold text-xl mr-1"> Collections </Link>
                <Link to={"/category"} className="font-semibold text-xl mr-1"> Categories </Link>
                <Link to={"/brand"} className="font-semibold text-xl mr-1"> Brands </Link>
                <Link to={"/offer"} className="font-semibold text-xl mr-1"> Sales </Link>
                <Link to={"/company"} className="font-semibold text-xl mr-1"> Stores </Link>
            </div>

            {/**Right section: Searh & Icons */}
            <div className="flex item-center gap-4 pt-2">
                {/** Search */} 
                <div className="flex items-center bg-white h-10 rounded-full">
                    <Search className='w-5 h-10 text-gray-400 mr-2' />
                    <input type="text"
                        className='w-full focus:outline-none bg-transparent'
                        placeholder="Search" />
                </div>

                <ShoppingBag className='w-6 h-10' />
                <CircleUser className='w-6 h-10' />

            </div>
        </nav>
    );
}

export default NavBar;