import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import api from '../services/api';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Users, TrendingUp, AlertTriangle, Activity } from 'lucide-react';

ChartJS.register(ArcElement, Tooltip, Legend);

const StatCard = ({ title, value, icon: Icon, color }) => (
    <div className="card flex items-center gap-4">
        <div className={`p-3 rounded-full bg-${color}-500/10 text-${color}-500`}>
            <Icon size={24} />
        </div>
        <div>
            <p className="text-slate-400 text-sm">{title}</p>
            <h3 className="text-2xl font-bold">{value}</h3>
        </div>
    </div>
);

const Dashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const res = await api.get('/dashboard-stats');
            setStats(res.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    if (loading) return <Layout><div className="text-center mt-20">Loading Dashboard...</div></Layout>;

    const chartData = {
        labels: ['Low Risk', 'Medium Risk', 'High Risk'],
        datasets: [
            {
                data: [stats?.churnStats?.LOW || 0, stats?.churnStats?.MEDIUM || 0, stats?.churnStats?.HIGH || 0],
                backgroundColor: ['#10b981', '#f59e0b', '#ef4444'],
                borderWidth: 0,
            },
        ],
    };

    return (
        <Layout>
            <div className="mb-8">
                <h2 className="text-3xl font-bold">Dashboard</h2>
                <p className="text-slate-400">Real-time platform overview</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <StatCard title="Total Users" value={stats?.totalUsers} icon={Users} color="blue" />
                <StatCard title="High Risk" value={stats?.churnStats?.HIGH} icon={AlertTriangle} color="red" />
                <StatCard title="Medium Risk" value={stats?.churnStats?.MEDIUM} icon={Activity} color="yellow" />
                <StatCard title="Low Risk" value={stats?.churnStats?.LOW} icon={TrendingUp} color="green" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="card lg:col-span-1">
                    <h3 className="text-xl font-bold mb-6">Churn Distribution</h3>
                    <div className="h-64 flex justify-center">
                        <Doughnut data={chartData} options={{ cutout: '70%', plugins: { legend: { position: 'bottom', labels: { color: '#94a3b8' } } } }} />
                    </div>
                </div>

                <div className="card lg:col-span-2">
                    <h3 className="text-xl font-bold mb-6">Recent AI Predictions</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-slate-700 text-slate-400 text-sm">
                                    <th className="pb-3 pl-4">User</th>
                                    <th className="pb-3 text-center">Score</th>
                                    <th className="pb-3 text-right pr-4">Risk Level</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700">
                                {stats?.recentPredictions?.map((pred) => (
                                    <tr key={pred._id} className="text-sm">
                                        <td className="py-3 pl-4">{pred.userId?.name || 'Anonymous Analysis'}</td>
                                        <td className="py-3 text-center">{(pred.churnProbability * 100).toFixed(1)}%</td>
                                        <td className="py-3 text-right pr-4">
                                            <span className={`px-2 py-1 rounded text-xs font-bold ${pred.riskLevel === 'HIGH' ? 'bg-red-500/10 text-red-500' :
                                                    pred.riskLevel === 'MEDIUM' ? 'bg-yellow-500/10 text-yellow-500' :
                                                        'bg-green-500/10 text-green-500'
                                                }`}>
                                                {pred.riskLevel}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Dashboard;
