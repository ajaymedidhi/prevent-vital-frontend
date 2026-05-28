import React, { useState, useEffect } from 'react';
import { 
    getInventory, updateStock, getInventoryLogs 
} from '../../admin-shared/services/productService';
import { 
    Search, AlertTriangle, ArrowUpRight, History, Package, 
    RefreshCw, Filter, Loader, AlertCircle, Plus, Minus, User
} from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function InventoryManagement() {
    const [inventory, setInventory] = useState<any[]>([]);
    const [logs, setLogs] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [logsLoading, setLogsLoading] = useState(false);
    const [viewMode, setViewMode] = useState<'levels' | 'history'>('levels');
    const [lowStockFilter, setLowStockFilter] = useState(false);
    
    // Pagination
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    
    // Log pagination
    const [logPage, setLogPage] = useState(1);
    const [totalLogPages, setTotalLogPages] = useState(1);

    // Adjustment Modal
    const [isAdjustModalOpen, setIsAdjustModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const [adjustQty, setAdjustQty] = useState('');
    const [adjustAction, setAdjustAction] = useState<'restock' | 'correction'>('restock');
    const [adjustReason, setAdjustReason] = useState('');
    const [newThreshold, setNewThreshold] = useState('');

    useEffect(() => {
        if (viewMode === 'levels') {
            fetchInventory();
        } else {
            fetchLogs();
        }
    }, [viewMode, lowStockFilter, page, logPage]);

    const fetchInventory = async () => {
        setLoading(true);
        try {
            const res = await getInventory({
                lowStock: lowStockFilter ? 'true' : 'false',
                page,
                limit: 10
            });
            setInventory(res.data.inventory || []);
            setTotalPages(res.totalPages || 1);
        } catch (err: any) {
            toast.error(err.message || 'Failed to fetch inventory');
        } finally {
            setLoading(false);
        }
    };

    const fetchLogs = async () => {
        setLogsLoading(true);
        try {
            const res = await getInventoryLogs({
                page: logPage,
                limit: 15
            });
            setLogs(res.data.logs || []);
            setTotalLogPages(res.totalPages || 1);
        } catch (err: any) {
            toast.error(err.message || 'Failed to fetch audit logs');
        } finally {
            setLogsLoading(false);
        }
    };

    const handleOpenAdjust = (item: any) => {
        setSelectedItem(item);
        setAdjustQty('');
        setAdjustAction('restock');
        setAdjustReason('');
        setNewThreshold(item.lowStockThreshold?.toString() || '5');
        setIsAdjustModalOpen(true);
    };

    const handleSaveAdjustment = async () => {
        if (!selectedItem) return;

        let availableStock = undefined;
        if (adjustQty) {
            const qty = Number(adjustQty);
            if (isNaN(qty)) {
                toast.error('Adjust quantity must be a valid number');
                return;
            }
            availableStock = selectedItem.availableStock + qty;
            if (availableStock < 0) {
                toast.error('Adjusted stock cannot drop below zero');
                return;
            }
        }

        const payload = {
            availableStock,
            lowStockThreshold: newThreshold ? Number(newThreshold) : undefined,
            action: adjustAction,
            reason: adjustReason || 'Admin adjustment'
        };

        try {
            setLoading(true);
            await updateStock(selectedItem.product._id, payload);
            toast.success('Stock adjusted successfully');
            setIsAdjustModalOpen(false);
            fetchInventory();
        } catch (err: any) {
            toast.error(err.message || 'Failed to update stock');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Header section */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Inventory Control</h1>
                    <p className="text-slate-500 text-sm">Monitor stock allocation, adjust counts, and track changes.</p>
                </div>
                
                {/* Navigation switcher */}
                <div className="flex border border-slate-200 rounded-xl p-1 bg-slate-50/50">
                    <button
                        onClick={() => setViewMode('levels')}
                        className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
                            viewMode === 'levels'
                                ? 'bg-white text-blue-600 shadow-sm'
                                : 'text-slate-500 hover:text-slate-800'
                        }`}
                    >
                        <Package size={16} />
                        <span>Stock Levels</span>
                    </button>
                    <button
                        onClick={() => setViewMode('history')}
                        className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
                            viewMode === 'history'
                                ? 'bg-white text-blue-600 shadow-sm'
                                : 'text-slate-500 hover:text-slate-800'
                        }`}
                    >
                        <History size={16} />
                        <span>Audit Log</span>
                    </button>
                </div>
            </div>

            {/* Quick stats and filters */}
            {viewMode === 'levels' ? (
                <>
                    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Filter size={16} className="text-slate-400" />
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={lowStockFilter}
                                    onChange={(e) => setLowStockFilter(e.target.checked)}
                                    className="w-4.5 h-4.5 rounded border-slate-300 text-rose-600 focus:ring-rose-500"
                                />
                                <span className="text-sm font-semibold text-slate-700">Show only low stock warnings</span>
                            </label>
                        </div>
                        <button onClick={fetchInventory} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg">
                            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
                        </button>
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 font-semibold uppercase text-[11px] tracking-wider">
                                    <tr>
                                        <th className="px-6 py-4">Product Details</th>
                                        <th className="px-6 py-4">SKU</th>
                                        <th className="px-6 py-4">Available</th>
                                        <th className="px-6 py-4">Reserved</th>
                                        <th className="px-6 py-4">Sold</th>
                                        <th className="px-6 py-4">Threshold</th>
                                        <th className="px-6 py-4">Alert</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {loading && inventory.length === 0 ? (
                                        <tr>
                                            <td colSpan={8} className="text-center py-12">
                                                <Loader className="animate-spin text-blue-600 mx-auto" size={24} />
                                            </td>
                                        </tr>
                                    ) : inventory.length === 0 ? (
                                        <tr>
                                            <td colSpan={8} className="text-center py-12 text-slate-400">
                                                No inventory records found.
                                            </td>
                                        </tr>
                                    ) : inventory.map((item) => {
                                        const isLow = item.availableStock <= item.lowStockThreshold;
                                        return (
                                            <tr key={item._id} className="hover:bg-slate-50/50">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-lg bg-slate-50 border flex items-center justify-center overflow-hidden">
                                                            {item.product?.thumbnail ? (
                                                                <img src={item.product.thumbnail} alt={item.product.name} className="w-full h-full object-cover" />
                                                            ) : (
                                                                <Package className="text-slate-400" size={18} />
                                                            )}
                                                        </div>
                                                        <div className="font-semibold text-slate-800">{item.product?.name || 'Deleted Product'}</div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 font-mono text-slate-500 font-semibold">{item.product?.sku || 'N/A'}</td>
                                                <td className="px-6 py-4 font-bold text-slate-700">{item.availableStock}</td>
                                                <td className="px-6 py-4 text-slate-500">{item.reservedStock}</td>
                                                <td className="px-6 py-4 text-slate-500">{item.soldStock}</td>
                                                <td className="px-6 py-4 text-slate-500">{item.lowStockThreshold}</td>
                                                <td className="px-6 py-4">
                                                    {isLow ? (
                                                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 animate-pulse">
                                                            <AlertTriangle size={12} />
                                                            <span>Low Stock</span>
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700">
                                                            <span>Adequate</span>
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <button
                                                        onClick={() => handleOpenAdjust(item)}
                                                        className="px-3 py-1.5 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-xs font-semibold cursor-pointer"
                                                    >
                                                        Adjust Stock
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            ) : (
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 font-semibold uppercase text-[11px] tracking-wider">
                                <tr>
                                    <th className="px-6 py-4">Timestamp</th>
                                    <th className="px-6 py-4">Product</th>
                                    <th className="px-6 py-4">Quantity Changed</th>
                                    <th className="px-6 py-4">Action</th>
                                    <th className="px-6 py-4">Reason</th>
                                    <th className="px-6 py-4">Operator</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {logsLoading && logs.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="text-center py-12">
                                            <Loader className="animate-spin text-blue-600 mx-auto" size={24} />
                                        </td>
                                    </tr>
                                ) : logs.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="text-center py-12 text-slate-400">
                                            No adjustment history found.
                                        </td>
                                    </tr>
                                ) : logs.map((log) => (
                                    <tr key={log._id} className="hover:bg-slate-50/50">
                                        <td className="px-6 py-4 text-slate-400 font-mono text-xs">
                                            {new Date(log.createdAt).toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 font-semibold text-slate-700">
                                            {log.product?.name || 'Deleted Product'}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1 font-bold ${
                                                log.changedQty > 0 ? 'text-emerald-600' : 'text-rose-600'
                                            }`}>
                                                {log.changedQty > 0 ? `+${log.changedQty}` : log.changedQty}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 capitalize font-semibold text-slate-500">
                                            {log.action?.replace('_', ' ')}
                                        </td>
                                        <td className="px-6 py-4 text-slate-500 text-xs">
                                            {log.reason || 'None'}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-600">
                                                    OP
                                                </div>
                                                <span className="text-slate-600 font-medium">
                                                    {log.performedBy?.profile?.firstName ? `${log.performedBy.profile.firstName} ${log.performedBy.profile.lastName}` : log.performedBy?.email}
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Adjust Modal */}
            {isAdjustModalOpen && selectedItem && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl flex flex-col">
                        <div className="px-6 py-4 border-b flex items-center justify-between">
                            <h2 className="text-lg font-bold text-slate-800">Adjust Stock Count</h2>
                            <button onClick={() => setIsAdjustModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-600">
                                <X size={20} />
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="bg-slate-50 p-4 rounded-xl">
                                <span className="text-xs font-bold text-slate-400 block uppercase">Product Name</span>
                                <span className="text-sm font-bold text-slate-700">{selectedItem.product?.name}</span>
                                <div className="mt-2 flex justify-between text-xs font-semibold text-slate-500">
                                    <span>Current stock: {selectedItem.availableStock} units</span>
                                    <span>Reserved: {selectedItem.reservedStock}</span>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Adjustment Quantity</label>
                                <div className="flex gap-2">
                                    <input
                                        type="number"
                                        placeholder="e.g. +10, -5"
                                        value={adjustQty}
                                        onChange={(e) => setAdjustQty(e.target.value)}
                                        className="w-full px-4 py-2 border rounded-xl text-sm outline-none focus:border-blue-500"
                                    />
                                </div>
                                <span className="text-[10px] text-slate-400 mt-1 block">Prefix with minus sign (-) to reduce stock, or positive number to add.</span>
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Adjustment Type</label>
                                <select
                                    value={adjustAction}
                                    onChange={(e: any) => setAdjustAction(e.target.value)}
                                    className="w-full px-4 py-2 border rounded-xl text-sm outline-none focus:border-blue-500 text-slate-600 bg-white"
                                >
                                    <option value="restock">Stock Restock (Add units)</option>
                                    <option value="correction">Inventory Correction (Audit correction)</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Low Stock Warning Threshold</label>
                                <input
                                    type="number"
                                    value={newThreshold}
                                    onChange={(e) => setNewThreshold(e.target.value)}
                                    className="w-full px-4 py-2 border rounded-xl text-sm outline-none focus:border-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Reason / Notes</label>
                                <textarea
                                    placeholder="Provide reason for stock change..."
                                    value={adjustReason}
                                    onChange={(e) => setAdjustReason(e.target.value)}
                                    rows={2}
                                    className="w-full px-4 py-2 border rounded-xl text-sm outline-none focus:border-blue-500"
                                />
                            </div>
                        </div>
                        <div className="px-6 py-4 border-t flex items-center justify-end gap-2 bg-slate-50 rounded-b-2xl">
                            <button
                                type="button"
                                onClick={() => setIsAdjustModalOpen(false)}
                                className="px-4 py-2 border rounded-xl text-sm font-semibold hover:bg-slate-100 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleSaveAdjustment}
                                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold shadow-lg shadow-blue-100 transition-colors"
                            >
                                Apply Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// X icon missing import
const X = (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
);
