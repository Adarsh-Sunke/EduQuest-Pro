import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, Layout, History, User as UserIcon, ShieldCheck } from 'lucide-react';
import Button from './Button';

const Navbar: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => location.pathname.startsWith(path);

  // Special case: we might want a minimal navbar for the distraction-free player,
  // but per request "on any page", we will keep it consistent.
  const isPlayerPage = location.pathname.includes('/attempts/') && !location.pathname.endsWith('/result');

  return (
    <nav className="fixed top-0 left-0 w-full z-[150] px-4 md:px-6 py-6 md:py-8 pointer-events-none">
      <div className="max-w-7xl mx-auto pro-card rounded-[1.5rem] md:rounded-[2rem] px-6 md:px-10 py-3 md:py-4 flex items-center justify-between backdrop-blur-xl bg-slate-900/80 border-slate-800 shadow-2xl pointer-events-auto">
        <div className="flex items-center gap-4 md:gap-16">
          <Link to="/" className="flex items-center gap-3 md:gap-4 group">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-indigo-600 rounded-xl md:rounded-2xl flex items-center justify-center text-white font-black text-xl md:text-2xl shadow-xl shadow-indigo-900/30 group-hover:scale-110 transition-transform">Q</div>
            <span className="font-black text-xl md:text-2xl tracking-tighter text-white uppercase hidden sm:inline">EduQuest <span className="text-indigo-500">Pro</span></span>
          </Link>

          {isAuthenticated && !isPlayerPage && (
            <div className="hidden lg:flex gap-4">
              <Link
                to="/quizzes"
                className={`flex items-center gap-3 px-5 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${
                  isActive('/quizzes') ? 'text-white bg-indigo-600 shadow-lg shadow-indigo-600/20' : 'text-slate-500 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Layout className="w-4 h-4" /> Directory
              </Link>
              <Link
                to="/profile/history"
                className={`flex items-center gap-3 px-5 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${
                  isActive('/profile/history') ? 'text-white bg-indigo-600 shadow-lg shadow-indigo-600/20' : 'text-slate-500 hover:text-white hover:bg-slate-800'
                }`}
              >
                <History className="w-4 h-4" /> My History
              </Link>
            </div>
          )}

          {isPlayerPage && (
            <div className="hidden lg:flex items-center gap-3 px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Secured Assessment Mode</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-4 md:gap-10">
          {isAuthenticated ? (
            <>
              <div className="hidden md:flex flex-col items-end">
                <span className="text-[10px] font-black text-white tracking-widest uppercase">{user?.name}</span>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                  <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Authorized</span>
                </div>
              </div>
              <div className="flex items-center gap-2 md:gap-3">
                <Button variant="ghost" size="sm" onClick={logout} className="rounded-xl p-2 md:p-3 border border-transparent hover:border-slate-700 bg-slate-800/50">
                  <LogOut className="w-4 h-4 md:w-5 md:h-5 text-rose-500" />
                </Button>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-4 md:gap-8">
               <Link to="/login" className="text-slate-400 hover:text-white text-[10px] font-black uppercase tracking-widest transition-colors">Sign In</Link>
               <Link to="/register">
                <Button size="sm" className="rounded-xl px-6 md:px-8 h-10 md:h-12 font-black uppercase tracking-widest text-[9px]">
                  Join Pro
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;