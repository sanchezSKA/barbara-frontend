import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Invoice from "./pages/Invoice";
import InvoiceDetails from "./pages/InvoiceDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
		<Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/invoice" element={<Invoice />} />
		<Route path="/invoice/:id" element={<InvoiceDetails />} />
      </Routes>
    </Router>
  );
}

export default App;