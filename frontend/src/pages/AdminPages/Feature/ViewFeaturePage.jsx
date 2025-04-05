import { useDispatch, useSelector } from "react-redux";
import Header from "../../../admin-components/Header";
import { useCallback, useEffect, useState } from "react";
import { getFeature } from "../../../redux/slices/featureSlice";
import { debounce } from "lodash";
import { Loader2, X } from "lucide-react"; // Loader and X icons
import FeatureCard from "../../../admin-components/FeatureCard";

const ViewFeaturePage = () => {

    const dispatch = useDispatch();

    const { feature, loadingFeature, errorFeature, hasMoreDataFeature } = useSelector((state) => state.feature);
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    
    // State for edit and delete dialogs
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedFeature, setSelectedFeature] = useState(null);

    useEffect(() => {
        dispatch(getFeature({ page: page, limit: limit }));
    }, [dispatch]);

    useEffect(() => {
        if (page > 1) {
            dispatch(getFeature({ page: page, limit: limit }));
        }
    }, [page, limit, dispatch]);

    const handleScroll = useCallback(
        debounce(() => {
            if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50) {
                if (hasMoreDataFeature && !loadingFeature) {
                    setPage((prevPage) => prevPage + 1);
                }
            }
        }, 200),
        [hasMoreDataFeature, loadingFeature]
    );

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    const handleEdit = (featureId) => {
        // Find the feature by ID
        const featureToEdit = feature.find(item => item.FeatureID === featureId);
        setSelectedFeature(featureToEdit);
        setIsEditDialogOpen(true);
    };

    const handleDelete = (featureId) => {
        // Find the feature by ID
        const featureToDelete = feature.find(item => item.FeatureID === featureId);
        setSelectedFeature(featureToDelete);
        setIsDeleteDialogOpen(true);
    };

    // Close dialogs
    const closeEditDialog = () => {
        setIsEditDialogOpen(false);
        setSelectedFeature(null);
    };

    const closeDeleteDialog = () => {
        setIsDeleteDialogOpen(false);
        setSelectedFeature(null);
    };

    // Handle form submission (just UI for now)
    const handleEditSubmit = (e) => {
        e.preventDefault();
        console.log("Edit form submitted for feature:", selectedFeature.FeatureID);
        closeEditDialog();
    };

    // Handle delete confirmation (just UI for now)
    const handleDeleteConfirm = () => {
        console.log("Delete confirmed for feature:", selectedFeature.FeatureID);
        closeDeleteDialog();
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header />

            {loadingFeature && (
                <div className="flex justify-center items-center h-40">
                    <Loader2 className="w-10 h-10 animate-spin" />
                </div>
            )}

            {errorFeature && (
                <div className="alert alert-error">
                    Error: {errorFeature}
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
                {feature && feature.map((item) => (
                    <FeatureCard 
                        key={item.FeatureID} 
                        item={item}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                ))} 
            </div>

            {/* Edit Dialog */}
            {isEditDialogOpen && selectedFeature && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-base-100 p-6 rounded-lg shadow-xl w-full max-w-md">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">Edit Feature</h2>
                            <button 
                                onClick={closeEditDialog}
                                className="btn btn-circle btn-ghost btn-sm"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        
                        <form onSubmit={handleEditSubmit}>
                            <div className="mb-4">
                                <label className="label">
                                    <span className="label-text font-medium">Product</span>
                                </label>
                                <input 
                                    type="text" 
                                    className="input input-bordered w-full" 
                                    defaultValue={selectedFeature.ProductName}
                                    disabled
                                />
                            </div>
                            
                            <div className="mb-4">
                                <label className="label">
                                    <span className="label-text font-medium">Start Date</span>
                                </label>
                                <input 
                                    type="date" 
                                    className="input input-bordered w-full" 
                                    defaultValue={selectedFeature.StartDate.split('T')[0]}
                                />
                            </div>
                            
                            <div className="mb-4">
                                <label className="label">
                                    <span className="label-text font-medium">End Date</span>
                                </label>
                                <input 
                                    type="date" 
                                    className="input input-bordered w-full" 
                                    defaultValue={selectedFeature.EndDate.split('T')[0]}
                                />
                            </div>
                            
                            <div className="flex justify-end gap-2 mt-6">
                                <button 
                                    type="button" 
                                    className="btn btn-ghost" 
                                    onClick={closeEditDialog}
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit" 
                                    className="btn btn-primary"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Dialog */}
            {isDeleteDialogOpen && selectedFeature && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-base-100 p-6 rounded-lg shadow-xl w-full max-w-md">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">Delete Feature</h2>
                            <button 
                                onClick={closeDeleteDialog}
                                className="btn btn-circle btn-ghost btn-sm"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        
                        <div className="mb-6">
                            <p className="text-base-content">
                                Are you sure you want to delete this feature?
                            </p>
                            <div className="mt-2 p-3 bg-base-200 rounded-lg">
                                <p className="font-medium">{selectedFeature.ProductName}</p>
                                <p className="text-sm opacity-70">
                                    {new Date(selectedFeature.StartDate).toLocaleDateString()} - {new Date(selectedFeature.EndDate).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                        
                        <div className="flex justify-end gap-2">
                            <button 
                                className="btn btn-ghost" 
                                onClick={closeDeleteDialog}
                            >
                                Cancel
                            </button>
                            <button 
                                className="btn btn-error" 
                                onClick={handleDeleteConfirm}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ViewFeaturePage;
