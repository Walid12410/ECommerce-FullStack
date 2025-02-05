
const SubCategoryProductCard = ({ product }) => {
    const { ProductImage, ProductName, ProductPrice, BrandName } = product;

    return (
        <div className="rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            {/* Product Image */}
            <div className="w-full h-90 overflow-hidden">
                <img
                    src={product?.ProductImage}
                    alt={product?.ProductName}
                    className="w-full h-full object-fill"
                />
            </div>

            {/* Product Details */}
            <div className="">
                {/* Brand Name */}
                <div className="flex justify-between items-center mt-2">
                    <div className="text-sm font-bold">{product?.ProductName}</div>
                    <div className="text-sm font-bold">{product?.Price} $</div>
                </div>
                <div className="text-xs">{product?.Gender} {product?.SubCategoryName}</div>

            </div>
        </div>
    );
};

export default SubCategoryProductCard;