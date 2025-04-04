import { Link } from "react-router-dom"

const AdminSidebar = () => {

  const LINKS = [
    { label: "Photographer", to: "/admin/addcategori" },
    { label: "getcategory", to: "/admin/getcategory" },
  ];

  return (
    <div
      className="bg-black text-white"
      style={{
        width: "200px",
        height: "100vh",
        position: "fixed",
        top: "0",
        left: "0",
      }}
    >
      <div className="bg-primary d-flex justify-content-center align-items-center fs-4" style={{ height: "55px" }}>
        Flipkart-Lite
      </div>

      {LINKS.map((item, index) => (
        <div key={index} className="bg-light d-flex align-items-center px-3" style={{ height: "55px" }}>
          <span className="text-dark me-2">{item.icon}</span>
          <Link className="text-decoration-none text-dark text-uppercase" to={item.to}>
            {item.label}
          </Link>
        </div>
      ))}
    </div>
  );
}

export default AdminSidebar;
