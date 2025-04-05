import { useParams } from "react-router-dom";
import NavBar from "../../components/Navbar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "../../redux/slices/productSlice";
import toast from "react-hot-toast";
import ProductDetailsCard from "../../components/ProductDetailsCard";
import { addToCart } from "../../redux/slices/cartSlice";

const ProductDetailPage = () => {

  const { id } = useParams();
  const dispatch = useDispatch();
  const { loadingProductDetails, productDetails } = useSelector(state => state.product);
  const { cart } = useSelector(state => state.cart);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    dispatch(getProductDetails({ id }));
  }, [dispatch, id]);

  const handleSizeChange = (size, quantity) => {
    setSelectedSize({ size, quantity });
    // Reset quantity to 1 when size changes
    setQuantity(1);
  };

  const handleQuantityChange = (value) => {
    if (!selectedSize) {
      toast.error("Please select a size first");
      return;
    }

    if (value === -1 && quantity === 1) {
      return;
    }

    const newQuantity = quantity + value;
    if (selectedSize.quantity < newQuantity) {
      toast.error("Quantity not available");
      return;
    }
    setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size first");
      return;
    }

    const productInCart = cart.find((item) => 
      item.product.ProductNo === productDetails.product.ProductNo && 
      item.size.size === selectedSize.size
    );

    if (productInCart) {
      toast.error("This size is already in your cart");
      return;
    }

    dispatch(addToCart({
      product: productDetails.product,
      size: selectedSize,
      quantity
    }));
    toast.success("Added to cart successfully");
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
            <ProductDetailsCard
              productDetails={productDetails}
              handleAddToCart={handleAddToCart}
              handleQuantityChange={handleQuantityChange}
              handleSizeChange={handleSizeChange}
              selectedSize={selectedSize}
              quantity={quantity}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;