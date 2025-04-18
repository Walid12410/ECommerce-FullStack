import { useDispatch, useSelector } from "react-redux";
import NavBar from "../../components/Navbar";
import CartCard from "../../components/CartCard";
import { clearCart, removeFromCart } from "../../redux/slices/cartSlice";
import toast from "react-hot-toast";
import { ShoppingBag } from "lucide-react";

const CartPage = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector(state => state.cart);

  const handleRemoveFromCart = (productNo) => {
    toast.success("Product removed from cart");
    dispatch(removeFromCart(productNo));
  };

  const handleClearCart = () => {
    toast.success("Cart cleared");
    dispatch(clearCart());
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.product.Price * item.quantity), 0).toFixed(2);
  };

  const calculateTotalQuantity = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="flex flex-col min-h-screen bg-base-200">
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-6 h-6" />
            <h1 className="text-2xl font-bold">Your Cart</h1>
          </div>
          {cart.length > 0 && (
            <button 
              onClick={handleClearCart}
              className="btn btn-error"
            >
              Clear All
            </button>
          )}
        </div>

        {cart.length === 0 ? (
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body items-center text-center py-12">
              <ShoppingBag className="w-16 h-16 text-base-content opacity-50" />
              <h2 className="card-title text-2xl">Your cart is empty</h2>
              <p className="text-base-content opacity-70">Looks like you haven't added any items to your cart yet.</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-sm text-base-content">
              {cart.length} {cart.length === 1 ? 'item' : 'items'} ({calculateTotalQuantity()} total)
            </div>
            
            {cart.map((item) => (
              <CartCard 
                key={item.product.ProductNo} 
                item={item} 
                handleRemoveFromCart={handleRemoveFromCart}
              />
            ))}
            
            <div className="card bg-base-100 shadow-xl mt-8">
              <div className="card-body">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold">Total:</span>
                  <span className="text-2xl font-bold text-primary">${calculateTotal()}</span>
                </div>
                <div className="card-actions justify-end mt-4">
                  <button className="btn btn-primary w-full md:w-auto">
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
