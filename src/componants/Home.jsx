import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { FiSearch, FiShoppingBag, FiUser, FiLogOut, FiSettings } from "react-icons/fi"
import { FaUserCircle } from "react-icons/fa"
import { MdDashboard } from "react-icons/md"
import { IoMdMenu } from "react-icons/io"
import { useLogoutAdminWaiterMutation } from "../redux/authApi"
import { toast } from "react-toastify"
import Categories from "../peges/Categories"
import Brands from "../peges/Brands"
import Footer from "../peges/Footer"
import { Link, useNavigate } from "react-router-dom"

const Home = () => {
    const [logout, { isSuccess }] = useLogoutAdminWaiterMutation()
    const [isDropdownOpen, setDropdownOpen] = useState(false)
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)
    const user = useSelector((state) => state.auth.hotel)
    const navigate = useNavigate()

    useEffect(() => {
        if (isSuccess) {
            toast.success("logout success")
        }
    }, [isSuccess])
    const handlePrint = () => {
        window.print()
    }
    const handleCategoryClick = (id) => {
        if (user) {
            navigate("/booking")
        } else {
            toast.error("Please log in to continue! 🔒")
        }
    }

    return <>
        <nav className="bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg py-2 sticky top-0 z-50">
            <div className="container mx-auto px-4 flex justify-between items-center">

                {/* Left Side - Logo */}
                <div className="flex items-center space-x-3">
                    <a href="/">
                        <img
                            src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&auto=format&fit=crop&q=60"
                            width="40"
                            height="40"
                            alt="Logo"
                            className="rounded-lg shadow-md"
                        />
                    </a>
                </div>

                <div className="hidden md:flex space-x-2 h-[40px] font-semibold">
                    <a href="/" className="px-5 py-2 rounded-lg bg-blue-500 text-white shadow-md hover:bg-blue-600 transition">
                        Home
                    </a>
                    <a href="/contact" className="px-5 py-2 rounded-lg bg-blue-500 text-white shadow-md hover:bg-blue-600 transition">
                        Contact
                    </a>
                    <a href="/location" className="px-5 py-2 rounded-lg bg-blue-500 text-white shadow-md hover:bg-blue-600 transition">
                        Location
                    </a>
                </div>


                <div className="flex items-center space-x-3">

                    <div className="hidden md:flex items-center bg-white text-gray-900 px-2 py-1 rounded shadow-sm">
                        <FiSearch className="text-gray-500" />
                        <input
                            type="search"
                            className="outline-none px-2 bg-transparent w-24 text-sm"
                            placeholder="Search..."
                        />
                    </div>

                    <div className="relative hover:bg-white hover:text-blue-600 p-1 rounded-full transition duration-300 shadow-sm">
                        <FiShoppingBag className="text-xl" />
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">3</span>
                    </div>

                    <div className="relative">
                        <button
                            className="hover:bg-white hover:text-blue-600 p-1 rounded-full transition duration-300 shadow-sm flex items-center"
                            onClick={() => setDropdownOpen(!isDropdownOpen)}
                        >
                            <FaUserCircle className="text-xl" />
                        </button>

                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white text-gray-900 shadow-lg rounded-lg overflow-hidden">
                                <div className="p-3 border-b">
                                    {user ? (
                                        <>
                                            <p className="font-bold">{user.name}</p>
                                            <p className="text-xs text-gray-600">{user.email}</p>
                                        </>
                                    ) : (
                                        <p className="text-xs text-gray-600">Not logged in</p>
                                    )}
                                </div>
                                {user ? (
                                    <ul>
                                        <li className="p-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2 text-sm">
                                            <MdDashboard /> Dashboard
                                        </li>
                                        <li className="p-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2 text-sm">
                                            <FiSettings /> Settings
                                        </li>
                                        <li
                                            className="p-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2 text-sm text-red-500 font-bold"
                                            onClick={logout}
                                        >
                                            <FiLogOut /> Logout
                                        </li>
                                    </ul>
                                ) : null}
                            </div>
                        )}
                    </div>

                    <button
                        onClick={handlePrint}
                        className="bg-white text-blue-600 hover:text-purple-600 px-3 py-1 rounded-full text-sm font-bold transition duration-300 shadow-sm"
                    >
                        Print
                    </button>

                    {!user && (
                        <a
                            href="/login"
                            className="bg-white text-blue-600 hover:text-purple-600 px-3 py-1 rounded-full text-sm font-bold transition duration-300 shadow-sm"
                        >
                            Login
                        </a>
                    )}
                </div>

                <button
                    className="md:hidden text-2xl p-1 rounded bg-white text-blue-600 hover:text-purple-600 transition"
                    onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                >
                    <IoMdMenu />
                </button>

            </div>
        </nav>


        <div id="gallery" className="py-12 bg-yellow-100">
            <div className="container mx-auto flex flex-col lg:flex-row items-center gap-8">
                <div className="swiper mySwiper relative w-full lg:w-2/3 max-w-4xl mx-auto h-[50vh] min-h-[350px]">
                    <div className="swiper-wrapper">
                        <div className="swiper-slide">
                            <img src="assets/images/bt4.jpg" className="w-full h-full object-cover rounded-3xl shadow-lg hover:scale-105 transition" />
                        </div>
                        <div className="swiper-slide">
                            <img src="assets/images/bt2.jpg" className="w-full h-full object-cover rounded-3xl shadow-lg hover:scale-105 transition" />
                        </div>
                        <div className="swiper-slide">
                            <img src="assets/images/bt3.jpg" className="w-full h-full object-cover rounded-3xl shadow-lg hover:scale-105 transition" />
                        </div>
                        <div className="swiper-slide">
                            <img src="assets/images/bt4.jpg" className="w-full h-full object-cover rounded-3xl shadow-lg hover:scale-105 transition" />
                        </div>
                    </div>

                    <div className="swiper-button-wp flex justify-between items-center mt-4">
                        <div className="swiper-button-prev w-10 h-10 flex items-center justify-center text-md bg-white text-gray-900 rounded-full shadow-md transition hover:text-yellow-500 hover:shadow-md">
                            ❮
                        </div>
                        <div className="swiper-pagination py-2 px-4 rounded-full bg-gray-200 shadow-md"></div>
                        <div className="swiper-button-next w-10 h-10 flex items-center justify-center text-md bg-white text-gray-900 rounded-full shadow-md transition hover:text-yellow-500 hover:shadow-md">
                            ❯
                        </div>
                    </div>
                </div>

                <div className="w-full lg:w-1/3 bg-yellow-100 rounded-3xl shadow-lg p-6 flex flex-col items-center text-center">
                    <img src="assets/images/loader.gif" alt="Hotel India" className="w-full h-56 object-cover rounded-xl mb-4" />
                    <h2 className="text-2xl font-bold text-gray-900">Luxury Hotel India</h2>
                    <p className="text-gray-600 mt-2">
                        Experience the best luxury stay in India. Book online now for a seamless experience!
                    </p>

                    <button onClick={handleCategoryClick} className="mt-4 bg-yellow-500 text-white px-6 py-2 rounded-lg text-lg shadow-md hover:bg-yellow-600 transition">
                        Book Now
                    </button>
                </div>
            </div>
        </div>
        <Categories />
        <Brands />
        <Footer />


    </>

}


export default Home
