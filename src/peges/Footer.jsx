import React from "react"
import { FaFacebookF, FaInstagram, FaTwitter, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa"

const Footer = () => {
    return <>
        {/* <img src="/assets/images/news.jpg" className="w-full h-96" alt="" /> */}
        <footer
            // style={{
            //     backgroundImage: "url('/assets/images/news.jpg')",
            //     backgroundSize: "cover",
            //     backgroundPosition: "center",
            //     backgroundRepeat: "no-repeat",
            // }}
            className="bg-gray-900 text-white py-12 relative">

            <div className="absolute inset-0 bg-black/50"></div>

            <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex flex-col space-y-4">
                    <h2 className="text-2xl font-bold">🍕 Foodie Haven</h2>
                    <p className="text-gray-300">
                        Serving the best flavors with love! Enjoy delicious meals from the best restaurants.
                    </p>
                </div>

                <div className="flex flex-col space-y-4">
                    <h3 className="text-xl font-semibold">Quick Links</h3>
                    <ul className="text-gray-300 space-y-2">
                        <li><a href="#" className="hover:text-yellow-400">Home</a></li>
                        <li><a href="#" className="hover:text-yellow-400">Menu</a></li>
                        <li><a href="#" className="hover:text-yellow-400">About</a></li>
                        <li><a href="#" className="hover:text-yellow-400">Contact</a></li>
                    </ul>
                </div>

                <div className="flex flex-col space-y-4">
                    <h3 className="text-xl font-semibold">Contact Us</h3>
                    <p className="text-gray-300 flex items-center gap-2"><FaPhone /> +123 456 789</p>
                    <p className="text-gray-300 flex items-center gap-2"><FaEnvelope /> support@foodiehaven.com</p>
                    <p className="text-gray-300 flex items-center gap-2"><FaMapMarkerAlt /> 123 Food Street, NY</p>

                    <div className="flex space-x-4 mt-4">
                        <a href="#" className="text-yellow-400 text-xl hover:scale-110 transition"><FaFacebookF /></a>
                        <a href="#" className="text-yellow-400 text-xl hover:scale-110 transition"><FaInstagram /></a>
                        <a href="#" className="text-yellow-400 text-xl hover:scale-110 transition"><FaTwitter /></a>
                    </div>
                </div>
            </div>

            <div className="relative text-center text-gray-400 mt-8 border-t border-gray-700 pt-4">
                &copy {new Date().getFullYear()} Food@gmail.com Rights of A.J
            </div>
        </footer>
    </>
}

export default Footer
