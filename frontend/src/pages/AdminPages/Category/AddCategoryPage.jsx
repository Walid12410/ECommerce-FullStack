import Header from "../../../admin-components/Header";
import { useState } from "react";

const AddCategoryPage = () => {
    const [formData, setFormData] = useState({
        name: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
        console.log(formData);
    };

    return ( 
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-2xl mx-auto">
                    <h1 className="text-3xl font-bold mb-8 text-center">Add New Category</h1>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Category Name */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Category Name</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="input input-bordered w-full"
                                required
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="form-control mt-8">
                            <button type="submit" className="btn btn-primary w-full">
                                Add Category
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
     );
}
 
export default AddCategoryPage;