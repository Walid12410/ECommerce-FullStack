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
        <div className="flex flex-col min-h-screen ">
            <NavBar />

            {/* Offers Grid */}
            <div className="p-4 w-full flex justify-center items-center">
                {loadingOffers && page > 1 && (
                    <div className="flex justify-center items-center mt-4">
                        <Loader2 className="h-8 w-8 animate-spin" />
                    </div>
                )}

                {offers.length === 0 ? (
                    <div className="flex justify-center items-center h-full">
                        <div className="text-center">
                            <Package className="h-16 w-16 mx-auto" />
                            <p className="text-2xl font-bold mt-4">No offers available</p>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 overflow-y-auto scrollbar-hide w-full">
                        {offers.map((offer) => (
                            <OfferCard offer={offer} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default OfferPage;
