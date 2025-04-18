const CartCard = ({ item, handleRemoveFromCart }) => {
    return (
        <div className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow">
            <div className="card-body p-4">
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Product Image */}
                    <div className="w-full md:w-32 h-32">
                        <img
                            src={item.product.ProductImage}
                            alt={item.product.ProductName}
                            className="w-full h-full object-cover rounded-lg"
                        />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1">
                        <div className="flex flex-col md:flex-row justify-between gap-4">
                            <div className="space-y-2">
                                <h2 className="text-lg font-bold">{item.product.ProductName}</h2>
                                <div className="space-y-1">
                                    <p className="text-sm text-primary">{item.product.BrandName}</p>
                                    <p className="text-sm">Size: {item.size?.size}</p>
                                    <p className="text-sm">Quantity: {item.quantity}</p>
                                    <p className="text-sm">Color: {item.product.ColorName}</p>
                                    <p className="text-sm">
                                        Category: {item.product.CategoryName} / {item.product.SubCategoryName}
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col items-end gap-2">
                                <p className="text-xl font-bold text-primary">
                                    ${(item.product.Price * item.quantity).toFixed(2)}
                                </p>
                                <p className="text-sm text-base-content">
                                    ${item.product.Price} each
                                </p>
                                <button
                                    onClick={() => handleRemoveFromCart(item.product.ProductNo)}
                                    className="btn btn-error btn-sm"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartCard;