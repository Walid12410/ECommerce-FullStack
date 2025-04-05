import { Pencil, Trash2 } from "lucide-react";

const FeatureCard = ({ item, onEdit, onDelete }) => {
    return (
        <div className="flex flex-col bg-base-300 shadow-lg rounded-lg overflow-hidden">
            <img
                src={item.ProductImage}
                alt={item.ProductName}
                className="w-full h-80 object-fill"
            />
            <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold">{item.ProductName}</h3>
                    <div className="flex gap-2">
                        <button 
                            className="btn btn-circle btn-ghost btn-sm"
                            onClick={() => onEdit(item.FeatureID)}
                        >
                            <Pencil size={16} />
                        </button>
                        <button 
                            className="btn btn-circle btn-ghost btn-sm text-error"
                            onClick={() => onDelete(item.FeatureID)}
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                </div>
                <p className="text-sm">Subcategory: {item.SubCategoryName}</p>
                <p className="text-sm">Brand: {item.BrandName}</p>
                <p className="text-sm">Gender: {item.Gender}</p>
                <p className="text-sm">Start Date: {new Date(item.StartDate).toLocaleDateString()}</p>
                <p className="text-sm">End Date: {new Date(item.EndDate).toLocaleDateString()}</p>
            </div>
        </div>
    );
};

export default FeatureCard;