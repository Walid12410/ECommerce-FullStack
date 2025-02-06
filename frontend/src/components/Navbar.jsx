import Logo from "../assets/svg/nike.svg?react";
import Search from "../assets/svg/search.svg?react";
import Cart from "../assets/svg/cart.svg?react";
import Favorite from "../assets/svg/favorite.svg?react";
import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <nav className="  px-4 py-2 flex item-center justify-between ">
            { /* Logo */}
            <div className="flex items-center ml-5">
                <Logo className='size-16 cursor-pointer' />
            </div>

            {/** Middle section: Navigation Links */}
            <div className="hidden md:flex gap-4 pt-2 ">
                <Link to={"/"} className="font-semibold text-xl mr-1"> Home </Link>
                <Link to={"/collection/0"} className="font-semibold text-xl mr-1"> Collections </Link>
                <Link to={"/category"} className="font-semibold text-xl mr-1"> Categories </Link>
                <Link to={"/brand"} className="font-semibold text-xl mr-1"> Brand </Link>
                <a href="#" className="font-semibold text-xl mr-1"> Sales </a>
                <a href="#" className="font-semibold text-xl mr-1"> Stores </a>
            </div>

            {/**Right section: Searh & Icons */}
            <div className="flex item-center gap-4 pt-2">
                {/** Search */} 
                <div className="flex items-center bg-white h-10 rounded-full">
                    <Search className='size-10 text-gray-400' />
                    <input type="text"
                        className='w-full focus:outline-none bg-transparent'
                        placeholder="Search" />
                </div>

                <Favorite className='size-10' />
                <Cart className='size-10' />
            </div>
        </nav>
    );
}

export default NavBar;