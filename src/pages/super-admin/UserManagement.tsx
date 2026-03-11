import React, { useState, useEffect } from 'react';
import { User } from '../../types/auth';
import { Modal } from '../../admin-shared/components/ui';
import { Users, Shield, UserPlus, Search, Filter, MoreVertical, Edit2, Ban, CheckCircle, Activity, Building2, Eye } from 'lucide-react';
import superAdminApi from '../../admin-shared/services/superAdminApi';
import toast from 'react-hot-toast';

const UserManagement = () => {
    const [users, setUsers] = useState<(User & { _id: string, createdAt: string })[]>([]);
    const [loading, setLoading] = useState(true);

    // Modals state
    const [isAddingUser, setIsAddingUser] = useState(false);
    const [isViewingUser, setIsViewingUser] = useState(false);
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [newUserData, setNewUserData] = useState({ name: '', email: '', password: '', role: 'admin' });

    // Search & Filter
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('all'); // 'all', 'admins', 'creators', 'corporate', 'b2c'

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await superAdminApi.get('/users?limit=1000');
            setUsers(res.data?.users || res.data?.data?.users || []);
            setLoading(false);
        } catch (err) {
            console.error(err);
            toast.error("Failed to load staff list");
            setLoading(false);
        }
    };

    const handleSuspend = async (id: string, currentStatus: string) => {
        const newStatus = currentStatus === 'active' ? 'suspended' : 'active';
        if (!window.confirm(`Are you sure you want to change status to ${newStatus}?`)) return;

        try {
            await superAdminApi.patch(`/users/${id}/suspend`, { status: newStatus });
            fetchUsers();
            toast.success(`User successfully ${newStatus}`);
        } catch (err) {
            toast.error('Error updating user status');
        }
    };

    const handleCreateUser = async () => {
        try {
            await superAdminApi.post('/users', newUserData);
            fetchUsers();
            setIsAddingUser(false);
            setNewUserData({ name: '', email: '', password: '', role: 'admin' });
            toast.success('Successfully provisioned new administrator');
        } catch (err) {
            console.error('Error creating user', err);
            toast.error('Error creating user');
        }
    };

    const filteredUsers = users.filter(u => {
        const matchesSearch = (u.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
            (u.email?.toLowerCase() || '').includes(searchTerm.toLowerCase());

        if (!matchesSearch) return false;

        if (activeCategory === 'admins') return u.role === 'admin' || u.role === 'super_admin';
        if (activeCategory === 'creators') return u.role === 'content_creator';
        if (activeCategory === 'corporate') return u.role === 'corporate_admin' || (u.role === 'customer' && u.customerType === 'corporate');
        if (activeCategory === 'b2c') return u.role === 'customer' && u.customerType === 'individual';

        return true;
    });

    // Detailed KPIs
    const adminsCount = users.filter(u => u.role === 'admin' || u.role === 'super_admin').length;
    const creatorsCount = users.filter(u => u.role === 'content_creator').length;
    const corporateCount = users.filter(u => u.role === 'corporate_admin' || (u.role === 'customer' && u.customerType === 'corporate')).length;
    const b2cCount = users.filter(u => u.role === 'customer' && u.customerType === 'individual').length;

    if (loading) return (
        <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
    );

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-10">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Staff & Roles</h2>
                    <p className="text-sm text-gray-500 mt-1">Manage platform administrators and corporate staff access.</p>
                </div>
                <button
                    onClick={() => setIsAddingUser(true)}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-sm transition-colors"
                >
                    <UserPlus size={16} />
                    Provision User
                </button>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col justify-between">
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Total Staff</p>
                    <div className="flex justify-between items-end">
                        <h3 className="text-2xl font-bold text-gray-900">{users.length}</h3>
                        <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                            <Users size={16} />
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col justify-between">
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Admins</p>
                    <div className="flex justify-between items-end">
                        <h3 className="text-2xl font-bold text-gray-900">{adminsCount}</h3>
                        <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center text-purple-600">
                            <Shield size={16} />
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col justify-between">
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Creators</p>
                    <div className="flex justify-between items-end">
                        <h3 className="text-2xl font-bold text-gray-900">{creatorsCount}</h3>
                        <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600">
                            <Activity size={16} />
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col justify-between">
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Corporate</p>
                    <div className="flex justify-between items-end">
                        <h3 className="text-2xl font-bold text-gray-900">{corporateCount}</h3>
                        <div className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center text-amber-600">
                            <Building2 size={16} />
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col justify-between">
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">B2C Users</p>
                    <div className="flex justify-between items-end">
                        <h3 className="text-2xl font-bold text-gray-900">{b2cCount}</h3>
                        <div className="w-8 h-8 bg-pink-50 rounded-lg flex items-center justify-center text-pink-600">
                            <CheckCircle size={16} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Table Area */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Tabs, Search and Filter Bar */}
                <div className="px-6 py-4 border-b border-gray-100 flex flex-col space-y-4 bg-gray-50/50">
                    <div className="flex flex-wrap gap-2">
                        {[
                            { id: 'all', label: 'All Users' },
                            { id: 'admins', label: 'Admins' },
                            { id: 'creators', label: 'Creators' },
                            { id: 'corporate', label: 'Corporate' },
                            { id: 'b2c', label: 'B2C Consumers' }
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveCategory(tab.id)}
                                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${activeCategory === tab.id ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-gray-500 border border-gray-200 hover:border-blue-300 hover:text-blue-600'}`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                        <div className="relative w-full sm:max-w-xs">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Search name or email..."
                                className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center gap-2 w-full sm:w-auto">
                            <button className="flex items-center justify-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 bg-white w-full sm:w-auto">
                                <Filter size={16} /> Filter Roles
                            </button>
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-600">
                        <thead className="bg-white text-gray-500 font-semibold text-xs uppercase tracking-wider border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4">User Details</th>
                                <th className="px-6 py-4">System Role</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Date Added</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredUsers.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                                        No users found matching your search.
                                    </td>
                                </tr>
                            ) : filteredUsers.map(user => (
                                <tr key={user._id} className="hover:bg-gray-50/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 font-bold text-sm shadow-sm ring-2 ring-white">
                                                {user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <div className="font-semibold text-gray-900">{user.name || 'Unnamed User'}</div>
                                                <div className="text-xs text-gray-500 mt-0.5">{user.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wide uppercase border
                                            ${user.role === 'super_admin' ? 'bg-purple-100 text-purple-700 border-purple-200' :
                                                user.role === 'admin' ? 'bg-blue-100 text-blue-700 border-blue-200' :
                                                    user.role === 'content_creator' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' :
                                                        user.role === 'corporate_admin' ? 'bg-amber-100 text-amber-700 border-amber-200' :
                                                            user.role === 'customer' ? 'bg-gray-100 text-gray-700 border-gray-200' :
                                                                'bg-gray-50 text-gray-700 border-gray-200'}`}>
                                            {user.role.replace('_', ' ')}
                                            {user.role === 'customer' && ` (${user.customerType})`}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1.5">
                                            <div className={`w-2 h-2 rounded-full ${user.status === 'suspended' ? 'bg-red-500' : 'bg-green-500'}`}></div>
                                            <span className="text-xs font-medium text-gray-700 capitalize">
                                                {user.status || 'Active'}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-xs font-medium text-gray-500">
                                        {new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => {
                                                    setSelectedUser(user);
                                                    setIsViewingUser(true);
                                                }}
                                                className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                title="View Details"
                                            >
                                                <Eye size={16} />
                                            </button>
                                            <button
                                                className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                                title="Edit User"
                                            >
                                                <Edit2 size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleSuspend(user._id, user.status)}
                                                className={`p-1.5 rounded-lg transition-colors flex items-center justify-center
                                                    ${user.status === 'suspended' ? 'text-green-600 hover:bg-green-50' : 'text-red-500 hover:bg-red-50'}`}
                                                title={user.status === 'suspended' ? 'Activate User' : 'Suspend User'}
                                            >
                                                {user.status === 'suspended' ? <CheckCircle size={16} /> : <Ban size={16} />}
                                            </button>
                                            <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                                                <MoreVertical size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Create User Modal */}
            <Modal open={isAddingUser} onClose={() => setIsAddingUser(false)} title="Provision New User" maxWidth="max-w-md"
                footer={<>
                    <button className="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 font-medium text-sm transition-colors" onClick={() => setIsAddingUser(false)}>Cancel</button>
                    <button
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm transition-colors flex items-center gap-2"
                        onClick={handleCreateUser}
                    >
                        <UserPlus size={16} /> Provison Account
                    </button>
                </>}>
                <div className="space-y-4">
                    <p className="text-sm text-gray-500 mb-4 bg-blue-50 p-3 rounded-lg border border-blue-100">
                        Create a new platform administrative account. The user will be required to change their password upon first login.
                    </p>

                    <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Full Name</label>
                        <input type="text" className="w-full border border-gray-200 rounded-xl p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="e.g., Jane Doe" value={newUserData.name} onChange={e => setNewUserData({ ...newUserData, name: e.target.value })} />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Email Address</label>
                        <input type="email" className="w-full border border-gray-200 rounded-xl p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="jane@preventvital.com" value={newUserData.email} onChange={e => setNewUserData({ ...newUserData, email: e.target.value })} />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Temporary Password</label>
                        <input type="password" className="w-full border border-gray-200 rounded-xl p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="••••••••" value={newUserData.password} onChange={e => setNewUserData({ ...newUserData, password: e.target.value })} />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">System Role</label>
                        <select className="w-full border border-gray-200 rounded-xl p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-white" value={newUserData.role} onChange={e => setNewUserData({ ...newUserData, role: e.target.value })}>
                            <option value="super_admin">Super Admin (Full Access)</option>
                            <option value="admin">Platform Admin (Standard)</option>
                            <option value="content_creator">Content Creator</option>
                            <option value="customer">Customer / Employee</option>
                        </select>
                    </div>
                </div>
            </Modal>

            {/* View User Modal */}
            <Modal
                open={isViewingUser}
                onClose={() => setIsViewingUser(false)}
                title="User Profile Details"
                maxWidth="max-w-2xl"
                footer={<button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium text-sm transition-colors" onClick={() => setIsViewingUser(false)}>Close</button>}
            >
                {selectedUser && (
                    <div className="space-y-6">
                        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                            <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold shadow-inner">
                                {selectedUser.name ? selectedUser.name.charAt(0).toUpperCase() : selectedUser.email.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-gray-900">{selectedUser.name || 'Unnamed User'}</h4>
                                <p className="text-gray-500 text-sm font-medium">{selectedUser.email}</p>
                                <div className="flex gap-2 mt-2">
                                    <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-bold uppercase rounded-md border border-blue-200">{selectedUser.role.replace('_', ' ')}</span>
                                    <span className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded-md border ${selectedUser.status === 'suspended' ? 'bg-red-100 text-red-700 border-red-200' : 'bg-green-100 text-green-700 border-green-200'}`}>{selectedUser.status || 'Active'}</span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <h5 className="text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-2">System Information</h5>
                                <div>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase mb-0.5">User ID</p>
                                    <p className="text-sm font-medium text-gray-800 break-all bg-gray-50 p-1.5 rounded-md border border-gray-100 inline-block">{selectedUser._id}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase mb-0.5">Date Registered</p>
                                    <p className="text-sm font-medium text-gray-800">{new Date(selectedUser.createdAt).toLocaleString()}</p>
                                </div>
                                {selectedUser.role === 'customer' && (
                                    <div>
                                        <p className="text-[10px] text-gray-400 font-bold uppercase mb-0.5">Customer Type</p>
                                        <p className="text-sm font-medium text-blue-600 capitalize">{selectedUser.customerType || 'Individual'}</p>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-4">
                                <h5 className="text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-2">Subscription & Access</h5>
                                <div>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase mb-0.5">Plan Level</p>
                                    <span className={`px-2 py-1 rounded-lg text-xs font-bold uppercase ${selectedUser.subscription?.plan === 'platinum' ? 'bg-purple-100 text-purple-700' : selectedUser.subscription?.plan === 'gold' ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-600'}`}>
                                        {selectedUser.subscription?.plan || 'Free'}
                                    </span>
                                </div>
                                {selectedUser.tenantId && (
                                    <div>
                                        <p className="text-[10px] text-gray-400 font-bold uppercase mb-0.5">Organisation ID</p>
                                        <p className="text-sm font-medium text-gray-800 break-all">{selectedUser.tenantId}</p>
                                    </div>
                                )}
                                <div>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase mb-0.5">Account Status</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <div className={`w-2 h-2 rounded-full ${selectedUser.status === 'suspended' ? 'bg-red-500' : 'bg-green-500'}`}></div>
                                        <span className="text-sm font-bold text-gray-700 capitalize">{selectedUser.status || 'Active'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {selectedUser.profile && (selectedUser.profile.phoneNumber || selectedUser.profile.gender) && (
                            <div className="p-4 bg-blue-50/30 rounded-2xl border border-blue-100/50">
                                <h5 className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-3">Additional Profile Data</h5>
                                <div className="grid grid-cols-2 gap-4">
                                    {selectedUser.profile.phoneNumber && (
                                        <div>
                                            <p className="text-[10px] text-gray-400 font-bold uppercase">Phone Number</p>
                                            <p className="text-sm font-medium text-gray-800">{selectedUser.profile.phoneNumber}</p>
                                        </div>
                                    )}
                                    {selectedUser.profile.gender && (
                                        <div>
                                            <p className="text-[10px] text-gray-400 font-bold uppercase">Gender</p>
                                            <p className="text-sm font-medium text-gray-800 capitalize">{selectedUser.profile.gender}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default UserManagement;
