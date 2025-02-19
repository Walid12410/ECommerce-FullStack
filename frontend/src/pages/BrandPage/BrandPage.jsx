import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBrand } from "../../redux/slices/brandSlice";
import NavBar from "../../components/Navbar";
import { Link } from "react-router-dom";

const BrandPage = () => {
  const dispatch = useDispatch();
  const { brands, loadingBrand, errorBrand } = useSelector((state) => state.brand);

  useEffect(() => {
    dispatch(getBrand());
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />

      {/* Brand Container */}
      <div className="flex flex-wrap gap-4 m-5 justify-center">
        {/* Show a message or loading state when brands array is empty */}
        {brands.length === 0 ? (
          <div className="w-full text-center text-lg font-semibold">No Brands Available</div>
        ) : (
          brands.map((brand) => (
            <Link
              to={`/brand/${brand?.BrandID}`} 
              state={{ brand }}
              key={brand?.BrandID}
              className="w-32 sm:w-40 md:w-48 lg:w-56 xl:w-64 h-40 flex items-center justify-center" // Responsive sizing
            >
              <img
                src={brand?.BrandImage}
                alt={brand?.BrandName}
                className="w-full h-full object-fill rounded-lg shadow-md cursor-pointer hover:scale-105 transition"
              />
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default BrandPage;
