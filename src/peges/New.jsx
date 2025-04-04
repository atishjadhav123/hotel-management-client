import React from "react";
import { useGetallcategoryQuery } from "../redux/categoriApi";

const Categories = () => {
    const { data, isLoading, isError } = useGetallcategoryQuery();

    console.log("Fetched Data:", data); // Debugging Log

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error fetching categories</p>;
    if (!data || data.length === 0) return <p>No categories found</p>;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6 bg-yellow-100">
            {data.map((item) => (
                <div key={item._id} className="bg-white p-4 rounded-xl shadow-lg text-center">
                    <img src={item.image} alt={item.title} className="h-40 object-cover rounded-lg" />
                    <h3 className="text-xl font-bold">{item.title}</h3>
                    <p>Rating: {item.rating} ⭐</p>
                    <p>Category: {item.category}</p>
                    <p>Price: Rs. {item.price}</p>
                </div>
            ))}
        </div>
    );
};

export default Categories;
