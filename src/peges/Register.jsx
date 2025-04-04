import React, { useState } from 'react'
import { useRegisterAdminWaiterMutation } from '../redux/authApi'
import { useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import { toast } from 'react-toastify'

const Register = () => {
    const navigate = useNavigate()
    const [RegisterUser, { isSuccess, isLoading, error, isError }] = useRegisterAdminWaiterMutation()

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        mobile: "",
        password: "",
        // role: ""
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const result = await RegisterUser(formData).unwrap()
            navigate("/login")
            toast.success("Registration successful! 🎉")
            console.log("Success:", result)
            setFormData({ name: "", email: "", mobile: "", password: "", })
        } catch (err) {
            toast.error(err?.data?.message || "Registration failed! ❌")
            console.error("Error:", err)
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-sm p-4 bg-white shadow-md rounded-lg">
                <h2 className="text-xl font-bold text-gray-800 text-center">Create an Account</h2>
                <p className="text-gray-600 text-xs text-center">Sign up to get started</p>
                <form className="space-y-2 mt-3" onSubmit={handleSubmit}>
                    <div className="flex flex-col">
                        <label htmlFor="name" className="text-gray-700 text-sm font-medium">Name</label>
                        <input id="name" type="text" placeholder="Enter your name" value={formData.name} onChange={handleChange} className="mt-1 p-1 bg-gray-100 border rounded-md text-sm focus:ring-2 focus:ring-blue-500 transition-all" />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="email" className="text-gray-700 text-sm font-medium">Email</label>
                        <input id="email" type="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} className="mt-1 p-1 bg-gray-100 border rounded-md text-sm focus:ring-2 focus:ring-blue-500 transition-all" />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="mobile" className="text-gray-700 text-sm font-medium">Mobile</label>
                        <input id="mobile" type="tel" placeholder="Enter your mobile number" value={formData.mobile} onChange={handleChange} className="mt-1 p-1 bg-gray-100 border rounded-md text-sm focus:ring-2 focus:ring-blue-500 transition-all" />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="password" className="text-gray-700 text-sm font-medium">Password</label>
                        <input id="password" type="password" placeholder="Enter your password" value={formData.password} onChange={handleChange} className="mt-1 p-1 bg-gray-100 border rounded-md text-sm focus:ring-2 focus:ring-blue-500 transition-all" />
                    </div>
                    {/* <div className="flex flex-col">
                        <label htmlFor="role" className="text-gray-700 text-sm font-medium">Role</label>
                        <select id="role" value={formData.role} onChange={handleChange} className="mt-1 p-1 bg-gray-100 border rounded-md text-sm focus:ring-2 focus:ring-blue-500 transition-all">
                            <option value="">Select Role</option>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                        </select>
                    </div> */}
                    {/* <div>
                        <select name="" id="">
                            optio
                        </select>
                    </div> */}
                    <button type="submit" disabled={isLoading} className="w-full bg-blue-500 text-white text-sm font-medium p-2 rounded-md hover:bg-blue-600 transition-all">
                        {isLoading ? "Signing Up..." : "Sign Up"}
                    </button>
                    <button type="button" className="w-full flex items-center justify-center gap-2 border border-gray-300 text-gray-700 text-sm p-2 rounded-md hover:bg-gray-200 transition-all">
                        <FcGoogle className="text-lg" />
                        Sign up with Google
                    </button>
                    <p className="text-center text-gray-700 text-xs">
                        Already have an account? <a href="/login" className="text-blue-500 font-medium hover:underline">Login</a>
                    </p>
                    {isError && <p className="text-red-500 text-center text-xs">{error?.data?.message || "Something went wrong!"}</p>}
                </form>
            </div>
        </div>
    )
}

export default Register
