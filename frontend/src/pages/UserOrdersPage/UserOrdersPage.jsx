import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserOrders, fetchOrderDetails } from "../../redux/slices/orderSlice";
import { toast } from "react-hot-toast";

const UserOrdersPage = () => {
    const dispatch = useDispatch();
    const { orders, loading, error, pagination } = useSelector((state) => state.orders);
    const { authUser } = useSelector((state) => state.auth);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [page, setPage] = useState(1);

    useEffect(() => {
        if (authUser?.UserNo) {
            dispatch(fetchUserOrders({ userNo: authUser.UserNo, page }));
        }
    }, [dispatch, authUser?.UserNo, page]);

    const handlePageChange = (value) => {
        setPage(value);
    };

    const handleViewDetails = async (orderNo) => {
        try {
            await dispatch(fetchOrderDetails(orderNo)).unwrap();
            setSelectedOrder(orderNo);
            setOpenDialog(true);
        } catch (error) {
            toast.error(error.message || "Failed to fetch order details");
        }
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedOrder(null);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getStatusClass = (status) => {
        switch (status) {
            case "Completed":
                return "badge-success";
            case "Pending":
                return "badge-warning";
            default:
                return "badge-error";
        }
    };

    if (loading && !orders.length) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <div className="alert alert-error">
                    <span>{error}</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">My Orders</h1>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Order No</th>
                            <th>Date</th>
                            <th>Total Amount</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.OrderNo}>
                                <td>{order.OrderNo}</td>
                                <td>{formatDate(order.OrderDate)}</td>
                                <td>${order.TotalAmount.toFixed(2)}</td>
                                <td>
                                    <span className={`badge ${getStatusClass(order.Status)}`}>
                                        {order.Status}
                                    </span>
                                </td>
                                <td>
                                    <button
                                        className="btn btn-sm btn-primary"
                                        onClick={() => handleViewDetails(order.OrderNo)}
                                    >
                                        View Details
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {pagination.pages > 1 && (
                <div className="flex justify-center mt-8">
                    <div className="join">
                        {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((pageNum) => (
                            <button
                                key={pageNum}
                                className={`join-item btn btn-sm ${page === pageNum ? 'btn-active' : ''}`}
                                onClick={() => handlePageChange(pageNum)}
                            >
                                {pageNum}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {openDialog && (
                <div className="modal modal-open">
                    <div className="modal-box max-w-3xl">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold">Order Details</h3>
                            <button className="btn btn-sm btn-circle" onClick={handleCloseDialog}>✕</button>
                        </div>
                        <div className="overflow-x-auto">
                            {selectedOrder && (
                                <table className="table w-full">
                                    <thead>
                                        <tr>
                                            <th>Product</th>
                                            <th>Quantity</th>
                                            <th>Price</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders
                                            .find((order) => order.OrderNo === selectedOrder)
                                            ?.OrderDetails?.map((detail) => (
                                                <tr key={detail.OrderDetailNo}>
                                                    <td>
                                                        <div className="flex items-center gap-4">
                                                            <div className="avatar">
                                                                <div className="w-12 h-12 rounded">
                                                                    <img
                                                                        src={detail.ProductImage}
                                                                        alt={detail.ProductName}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <span>{detail.ProductName}</span>
                                                        </div>
                                                    </td>
                                                    <td>{detail.Quantity}</td>
                                                    <td>${detail.Price.toFixed(2)}</td>
                                                    <td>${(detail.Quantity * detail.Price).toFixed(2)}</td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                        <div className="modal-action">
                            <button className="btn" onClick={handleCloseDialog}>Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserOrdersPage; 