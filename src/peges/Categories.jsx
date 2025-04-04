import React, { useState } from "react"
import { useGetallcategoryQuery } from "../redux/categoriApi"
import { Link, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"

const Categories = () => {
    const [selectedCategory, setSelectedCategory] = useState("All")
    const { data, isLoading, isError } = useGetallcategoryQuery()
    const user = useSelector((state) => state.auth.hotel)
    const navigate = useNavigate()

    if (isLoading) return <p>Loading...</p>
    if (isError) return <p>Error fetching categories</p>
    if (!data || data.length === 0) return <p>No categories found</p>

    const dishes = [
        { id: 1, name: "Breakfast", image: "assets/images/dish/1.png", category: "Breakfast" },
        { id: 2, name: "Lunch", image: "assets/images/dish/2.png", category: "Lunch" },
        { id: 3, name: "Dinner", image: "assets/images/dish/3.png", category: "Dinner" },
        { id: 4, name: "Lunch", image: "assets/images/dish/4.png", category: "Lunch" },
        { id: 5, name: "Dinner", image: "assets/images/dish/5.png", category: "Dinner" },
        { id: 6, name: "Breakfast", image: "assets/images/dish/6.png", category: "Breakfast" },
    ]

    const handleCategoryClick = (id) => {
        if (user) {
            navigate(`/detail/${id}`)
        } else {
            toast.error("Please log in to continue! 🔒")
        }
    }
    const filteredDishes = selectedCategory === "All"
        ? dishes
        : dishes.filter(dish => dish.category === selectedCategory)

    return <>
        <div className="py-10 bg-yellow-100">
            <div className="container mx-auto flex flex-col lg:flex-row items-start gap-6">

                <div className="flex flex-col space-y-3 w-full lg:w-1/4">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">Categories</h2>
                    {["All", "Breakfast", "Lunch", "Dinner"].map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`text-sm px-3 py-2 rounded-md shadow-md transition ${selectedCategory === category
                                ? "bg-yellow-500 text-white font-semibold"
                                : "bg-white border border-gray-300 hover:bg-yellow-100"
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 w-full">
                    {filteredDishes.map((dish) => (
                        <div
                            key={dish.id}
                            className="relative bg-gray-200 rounded-lg shadow-md overflow-hidden transition hover:bg-yellow-100"
                        >
                            <div className="flex items-center  bg-gray-100 p-3 rounded-lg shadow-md transition hover:bg-yellow-50">
                                {/* 🍽️ Image */}
                                <img
                                    src={dish.image}
                                    alt={dish.name}
                                    className="w-24 h-24 object-cover rounded-lg transition-transform duration-300 hover:scale-105"
                                />

                                {/* 📌 Text */}
                                <div className="ml-4">
                                    <p className="text-gray-800 font-medium text-sm leading-snug">
                                        India's most popular breakfast—try it at least once! 🌟
                                    </p>
                                </div>
                            </div>

                            <span className="absolute bottom-1 left-1 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded-md">
                                {dish.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6 bg-yellow-100">
            {data.map((item) => (
                <div
                    key={item._id}
                    className="bg-white p-4 rounded-xl shadow-lg transition transform hover:scale-105 hover:shadow-2xl text-center cursor-pointer"
                    onClick={() => handleCategoryClick(item._id)} // 🔥 Call function on click
                >
                    <div className="w-full h-40 flex justify-center">
                        <img src={item.image} alt={item.title} className="h-full object-cover rounded-lg" />
                    </div>
                    <div className="text-yellow-500 font-bold text-lg mt-2">{item.rating} ⭐</div>
                    <h3 className="text-gray-900 font-semibold text-xl">{item.title}</h3>
                    <div className="flex justify-between items-center mt-2 text-gray-700">
                        <div>
                            <h3 className="text-sm font-semibold">Type</h3>
                            <p className="text-xs">{item.category}</p>
                        </div>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                        <h1 className="text-lg font-bold text-gray-800">{item.price}</h1>
                        <button className="text-2xl bg-yellow-500 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-md hover:bg-yellow-600 transition">
                            +
                        </button>
                    </div>
                </div>
            ))}
        </div>


    </>
}

export default Categories
