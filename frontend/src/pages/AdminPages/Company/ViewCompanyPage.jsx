import { useDispatch, useSelector } from "react-redux";
import Header from "../../../admin-components/Header";
import { useEffect } from "react";
import { getCompany } from "../../../redux/slices/companySlice";
import CompanyViewCard from "../../../admin-components/CompanyCard";
import { Loader2 } from "lucide-react";

const ViewCompanyPage = () => {
    const dispatch = useDispatch();
    const { companies, loadingCompanies, errorCompanies } = useSelector((state) => state.company);

    useEffect(() => {
        dispatch(getCompany());
    }, [dispatch]);

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="p-6">
                {loadingCompanies && (
                    <div className="flex justify-center items-center h-40">
                        <Loader2 className="w-10 h-10 animate-spin" />
                    </div>
                )}
                {errorCompanies && (
                    <div className="alert alert-error">
                        Error: {errorCompanies}
                    </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
                    {companies.map((company) => (
                        <CompanyViewCard key={company.CompanyNo} company={company} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ViewCompanyPage;
