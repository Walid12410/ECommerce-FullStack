import Header from "../../../admin-components/Header";
import { useState } from "react";

const AddCompanyPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        number: "",
        location: "",
        image: null,
        description: ""
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "image") {
            setFormData(prev => ({ ...prev, image: files[0] }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
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
                    <h1 className="text-3xl font-bold mb-8 text-center">Add New Company</h1>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Company Name */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Company Name</span>
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

                        {/* Email */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Email</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="input input-bordered w-full"
                                required
                            />
                        </div>

                        {/* Phone Number */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Phone Number</span>
                            </label>
                            <input
                                type="tel"
                                name="number"
                                value={formData.number}
                                onChange={handleChange}
                                className="input input-bordered w-full"
                                required
                            />
                        </div>

                        {/* Location */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Location</span>
                            </label>
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                className="input input-bordered w-full"
                                required
                            />
                        </div>

                        {/* Image Upload */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Company Logo</span>
                            </label>
                            <input
                                type="file"
                                name="image"
                                onChange={handleChange}
                                className="file-input file-input-bordered w-full"
                                accept="image/*"
                                required
                            />
                        </div>

                        {/* Description */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Description</span>
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="textarea textarea-bordered h-32"
                                required
                            ></textarea>
                        </div>

                        {/* Submit Button */}
                        <div className="form-control mt-8">
                            <button type="submit" className="btn btn-primary w-full">
                                Add Company
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
     );
}
 
export default AddCompanyPage;