import React from 'react';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
    return (
        <div className="flex min-h-screen bg-slate-900 text-white">
            <Sidebar />
            <div className="flex-1 ml-64 p-8 overflow-y-auto">
                {children}
            </div>
        </div>
    );
};

export default Layout;
