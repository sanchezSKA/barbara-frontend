import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../components/Layout";

function Invoice() {
  const navigate = useNavigate();
  const [customerName, setCustomerName] = useState("");
  const [amount, setAmount] = useState("");

  const handleCreateInvoice = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "https://barbara-backend-production.up.railway.app/api/invoices",
        { customerName, amount },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Invoice created successfully!");
      navigate("/dashboard");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error("Unauthorized - Token expired or invalid");
        localStorage.removeItem("token");
        navigate("/");
      } else {
        console.error("Error creating invoice:", error);
        alert("Error creating invoice");
      }
    }
  };

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Create New Invoice</h1>
      <form onSubmit={handleCreateInvoice} className="bg-white p-8 rounded shadow-md max-w-md mx-auto">
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Customer Name</label>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Enter customer name"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Amount (€)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Enter amount"
            required
          />
        </div>

        <button
          type="submit"
          className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded text-center"
        >
          Create Invoice
        </button>
      </form>
    </Layout>
  );
}

export default Invoice;