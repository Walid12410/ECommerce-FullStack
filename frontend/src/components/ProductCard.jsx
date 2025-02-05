import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div key={product?.ProductNo} className="flex-shrink-0 w-96">
      <img
        src={product?.ProductImage}
        alt={product?.ProductNo}
        className="w-90 h-90 object-fill rounded-lg cursor-pointer"
      />
      <div className="flex justify-between items-center mt-2">
        <div className="text-sm font-bold">{product?.ProductName}</div>
        <div className="text-sm font-bold">{product?.Price} $</div>
      </div>
      <div className="text-xs">{product?.Gender} {product?.SubCategoryName}</div>
      <Link className="text-xs underline">{product?.BrandName} Brand</Link>
    </div>
  );
}

export default ProductCard;