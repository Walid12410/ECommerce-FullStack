import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBrand } from "../../../redux/slices/brandSlice";
import BrandCard from "../../../admin-components/BrandCard";
import Header from "../../../admin-components/Header";


const ViewBrandPage = () => {

    const dispatch = useDispatch();
    const { brands, loadingBrand, errorBrand } = useSelector((state) => state.brand);

    useEffect(()=>{
        dispatch(getBrand());
    },[dispatch]);

    return ( 
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex flex-wrap gap-3 m-5 justify-center">
                {brands.length === 0 ? (
                    <div className="w-full text-center text-lg font-semibold">
                        No Brands Available
                    </div>
                ): (
                    brands.map((brand) => (
                        <BrandCard key={brand?.BrandID} Brand={brand}/>
                    ))
                )}
            </div>
        </div>
    );
}
 
export default ViewBrandPage;