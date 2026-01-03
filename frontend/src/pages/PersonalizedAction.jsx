import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { useLocation, Link } from 'react-router-dom';
import { Gift, Mail, TrendingUp, CheckCircle, AlertOctagon, Info } from 'lucide-react';

const PersonalizedAction = () => {
    const location = useLocation();
    const [data, setData] = useState({ risk: 'LOW', score: 0, name: 'User' });

    useEffect(() => {
        if (location.state) {
            setData({
                risk: location.state.risk || 'LOW',
                score: location.state.score || 0,
                name: location.state.name || 'User'
            });
        }
    }, [location.state]);

    const getStrategy = () => {
        switch (data.risk) {
            case 'HIGH':
                return {
                    title: 'Immediate Retention Offer',
                    icon: AlertOctagon,
                    color: 'red',
                    action: 'Send 50% Discount Coupon',
                    desc: 'High probability of churning within 7 days. Provide aggressive incentives.',
                    emailParam: 'We miss you! Here is 50% off.',
                    steps: ['Generate unique coupon code', 'Send Push Notification', 'Email Personal Apology']
                };
            case 'MEDIUM':
                return {
                    title: 'Engagement Campaign',
                    icon: Mail,
                    color: 'yellow',
                    action: 'Send "We Miss You" Reminder',
                    desc: 'User activity is declining. Nudge them with new content recommendations.',
                    emailParam: 'Check out these new movies!',
                    steps: ['Curate list of trending shows', 'Send weekly digest email', 'Offer 1-week free extension']
                };
            case 'LOW':
            default:
                return {
                    title: 'Loyalty Upsell',
                    icon: TrendingUp,
                    color: 'green',
                    action: 'Suggest Premium Plan Upgrade',
                    desc: 'User is highly engaged. Good candidate for annual plan or 4K upgrade.',
                    emailParam: 'Upgrade to Premium for 4K streaming.',
                    steps: ['Highlight 4K benefits', 'Offer annual discount', 'Grant early access badge']
                };
        }
    };

    const strategy = getStrategy();
    const Icon = strategy.icon;

    return (
        <Layout>
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <Link to="/predict" className="text-slate-400 hover:text-white mb-4 inline-block">&larr; Back to Prediction</Link>
                    <h2 className="text-3xl font-bold">Recommended Action</h2>
                    <p className="text-slate-400">AI-Driven Retention Strategy for <span className="text-white font-bold">{data.name}</span></p>
                </div>

                <div className={`bg-${strategy.color}-500/10 border border-${strategy.color}-500/20 rounded-2xl p-8 mb-8`}>
                    <div className="flex items-start gap-6">
                        <div className={`p-4 rounded-full bg-${strategy.color}-500 text-white shadow-lg shadow-${strategy.color}-500/30`}>
                            <Icon size={40} />
                        </div>
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <h3 className={`text-2xl font-bold text-${strategy.color}-500`}>{strategy.title}</h3>
                                <span className="px-3 py-1 bg-slate-900 rounded-full text-xs text-slate-400 border border-slate-700">
                                    Confidence: {Math.round(data.score * 100)}%
                                </span>
                            </div>
                            <p className="text-lg text-slate-300 mb-6 max-w-2xl">{strategy.desc}</p>

                            <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-700">
                                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Execution Steps</h4>
                                <ul className="space-y-4">
                                    {strategy.steps.map((step, idx) => (
                                        <li key={idx} className="flex items-center gap-3 text-slate-200">
                                            <CheckCircle size={18} className={`text-${strategy.color}-500`} />
                                            {step}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div className="card">
                        <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <Info size={18} className="text-blue-400" />
                            Why this decision?
                        </h4>
                        <div className="space-y-3 text-slate-400 text-sm">
                            <p>• <strong>Payment History:</strong> Analyzed payment delays correlating to user churn.</p>
                            <p>• <strong>Engagement Score:</strong> Watch time dropped by 15% last month.</p>
                            <p>• <strong>Recency:</strong> User has not logged in for 3+ days.</p>
                            <p className="pt-2 text-slate-500 italic">"Model detects patterns similar to 85% of churned users."</p>
                        </div>
                    </div>

                    <div className="card bg-gradient-to-br from-slate-800 to-slate-900">
                        <h4 className="text-lg font-bold mb-4">Execute Action</h4>
                        <p className="text-sm text-slate-400 mb-6">Send the recommended email template automatically via CRM.</p>
                        <button className={`w-full py-3 rounded-lg font-bold transition-all bg-${strategy.color}-600 hover:bg-${strategy.color}-500 text-white shadow-lg`}>
                            Trigger {strategy.action}
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default PersonalizedAction;
