const ProductViewCard = ({p}) => {
    return ( 
        <div key={p.ProductNo} className="border rounded-2xl p-4 shadow-lg">
        <img src={p.ProductImage} alt={p.ProductName} className="w-full h-82 object-fill rounded-lg mb-4" />
        <h2 className="text-xl font-bold mb-2">{p.ProductName}</h2>
        <p className="text-sm font-semibold mb-2 truncate">{p.ProductDesc}</p>
        <p className="text-lg font-semibold mb-2">${p.Price}</p>
        <p className="text-sm">Stock: {p.Stock}</p>
        <p className="text-sm">Brand: {p.BrandName}</p>
        <p className="text-sm">Subcategory: {p.SubCategoryName}</p>
        <p className="text-sm">Gender: {p.Gender}</p>
        <div className="mt-4 flex justify-between">
            <div className="cursor-pointer btn btn-primary">Edit</div>
            <div className="cursor-pointer btn btn-error">Delete</div>
        </div>
    </div>

     );
}
 
export default ProductViewCard;