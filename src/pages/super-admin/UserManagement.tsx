import React, { useState, useEffect } from 'react';
import { User } from '../../types/auth';
import { Modal } from '../../admin-shared/components/ui';
import { Users, Shield, UserPlus, Search, Filter, MoreVertical, Edit2, Ban, CheckCircle } from 'lucide-react';
import superAdminApi from '../../admin-shared/services/superAdminApi';
import toast from 'react-hot-toast';

const UserManagement = () => {
    const [users, setUsers] = useState<(User & { _id: string, createdAt: string })[]>([]);
    const [loading, setLoading] = useState(true);

    // Modals state
    const [isAddingUser, setIsAddingUser] = useState(false);
    const [newUserData, setNewUserData] = useState({ name: '', email: '', password: '', role: 'admin' });

    // Search & Filter
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await superAdminApi.get('/users');
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

    const filteredUsers = users.filter(u =>
        (u.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (u.email?.toLowerCase() || '').includes(searchTerm.toLowerCase())
    );

    // Mock KPIs
    const superAdminsCount = users.filter(u => u.role === 'super_admin').length;
    const activeUsersCount = users.filter(u => u.status !== 'suspended').length;

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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-[18px] border border-gray-100 shadow-sm p-6 flex items-center justify-between">
                    <div>
                        <p className="text-sm font-semibold text-gray-500 mb-1">Total Staff Users</p>
                        <h3 className="text-3xl font-bold text-gray-900">{users.length}</h3>
                    </div>
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                        <Users size={24} />
                    </div>
                </div>
                <div className="bg-white rounded-[18px] border border-gray-100 shadow-sm p-6 flex items-center justify-between">
                    <div>
                        <p className="text-sm font-semibold text-gray-500 mb-1">Super Admins</p>
                        <h3 className="text-3xl font-bold text-gray-900">{superAdminsCount}</h3>
                    </div>
                    <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600">
                        <Shield size={24} />
                    </div>
                </div>
                <div className="bg-white rounded-[18px] border border-gray-100 shadow-sm p-6 flex items-center justify-between">
                    <div>
                        <p className="text-sm font-semibold text-gray-500 mb-1">Active Accounts</p>
                        <h3 className="text-3xl font-bold text-gray-900">{activeUsersCount}</h3>
                    </div>
                    <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-600">
                        <CheckCircle size={24} />
                    </div>
                </div>
            </div>

            {/* Main Table Area */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Search and Filter Bar */}
                <div className="px-6 py-4 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-gray-50/50">
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
                                            ${user.role === 'super_admin' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                                                user.role === 'admin' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                                                    'bg-gray-50 text-gray-700 border-gray-200'}`}>
                                            {user.role.replace('_', ' ')}
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
                                                className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
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
                            <option value="corporate_admin">Corporate Admin (B2B Client)</option>
                        </select>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default UserManagement;
