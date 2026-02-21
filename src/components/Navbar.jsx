import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/login");
  }

  return (
    <nav className="flex items-center gap-6 px-6 h-14 bg-white border-b border-gray-200 shadow-sm">
      <Link to="/" className="text-indigo-600 font-bold text-lg mr-auto no-underline">
        AuthApp
      </Link>
      {isAuthenticated ? (
        <>
          <Link to="/profile" className="text-sm text-gray-500 font-medium hover:text-gray-800 no-underline">
            Profile
          </Link>
          <button
            onClick={handleLogout}
            className="text-sm text-gray-500 font-medium border border-gray-200 rounded-lg px-3 py-1.5 hover:bg-gray-50 cursor-pointer bg-white"
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/login" className="text-sm text-gray-500 font-medium hover:text-gray-800 no-underline">
            Login
          </Link>
          <Link to="/register" className="text-sm text-white font-medium bg-indigo-600 hover:bg-indigo-700 px-3 py-1.5 rounded-lg no-underline">
            Register
          </Link>
        </>
      )}
    </nav>
  );
}
