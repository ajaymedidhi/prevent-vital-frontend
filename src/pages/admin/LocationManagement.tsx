import React, { useState, useEffect } from 'react';
import { 
    getLocations, createLocation, updateLocation, deleteLocation 
} from '../../admin-shared/services/productService';
import { 
    Plus, Search, Edit2, Trash2, Globe, Check, X, Loader, 
    MapPin, Truck, IndianRupee, Clock
} from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function LocationManagement() {
    const [locations, setLocations] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // Modal Form States
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingLocation, setEditingLocation] = useState<any>(null);
    const [formCity, setFormCity] = useState('');
    const [formPincode, setFormPincode] = useState('');
    const [formCharge, setFormCharge] = useState('');
    const [formDays, setFormDays] = useState('');
    const [formServiceable, setFormServiceable] = useState(true);

    useEffect(() => {
        fetchLocations();
    }, [search, page]);

    const fetchLocations = async () => {
        setLoading(true);
        try {
            const res = await getLocations({ search, page, limit: 15 });
            setLocations(res.data.locations || []);
            setTotalPages(res.totalPages || 1);
        } catch (err: any) {
            toast.error(err.message || 'Failed to fetch locations');
        } finally {
            setLoading(false);
        }
    };

    const handleOpenCreate = () => {
        setEditingLocation(null);
        setFormCity('');
        setFormPincode('');
        setFormCharge('0');
        setFormDays('3');
        setFormServiceable(true);
        setIsModalOpen(true);
    };

    const handleOpenEdit = (loc: any) => {
        setEditingLocation(loc);
        setFormCity(loc.city);
        setFormPincode(loc.pincode);
        setFormCharge(loc.deliveryCharge?.toString() || '0');
        setFormDays(loc.estimatedDays?.toString() || '3');
        setFormServiceable(loc.isServiceable);
        setIsModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to remove this delivery location?')) return;
        try {
            await deleteLocation(id);
            toast.success('Delivery location removed');
            fetchLocations();
        } catch (err: any) {
            toast.error(err.message || 'Failed to remove location');
        }
    };

    const handleToggleServiceable = async (loc: any) => {
        const nextState = !loc.isServiceable;
        try {
            await updateLocation(loc._id, { isServiceable: nextState });
            toast.success(`Serviceability set to ${nextState ? 'enabled' : 'disabled'}`);
            fetchLocations();
        } catch (err: any) {
            toast.error(err.message || 'Failed to update serviceability');
        }
    };

    const handleSave = async () => {
        if (!formCity || !formPincode) {
            toast.error('City and Pincode are required');
            return;
        }

        const payload = {
            city: formCity,
            pincode: formPincode,
            deliveryCharge: Number(formCharge),
            estimatedDays: Number(formDays),
            isServiceable: formServiceable
        };

        try {
            setLoading(true);
            if (editingLocation) {
                await updateLocation(editingLocation._id, payload);
                toast.success('Location updated successfully');
            } else {
                await createLocation(payload);
                toast.success('Location registered successfully');
            }
            setIsModalOpen(false);
            fetchLocations();
        } catch (err: any) {
            toast.error(err.message || 'Failed to save location');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Header section */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Delivery Locations</h1>
                    <p className="text-slate-500 text-sm">Manage serviceable PIN codes, shipping charges, and delivery time estimations.</p>
                </div>
                <button
                    onClick={handleOpenCreate}
                    className="flex items-center justify-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-lg shadow-blue-200 transition-all duration-200 cursor-pointer"
                >
                    <Plus size={18} />
                    <span>Add Delivery Area</span>
                </button>
            </div>

            {/* Search/Filters */}
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        placeholder="Search city name or pincode..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-11 pr-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 focus:bg-white transition-all text-slate-700"
                    />
                </div>
            </div>

            {/* Locations Table */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 font-semibold uppercase text-[11px] tracking-wider">
                            <tr>
                                <th className="px-6 py-4">City</th>
                                <th className="px-6 py-4">Pincode</th>
                                <th className="px-6 py-4">Shipping Charge</th>
                                <th className="px-6 py-4">Est. Delivery Time</th>
                                <th className="px-6 py-4">Serviceable</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {loading && locations.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="text-center py-12">
                                        <Loader className="animate-spin text-blue-600 mx-auto" size={24} />
                                    </td>
                                </tr>
                            ) : locations.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="text-center py-12 text-slate-400">
                                        No delivery locations registered.
                                    </td>
                                </tr>
                            ) : locations.map((loc) => (
                                <tr key={loc._id} className="hover:bg-slate-50/50">
                                    <td className="px-6 py-4 font-bold text-slate-700">{loc.city}</td>
                                    <td className="px-6 py-4 font-mono text-slate-600 font-semibold">{loc.pincode}</td>
                                    <td className="px-6 py-4 font-semibold text-slate-700">
                                        {loc.deliveryCharge === 0 ? (
                                            <span className="text-emerald-600 text-xs font-bold uppercase bg-emerald-50 px-2 py-0.5 rounded">Free</span>
                                        ) : (
                                            `₹${loc.deliveryCharge}`
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-slate-600">{loc.estimatedDays} Business Days</td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => handleToggleServiceable(loc)}
                                            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase transition-all ${
                                                loc.isServiceable 
                                                    ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                                                    : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                                            }`}
                                        >
                                            {loc.isServiceable ? 'Yes' : 'No'}
                                        </button>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => handleOpenEdit(loc)}
                                                className="p-2 text-slate-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                                            >
                                                <Edit2 size={15} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(loc._id)}
                                                className="p-2 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                                            >
                                                <Trash2 size={15} />
                                            </button>
                                        </div>
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

            {/* Modal Form */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl flex flex-col">
                        <div className="px-6 py-4 border-b flex items-center justify-between">
                            <h2 className="text-lg font-bold text-slate-800">
                                {editingLocation ? 'Modify Delivery Area' : 'Register Service Area'}
                            </h2>
                            <button onClick={() => setIsModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-600">
                                <X size={20} />
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">City Name *</label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                    <input
                                        placeholder="e.g. Bangalore"
                                        value={formCity}
                                        onChange={(e) => setFormCity(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">Postal Code (PIN) *</label>
                                <input
                                    placeholder="e.g. 560001"
                                    value={formPincode}
                                    onChange={(e) => setFormPincode(e.target.value)}
                                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 font-mono"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">Shipping Charge (INR)</label>
                                <div className="relative">
                                    <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
                                    <input
                                        type="number"
                                        placeholder="0 for Free Delivery"
                                        value={formCharge}
                                        onChange={(e) => setFormCharge(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">Estimated Delivery Time (Days)</label>
                                <div className="relative">
                                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                    <input
                                        type="number"
                                        placeholder="3"
                                        value={formDays}
                                        onChange={(e) => setFormDays(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500"
                                    />
                                </div>
                            </div>

                            <label className="flex items-center gap-2 cursor-pointer mt-2">
                                <input
                                    type="checkbox"
                                    checked={formServiceable}
                                    onChange={(e) => setFormServiceable(e.target.checked)}
                                    className="w-4.5 h-4.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                />
                                <span className="text-sm font-semibold text-slate-700">Enable delivery for this area immediately</span>
                            </label>
                        </div>
                        <div className="px-6 py-4 border-t flex items-center justify-end gap-2 bg-slate-50 rounded-b-2xl">
                            <button
                                type="button"
                                onClick={() => setIsModalOpen(false)}
                                className="px-4 py-2 border rounded-xl text-sm font-semibold hover:bg-slate-100 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleSave}
                                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold shadow-lg shadow-blue-100 transition-colors"
                            >
                                {editingLocation ? 'Save Changes' : 'Add Area'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
