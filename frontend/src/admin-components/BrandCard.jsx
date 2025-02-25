const BrandCard = ({ Brand }) => {
    const { BrandID, BrandName, BrandImage } = Brand;
  
    return (
      <div
        key={BrandID}
        className="max-w-sm rounded-2xl overflow-hidden shadow-lg bg-base-200 hover:shadow-2xl transition-shadow duration-300"
      >
        <img
          className="w-72 h-48 object-cover"
          src={BrandImage}
          alt={BrandName}
        />
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-2">
            {BrandName}
          </h2>
          <div className="flex gap-2">
            <button
              className="btn btn-primary"
            >
              Edit
            </button>
            <button
              className="btn btn-error"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default BrandCard;
  
  