import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "../../../redux/slices/categorySlice";
import Header from "../../../admin-components/Header";
import { Loader2 } from "lucide-react";

const ViewCategoryPage = () => {
    const dispatch = useDispatch();

    const { categories, loadingCategory, errorCategory } = useSelector((state) => state.categories);
    const [isEditing, setIsEditing] = useState(false);
    const [editingItem, setEditingItem] = useState(null);

    useEffect(() => {
        dispatch(getCategory());
    }, [dispatch]);

    const handleEdit = (type, id, name) => {
        console.log(`Edit ${type} with ID: ${id}`);
        setIsEditing(true);
        setEditingItem({ type, id, name });
        console.log(editingItem);
    };

    const handleDelete = (type, id) => {
        console.log(`Delete ${type} with ID: ${id}`);
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            {loadingCategory && (
                <div className="flex justify-center items-center h-40">
                    <Loader2 className="w-10 h-10 animate-spin" />
                </div>
            )}
            {errorCategory && (
                <div className="alert alert-error">
                    Error: {errorCategory}
                </div>
            )}
            <div className="p-4">
                {categories?.map((category) => (
                    <div key={category.CategoryNo} className="mb-6 border-b pb-4">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-bold">{category.CategoryName}</h2>
                            <div>
                                <button
                                    className="btn btn-success mr-2"
                                    onClick={(e) => handleEdit("category", category.CategoryNo, category.CategoryName)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="btn btn-error"
                                    onClick={() => handleDelete('category', category.CategoryNo)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>

                        <div className="ml-4 mt-4">
                            {category.SubCategories?.length > 0 ? (
                                category.SubCategories.map((subCategory) => (
                                    <div
                                        key={subCategory.SubCategoryNo}
                                        className="flex justify-between items-center mb-2"
                                    >
                                        <span>{subCategory.SubCategoryName}</span>
                                        <div>
                                            <button
                                                className="btn btn-success mr-2"
                                                onClick={() => handleEdit('subcategory', subCategory.SubCategoryNo, subCategory.SubCategoryName)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="btn btn-error"
                                                onClick={() => handleDelete('subcategory', subCategory.SubCategoryNo)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500">No subcategories available</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            {isEditing && editingItem && (
                <div className="fixed inset-0 flex items-center justify-center bg-base-300 bg-opacity-50">
                    <div className="bg-base-300 p-6 rounded-lg shadow-lg">
                        <h3 className="text-xl font-bold mb-4">Edit "{editingItem?.name}"</h3>
                        <input
                            type="text"
                            className="input input-bordered w-full mb-4"
                            value={editingItem?.name}
                        />
                        <div className="flex justify-end">
                            <button
                                className="btn btn-success mr-2"
                            >
                                Save
                            </button>
                            <button className="btn btn-neutral" onClick={() => setIsEditing(false)}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ViewCategoryPage;

