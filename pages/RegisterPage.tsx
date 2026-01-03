import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirm: '' });
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirm) {
      alert("Passwords do not match");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      login({ id: '2', name: formData.name, email: formData.email, role: 'USER' as const }, 'token-abc-123');
      navigate('/quizzes');
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-slate-950 relative overflow-hidden pt-24">
      {/* Background Flare */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-[500px] relative z-10 py-12">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-3xl font-black text-white tracking-tight mb-4">Join EduQuest Pro</h1>
          <p className="text-slate-500 font-medium">Begin your professional certification.</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="pro-card p-10 md:p-14 rounded-[3rem]"
        >
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-3">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] ml-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600" />
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-slate-950 border-2 border-slate-800 rounded-2xl py-4 pl-16 pr-8 text-sm focus:outline-none focus:border-indigo-600 transition-all text-white placeholder-slate-700 font-medium"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-slate-950 border-2 border-slate-800 rounded-2xl py-4 pl-16 pr-8 text-sm focus:outline-none focus:border-indigo-600 transition-all text-white placeholder-slate-700 font-medium"
                  placeholder="name@company.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-3">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] ml-1">Password</label>
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full bg-slate-950 border-2 border-slate-800 rounded-2xl py-4 px-8 text-sm focus:outline-none focus:border-indigo-600 transition-all text-white placeholder-slate-700 font-medium"
                  placeholder="••••"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] ml-1">Confirm</label>
                <input
                  type="password"
                  required
                  value={formData.confirm}
                  onChange={(e) => setFormData({...formData, confirm: e.target.value})}
                  className="w-full bg-slate-950 border-2 border-slate-800 rounded-2xl py-4 px-8 text-sm focus:outline-none focus:border-indigo-600 transition-all text-white placeholder-slate-700 font-medium"
                  placeholder="••••"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 py-2">
               <ShieldCheck className="w-5 h-5 text-indigo-500" />
               <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">Enterprise Data Encryption Active</span>
            </div>

            <Button type="submit" isLoading={isLoading} className="w-full h-16 rounded-2xl font-black uppercase tracking-widest text-xs">
              Secure Registration <ArrowRight className="ml-3 w-5 h-5" />
            </Button>
          </form>

          <div className="mt-10 text-center text-xs font-semibold text-slate-500">
            Already have a pro account? <Link to="/login" className="text-indigo-400 hover:text-indigo-300 ml-2 transition-colors">Sign In</Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RegisterPage;