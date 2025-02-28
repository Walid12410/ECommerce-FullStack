import { Edit, Trash } from "lucide-react"; // Edit and Trash icons


const FeatureCard = ({ item }) => {
    return (
        <div key={item.FeatureID} className="flex flex-col bg-base-300 shadow-lg rounded-lg overflow-hidden">
            <img
                src={item.ProductImage}
                alt={item.ProductName}
                className="w-full h-80 object-fill"
            />
            <div className="p-4">
                <h3 className="text-lg font-semibold">{item.ProductName}</h3>
                <p className="text-sm ">Subcategory: {item.SubCategoryName}</p>
                <p className="text-sm ">Brand: {item.BrandName}</p>
                <p className="text-sm ">Gender: {item.Gender}</p>
                <p className="text-sm ">Start Date: {new Date(item.StartDate).toLocaleDateString()}</p>
                <p className="text-sm ">End Date: {new Date(item.EndDate).toLocaleDateString()}</p>
                <div className="mt-4 flex justify-between items-center">
                    <div
                        onClick={() => handleEdit(item.FeatureID)}
                        className="px-4 py-2 btn btn-success"
                    >
                        <Edit className="inline-block mr-2" /> Edit
                    </div>
                    <div
                        onClick={() => handleDelete(item.FeatureID)}
                        className="px-4 py-2 btn btn-error"
                    >
                        <Trash className="inline-block mr-2" /> Delete
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FeatureCard;