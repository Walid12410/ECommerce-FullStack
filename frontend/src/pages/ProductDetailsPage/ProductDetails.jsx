import { useParams } from "react-router-dom";
import NavBar from "../../components/Navbar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "../../redux/slices/productSlice";

const ProductDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loadingProductDetails, productDetails } = useSelector(state => state.product);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    dispatch(getProductDetails({ id }));
  }, [dispatch, id]);

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  const handleQuantityChange = (e) => {
    setQuantity(Math.max(1, parseInt(e.target.value) || 1));
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }
    // Add to cart logic here
    console.log("Added to cart:", {
      product: productDetails.product,
      size: selectedSize,
      quantity
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-base-200">
      <NavBar />
      
      <div className="container mx-auto px-4 py-8">
        {loadingProductDetails ? (
          <div className="flex justify-center items-center py-32">
            <p className="text-xl font-medium">Loading product details...</p>
          </div>
        ) : !productDetails || !productDetails.product ? (
          <div className="flex justify-center items-center py-32">
            <p className="text-xl font-medium">Product not found</p>
          </div>
        ) : (
          <>
            <div className="flex flex-col md:flex-row gap-8">
              {/* Product Image */}
              <div className="md:w-1/2">
                <div className="bg-base-100 rounded-lg shadow-md overflow-hidden">
                  <img 
                    src={productDetails.product.ProductImage} 
                    alt={productDetails.product.ProductName} 
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>

              {/* Product Details */}
              <div className="md:w-1/2 flex flex-col">
                <div className="mb-4 flex items-center">
                  <img 
                    src={productDetails.product.BrandImage} 
                    alt={productDetails.product.BrandName} 
                    className="w-12 h-12 object-contain mr-2"
                  />
                  <h1 className="text-2xl font-bold">{productDetails.product.ProductName}</h1>
                </div>
                
                <div className="flex items-center mb-4">
                  <span className="text-xl font-bold">${productDetails.product.Price.toFixed(2)}</span>
                  <span className="ml-4 px-2 py-1 bg-success bg-opacity-20 text-success text-sm rounded-full">
                    {productDetails.product.Stock > 0 ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
                
                <div className="mb-4">
                  <p className="text-base-content">{productDetails.product.ProductDesc}</p>
                </div>
                
                <div className="mb-4">
                  <div className="flex gap-2 mb-2">
                    <span className="font-medium">Brand:</span>
                    <span className="text-base-content">{productDetails.product.BrandName}</span>
                  </div>
                  <div className="flex gap-2 mb-2">
                    <span className="font-medium">Category:</span>
                    <span className="text-base-content">{productDetails.product.CategoryName} - {productDetails.product.SubCategoryName}</span>
                  </div>
                  <div className="flex gap-2 mb-2">
                    <span className="font-medium">Color:</span>
                    <span className="text-base-content">{productDetails.product.ColorName}</span>
                    <div className="w-4 h-4 rounded-full bg-error ml-1"></div>
                  </div>
                  <div className="flex gap-2 mb-2">
                    <span className="font-medium">Gender:</span>
                    <span className="text-base-content">{productDetails.product.Gender}</span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h3 className="font-medium mb-2">Select Size:</h3>
                  <div className="flex flex-wrap gap-2">
                    {productDetails.productSize.map((size) => (
                      <button
                        key={size.ProductSizeNo}
                        className={`px-4 py-2 border rounded ${
                          selectedSize === size.SizeValue
                            ? 'border-primary bg-primary bg-opacity-10 text-primary'
                            : 'border-base-300 hover:border-base-content'
                        }`}
                        onClick={() => handleSizeChange(size.SizeValue)}
                      >
                        {size.SizeValue}
                        <span className="text-xs opacity-70 ml-1">({size.Quantity} available)</span>
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="font-medium mb-2">Quantity:</h3>
                  <div className="flex items-center">
                    <button
                      className="px-3 py-1 border border-base-300 rounded-l"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      className="w-16 px-2 py-1 text-center border-y border-base-300 bg-base-100"
                      value={quantity}
                      onChange={handleQuantityChange}
                      min="1"
                    />
                    <button
                      className="px-3 py-1 border border-base-300 rounded-r"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                
                <div className="mt-auto">
                  <button
                    className="w-full btn btn-primary py-3 px-6 rounded-lg font-medium"
                    onClick={handleAddToCart}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>

            {/* Seller Information */}
            <div className="mt-8 bg-base-100 p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-4">Seller Information</h2>
              <div className="flex items-center mb-4">
                <img 
                  src={productDetails.product.CompanyImage} 
                  alt={productDetails.product.CompanyName} 
                  className="w-16 h-16 object-cover rounded-full mr-4"
                />
                <div>
                  <h3 className="font-bold text-lg">{productDetails.product.CompanyName}</h3>
                  <p className="opacity-70">{productDetails.product.CompanyLocation}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-base-content">
                    <span className="font-medium">Email:</span> {productDetails.product.CompanyEmail}
                  </p>
                </div>
                <div>
                  <p className="text-base-content">
                    <span className="font-medium">Phone:</span> {productDetails.product.CompanyNumber}
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-base-content">{productDetails.product.Description}</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;