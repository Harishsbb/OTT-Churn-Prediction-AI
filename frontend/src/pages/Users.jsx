import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import { Search, BrainCircuit } from 'lucide-react';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await api.get('/users');
            setUsers(res.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    const handlePredict = (user) => {
        // Navigate to prediction page with user data
        navigate('/predict', {
            state: {
                userId: user._id,
                lastActiveDays: user.lastActiveDays,
                watchHours: user.watchHours,
                paymentDelay: user.paymentDelay,
                name: user.name
            }
        });
    };

    const filteredUsers = users.filter(u => u.name.toLowerCase().includes(search.toLowerCase()));

    return (
        <Layout>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-3xl font-bold">User Base</h2>
                    <p className="text-slate-400">Manage and analyze subscribers</p>
                </div>
                <div className="relative">
                    <Search className="absolute left-3 top-3 text-slate-500" size={20} />
                    <input
                        type="text"
                        placeholder="Search users..."
                        className="input-field pl-10 w-64"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            <div className="card overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-900/50 text-slate-400 text-sm uppercas">
                        <tr>
                            <th className="p-4">Name</th>
                            <th className="p-4">Last Active</th>
                            <th className="p-4">Watch Hours/Wk</th>
                            <th className="p-4">Payment Delay</th>
                            <th className="p-4">Risk Status</th>
                            <th className="p-4 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700">
                        {loading ? <tr><td colSpan="6" className="p-4 text-center">Loading...</td></tr> : filteredUsers.map((user) => (
                            <tr key={user._id} className="hover:bg-slate-700/30 transition-colors">
                                <td className="p-4 font-medium">{user.name}</td>
                                <td className="p-4">{user.lastActiveDays} days</td>
                                <td className="p-4">{user.watchHours} hrs</td>
                                <td className="p-4">{user.paymentDelay} days</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded text-xs font-bold border ${user.churnRisk === 'HIGH' ? 'bg-red-500/10 border-red-500/20 text-red-500' :
                                            user.churnRisk === 'MEDIUM' ? 'bg-yellow-500/10 border-yellow-500/20 text-yellow-500' :
                                                'bg-green-500/10 border-green-500/20 text-green-500'
                                        }`}>
                                        {user.churnRisk}
                                    </span>
                                </td>
                                <td className="p-4 text-right">
                                    <button
                                        onClick={() => handlePredict(user)}
                                        className="text-blue-400 hover:text-blue-300 flex items-center gap-1 justify-end ml-auto"
                                    >
                                        <BrainCircuit size={16} /> Predict
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Layout>
    );
};

export default Users;
