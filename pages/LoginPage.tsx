import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Mail, ArrowRight, Github, Globe } from 'lucide-react';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      login({ id: '1', name: 'John Doe', email: email, role: 'USER' as const }, 'token-9988');
      navigate('/quizzes');
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-slate-950 relative overflow-hidden pt-24">
      {/* Background flare */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-[480px] relative z-10 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-3xl font-black text-white tracking-tight mb-3">Professional Access</h1>
          <p className="text-slate-500 font-medium">Continue your EduQuest journey.</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="pro-card p-10 md:p-12 rounded-[2.5rem]"
        >
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-3">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-950 border-2 border-slate-800 rounded-2xl py-4 pl-14 pr-6 text-sm focus:outline-none focus:border-indigo-600 transition-all text-white placeholder-slate-700 font-medium"
                  placeholder="name@company.com"
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center ml-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Password</label>
                <a href="#" className="text-[10px] font-black text-indigo-400 hover:text-indigo-300 transition-colors uppercase tracking-widest">Forgot?</a>
              </div>
              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-950 border-2 border-slate-800 rounded-2xl py-4 pl-14 pr-6 text-sm focus:outline-none focus:border-indigo-600 transition-all text-white placeholder-slate-700 font-medium"
                  placeholder="••••••••••••"
                />
              </div>
            </div>

            <Button type="submit" isLoading={isLoading} className="w-full h-14 rounded-2xl font-black uppercase tracking-widest text-xs">
              Sign In <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </form>

          <div className="my-8 flex items-center gap-4 text-slate-700">
            <div className="flex-1 h-[1px] bg-slate-800" />
            <span className="text-[10px] font-black uppercase tracking-widest">Or continue with</span>
            <div className="flex-1 h-[1px] bg-slate-800" />
          </div>

          <div className="flex gap-4">
            <button className="flex-1 flex items-center justify-center gap-2 bg-slate-950 border-2 border-slate-800 rounded-2xl py-3 hover:border-slate-600 transition-all text-[10px] font-black uppercase tracking-widest text-slate-400">
              <Github className="w-4 h-4" /> GitHub
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 bg-slate-950 border-2 border-slate-800 rounded-2xl py-3 hover:border-slate-600 transition-all text-[10px] font-black uppercase tracking-widest text-slate-400">
              <Globe className="w-4 h-4" /> Google
            </button>
          </div>

          <div className="mt-10 text-center">
            <p className="text-xs font-semibold text-slate-500">
              New to the platform? <Link to="/register" className="text-indigo-400 hover:text-indigo-300 ml-1 transition-colors">Create account</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;