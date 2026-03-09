import React, { useState } from 'react';
import { Settings as SettingsIcon, Save, Bell, Shield, Monitor } from 'lucide-react';

const Settings = () => {
    const [notifications, setNotifications] = useState({
        emailAlerts: true,
        pushNotifications: false,
        weeklyDigest: true,
    });

    return (
        <div className="space-y-6 lg:max-w-[1000px]">
            <div className="flex justify-between items-start">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Platform Settings</h2>
                    <p className="text-gray-500 mt-1">Manage admin preferences, notifications, and viewing options.</p>
                </div>
                <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-sm hover:bg-blue-700 transition">
                    <Save size={16} /> Save Changes
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1 space-y-2">
                    <button className="w-full flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-700 rounded-xl font-semibold text-sm transition">
                        <Monitor size={18} /> Display Preferences
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl font-medium text-sm transition">
                        <Bell size={18} /> Notifications
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl font-medium text-sm transition">
                        <Shield size={18} /> Security Options
                    </button>
                </div>

                <div className="md:col-span-2 space-y-6">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Bell className="text-blue-500" size={20} /> Notification Triggers
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between py-2 border-b border-gray-50">
                                <div>
                                    <p className="font-semibold text-gray-900 text-sm">Email Alerts</p>
                                    <p className="text-xs text-gray-500">Receive immediate emails for critical system events.</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" checked={notifications.emailAlerts} onChange={(e) => setNotifications({ ...notifications, emailAlerts: e.target.checked })} />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                </label>
                            </div>
                            <div className="flex items-center justify-between py-2 border-b border-gray-50">
                                <div>
                                    <p className="font-semibold text-gray-900 text-sm">Push Notifications</p>
                                    <p className="text-xs text-gray-500">Receive browser notifications for new orders and user signups.</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" checked={notifications.pushNotifications} onChange={(e) => setNotifications({ ...notifications, pushNotifications: e.target.checked })} />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                </label>
                            </div>
                            <div className="flex items-center justify-between py-2">
                                <div>
                                    <p className="font-semibold text-gray-900 text-sm">Weekly Activity Digest</p>
                                    <p className="text-xs text-gray-500">A weekly summary report of platform performance.</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" checked={notifications.weeklyDigest} onChange={(e) => setNotifications({ ...notifications, weeklyDigest: e.target.checked })} />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Monitor className="text-purple-500" size={20} /> Display Preferences
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Timezone</label>
                                <select className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-blue-500">
                                    <option>Coordinated Universal Time (UTC)</option>
                                    <option>Eastern Standard Time (EST)</option>
                                    <option>Pacific Standard Time (PST)</option>
                                    <option>Indian Standard Time (IST)</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Default Dashboard View</label>
                                <select className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-blue-500">
                                    <option>Overview Stats</option>
                                    <option>Recent Activity</option>
                                    <option>Critical Alerts</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
