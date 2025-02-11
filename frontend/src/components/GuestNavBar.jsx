import Logo from "../assets/svg/Frame.svg?react";

const GuestNavBar = ({setHideGuest}) => {
    return (
        <nav className="px-4 py-2 flex item-center justify-between bg-base-200 ">
            { /* Logo */}
            <div className="flex items-center ml-5">
                <Logo className='size-8 cursor-pointer' />
            </div>

            {/** Middle section: Navigation Links */}
            <div className="hidden md:flex gap-4 pt-2">
                <div 
                    onClick={()=> setHideGuest(true)}
                    className="border  flex items-center justify-center text-xs font-bold w-40 h-6 rounded-lg px-4 transition cursor-pointer">
                    Skip to main content
                </div>
            </div>

            {/**Right section: Searh & Icons */}
            <div className="flex item-center gap-4 pt-2 mr-3">
                <div className="text-sm font-bold cursor-pointer">Sign In | </div>
                <div className="text-sm font-bold cursor-pointer">Sign Up</div>
            </div>
        </nav>
    );
}


export default GuestNavBar;