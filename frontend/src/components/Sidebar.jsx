import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, UserPlus, BrainCircuit, Activity, LogOut } from 'lucide-react';

const Sidebar = () => {
    const location = useLocation();

    const menuItems = [
        { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
        { name: 'All Users', path: '/users', icon: Users },
        { name: 'Add User', path: '/add-user', icon: UserPlus },
        { name: 'Predict Churn', path: '/predict', icon: BrainCircuit },
        { name: 'Actions', path: '/actions/general', icon: Activity },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <div className="h-screen w-64 bg-slate-950 border-r border-slate-800 flex flex-col fixed left-0 top-0">
            <div className="p-6 border-b border-slate-800">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    OTT Agent
                </h1>
                <p className="text-xs text-slate-400 mt-1">Retention AI Dashboard</p>
            </div>

            <nav className="flex-1 p-4 space-y-2">
                {menuItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive(item.path)
                                ? 'bg-blue-600 text-white shadow-blue-900/20 shadow-lg'
                                : 'text-slate-400 hover:bg-slate-900 hover:text-white'
                            }`}
                    >
                        <item.icon size={20} />
                        <span className="font-medium">{item.name}</span>
                    </Link>
                ))}
            </nav>

            <div className="p-4 border-t border-slate-800">
                <Link to="/" className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                    <LogOut size={20} />
                    <span className="font-medium">Logout</span>
                </Link>
            </div>
        </div>
    );
};

export default Sidebar;
