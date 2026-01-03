import React, { useState } from 'react';
import Layout from '../components/Layout';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const AddUser = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        lastActiveDays: 0,
        watchHours: 0,
        paymentDelay: 0
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/users', formData);
            navigate('/users');
        } catch (err) {
            alert('Error creating user');
        }
    };

    return (
        <Layout>
            <div className="max-w-2xl mx-auto">
                <h2 className="text-3xl font-bold mb-2">Add New Subscriber</h2>
                <p className="text-slate-400 mb-8">Enter user metrics for tracking</p>

                <div className="card">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
                                <input
                                    required
                                    type="text"
                                    className="input-field"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                                <input
                                    required
                                    type="email"
                                    className="input-field"
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Last Active (Days)</label>
                                <input
                                    type="number"
                                    className="input-field"
                                    value={formData.lastActiveDays}
                                    onChange={e => setFormData({ ...formData, lastActiveDays: Number(e.target.value) })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Avg Watch Hours</label>
                                <input
                                    type="number"
                                    className="input-field"
                                    value={formData.watchHours}
                                    onChange={e => setFormData({ ...formData, watchHours: Number(e.target.value) })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Payment Delay</label>
                                <input
                                    type="number"
                                    className="input-field"
                                    value={formData.paymentDelay}
                                    onChange={e => setFormData({ ...formData, paymentDelay: Number(e.target.value) })}
                                />
                            </div>
                        </div>

                        <div className="pt-4">
                            <button type="submit" className="w-full btn-primary py-3">
                                Save User Database
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default AddUser;
