import { Link } from "react-router-dom";

const CompanyCard = ({ company }) => {
    return (
        <div className="border rounded-lg shadow-md p-4 w-80 flex flex-col items-center">
            <img src={company?.CompanyImage} alt={company?.CompanyName} className="w-32 h-32 object-cover rounded-full mb-3" />
            <h2 className="text-xl font-bold">{company?.CompanyName}</h2>
            <p className="font-semibold text-sm">{company?.CompanyEmail}</p>
            <Link
             to={`/company/${company?.CompanyNo}`} state={{company}}
             key={company?.CompanyNo}
             className="mt-3 px-4 py-2 btn btn-neutral rounded-lg ">
                Details
            </Link>
        </div>
    );
};

export default CompanyCard;

