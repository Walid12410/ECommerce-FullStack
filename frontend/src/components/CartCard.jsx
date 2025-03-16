const CartCard = ({product,handleRemoveFromCart}) => {
    return ( 
        <div key={product.ProductNo} className="flex border rounded-lg overflow-hidden shadow-sm">
        <div className="w-32 h-32">
          <img 
            src={product.ProductImage} 
            alt={product.ProductName}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex-1 p-4">
          <div className="flex justify-between">
            <div>
              <h2 className="text-lg font-medium">{product.ProductName}</h2>
              <p className="text-sm ">{product.BrandName}</p>
              <p className="text-sm ">Color: {product.ColorName}</p>
              <p className="text-sm ">Category: {product.CategoryName} / {product.SubCategoryName}</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold">${product.Price}</p>
              <button 
                onClick={() => handleRemoveFromCart(product.ProductNo)}
                className="mt-2 btn btn-secondary px-3 py-1 rounded text-sm"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </div> 
     );
}
 
export default CartCard;