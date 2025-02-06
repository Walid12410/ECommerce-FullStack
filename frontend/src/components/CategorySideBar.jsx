import React, { useState } from "react";

const CategoriesSidebar = ({ categories, loadingCategory, handleProductShow, handleSubCategoryClick }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false); // State to control menu visibility

    return (
        <div className={`flex-col w-48 fixed h-screen p-4 pt-20 overflow-x-auto scrollbar-hide z-50 ${isMenuOpen ? "bg-white" : ""}`}>
            {/* Mobile Menu Button */}
            <div className="md:hidden">
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="p-2 rounded-md btn btn-neutral btn-active"
                >
                    {isMenuOpen ? "Close" : "Menu"}
                </button>
            </div>

            {/* Categories Section */}
            <div className={`${isMenuOpen ? "block" : "hidden"} md:block`}>
                <p className="text-xl font-bold">Categories</p>
                {loadingCategory ? (
                    <p>Loading categories...</p>
                ) : categories.length === 0 ? (
                    <p>No categories added yet</p>
                ) : (
                    <div className="flex-col mt-8">
                        <div className="mb-1 font-bold text-xl cursor-pointer" onClick={handleProductShow}>
                            All
                        </div>
                        {categories.map((category) => (
                            <div key={category.CategoryName}>
                                <h1 className="text-sm font-bold">{category.CategoryName}</h1>
                                <ul className="mt-2 mb-2">
                                    {category.SubCategories?.map((subCategory) => (
                                        <li
                                            key={subCategory.SubCategoryNo}
                                            className="cursor-pointer ml-2"
                                            onClick={() => handleSubCategoryClick(subCategory.SubCategoryNo)}
                                        >
                                            {subCategory.SubCategoryName}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                )}

                <hr className="mt-5 mb-2" />
            </div>
        </div>
    );
};

export default CategoriesSidebar;