import { useState } from "react";
import Header from "../../../admin-components/Header";

const AddFeaturePage = () => {

    const [isDropdownVisible, setIsDropdownVisible] = useState(false);


    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex justify-center items-center min-h-screen">
                <div className="w-full max-w-md p-8 rounded-lg shadow-lg">
                    <div className="text-3xl font-bold text-center mb-6">
                        Add New Feature
                    </div>

                    <form className="space-y-4">
                        <div className="form-controll">
                            <label className="label font-medium">Add product</label>
                            <input
                                type="text"
                                className="input input-bordered w-full"
                                required
                                placeholder="Search for a product"
                            />
                        </div>
                        <div className="form-controll">
                            <label className="label font-medium">Start Date</label>
                            <input
                                type="date"
                                className="input input-bordered w-full"
                                required
                            />
                        </div>
                        <div className="form-controll">
                            <label className="label font-medium">End Date</label>
                            <input
                                type="date"
                                className="input input-bordered w-full"
                                required

                            />
                        </div>
                        <button className="btn w-full" type="submit">Add Feature</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddFeaturePage;