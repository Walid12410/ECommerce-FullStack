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
    <div className="flex flex-col min-h-screen bg-base-200">
      <NavBar />

      {/* Loading State */}
      {loadingBrand && (
        <div className="flex justify-center items-center h-64">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}

      {/* Error State */}
      {errorBrand && (
        <div className="text-center p-4 text-error">
          <p className="font-medium">Error loading brands</p>
          <p className="text-sm">{errorBrand}</p>
        </div>
      )}

      {/* Brands Container */}
      {!loadingBrand && !errorBrand && (
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Our Brands</h2>
          
          {brands.length === 0 ? (
            <div className="card w-full text-center p-8 bg-base-100">
              <div className="card-body">
                <p className="text-lg font-semibold">No Brands Available</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
              {brands.map((brand) => (
                <Link
                  to={`/brand/${brand?.BrandID}`}
                  state={{ brand }}
                  key={brand?.BrandID}
                  className="card bg-base-100 hover:shadow-xl transition duration-300 flex flex-col items-center"
                >
                  <div className="aspect-square w-full relative flex items-center justify-center p-2">
                    <img
                      src={brand?.BrandImage}
                      alt={brand?.BrandName}
                      className="object-contain max-h-full max-w-full"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/placeholder-brand.png"; // Fallback image path
                      }}
                    />
                  </div>
                  <div className="p-2 w-full text-center">
                    <h3 className="text-sm font-medium truncate">{brand?.BrandName}</h3>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BrandPage;