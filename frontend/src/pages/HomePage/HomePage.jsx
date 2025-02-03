import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBanner } from "../../redux/slices/bannerSlice";
import BannerCard from "../../components/BannerCard";
import { getProduct } from "../../redux/slices/productSlice";
import LatestProduct from "./Details/LatestProduct";

const HomePage = () => {

    const dispatch = useDispatch();
    const { banners, loadingBanners, errorBanners } = useSelector((state) => state.banner);
    const { latestProduct, loadingLatestProduct, errorLatestProduct } = useSelector((state) => state.product);

    useEffect(() => {
        dispatch(getBanner());
        dispatch(getProduct({ page: 1, limit: 5 }));
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

            {latestProduct.length === 0 ? (
                <div className=""></div>
            ): (
                <LatestProduct products={latestProduct}/>
            )}

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
