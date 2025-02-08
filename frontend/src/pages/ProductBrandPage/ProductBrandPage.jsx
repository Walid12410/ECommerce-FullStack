import { useDispatch, useSelector } from "react-redux";
import NavBar from "../../components/Navbar";
import { useEffect, useState, useRef } from "react";
import { useLocation, useParams } from "react-router-dom";
import { clearBrandProduct, getBrandProduct } from "../../redux/slices/productSlice";
import CollectionProductCard from "../../components/CollectionCard";
import { Loader2, Package, Search, ChevronDown } from "lucide-react";

const ProductBrandPage = () => {
    const location = useLocation();
    const brand = location.state?.brand; // Get brand object from state
    const dispatch = useDispatch();
    const { id } = useParams();

    const {
        hasMoreDataBrandProduct,
        errorBrandProduct,
        loadingBrandProduct,
        brandProduct
    } = useSelector((state) => state.product);

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(20); // Default limit to 20
    const [searchQuery, setSearchQuery] = useState("");
    const observerRef = useRef(null);

    // Fetch products when page or limit changes
    useEffect(() => {
        dispatch(getBrandProduct({ brandId: id, page, limit }));
    }, [dispatch, id, page, limit]);

    // Clear product list on unmount
    useEffect(() => {
        return () => {
            dispatch(clearBrandProduct());
        };
    }, [dispatch]);

    // Intersection Observer for Infinite Scroll
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMoreDataBrandProduct && !loadingBrandProduct) {
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
    }, [hasMoreDataBrandProduct, loadingBrandProduct]);

    return (
        <div className="flex flex-col h-full">
            <NavBar />

            {/* 🟢 Brand Details & Filters */}
            <div className="bg-base-200 shadow-md p-4 rounded-lg mx-4 mt-5 flex flex-col items-center text-center">
                <img
                    src={brand?.BrandImage}
                    alt={brand?.BrandName}
                    className="h-32 w-32 object-fill rounded-lg"
                />
                <div className="text-xl font-bold mt-2">{brand?.BrandName}</div>

                {/* Search & Filter */}
                <div className="flex flex-col md:flex-row gap-3 w-full mt-4">
                    {/* Search Input */}
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full border rounded-md pl-10 pr-3 py-2"
                        />
                    </div>

                    {/* Limit Dropdown */}
                    <div className="relative">
                        <select
                            value={limit}
                            onChange={(e) => setLimit(Number(e.target.value))}
                            className="border rounded-md px-3 py-2 appearance-none"
                        >
                            <option value={20}>20 per page</option>
                            <option value={50}>50 per page</option>
                            <option value={100}>100 per page</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* 🟢 Products List */}
            <div className="flex-1 flex flex-col items-center justify-center min-h-screen">
                {loadingBrandProduct && page === 1 ? (
                    <div className="flex flex-col items-center justify-center min-h-screen">
                        <Loader2 className="h-12 w-12 animate-spin" />
                    </div>
                ) : brandProduct.length === 0 ? (
                    <div className="flex flex-col items-center justify-center min-h-screen">
                        <Package className="h-16 w-16" />
                        <p className="text-2xl font-bold mt-4">No products available</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5 px-4">
                        {brandProduct.map((product) => (
                            <CollectionProductCard key={product.ProductNo} product={product} />
                        ))}
                    </div>
                )}

                {/* Infinite Scroll Trigger */}
                <div ref={observerRef} className="h-10 w-full mt-4"></div>

                {/* Show Loader when Fetching More */}
                {loadingBrandProduct && page > 1 && (
                    <div className="flex justify-center items-center mt-4">
                        <Loader2 className="h-8 w-8 animate-spin" />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductBrandPage;
