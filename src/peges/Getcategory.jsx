import React, { useState, useEffect } from "react";
import {
    useDeleteCategoriMutation,
    useGetallcategoryQuery,
    useUpdateCategoriMutation
} from "../redux/categoriApi";
import { toast } from "react-toastify";

const Getcategory = () => {
    const { data, isLoading, isError, error } = useGetallcategoryQuery()
    const [Deletecategory, { isSuccess: deleteSuccess, isError: deleteError }] = useDeleteCategoriMutation();
    const [updatecategory, { isLoading: updating, isSuccess: updateSuccess, isError: updateError }] = useUpdateCategoriMutation();
    const [categoryToEdit, setCategoryToEdit] = useState(null)

    const [formData, setFormData] = useState({
        _id: "",
        title: "",
        category: "",
        rating: "",
        available: "true",
        price: "",
        image: null,
    });

    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (deleteSuccess) toast.success("Category deleted successfully!");
        if (deleteError) toast.error("Failed to delete category.");
        if (updateSuccess) {
            toast.success("Category updated successfully!");
            setIsModalOpen(false);
        }
        if (updateError) toast.error("Failed to update category.");
    }, [deleteSuccess, deleteError, updateSuccess, updateError]);

    // ✅ Fix: Include _id when editing
    const handleEdit = (category) => {
        setCategoryToEdit(category)
        setFormData({
            _id: category._id, // 🔥 Now includes _id
            title: category.title,
            category: category.category,
            rating: category.rating,
            available: category.available.toString(),
            price: category.price,
            image: category.image, // Set existing image URL
        });
        setIsModalOpen(true);
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: id === "available" ? value === "true" : value,
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData((prev) => ({ ...prev, image: file }));
        }
    };

    // ✅ Fix: Ensure correct FormData structure
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!categoryToEdit || !categoryToEdit._id) {
            toast.error("Error: No category selected for update.");
            return;
        }

        if (!formData.title || !formData.category || !formData.price) {
            toast.error("Please fill in all required fields!");
            return;
        }

        const categoryData = new FormData();
        categoryData.append("title", formData.title);
        categoryData.append("category", formData.category);
        categoryData.append("price", formData.price);
        categoryData.append("rating", formData.rating || "0");
        categoryData.append("available", formData.available);

        if (formData.image instanceof File) {
            categoryData.append("image", formData.image);
        }

        // ✅ Ensure _id is sent separately
        await updatecategory({ id: formData._id, categoryData });
    };


    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {error.message}</div>;

    return (
        <>
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-semibold mb-4">Categories</h1>

                {data?.length > 0 ? (
                    <table className="min-w-full table-auto border-collapse bg-white shadow-md rounded-lg">
                        <thead>
                            <tr className="bg-gray-100 border-b">
                                <th className="py-3 px-6">Image</th>
                                <th className="py-3 px-6">Title</th>
                                <th className="py-3 px-6">Category</th>
                                <th className="py-3 px-6">Rating</th>
                                <th className="py-3 px-6">Price</th>
                                <th className="py-3 px-6">Available</th>
                                <th className="py-3 px-6">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((category) => (
                                <tr key={category._id} className="border-b hover:bg-gray-50">
                                    <td className="py-3 px-6 text-center">
                                        <img src={category.image} alt={category.title} className="w-16 h-16 object-cover rounded" />
                                    </td>
                                    <td className="py-3 px-6">{category.title}</td>
                                    <td className="py-3 px-6">{category.category}</td>
                                    <td className="py-3 px-6">{category.rating}</td>
                                    <td className="py-3 px-6">${category.price}</td>
                                    <td className="py-3 px-6">{category.available ? 'Available' : 'Not Available'}</td>
                                    <td className="py-3 px-6 flex space-x-2 justify-center">
                                        <button onClick={() => handleEdit(category)} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
                                            Edit
                                        </button>
                                        <button onClick={() => Deletecategory(category._id)} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div>No categories found.</div>
                )}
            </div>

            {/* ✅ Modal for Editing */}

            {isModalOpen && (

                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
                    {updating && (
                        <div className="absolute inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
                            <div className="spinner border-t-4 border-blue-500 border-solid h-12 w-12 rounded-full animate-spin"></div>
                        </div>
                    )}
                    <div className="w-full max-w-sm bg-white p-4 rounded-lg shadow-lg">
                        <h2 className="text-lg font-semibold mb-3">Edit Category</h2>
                        <form onSubmit={handleSubmit} className="space-y-3">
                            <input type="hidden" value={formData._id} />
                            <label>Title</label>
                            <input id="title" type="text" value={formData.title} onChange={handleChange} className="w-full p-2 border rounded-md" />
                            <label>Category</label>
                            <select id="category" value={formData.category} onChange={handleChange} className="w-full p-2 border rounded-md">
                                <option value="veg">Veg</option>
                                <option value="non-veg">Non-Veg</option>
                            </select>
                            <label>Price</label>
                            <input id="price" type="number" value={formData.price} onChange={handleChange} className="w-full p-2 border rounded-md" />
                            <label>Rating</label>
                            <input id="rating" type="number" value={formData.rating} onChange={handleChange} className="w-full p-2 border rounded-md" />
                            <label>Availability</label>
                            <select id="available" value={formData.available} onChange={handleChange} className="w-full p-2 border rounded-md">
                                <option value="true">Available</option>
                                <option value="false">Not Available</option>
                            </select>
                            <label>Image</label>
                            <input id="image" type="file" accept="image/*" onChange={handleFileChange} className="w-full p-2 border rounded-md" />
                            <div className="flex justify-end space-x-2 mt-4">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-3 py-1 bg-gray-500 text-white rounded-md">
                                    Cancel
                                </button>
                                <button type="submit" className="px-3 py-1 bg-blue-500 text-white rounded-md">
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default Getcategory;



