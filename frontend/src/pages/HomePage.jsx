import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBanner } from "../redux/slices/bannerSlice";
import BannerCard from "../components/BannerCard";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Importing icons

const HomePage = () => {
    const dispatch = useDispatch();
    const { banners, loadingBanners, errorBanners } = useSelector((state) => state.banner);

    useEffect(() => {
        dispatch(getBanner());
    }, [dispatch]);

    return (
        <div className="flex flex-col items-center m-5">
            {banners.length === 0 ? (
                <div></div>
            ) : banners.length >= 1 ? (
                <BannerCard banners={banners[0]} />
            ) : (
                <div className=""></div>
            )}


            <div className="w-full flex justify-between items-center mt-5">
                <div className="text-sm font-bold">Latest Drop</div>

                {/* Shop Section with Icons */}
                <div className="flex items-center gap-2">
                    <ChevronLeft size={20} className="cursor-pointer" />
                    <div className="text-sm font-bold ">Shop</div>
                    <ChevronRight size={20} className="cursor-pointer" />
                </div>
            </div>



            {banners.length === 0 ? (
                <div></div>
            ) : banners.length >= 2 ? (
                <BannerCard banners={banners[1]} />
            ) : (
                <div className=""></div>
            )}
        </div>  
    );
};

export default HomePage;
