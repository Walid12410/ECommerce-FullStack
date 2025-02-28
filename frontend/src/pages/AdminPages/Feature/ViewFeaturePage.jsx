import { useDispatch, useSelector } from "react-redux";
import Header from "../../../admin-components/Header";
import { useCallback, useEffect, useState } from "react";
import { getFeature } from "../../../redux/slices/featureSlice";
import { debounce } from "lodash";
import { Loader2 } from "lucide-react"; // Loader
import FeatureCard from "../../../admin-components/FeatureCard";

const ViewFeaturePage = () => {

    const dispatch = useDispatch();

    const { feature, loadingFeature, errorFeature, hasMoreDataFeature } = useSelector((state) => state.feature);
    const [page, setPage] = useState(1);
    const [limit] = useState(10);

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
        // Handle edit functionality (e.g., open a modal with form data for editing)
        console.log("Edit feature with ID:", featureId);
    };

    const handleDelete = (featureId) => {
        // Handle delete functionality (e.g., show a confirmation and then delete)
        console.log("Delete feature with ID:", featureId);
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
                    <FeatureCard key={item.FeatureID} item={item}/>
                ))} 
            </div>
        </div>
    );
}

export default ViewFeaturePage;
