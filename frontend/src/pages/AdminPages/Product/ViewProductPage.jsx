import { useEffect, useState } from "react";
import Header from "../../../admin-components/Header";
import { useDispatch, useSelector } from "react-redux";
import { getProduct, getProductCount } from "../../../redux/slices/productSlice";
import { Loader } from "lucide-react";
import Pagination from "../../../admin-components/Pagination";
import ProductViewCard from "../../../admin-components/ProductCard";

const ViewProductPage = () => {
    const dispatch = useDispatch();
    const {
        loadingLatestProduct,
        errorLatestProduct,
        latestProduct,
        countProducts
    } = useSelector((state) => state.product);

    const [page, setPage] = useState(1);
    const [limit] = useState(10);

    useEffect(() => {
        dispatch(getProductCount());
        dispatch(getProduct({ page: page, limit: limit }));
    }, [dispatch, page, limit]);

    const totalPages = Math.ceil(countProducts / limit);

    const handlePagination = (pageNumber) => {
        setPage(pageNumber);
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <input type="text" placeholder="Search for specific product" className="ml-5 mt-2 input input-bordered w-full max-w-xs text-sm font-bold" />
            <div className="flex-grow flex items-center justify-center">
                {loadingLatestProduct ? (
                    <div className="flex items-center justify-center h-full">
                        <Loader className="animate-spin text-gray-500" size={48} />
                    </div>
                ) : errorLatestProduct ? (
                    <div className="text-center text-error">Error loading products.</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                        {latestProduct.map((p) => (
                            <ProductViewCard key={p.ProductNo} p={p} />
                        ))}
                    </div>
                )}
            </div>
            <div className="mb-4">
                <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={handlePagination}
                />
            </div>
        </div>
    );
}

export default ViewProductPage;
