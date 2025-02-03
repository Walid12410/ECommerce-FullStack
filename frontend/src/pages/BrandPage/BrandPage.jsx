import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBrand } from "../../redux/slices/brandSlice";

const BrandPage = () => {
  const dispatch = useDispatch();
  const { brands, loadingBrand, errorBrand } = useSelector((state) => state.brand);

  useEffect(() => {
    dispatch(getBrand());
  }, [dispatch]);

  return (
    <div className="flex flex-wrap gap-3 m-5 justify-center">
      {/* Show a message or loading state when brands array is empty */}
      {brands.length === 0 ? (
        <div className="w-full text-center">No Brands Available</div>
      ) : (
        brands.map((brand) => (
          <div
            key={brand?.BrandID}
            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 h-64" // Adjusted responsive widths
          >
            <img
              src={brand?.BrandImage}
              alt={brand?.BrandID}
              className="object-fill rounded-lg w-full h-full cursor-pointer" // Image scaling and cover
            />
          </div>
        ))
      )}
    </div>
  );
};

export default BrandPage;
