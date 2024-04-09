import React, { useState, useEffect } from "react";
import axios from "axios";

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
console.log(orders);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/orders")
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  }, []);

  return (
    <div>
      {!orders ? (
        <h1>No orders</h1>
      ) : (
        <>
          <h1 className="text-xl font-bold mb-4">All Orders</h1>
          <div className="grid grid-cols-1 gap-4">
            {orders.map((order) => (
              <div key={order._id} className="border p-4 rounded-md">
                <h2 className="text-lg font-semibold">{order.customerName}</h2>
                <p>Status: {order.status}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AllOrders;
