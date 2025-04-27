import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../components/Layout";

function Dashboard() {
  const navigate = useNavigate();
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    } else {
      fetchInvoices(token);
    }
  }, [navigate]);

  const fetchInvoices = async (token) => {
    try {
      const response = await axios.get("https://barbara-backend-production.up.railway.app/api/invoices", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setInvoices(response.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error("Unauthorized - Token expired or invalid");
        localStorage.removeItem("token");
        navigate("/");
      } else {
        console.error("Error fetching invoices:", error);
      }
    }
  };

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Your Invoices</h1>
      <div className="overflow-x-auto bg-white rounded shadow p-4">
        <table className="min-w-full">
          <thead>
            <tr className="text-left">
              <th className="py-2 px-4">Customer</th>
              <th className="py-2 px-4">Amount (€)</th>
              <th className="py-2 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.id} className="border-t">
                <td className="py-2 px-4">
                  <Link to={`/invoice/${invoice.id}`} className="text-blue-500 hover:underline">
                    {invoice.customer_name}
                  </Link>
                </td>
                <td className="py-2 px-4">{invoice.amount}</td>
                <td className="py-2 px-4">{invoice.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

export default Dashboard;