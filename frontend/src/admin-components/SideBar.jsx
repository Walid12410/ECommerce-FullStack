import {
    Package,
    Building,
    List, Grid,
    ShoppingCart, Tag,
    Ticket, Star, ClipboardList,
    Palette, Image, PersonStanding,
    LayoutDashboard,
    Menu
} from "lucide-react";
import { Link } from "react-router-dom";

const SideBar = () => {
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
                                <PersonStanding size={20} /> User
                            </summary>
                            <ul className="p-2 bg-base-300 rounded-lg">
                                <li><Link to={"/admin/view-user"}>View User</Link></li>
                                <li><Link to={"/admin/add-user"}>Add User</Link></li>
                            </ul>
                        </details>
                    </li>

                    <li className="mb-2">
                        <details>
                            <summary className="cursor-pointer font-semibold flex items-center gap-2">
                                <Package size={20} /> Brand
                            </summary>
                            <ul className="p-2 bg-base-300 rounded-lg">
                                <li><Link to={"/admin/view-brand"}>View Brand</Link></li>
                                <li><a>Add Brand</a></li>
                            </ul>
                        </details>
                    </li>

                    <li className="mb-2">
                        <details>
                            <summary className="cursor-pointer font-semibold flex items-center gap-2">
                                <Building size={20} /> Company
                            </summary>
                            <ul className="p-2 bg-base-300 rounded-lg">
                                <li><Link to={"/admin/view-company"}>View Companies</Link></li>
                                <li><a>Add Company</a></li>
                                <li><a>Add User Company</a></li>
                            </ul>
                        </details>
                    </li>

                    <li className="mb-2">
                        <details>
                            <summary className="cursor-pointer font-semibold flex items-center gap-2">
                                <List size={20} /> Category
                            </summary>
                            <ul className="p-2 bg-base-300 rounded-lg">
                                <li><a>View Category</a></li>
                                <li><a>Add Category</a></li>
                                <li><a>View Subcategory</a></li>
                                <li><a>Add Subcategory</a></li>
                            </ul>
                        </details>
                    </li>

                    <li className="mb-2">
                        <details>
                            <summary className="cursor-pointer font-semibold flex items-center gap-2">
                                <ShoppingCart size={20} /> Product
                            </summary>
                            <ul className="p-2 bg-base-300 rounded-lg">
                                <li><Link to={"/admin/view-product"}>View Product</Link></li>
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
                                <Star size={20} /> Feature Product
                            </summary>
                            <ul className="p-2 bg-base-300 rounded-lg">
                                <li><a>View Feature Product</a></li>
                                <li><a>Add Feature Product</a></li>
                                <li><a>View Ended Feature Product</a></li>
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

                    <li className="mb-2">
                        <details>
                            <summary className="cursor-pointer font-semibold flex items-center gap-2">
                                <Palette size={20} /> Color
                            </summary>
                            <ul className="p-2 bg-base-300 rounded-lg">
                                <li><Link to={"/admin/view-color"}>View Color</Link></li>
                            </ul>
                        </details>
                    </li>

                    <li className="mb-2">
                        <details>
                            <summary className="cursor-pointer font-semibold flex items-center gap-2">
                                <Image size={20} /> Banner
                            </summary>
                            <ul className="p-2 bg-base-300 rounded-lg">
                                <li><a>View Banner</a></li>
                                <li><a>Add Banner</a></li>
                                <li><a>View Ended Banner</a></li>
                            </ul>
                        </details>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default SideBar;
