import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getGender } from "../../redux/slices/genderSlice";
import { debounce } from "lodash";
import { clearGenderProduct, getGenderProduct } from "../../redux/slices/productSlice";
import { Loader2, Package } from "lucide-react";
import CollectionProductCard from "../../components/CollectionCard";
import NavBar from "../../components/Navbar";

const ProductGenderPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const { gender, loadingGender } = useSelector((state) => state.gender);
    const { hasMoreDataGenderProduct, loadingGenderProduct, genderProduct } = useSelector((state) => state.product);

    const [selectedGender, setSelectedGender] = useState(id !== '0' ? id : null);
    const [page, setPage] = useState(1);

    // Run only once on mount
    useEffect(() => {
        dispatch(clearGenderProduct());
        dispatch(getGender());
    }, [dispatch]);

    // Fetch products when gender changes
    useEffect(() => {
        setPage(1);
        dispatch(clearGenderProduct());
        dispatch(getGenderProduct({ genderNo: selectedGender, page: 1, limit: 9 }));
    }, [selectedGender, dispatch]);

    // Fetch next page when `page` changes
    useEffect(() => {
        if (page > 1) {
            dispatch(getGenderProduct({ genderNo: selectedGender, page, limit: 9 }));
        }
    }, [page, dispatch]);

    // Handle gender selection
    const handleGenderClick = (genderId) => {
        // Update URL with the selected gender
        navigate(`/collection/${genderId}`);
        setSelectedGender(genderId);
    };

    // Show all products
    const handleProductShow = () => {
        // Navigate to 0 for "All" category
        navigate('/collection/0');
        setSelectedGender(null);
    };

    // Infinite Scroll Handler
    const scrollHandler = useRef(
        debounce(() => {
            if (
                window.innerHeight + window.scrollY >= document.body.offsetHeight - 50 &&
                hasMoreDataGenderProduct &&
                !loadingGenderProduct
            ) {
                setPage((prevPage) => prevPage + 1);
            }
        }, 200)
    ).current;

    useEffect(() => {
        window.addEventListener("scroll", scrollHandler);
        return () => window.removeEventListener("scroll", scrollHandler);
    }, []);

    if (loadingGender) {
        return (
            <div className="flex justify-center items-center h-full">
                <Loader2 className="h-12 w-12 animate-spin" />
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen">
            <NavBar />

            {/* Gender Selection */}
            <div className="md:flex">
                <div className="p-4 bg-base-100">
                    <p className="text-xl font-bold mb-2">Gender</p>
                    <div className="flex flex-row md:flex-col gap-3 overflow-x-auto">
                        {/* "All" Category */}
                        <div
                            className={`w-16 h-16 rounded-full border-2 flex items-center justify-center text-sm font-bold cursor-pointer 
                            ${selectedGender === null ? "bg-primary text-primary-content border-primary" : "border-base-300 hover:bg-base-200"}`}
                            onClick={handleProductShow}
                        >
                            All
                        </div>

                        {/* Gender List */}
                        {gender.map((g) => (
                            <div
                                key={g.GenderID}
                                className={`w-16 h-16 rounded-full border-2 flex items-center justify-center text-sm font-bold cursor-pointer transition
                                ${selectedGender === g.GenderID ? "bg-primary text-primary-content border-primary" : "border-base-300 hover:bg-base-200"}`}
                                onClick={() => handleGenderClick(g.GenderID)}
                            >
                                {g.Gender}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Product List */}
                <div className="flex-1 overflow-y-auto scrollbar-hide">
                    {loadingGenderProduct && page === 1 ? (
                        <div className="flex justify-center items-center h-full">
                            <Loader2 className="h-12 w-12 animate-spin" />
                        </div>
                    ) : genderProduct.length === 0 ? (
                        <div className="flex justify-center items-center h-full">
                            <div className="text-center">
                                <Package className="h-16 w-16 mx-auto" />
                                <p className="text-2xl font-bold mt-4">No products available</p>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5 p-4">
                            {genderProduct.map((product) => (
                                <CollectionProductCard key={product.ProductID} product={product} />
                            ))}
                        </div>
                    )}
                    {loadingGenderProduct && page > 1 && (
                        <div className="flex justify-center items-center mt-4">
                            <Loader2 className="h-8 w-8 animate-spin" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductGenderPage;