const CompanyViewCard = ({ company }) => {
    return (
        <div key={company.CompanyNo} className="max-w-sm w-80 rounded-lg shadow-md overflow-hidden">
            <figure className="w-full">
                <img 
                    src={company.CompanyImage} 
                    alt={company.CompanyName} 
                    className="w-full h-48 object-cover"
                />
            </figure>
            <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{company.CompanyName}</h2>
                <p className="text-sm font-bold mb-1">Email: {company.CompanyEmail}</p>
                <p className="text-sm font-semibold mb-4">Number: {company.CompanyNumber}</p>
                <div className="flex justify-end space-x-2">
                    <button 
                        className="px-4 py-2  text-sm rounded btn btn-neutral transition"
                        onClick={() => console.log("View details for", company.CompanyNo)}
                    >
                        View Details
                    </button>
                    <button 
                        className="px-4 py-2   text-sm rounded btn btn-error transition"
                        onClick={() => console.log("Delete company", company.CompanyNo)}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CompanyViewCard;
