import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOffer } from "../../redux/slices/offerSlice";
import { debounce } from "lodash";
import { Loader2, Package } from "lucide-react";
import NavBar from "../../components/Navbar";
import OfferCard from "../../components/OfferCard";

const OfferPage = () => {
    const dispatch = useDispatch();
    const { offers, loadingOffers, errorOffers, hasMoreDateOffers } = useSelector((state) => state.offer);

    const [page, setPage] = useState(1);

    // Infinite Scroll Handler
    const scrollHandler = useRef(
        debounce(() => {
            if (
                window.innerHeight + window.scrollY >= document.body.offsetHeight - 50 &&
                hasMoreDateOffers &&
                !loadingOffers
            ) {
                setPage((prevPage) => prevPage + 1);
            }
        }, 200)
    ).current;

    // Fetch data when the page changes
    useEffect(() => {
        dispatch(getOffer({ page: page, limit: 10 }));
    }, [page, dispatch]);

    // Run scroll event listener
    useEffect(() => {
        window.addEventListener("scroll", scrollHandler);
        return () => window.removeEventListener("scroll", scrollHandler);
    }, []);

    return (
        <div className="flex flex-col min-h-screen">
            <NavBar />

            {/* Main Content */}
            <div className="flex-1 flex flex-col items-center justify-start w-full max-w-7xl mx-auto px-4 py-6">
                {/* Offers Grid Container */}
                <div className="w-full">
                    {/* Pagination Loading Indicator */}
                    {loadingOffers && page > 1 && (
                        <div className="flex justify-center items-center my-4">
                            <Loader2 className="h-8 w-8 animate-spin" />
                        </div>
                    )}

                    {/* Empty State */}
                    {offers.length === 0 ? (
                        <div className="flex justify-center items-center h-64 w-full">
                            <div className="text-center">
                                <Package className="h-16 w-16 mx-auto" />
                                <p className="text-2xl font-bold mt-4">No offers available</p>
                            </div>
                        </div>
                    ) : (
                        /* Offers Grid with proper centering */
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 w-full">
                            {offers.map((offer, index) => (
                                <OfferCard key={offer.id || offer._id || index} offer={offer} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OfferPage;