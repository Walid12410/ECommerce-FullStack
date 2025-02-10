import { useParams, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../../components/Navbar";
import { getCompanyProduct, clearCompanyProduct } from "../../redux/slices/productSlice";
import CollectionProductCard from "../../components/CollectionCard";
import { Loader2, Package } from "lucide-react";

const CompanyDetailsPage = () => {
    const location = useLocation();
    const company = location.state?.company; // Get company object from state
    const { id } = useParams();
    const dispatch = useDispatch();

    const {
        hasMoreDataCompanyProduct,
        errorCompanyProduct,
        loadingCompanyProduct,
        companyProduct
    } = useSelector((state) => state.product);

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(20); // Default limit to 20
    const [searchQuery, setSearchQuery] = useState("");
    const observerRef = useRef(null);

    // Fetch company products when page or limit changes
    useEffect(() => {
        dispatch(getCompanyProduct({ companyId: id, page, limit }));
    }, [dispatch, id, page, limit]);

    // Clear product list on unmount
    useEffect(() => {
        return () => {
            dispatch(clearCompanyProduct());
        };
    }, [dispatch]);

    // Intersection Observer for Infinite Scroll
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMoreDataCompanyProduct && !loadingCompanyProduct) {
                    setPage((prevPage) => prevPage + 1);
                }
            },
            { root: null, rootMargin: "100px", threshold: 0.5 }
        );

        if (observerRef.current) {
            observer.observe(observerRef.current);
        }

        return () => {
            if (observerRef.current) {
                observer.unobserve(observerRef.current);
            }
        };
    }, [hasMoreDataCompanyProduct, loadingCompanyProduct]);

    return (
        <div className="flex flex-col h-full">
            <NavBar />

            {/* Company Info */}
            <div className="bg-base-200 shadow-md p-4 rounded-lg mx-4 mt-5 flex flex-col items-center text-center">
                {company?.CompanyImage && (
                    <img
                        src={company.CompanyImage}
                        alt={company.CompanyName}
                        className="w-32 h-32 rounded-full object-cover mb-4"
                    />
                )}
                <h1 className="text-2xl font-bold">{company?.CompanyName}</h1>
                <p className="text-lg">{company?.Description}</p>
                <p className="text-lg font-medium">📍 {company?.CompanyLocation}</p>
                <p className="text-lg">📧 {company?.CompanyEmail}</p>
                <p className="text-lg">📞 {company?.CompanyNumber}</p>
            </div>

            {/* Search and Filter */}
            <div className="flex justify-between items-center mx-4 mt-5">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="input input-bordered w-full max-w-xs"
                />
                <select
                    value={limit}
                    onChange={(e) => {
                        setLimit(Number(e.target.value));
                        setPage(1); // Reset to first page when limit changes
                    }}
                    className="select select-bordered"
                >
                    <option value={20}>20 per page</option>
                    <option value={50}>50 per page</option>
                    <option value={100}>100 per page</option>
                </select>
            </div>


            {/* 🟢 Products List */}
            <div className="flex-1 flex flex-col items-center justify-center min-h-screen">
                {loadingCompanyProduct && page === 1 ? (
                    <div className="flex flex-col items-center justify-center min-h-screen">
                        <Loader2 className="h-12 w-12 animate-spin" />
                    </div>
                ) : companyProduct.length === 0 ? (
                    <div className="flex flex-col items-center justify-center min-h-screen">
                        <Package className="h-16 w-16" />
                        <p className="text-2xl font-bold mt-4">No products available</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-5 px-4">
                        {companyProduct.map((product) => (
                            <CollectionProductCard key={product.ProductNo} product={product} />
                        ))}
                    </div>
                )}

                {/* Infinite Scroll Trigger */}
                <div ref={observerRef} className="h-10 w-full mt-4"></div>

                {/* Show Loader when Fetching More */}
                {loadingCompanyProduct && page > 1 && (
                    <div className="flex justify-center items-center mt-4">
                        <Loader2 className="h-8 w-8 animate-spin" />
                    </div>
                )}
            </div>
        </div>
    );
};

export default CompanyDetailsPage;
