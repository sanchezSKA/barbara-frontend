import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../components/Layout";

function InvoiceDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [invoice, setInvoice] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }
    fetchInvoice(token);
  }, [id, navigate]);

  const fetchInvoice = async (token) => {
    try {
      const response = await axios.get(`https://barbara-backend-production.up.railway.app/api/invoices/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setInvoice(response.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error("Unauthorized - Token expired or invalid");
        localStorage.removeItem("token");
        navigate("/");
      } else {
        console.error("Error fetching invoice details:", error);
        navigate("/dashboard");
      }
    }
  };

  const handleMarkAsPaid = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:5000/api/invoices/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Invoice marked as paid!");
      navigate("/dashboard");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error("Unauthorized - Token expired or invalid");
        localStorage.removeItem("token");
        navigate("/");
      } else {
        console.error("Error updating invoice status:", error);
        alert("Error updating invoice.");
      }
    }
  };

  return (
    <Layout>
      {invoice ? (
        <div className="max-w-md mx-auto bg-white p-8 rounded shadow-md">
          <h1 className="text-2xl font-bold mb-4 text-gray-800">Invoice Details</h1>
          <div className="space-y-2 text-gray-700">
            <p><strong>Customer:</strong> {invoice.customer_name}</p>
            <p><strong>Amount:</strong> €{invoice.amount}</p>
            <p><strong>Status:</strong> {invoice.status}</p>
            <p><strong>Issue Date:</strong> {invoice.issue_date.split('T')[0]}</p>
            <p><strong>Due Date:</strong> {invoice.due_date.split('T')[0]}</p>
          </div>

          <div className="flex gap-4 mt-6">
            <button
              onClick={() => navigate("/dashboard")}
              className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded text-center"
            >
              Back to Dashboard
            </button>

            {invoice.status !== "paid" && (
              <button
                onClick={handleMarkAsPaid}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded text-center"
              >
                Mark as Paid
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-64 text-gray-500 text-lg">
		Loading invoice...
		</div>
      )}
    </Layout>
  );
}

export default InvoiceDetails;
