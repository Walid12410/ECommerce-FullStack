import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";
import { getCategory } from "../../redux/slices/categorySlice";
import { clearSubCategoryProduct, getSubCategoryProduct } from "../../redux/slices/productSlice";
import CategoriesSidebar from "../../components/CategorySideBar";
import { Loader2, Package } from "lucide-react"; // Import icons
import CollectionProductCard from "../../components/CollectionCard";

const CategoryPage = () => {
    const dispatch = useDispatch();

    // Redux state selectors
    const { categories, loadingCategory, errorCategory } = useSelector((state) => state.categories);
    const { subCategoryProduct, loadingSubCategoryProduct, errorSubCategoryProduct, hasMoreDataSubCategory } = useSelector((state) => state.product);

    // Local state
    const [selectedSubCategory, setSelectedSubCategory] = useState(null);
    const [page, setPage] = useState(1);

    // Initial data fetch
    useEffect(() => {
        dispatch(getCategory());
        dispatch(getSubCategoryProduct({ subCategoryID: null, page: 1, limit: 9 }));
    }, [dispatch]);

    // Fetch more products when the page changes
    useEffect(() => {
        if (page > 1) {
            dispatch(getSubCategoryProduct({ subCategoryID: selectedSubCategory, page: page, limit: 9 }));
        }
    }, [page, selectedSubCategory, dispatch]);

    // Handle subcategory click
    const handleSubCategoryClick = (subCategoryId) => {
        dispatch(clearSubCategoryProduct());
        setSelectedSubCategory(subCategoryId);
        setPage(1);
        dispatch(getSubCategoryProduct({ subCategoryID: subCategoryId, page: 1, limit: 9 }));
    };

    // Infinite scroll handler with debouncing
    const handleScroll = debounce((e) => {
        if (
            e.target.scrollHeight - e.target.scrollTop <= e.target.clientHeight + 10 &&
            hasMoreDataSubCategory &&
            !loadingSubCategoryProduct
        ) {
            setPage((prevPage) => prevPage + 1);
        }
    }, 200);

    // Handle all products button
    const handleProductShow = () => {
        dispatch(clearSubCategoryProduct());
        setSelectedSubCategory(null);
        setPage(1);
        dispatch(getSubCategoryProduct({ subCategoryID: null, page: 1, limit: 9 }));
    };

    return (
        <div className="flex overflow-y-auto">
            {/* Sidebar for categories */}
            <CategoriesSidebar
                categories={categories}
                loadingCategory={loadingCategory}
                handleProductShow={handleProductShow}
                handleSubCategoryClick={handleSubCategoryClick}
            />

            {/* Main Product List Section */}
            <div className="flex-1 md:ml-48 p-4 overflow-y-auto h-screen scrollbar-hide" onScroll={handleScroll}>
                {loadingSubCategoryProduct && page === 1 ? (
                    <div className="flex justify-center items-center h-full">
                        <Loader2 className="h-12 w-12 animate-spin" /> {/* Loading spinner */}
                    </div>
                ) : subCategoryProduct.length === 0 ? (
                    <div className="flex justify-center items-center h-full">
                        <div className="text-center">
                            <Package className="h-16 w-16  mx-auto" /> {/* No products icon */}
                            <p className="text-2xl font-bold mt-4">No products available</p>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
                        {subCategoryProduct.map((product) => (
                            <CollectionProductCard  product={product} />
                        ))}
                    </div>
                )}
                {loadingSubCategoryProduct && page > 1 && (
                    <div className="flex justify-center items-center mt-4">
                        <Loader2 className="h-8 w-8 animate-spin" /> {/* Loading more spinner */}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CategoryPage;