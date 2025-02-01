import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBanner } from "../redux/slices/bannerSlice";
import BannerCard from "../components/BannerCard";

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
            {/**TODO: SECOND AND THIRD BANNER IF FOUND */}

        </div>
    );
}

export default HomePage;