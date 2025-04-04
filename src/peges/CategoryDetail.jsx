import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useGetallcategoryupdateQuery } from '../redux/categoriApi';
import { FaStar, FaCheckCircle, FaTimesCircle, FaShoppingCart, FaUtensils } from "react-icons/fa";

const CategoryDetail = () => {
    const { id } = useParams();
    const { data, isLoading, isError, error } = useGetallcategoryupdateQuery(id);

    console.log("Fetched Data:", data);

    if (isLoading) return <div className="flex justify-center items-center h-screen text-xl font-semibold">Loading...</div>;
    if (isError || !data) {
        console.error("API Error:", error);
        return <div className="flex justify-center items-center h-screen text-xl text-red-500">Error fetching details</div>;
    }

    const item = data;

    return (
        <div className="h-screen flex flex-col md:flex-row items-center bg-gray-100 p-10">

            <div className="w-full md:w-1/2 h-full flex justify-center">
                <img
                    src={item.image || "https://via.placeholder.com/600"}
                    alt={item.title}
                    className="w-full h-full object-cover rounded-lg shadow-lg"
                />
            </div>


            <div className="w-full md:w-1/2 flex flex-col justify-center p-10 bg-white rounded-lg shadow-lg">

                <h1 className="text-5xl font-bold flex items-center gap-4 mb-4">
                    <FaUtensils className="text-yellow-500" /> {item.title}
                </h1>


                <p className="text-gray-700 text-xl flex items-center">
                    <FaStar className="text-yellow-500 mr-2" />
                    <span className="font-semibold">{item.rating} / 5</span>
                </p>


                <p className="text-gray-700 text-xl flex items-center">
                    <FaCheckCircle className="text-blue-500 mr-2" />
                    <span className="font-semibold">Category:</span> {item.category}
                </p>


                <p className="text-gray-700 text-xl flex items-center">
                    {item.available ? (
                        <FaCheckCircle className="text-green-500 mr-2" />
                    ) : (
                        <FaTimesCircle className="text-red-500 mr-2" />
                    )}
                    <span className="font-semibold">Availability:</span>
                    <span className={`ml-2 ${item.available ? 'text-green-500' : 'text-red-500'}`}>
                        {item.available ? 'In Stock' : 'Out of Stock'}
                    </span>
                </p>


                <p className="text-gray-900 font-bold text-3xl mt-3">
                    Price: ₹{item.price}
                </p>


                <p className="text-gray-600 text-lg leading-relaxed mt-4">
                    Indulge in the rich flavors of this handcrafted <span className="font-semibold">{item.category}</span> dish.
                    Made with high-quality ingredients, it's a perfect choice for food lovers who appreciate delicious and
                    satisfying meals. Try it now and enjoy a burst of taste in every bite!
                </p>


                <Link to="/booking">
                    <button className="w-full mt-6 py-4 bg-yellow-500 text-white text-2xl font-semibold rounded-lg shadow-md flex items-center justify-center hover:bg-yellow-600 transition">
                        <FaShoppingCart className="mr-3" />
                        Go Booking
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default CategoryDetail;
