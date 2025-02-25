import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getColors } from "../../../redux/slices/colorSlice";
import Header from "../../../admin-components/Header";
import { Loader2 } from "lucide-react";

const ViewColorPage = () => {
    const dispatch = useDispatch();
    const { colors, loadingColors, errorColors } = useSelector((state) => state.color);

    useEffect(() => {
        dispatch(getColors());
    }, [dispatch]);

    const handleEdit = (colorId) => {
        console.log("Edit color with ID:", colorId);
        // Navigate to edit page or show a modal
    };

    const handleDelete = (colorId) => {
        console.log("Delete color with ID:", colorId);
        // Dispatch a delete action or show confirmation dialog
    };

    return (
        <div className="flex flex-col min-h-screen p-4">
            <Header />
            
            <div className="flex justify-between items-center my-4">
                <h1 className="text-2xl font-bold">Manage Colors</h1>
                <button 
                    className="  px-4 py-2 rounded btn btn-success"
                    onClick={() => console.log("Navigate to add color page")}
                >
                    Add Color
                </button>
            </div>
            
            {loadingColors && (
                <div className="flex justify-center items-center py-10">
                    <Loader2 className="animate-spin w-10 h-10 " />
                    <span className="ml-3 text-lg font-medium">Loading colors...</span>
                </div>
            )}

            {errorColors && (
                <div className="flex justify-center items-center py-10">
                    <p className="text-primary text-lg font-medium">Error: {errorColors}</p>
                </div>
            )}
            
            {colors && colors.length > 0 ? (
                <table className="min-w-full border border-base-300">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2 text-lg font-bold">Name</th>
                            <th className="border px-4 py-2 text-lg font-bold">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {colors.map((c) => (
                            <tr key={c.ColorID}>
                                <td className="border px-4 py-2 text-xl font-bold">{c.ColorName}</td>
                                <td className="border px-4 py-2 flex gap-2">
                                    <button 
                                        className=" px-2 py-1 rounded btn btn-warning"
                                        onClick={() => handleEdit(c.id)}
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        className=" px-2 py-1 rounded btn btn-error"
                                        onClick={() => handleDelete(c.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                !loadingColors && !errorColors && <p>No colors found.</p>
            )}
        </div>
    );
};
 
export default ViewColorPage;

