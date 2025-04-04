import React from 'react';

const brands = [
    { id: 1, img: "/assets/images/brands/b1.png", name: "Benias Bakery" },
    { id: 2, img: "/assets/images/brands/b2.png", name: "Sagar Donuts" },
    { id: 3, img: "/assets/images/brands/b3.png", name: "Dr. Cafe" },
    { id: 4, img: "/assets/images/brands/b4.png", name: "Pancake To Take" },
    { id: 5, img: "/assets/images/brands/b5.png", name: "Tosti Tos" },
]

const Brands = () => {
    return (
        <div className="w-full bg-yellow-100 py-12">
            <h2 className="text-4xl font-bold text-center mb-10">🔥 Popular Brands</h2>

            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 px-6">
                {brands.map((brand) => (
                    <div
                        key={brand.id}
                        className="bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center justify-center hover:shadow-2xl transition transform hover:scale-105">
                        <img src={brand.img} alt={brand.name} className="w-36 h-36 object-contain mb-4" />
                        <p className="text-xl font-semibold text-gray-800">{brand.name}</p>
                    </div>
                ))}
            </div>

            <div


                className="flex flex-col lg:flex-row  items-center justify-between max-w-7xl mx-auto mt-12 px-6 gap-8">
                <div className="w-full lg:w-2/3 flex justify-center">
                    <img
                        src="/assets/images/testimonial-img.png"
                        alt="Chef Special"
                        className="w-[90%] lg:w-[80%] h-auto object-cover rounded-lg shadow-2xl transition duration-300 hover:scale-105 hover:brightness-90"
                    />
                </div>

                <div className="w-full lg:w-1/4 grid grid-cols-2 gap-4">
                    {["c1", "c2", "c3", "c4"].map((img, index) => (
                        <img
                            key={index}
                            src={`/assets/images/chef/${img}.jpg`}
                            alt={`Chef ${index + 1}`}
                            className="w-full h-auto rounded-lg shadow-lg bg-sky-100 p-2 transition duration-300 hover:scale-110 hover:shadow-2xl hover:brightness-90"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Brands;
