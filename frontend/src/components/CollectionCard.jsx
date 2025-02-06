
const CollectionProductCard = ({ product }) => {
    return (
        <div className="card w-80 shadow-lg border border-base-300 p-4">
            <figure className="w-full h-92 overflow-hidden">
                <img
                    src={product?.ProductImage}
                    alt={product?.ProductName}
                    className="w-full h-full object-cover rounded-lg"
                />
            </figure>
            <p className="text-xs text-base-content font-bold opacity-50 mt-2">{product?.BrandName}</p>
            <div className="mt-2">
                {/** Product Name */}
                <h3 className="text-lg font-bold truncate">{product?.ProductName}</h3>
                <p className="text-sm text-base-content opacity-70 truncate">
                    {product?.ProductDesc}
                </p>
                <p className="text-primary font-semibold text-lg mt-2">${product?.Price}</p>
                <p className="underline text-sm mt-1">{product?.SubCategoryName}</p>

            </div>
        </div>
    );
};

export default CollectionProductCard;
