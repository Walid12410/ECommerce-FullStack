import { Link } from "react-router-dom";
import { Home, Grid, Tag, Percent, Store } from "lucide-react";

const BottomNavBar = () => {
    return (
        <nav className="block md:hidden fixed bottom-0 left-0 right-0 bg-base-100 shadow-lg border-t border-gray-200">
            <div className="flex justify-around items-center p-2">
                {/* Home */}
                <Link to="/" className="flex flex-col items-center hover:text-primary">
                    <Home className="w-6 h-6" />
                    <span className="text-xs">Home</span>
                </Link>

                {/* Category */}
                <Link to="/category" className="flex flex-col items-center hover:text-primary">
                    <Grid className="w-6 h-6" />
                    <span className="text-xs">Category</span>
                </Link>

                {/* Brand */}
                <Link to="/brand" className="flex flex-col items-center hover:text-primary">
                    <Tag className="w-6 h-6" />
                    <span className="text-xs">Brand</span>
                </Link>

                {/* Sale */}
                <Link to="/offer" className="flex flex-col items-center hover:text-primary">
                    <Percent className="w-6 h-6" />
                    <span className="text-xs">Sale</span>
                </Link>

                {/* Store */}
                <Link to="/company" className="flex flex-col items-center hover:text-primary">
                    <Store className="w-6 h-6" />
                    <span className="text-xs">Store</span>
                </Link>
            </div>
        </nav>
    );
};

export default BottomNavBar;