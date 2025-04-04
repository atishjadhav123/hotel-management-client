import React, { useState, useEffect } from "react";
import { useCreateBookingMutation } from "../../redux/bookingApi";
import { toast } from "react-toastify";

const Booking = () => {
    const [createBooking, { isSuccess, isLoading, isError }] = useCreateBookingMutation();
    const [formData, setFormData] = useState({
        name: "",
        address: "",
        mobile: "",

    });

    useEffect(() => {
        if (isSuccess) {
            toast.success("Booking was successful!");
        }
    }, [isSuccess]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.address || !formData.mobile) {
            toast.warning("Please fill all fields");
            return;
        }
        await createBooking(formData)
    };

    return (
        <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
            {/* Left Side: Image Section */}
            <div className="lg:w-1/2 w-full relative">
                <img
                    src="https://media.istockphoto.com/id/2110310187/photo/luxury-tropical-pool-villa-at-dusk.webp?a=1&b=1&s=612x612&w=0&k=20&c=3wDvy4YueLfVHI9Kycl7J-nYKJsxiJL1rpBQ-ZS0hTI="
                    alt="Luxury Villa"
                    className="w-full h-full object-cover"
                />
                {/* Overlay Effect */}
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <h2 className="text-white text-4xl font-bold">Book Your Stay</h2>
                </div>
            </div>

            {/* Right Side: Booking Form */}
            <div className="lg:w-1/2 w-full flex justify-center items-center p-10">
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
                    <h2 className="text-3xl font-bold text-center mb-6">Reserve Your Spot</h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Name Input */}
                        <div>
                            <label className="block text-gray-700 font-medium">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter your name"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            />
                        </div>

                        {/* Address Input */}
                        <div>
                            <label className="block text-gray-700 font-medium">Address</label>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="Enter your address"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            />
                        </div>

                        {/* Mobile Input */}
                        <div>
                            <label className="block text-gray-700 font-medium">Mobile</label>
                            <input
                                type="text"
                                name="mobile"
                                value={formData.mobile}
                                onChange={handleChange}
                                placeholder="Enter your mobile number"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 rounded-lg transition duration-300"
                            disabled={isLoading}
                        >
                            {isLoading ? "Booking..." : "Confirm Booking"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Booking;
