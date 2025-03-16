import { useDispatch, useSelector } from "react-redux";
import NavBar from "../../components/Navbar";
import CartCard from "../../components/CartCard";

const CartPage = () => {

  const dispatch = useDispatch();
  const { cart } = useSelector(state => state.cart);

  const handleRemoveFromCart = (productNo) => {
    //dispatch({ type: 'removeFromCart', payload: productNo });
  };

  const handleClearCart = () => {
  //  dispatch({ type: 'ClearAll' });
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.product.Price, 0).toFixed(2);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Your Cart ({cart.length} items)</h1>
          {cart.length > 0 && (
            <button 
              onClick={handleClearCart}
              className="btn btn-error px-4 py-2 rounded"
            >
              Clear All
            </button>
          )}
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl ">Your cart is empty</p>
          </div>
        ) : (
          <div className="space-y-4">
            {cart.map((product) => (
                <CartCard key={product.product.ProductNo} product={product.product} handleRemoveFromCart={handleRemoveFromCart}/>
            ))}
            
            <div className="mt-8 border-t pt-4">
              <div className="flex justify-between text-xl font-bold">
                <span>Total:</span>
                <span>${calculateTotal()}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
