import { useDispatch, useSelector } from "react-redux";
import NavBar from "../../components/Navbar";
import { useEffect } from "react";
import { getCompany } from "../../redux/slices/companySlice";
import CompanyCard from "../../components/CompanyCard";


const CompanyPage = () => {
    const dispatch = useDispatch();
    const { companies, loadingCompanies, errorCompanies } = useSelector((state) => state.company);

    useEffect(() => {
        dispatch(getCompany());
    }, [dispatch]);

    return (
        <div className="flex flex-col h-full">
            <NavBar />

            <div className="flex flex-wrap gap-4 m-5 justify-center">
                {loadingCompanies && <div>Loading...</div>}
                {errorCompanies && <div>Error: {errorCompanies}</div>}
                {companies.length === 0 && !loadingCompanies ? (
                    <div className="w-full text-lg font-semibold">No Company Available</div>
                ) : (
                    companies.map((company) => (
                        <CompanyCard key={company.id} company={company} />
                    ))
                )}
            </div>
        </div>
    );
};

export default CompanyPage;
