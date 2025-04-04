import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { useLoginAdminWaiterMutation } from "../redux/authApi"
import { useSelector } from "react-redux"

const Login = () => {
    const user = useSelector((state) => state.auth.hotel)
    const navigate = useNavigate()
    const [loginAdminWaiter, { isLoading, error }] = useLoginAdminWaiterMutation()

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    const [errors, setErrors] = useState({})

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value })
        setErrors({ ...errors, [e.target.id]: "" })
    }

    const validateForm = () => {
        let newErrors = {}
        if (!formData.email.trim()) newErrors.email = "Email is required"
        if (!formData.password.trim()) newErrors.password = "Password is required"

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!validateForm()) return

        try {
            const response = await loginAdminWaiter(formData).unwrap()
            console.log("Login API Response:", response)
            console.log("User Role:", response?.role)

            if (response?.role === "admin") {
                toast.success("Admin login successful! 🎉")
                navigate("/admin")
            } else if (response?.role === "user") {
                toast.success("User login successful! 🎉")
                navigate("/")
            } else {
                toast.error("Access denied! ❌ Invalid role.")
                return
            }

            setFormData({ email: "", password: "" })

        } catch (err) {
            toast.error(err?.data?.message || "Login failed! ❌")
            console.error("Error:", err)
        }
    }



    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-sm p-4 bg-white shadow-md rounded-lg">
                <h2 className="text-xl font-bold text-gray-800 text-center">Login</h2>
                <p className="text-gray-600 text-xs text-center">Enter your credentials</p>
                <form className="space-y-2 mt-3" onSubmit={handleSubmit}>
                    <div className="flex flex-col">
                        <label htmlFor="email" className="text-gray-700 text-sm font-medium">Email</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-1 p-1 bg-gray-100 border rounded-md text-sm focus:ring-2 focus:ring-blue-500 transition-all"
                        />
                        {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="password" className="text-gray-700 text-sm font-medium">Password</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            className="mt-1 p-1 bg-gray-100 border rounded-md text-sm focus:ring-2 focus:ring-blue-500 transition-all"
                        />
                        {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white text-sm font-medium p-2 rounded-md hover:bg-blue-600 transition-all" disabled={isLoading}>
                        {isLoading ? "Logging in..." : "Login"}
                    </button>
                    {error && <p className="text-red-500 text-center text-xs">{error?.data?.message || "Something went wrong!"}</p>}
                    <p className="text-center text-gray-700 text-xs">
                        Don't have an account? <a href="/register" className="text-blue-500 font-medium hover:underline">Sign Up</a>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Login
