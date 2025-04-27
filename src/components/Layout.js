import { Link, useNavigate } from "react-router-dom";

function Layout({ children }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md hidden md:block">
        <div className="p-6 text-2xl font-bold text-green-600">Barbara</div>
        <nav className="flex flex-col p-4 space-y-2">
          <Link to="/dashboard" className="text-gray-700 hover:text-green-600">
            Dashboard
          </Link>
          <Link to="/invoice" className="text-gray-700 hover:text-green-600">
            Create Invoice
          </Link>
          {/* Future links */}
          {/* <Link to="/settings" className="text-gray-700 hover:text-green-600">
            Settings
          </Link> */}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="bg-white shadow-md p-4 flex justify-end items-center">
		<button
		  onClick={handleLogout}
		  className="bg-green-500 hover:bg-green-600 text-white font-medium py-1 px-3 rounded text-sm"
		>
		  Logout
		</button>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-gray-200 text-center p-2 text-sm text-gray-600">
          Barbara © 2025
        </footer>
      </div>
    </div>
  );
}

export default Layout;