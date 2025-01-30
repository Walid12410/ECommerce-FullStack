import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "../redux/slices/categorySlice";
import { getGender, setSelectedGenders } from "../redux/slices/genderSlice";

const CategoryPage = () => {
    const dispatch = useDispatch();

    const { categories, loadingCategory, errorCategory } = useSelector((state) => state.categories);
    const { gender, loadingGender, errorGender, selectedGenders } = useSelector((state) => state.gender);

    useEffect(() => {
        dispatch(getCategory());
        dispatch(getGender());
    }, [dispatch]);

    // Handle checkbox toggle
    const handleGenderChange = (genderId) => {
        // Check if the ID is already in the selectedGenders array
        const updatedSelection = selectedGenders.includes(genderId)
            ? selectedGenders.filter(id => id !== genderId) // Remove ID if it's already selected
            : [...selectedGenders, genderId]; // Add ID if not selected

        dispatch(setSelectedGenders(updatedSelection)); // Dispatch the updated selection array
    };

    return (
        <div className="flex m-10">
            <div className="flex-none w-48">
                {/** Category List */}
                <p className="text-xl font-bold">Categories</p>
                {categories.length === 0 ? (
                    <p>No categories added yet</p>
                ) : (
                    <div className="flex-col mt-8 h-80 overflow-y-auto">
                        {categories?.map((category) => (
                            <div key={category.CategoryName}>
                                <h1 className="text-sm font-bold">{category.CategoryName}</h1>
                                <ul className="mt-2 mb-2">
                                    {category?.SubCategories?.map((subCategory) => (
                                        <li key={subCategory.SubCategoryName} className="cursor-pointer ml-2">
                                            {subCategory.SubCategoryName}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                )}

                <hr className="mt-5 mb-2" />

                {/** Gender List with checkboxes */}
                <p className="text-xl font-bold">Gender</p>
                <div className="mt-2">
                    {loadingGender ? (
                        <p>Loading gender options...</p>
                    ) : (
                        <div className="">
                            {/* Gender Checkboxes */}
                            {gender.map((genderOption) => (
                                <div key={genderOption?.GenderID} className="flex items-center mb-2">
                                    <input
                                        type="checkbox"
                                        id={genderOption.GenderID}
                                        checked={selectedGenders.includes(genderOption.GenderID)} // Check if the ID is in the selectedGenders array
                                        onChange={() => handleGenderChange(genderOption.GenderID)} // Handle checkbox toggle
                                        className="mr-2"
                                    />
                                    <label htmlFor={genderOption.GenderID}>{genderOption.Gender}</label>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <hr className="mt-5 mb-2" />
            </div>

            {/** Item list for category */}
            <div className="flex-1">2</div>
        </div>
    );
};

export default CategoryPage;
