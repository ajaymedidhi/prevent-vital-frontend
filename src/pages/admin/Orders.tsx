import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
    Search, Loader, RefreshCw, Eye, Truck, CreditCard, 
    Calendar, CheckCircle, Clock, XCircle, ChevronRight, X
} from 'lucide-react';
import { toast } from 'react-hot-toast';

const STATUS_FLOW = [
    'pending', 'placed', 'confirmed', 'packed', 'shipped', 'out_for_delivery', 'delivered', 'cancelled', 'returned'
];

export default function AdminOrders() {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState('');
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // Selected order for detailed viewing
    const [selectedOrder, setSelectedOrder] = useState<any>(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    
    // Tracking updates
    const [trackingId, setTrackingId] = useState('');
    const [trackingCarrier, setTrackingCarrier] = useState('');

    useEffect(() => {
        fetchOrders();
    }, [statusFilter, search, page]);

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            if (statusFilter) params.append('status', statusFilter);
            if (search) params.append('search', search);
            params.append('page', page.toString());
            params.append('limit', '10');

            const res = await axios.get('/api/admin/orders', { 
                params,
                headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` }
            });
            setOrders(res.data.data.orders || []);
            setTotalPages(res.data.totalPages || 1);
        } catch (err: any) {
            console.error('Failed to fetch orders:', err);
            toast.error('Failed to fetch orders');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateStatus = async (orderId: string, newStatus: string) => {
        try {
            await axios.patch(`/api/admin/orders/${orderId}/status`, 
                { status: newStatus },
                { headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` } }
            );
            toast.success(`Order status updated to ${newStatus.toUpperCase()}`);
            
            // If the detail drawer is open for this order, update local state
            if (selectedOrder && selectedOrder._id === orderId) {
                setSelectedOrder({ ...selectedOrder, orderStatus: newStatus });
            }
            fetchOrders();
        } catch (err) {
            toast.error('Failed to update status');
        }
    };

    const handleSaveTracking = async () => {
        if (!selectedOrder) return;
        try {
            await axios.patch(`/api/admin/orders/${selectedOrder._id}/status`, 
                { 
                    status: selectedOrder.orderStatus,
                    trackingId,
                    trackingCarrier 
                },
                { headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` } }
            );
            toast.success('Tracking details assigned successfully');
            setSelectedOrder({ 
                ...selectedOrder, 
                tracking: { trackingId, carrier: trackingCarrier }
            });
            fetchOrders();
        } catch (err) {
            toast.error('Failed to save tracking details');
        }
    };

    const getStatusStyles = (status: string) => {
        const styles: any = {
            pending: 'bg-yellow-50 text-yellow-700 border-yellow-100',
            placed: 'bg-blue-50 text-blue-700 border-blue-100',
            confirmed: 'bg-indigo-50 text-indigo-700 border-indigo-100',
            packed: 'bg-sky-50 text-sky-700 border-sky-100',
            shipped: 'bg-purple-50 text-purple-700 border-purple-100',
            out_for_delivery: 'bg-pink-50 text-pink-700 border-pink-100',
            delivered: 'bg-emerald-50 text-emerald-700 border-emerald-100',
            cancelled: 'bg-rose-50 text-rose-700 border-rose-100',
            returned: 'bg-slate-100 text-slate-700 border-slate-200'
        };
        return styles[status] || 'bg-slate-50 text-slate-600 border-slate-100';
    };

    const handleOpenDetail = (order: any) => {
        setSelectedOrder(order);
        setTrackingId(order.tracking?.trackingId || '');
        setTrackingCarrier(order.tracking?.carrier || '');
        setIsDetailOpen(true);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Order Management</h1>
                    <p className="text-slate-500 text-sm">Fulfill orders, check payment status, and assign courier tracking links.</p>
                </div>
                <button onClick={fetchOrders} className="p-2.5 border rounded-xl hover:bg-slate-50 text-slate-400 hover:text-slate-600 transition-colors flex items-center justify-center">
                    <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
                </button>
            </div>

            {/* Filters */}
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        placeholder="Search by Order ID..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-11 pr-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 focus:bg-white transition-all text-slate-700"
                    />
                </div>
                <select
                    className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 text-slate-600"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <option value="">All Statuses</option>
                    {STATUS_FLOW.map(status => (
                        <option key={status} value={status} className="capitalize">{status.replace(/_/g, ' ')}</option>
                    ))}
                </select>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 font-semibold uppercase text-[11px] tracking-wider">
                            <tr>
                                <th className="px-6 py-4">Order ID</th>
                                <th className="px-6 py-4">Customer</th>
                                <th className="px-6 py-4">Items</th>
                                <th className="px-6 py-4">Pricing Total</th>
                                <th className="px-6 py-4">Payment</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {loading && orders.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="text-center py-12">
                                        <Loader className="animate-spin text-blue-600 mx-auto" size={24} />
                                    </td>
                                </tr>
                            ) : orders.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="text-center py-12 text-slate-400">
                                        No orders found.
                                    </td>
                                </tr>
                            ) : orders.map((order) => (
                                <tr key={order._id} className="hover:bg-slate-50/50">
                                    <td className="px-6 py-4 font-mono font-bold text-slate-800">#{order.orderId}</td>
                                    <td className="px-6 py-4">
                                        <div className="font-semibold text-slate-800">
                                            {order.shippingAddress?.fullName || order.userId?.profile?.firstName || 'Walk-in Customer'}
                                        </div>
                                        <div className="text-xs text-slate-400 font-medium">{order.userId?.email}</div>
                                    </td>
                                    <td className="px-6 py-4 text-slate-600 font-semibold">
                                        {order.items?.length || 0} product(s)
                                    </td>
                                    <td className="px-6 py-4 font-bold text-slate-800">₹{order.pricing?.total?.toLocaleString()}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                                            order.payment?.status === 'completed' ? 'bg-emerald-50 text-emerald-700' :
                                            order.payment?.status === 'pending' ? 'bg-yellow-50 text-yellow-700' :
                                            'bg-rose-50 text-rose-700'
                                        }`}>
                                            {order.payment?.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold uppercase border ${getStatusStyles(order.orderStatus)}`}>
                                            {order.orderStatus?.replace(/_/g, ' ')}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => handleOpenDetail(order)}
                                            className="inline-flex items-center gap-1 px-3 py-1.5 border rounded-lg text-xs font-bold hover:bg-slate-50 text-slate-600 cursor-pointer"
                                        >
                                            <Eye size={13} />
                                            <span>Detail View</span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="p-4 border-t border-slate-100 flex items-center justify-between">
                        <button
                            disabled={page === 1}
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                            className="px-4 py-2 border rounded-xl text-sm font-semibold disabled:opacity-50"
                        >
                            Previous
                        </button>
                        <span className="text-slate-500 text-sm">Page {page} of {totalPages}</span>
                        <button
                            disabled={page === totalPages}
                            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                            className="px-4 py-2 border rounded-xl text-sm font-semibold disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>

            {/* Detail Drawer Modal */}
            {isDetailOpen && selectedOrder && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-end">
                    <div className="bg-white w-full max-w-lg h-full shadow-2xl flex flex-col p-6 animate-in slide-in-from-right duration-250">
                        <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                            <div>
                                <h2 className="text-lg font-bold text-slate-800">Order Reference</h2>
                                <span className="text-xs font-mono text-slate-400">#{selectedOrder.orderId}</span>
                            </div>
                            <button onClick={() => setIsDetailOpen(false)} className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto py-6 space-y-6">
                            {/* Order Status Dropdown */}
                            <div className="bg-slate-50 p-4 rounded-xl">
                                <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">Fulfillment Stage</label>
                                <select
                                    value={selectedOrder.orderStatus}
                                    onChange={(e) => handleUpdateStatus(selectedOrder._id, e.target.value)}
                                    className="w-full px-3 py-2 border rounded-lg text-sm bg-white text-slate-700 font-semibold"
                                >
                                    {STATUS_FLOW.map(st => (
                                        <option key={st} value={st} className="capitalize">{st.replace(/_/g, ' ')}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Shipping Information */}
                            <div className="space-y-2">
                                <h3 className="text-xs font-bold uppercase text-slate-400 flex items-center gap-1.5">
                                    <Truck size={14} />
                                    <span>Shipping details</span>
                                </h3>
                                <div className="bg-white border p-4 rounded-xl space-y-2 text-sm text-slate-600">
                                    <div className="font-semibold text-slate-800">{selectedOrder.shippingAddress?.fullName}</div>
                                    <div>{selectedOrder.shippingAddress?.street}</div>
                                    <div>
                                        {selectedOrder.shippingAddress?.city}, {selectedOrder.shippingAddress?.state} - {selectedOrder.shippingAddress?.postalCode}
                                    </div>
                                    <div>Phone: {selectedOrder.shippingAddress?.phone || 'N/A'}</div>
                                </div>
                            </div>

                            {/* Tracking Assignation */}
                            <div className="space-y-3">
                                <h3 className="text-xs font-bold uppercase text-slate-400">Courier Tracking Details</h3>
                                <div className="grid grid-cols-2 gap-3">
                                    <input
                                        placeholder="Tracking ID"
                                        value={trackingId}
                                        onChange={(e) => setTrackingId(e.target.value)}
                                        className="px-3 py-2 border rounded-xl text-sm outline-none"
                                    />
                                    <input
                                        placeholder="Carrier (e.g. BlueDart)"
                                        value={trackingCarrier}
                                        onChange={(e) => setTrackingCarrier(e.target.value)}
                                        className="px-3 py-2 border rounded-xl text-sm outline-none"
                                    />
                                </div>
                                <button
                                    onClick={handleSaveTracking}
                                    className="w-full py-2 bg-slate-800 text-white rounded-xl text-sm font-semibold hover:bg-slate-900"
                                >
                                    Save Tracking Info
                                </button>
                            </div>

                            {/* Product Items */}
                            <div className="space-y-3">
                                <h3 className="text-xs font-bold uppercase text-slate-400">Items Ordered</h3>
                                <div className="divide-y border rounded-xl overflow-hidden">
                                    {selectedOrder.items?.map((item: any, idx: number) => (
                                        <div key={idx} className="flex justify-between items-center p-3 bg-white hover:bg-slate-50/50">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-slate-100 rounded-lg overflow-hidden flex items-center justify-center flex-shrink-0">
                                                    {item.productImage && <img src={item.productImage} alt={item.productName} className="w-full h-full object-cover" />}
                                                </div>
                                                <div>
                                                    <div className="text-sm font-bold text-slate-700">{item.productName}</div>
                                                    <div className="text-xs text-slate-400">Qty: {item.quantity} × ₹{item.price}</div>
                                                </div>
                                            </div>
                                            <span className="text-sm font-bold text-slate-800">₹{item.price * item.quantity}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Pricing breakdown */}
                            <div className="bg-slate-50 p-4 rounded-xl space-y-2 text-sm text-slate-600">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span>₹{selectedOrder.pricing?.subtotal || 0}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Shipping</span>
                                    <span>₹{selectedOrder.pricing?.shipping || 0}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Discount</span>
                                    <span className="text-emerald-600">-₹{selectedOrder.pricing?.discount || 0}</span>
                                </div>
                                <div className="flex justify-between font-bold text-slate-800 border-t pt-2 mt-2">
                                    <span>Total Price</span>
                                    <span>₹{selectedOrder.pricing?.total || 0}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
