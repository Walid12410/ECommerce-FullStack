import {
    Building,
    ShoppingCart, Tag,
    Ticket, ClipboardList,
    LayoutDashboard,
    Menu
} from "lucide-react";
import { Link } from "react-router-dom";

const CompanySideBar = () => {

    return (
        <div className="drawer">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/* Page content here */}
                <label htmlFor="my-drawer" className="btn  drawer-button"><Menu size={20} /> Menu</label>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>

                <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                    {/* Sidebar dropdown items here */}
                    <li className="mb-5">
                        <Link to={"/admin"} className="cursor-pointer font-semibold flex items-center gap-2">
                            <LayoutDashboard size={20} /> Dashboard
                        </Link>
                    </li>


                    <li className="mb-2">
                        <details>
                            <summary className="cursor-pointer font-semibold flex items-center gap-2">
                                <Building size={20} /> Company
                            </summary>
                            <ul className="p-2 bg-base-300 rounded-lg">
                                <li><Link to={"/admin/view-company"}>View Companies</Link></li>
                                <li><a>Add User Company</a></li>
                            </ul>
                        </details>
                    </li>


                    <li className="mb-2">
                        <details>
                            <summary className="cursor-pointer font-semibold flex items-center gap-2">
                                <ShoppingCart size={20} /> Product
                            </summary>
                            <ul className="p-2 bg-base-300 rounded-lg">
                                <li><a>View Product</a></li>
                                <li><a>Add Product</a></li>
                            </ul>
                        </details>
                    </li>

                    <li className="mb-2">
                        <details>
                            <summary className="cursor-pointer font-semibold flex items-center gap-2">
                                <Tag size={20} /> Offer
                            </summary>
                            <ul className="p-2 bg-base-300 rounded-lg">
                                <li><a>View Offer</a></li>
                                <li><a>Add Offer</a></li>
                                <li><a>View ended Offer</a></li>
                            </ul>
                        </details>
                    </li>

                    <li className="mb-2">
                        <details>
                            <summary className="cursor-pointer font-semibold flex items-center gap-2">
                                <Ticket size={20} /> Coupons
                            </summary>
                            <ul className="p-2 bg-base-300 rounded-lg">
                                <li><a>View Coupons</a></li>
                                <li><a>Add Coupons</a></li>
                                <li><a>View Ended Coupons</a></li>
                            </ul>
                        </details>
                    </li>

                    <li className="mb-2">
                        <details>
                            <summary className="cursor-pointer font-semibold flex items-center gap-2">
                                <ClipboardList size={20} /> Order
                            </summary>
                            <ul className="p-2 bg-base-300 rounded-lg">
                                <li><a>View Order</a></li>
                                <li><a>Add Order</a></li>
                            </ul>
                        </details>
                    </li>

                </ul>
            </div>
        </div>
    );
};

export default CompanySideBar;
