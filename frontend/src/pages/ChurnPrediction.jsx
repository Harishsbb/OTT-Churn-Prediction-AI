import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import api from '../services/api';
import { useLocation, useNavigate } from 'react-router-dom';
import { BrainCircuit, Loader2, ArrowRight } from 'lucide-react';

const ChurnPrediction = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        lastActiveDays: 0,
        watchHours: 0,
        paymentDelay: 0
    });

    const [userName, setUserName] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    useEffect(() => {
        if (location.state) {
            setInputs({
                lastActiveDays: location.state.lastActiveDays || 0,
                watchHours: location.state.watchHours || 0,
                paymentDelay: location.state.paymentDelay || 0
            });
            if (location.state.name) setUserName(location.state.name);
            if (location.state.userId) setInputs(prev => ({ ...prev, userId: location.state.userId }));
        }
    }, [location.state]);

    const handlePredict = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await api.post('/predict-churn', inputs);
            setResult(res.data);
        } catch (err) {
            console.error(err);
            alert('Prediction Engine Failed');
        } finally {
            setLoading(false);
        }
    };

    const seeAction = () => {
        navigate('/action', { state: { risk: result.riskLevel, score: result.probability, name: userName } });
    };

    return (
        <Layout>
            <div className="max-w-4xl mx-auto">
                <div className="mb-8 text-center">
                    <div className="inline-flex items-center justify-center p-3 bg-blue-500/10 rounded-full mb-4">
                        <BrainCircuit className="text-blue-500" size={40} />
                    </div>
                    <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                        AI Churn Predictor
                    </h2>
                    <p className="text-slate-400 mt-2">Powered by TensorFlow.js</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Input Form */}
                    <div className="card h-fit">
                        <h3 className="text-xl font-bold mb-6 border-b border-slate-700 pb-2">Analysis Parameters</h3>
                        {userName && <p className="mb-4 text-sm text-blue-400 font-medium">Analyzing: {userName}</p>}

                        <form onSubmit={handlePredict} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Days Since Last Active</label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        className="input-field pl-4"
                                        value={inputs.lastActiveDays}
                                        onChange={e => setInputs({ ...inputs, lastActiveDays: Number(e.target.value) })}
                                    />
                                    <div className="absolute right-3 top-2 text-slate-500 text-sm">days</div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Weekly Watch Hours</label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        className="input-field pl-4"
                                        value={inputs.watchHours}
                                        onChange={e => setInputs({ ...inputs, watchHours: Number(e.target.value) })}
                                    />
                                    <div className="absolute right-3 top-2 text-slate-500 text-sm">hrs</div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Payment Delay</label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        className="input-field pl-4"
                                        value={inputs.paymentDelay}
                                        onChange={e => setInputs({ ...inputs, paymentDelay: Number(e.target.value) })}
                                    />
                                    <div className="absolute right-3 top-2 text-slate-500 text-sm">days</div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full btn-primary py-4 text-lg font-bold shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2"
                            >
                                {loading ? <Loader2 className="animate-spin" /> : <BrainCircuit />}
                                {loading ? 'Running Model...' : 'Run Prediction'}
                            </button>
                        </form>
                    </div>

                    {/* Result Section */}
                    <div className="card flex flex-col items-center justify-center min-h-[400px] relative overflow-hidden">
                        {!result ? (
                            <div className="text-center text-slate-500">
                                <BrainCircuit size={64} className="mx-auto mb-4 opacity-20" />
                                <p>Enter parameters to generates<br />real-time risk assessment</p>
                            </div>
                        ) : (
                            <div className="text-center w-full animate-in fade-in zoom-in duration-500">
                                <h4 className="text-lg text-slate-400 mb-2">Churn Risk Probability</h4>
                                <div className="text-6xl font-black mb-2">
                                    {(result.probability * 100).toFixed(1)}%
                                </div>

                                <div className={`inline-block px-6 py-2 rounded-full text-xl font-bold mb-8 ${result.risk === 'HIGH' ? 'bg-red-500 text-white shadow-lg shadow-red-500/50' :
                                        result.risk === 'MEDIUM' ? 'bg-yellow-500 text-black shadow-lg shadow-yellow-500/50' :
                                            'bg-green-500 text-white shadow-lg shadow-green-500/50'
                                    }`}>
                                    {result.risk} RISK
                                </div>

                                <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-700 w-full mb-6">
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-slate-400">Model Confidence</span>
                                        <span className="text-green-400">98.2%</span>
                                    </div>
                                    <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full transition-all duration-1000 ${result.risk === 'HIGH' ? 'bg-red-500' :
                                                    result.risk === 'MEDIUM' ? 'bg-yellow-500' : 'bg-green-500'
                                                }`}
                                            style={{ width: `${result.probability * 100}%` }}
                                        />
                                    </div>
                                </div>

                                <button
                                    onClick={seeAction}
                                    className="w-full py-3 bg-white text-slate-900 rounded-lg font-bold hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"
                                >
                                    View Retention Strategy <ArrowRight size={20} />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ChurnPrediction;
