import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AdminProtected = ({ compo }) => {
    const user = useSelector(state => state.auth.hotel); // ✅ Get user from Redux

    if (!user || user.role !== "admin") {
        return <Navigate to="/login" replace />; // ✅ Redirect if not an admin
    }

    return (
        <>
            {compo}   {/* ✅ Render AdminLayout */}
            <Outlet /> {/* ✅ Allows child routes like /admin/addcategori */}
        </>
    );
};

export default AdminProtected;
