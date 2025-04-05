import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";
import { getCategory } from "../../redux/slices/categorySlice";
import { clearSubCategoryProduct, getSubCategoryProduct } from "../../redux/slices/productSlice";
import CategoriesSidebar from "../../components/CategorySideBar";
import { Loader2, Package } from "lucide-react";
import CollectionProductCard from "../../components/CollectionCard";
import NavBar from "../../components/Navbar";
import { useNavigate, useParams } from "react-router-dom";

const CategoryPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { subCategoryId } = useParams();

    // Redux state selectors
    const { categories, loadingCategory } = useSelector((state) => state.categories);
    const { subCategoryProduct, loadingSubCategoryProduct, hasMoreDataSubCategory } = useSelector((state) => state.product);

    // Local state
    const [selectedSubCategory, setSelectedSubCategory] = useState(subCategoryId || null);
    const [page, setPage] = useState(1);

    // Fetch initial categories & products
    useEffect(() => {
        dispatch(getCategory());
        dispatch(getSubCategoryProduct({ subCategoryID: subCategoryId || null, page: 1, limit: 9 }));
    }, [dispatch, subCategoryId]);

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
        navigate(`/category/${subCategoryId}`);
        dispatch(getSubCategoryProduct({ subCategoryID: subCategoryId, page: 1, limit: 9 }));
    };

    // Infinite scroll handler (useCallback to prevent recreation)
    const handleScroll = useCallback(
        debounce(() => {
            if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50) {
                if (hasMoreDataSubCategory && !loadingSubCategoryProduct) {
                    setPage((prevPage) => prevPage + 1);
                }
            }
        }, 200),
        [hasMoreDataSubCategory, loadingSubCategoryProduct]
    );

    // Attach & remove event listener
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    // Handle all products button
    const handleProductShow = () => {
        dispatch(clearSubCategoryProduct());
        setSelectedSubCategory(null);
        setPage(1);
        navigate('/category');
        dispatch(getSubCategoryProduct({ subCategoryID: null, page: 1, limit: 9 }));
    };

    return (
        <div className="flex flex-col min-h-screen">
            <NavBar />
            <CategoriesSidebar
                categories={categories}
                loadingCategory={loadingCategory}
                handleProductShow={handleProductShow}
                handleSubCategoryClick={handleSubCategoryClick}
            />

            {/* Main Product List */}
            <div className="flex-1 md:ml-48 p-4">
                {loadingSubCategoryProduct && page === 1 ? (
                    <div className="flex justify-center items-center h-full">
                        <Loader2 className="h-12 w-12 animate-spin" />
                    </div>
                ) : subCategoryProduct.length === 0 ? (
                    <div className="flex justify-center items-center h-full">
                        <div className="text-center">
                            <Package className="h-16 w-16 mx-auto" />
                            <p className="text-2xl font-bold mt-4">No products available</p>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
                        {subCategoryProduct.map((product) => (
                            <CollectionProductCard key={product.ProductNo} product={product} />
                        ))}
                    </div>
                )}

                {loadingSubCategoryProduct && page > 1 && (
                    <div className="flex justify-center items-center mt-4">
                        <Loader2 className="h-8 w-8 animate-spin" />
                    </div>
                )}
            </div>
        </div>
    );
};

export default CategoryPage;
