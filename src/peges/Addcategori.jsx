import React, { useState } from "react";
import { useAddcategoriMutation } from "../redux/categoriApi";

const AddCategory = () => {
    const [addCategory, { isLoading, isSuccess, isError, error }] = useAddcategoriMutation();

    const [formData, setFormData] = useState({
        title: "",
        category: "",
        rating: "",
        available: "true",
        price: "",
        image: null,
    });

    const handleChange = (e) => {
        const { id, value } = e.target;

        if (id === "available") {
            setFormData((prev) => ({ ...prev, [id]: value === "true" }))
        } else {
            setFormData((prev) => ({ ...prev, [id]: value }));
        }
    };

    const handleFileChange = (e) => {
        setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title || !formData.category || !formData.price || !formData.image) {
            alert("Please fill in all required fields!");
            return;
        }

        const categoryData = new FormData();
        categoryData.append("title", formData.title);
        categoryData.append("category", formData.category);
        categoryData.append("price", formData.price);
        categoryData.append("rating", formData.rating || 0);
        categoryData.append("available", formData.available.toString())
        categoryData.append("image", formData.image);

        await addCategory(categoryData);
    };

    return <>

        <div className="flex min-h-screen items-center justify-center bg-yellow-100">
            <div className="w-full max-w-lg p-4 bg-white shadow-md rounded-lg">
                <h2 className="text-xl font-bold text-gray-800 text-center">Add New Category</h2>
                {isLoading && (
                    <div className="absolute inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
                        <div className="spinner border-t-4 border-blue-500 border-solid h-12 w-12 rounded-full animate-spin"></div>
                    </div>
                )}
                <form className="space-y-3 mt-2" onSubmit={handleSubmit}>
                    {/* Title */}
                    <div className="flex flex-col">
                        <label htmlFor="title" className="text-gray-700 text-sm font-medium">Title</label>
                        <input id="title" type="text" value={formData.title} onChange={handleChange}
                            className="mt-1 p-1.5 bg-gray-100 border rounded-md text-sm focus:ring-2 focus:ring-blue-500 transition-all" />
                    </div>

                    {/* Category */}
                    <div className="flex flex-col">
                        <label htmlFor="category" className="text-gray-700 text-sm font-medium">Category</label>
                        <select id="category" value={formData.category} onChange={handleChange}
                            className="mt-1 p-1.5 bg-gray-100 border rounded-md text-sm focus:ring-2 focus:ring-blue-500 transition-all">
                            <option value="">Select Category</option>
                            <option value="veg">Veg</option>
                            <option value="non-veg">Non-Veg</option>
                        </select>
                    </div>

                    {/* Price */}
                    <div className="flex flex-col">
                        <label htmlFor="price" className="text-gray-700 text-sm font-medium">Price</label>
                        <input id="price" type="number" value={formData.price} onChange={handleChange}
                            className="mt-1 p-1.5 bg-gray-100 border rounded-md text-sm focus:ring-2 focus:ring-blue-500 transition-all" />
                    </div>

                    {/* Rating */}
                    <div className="flex flex-col">
                        <label htmlFor="rating" className="text-gray-700 text-sm font-medium">Rating</label>
                        <input id="rating" type="number" value={formData.rating} onChange={handleChange}
                            className="mt-1 p-1.5 bg-gray-100 border rounded-md text-sm focus:ring-2 focus:ring-blue-500 transition-all" />
                    </div>

                    {/* Availability */}
                    <div className="flex flex-col">
                        <label htmlFor="available" className="text-gray-700 text-sm font-medium">Availability</label>
                        <select id="available" value={formData.available} onChange={handleChange}
                            className="mt-1 p-1.5 bg-gray-100 border rounded-md text-sm focus:ring-2 focus:ring-blue-500 transition-all">
                            <option value="true">Available</option>
                            <option value="false">Not Available</option>
                        </select>
                    </div>

                    {/* Image Upload */}
                    <div className="flex flex-col">
                        <label htmlFor="image" className="text-gray-700 text-sm font-medium">Upload Image</label>
                        <input id="image" type="file" accept="image/*" onChange={handleFileChange}
                            className="mt-1 p-1.5 bg-gray-100 border rounded-md text-sm focus:ring-2 focus:ring-blue-500 transition-all" />
                    </div>

                    {/* Submit Button */}
                    <button type="submit" disabled={isLoading}
                        className="w-full bg-blue-500 text-white text-sm font-medium p-2 rounded-md hover:bg-blue-600 transition-all">
                        {isLoading ? "Adding..." : "Add Category"}
                    </button>

                    {/* Success & Error Messages */}
                    {isSuccess && <p className="text-green-500 text-sm mt-2 text-center">Category added successfully!</p>}
                    {isError && <p className="text-red-500 text-sm mt-2 text-center">Error: {error?.data?.message || "Something went wrong"}</p>}
                </form>
            </div>
        </div>
    </>
};

export default AddCategory;
