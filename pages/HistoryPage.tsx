import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutDashboard, ExternalLink, Calendar, Target, Award } from 'lucide-react';
import Button from '../components/Button';

const HistoryPage: React.FC = () => {
  const [history, setHistory] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setHistory([
        { id: 'RES-921', title: 'React Performance Engineering', score: 280, total: 300, date: 'Mar 12, 2025', status: 'Passed', rank: 'Top 5%' },
        { id: 'RES-104', title: 'Cybersecurity Fundamentals', score: 180, total: 200, date: 'Mar 10, 2025', status: 'Passed', rank: 'Top 12%' },
        { id: 'RES-042', title: 'Mastering TypeScript', score: 95, total: 200, date: 'Feb 28, 2025', status: 'Failed', rank: 'Top 60%' },
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-40">
      <div className="mb-16 flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <div className="flex items-center gap-2 text-indigo-500 font-bold uppercase tracking-widest text-xs mb-4">
            <LayoutDashboard className="w-4 h-4" /> Personal Dashboard
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4">Assessment <br /> <span className="gradient-text">History.</span></h1>
          <p className="text-slate-500 font-medium">Detailed log of your professional progress and certifications.</p>
        </div>
        <div className="flex gap-4">
           <div className="pro-card px-6 py-4 rounded-2xl flex items-center gap-4">
              <Award className="w-8 h-8 text-indigo-500" />
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Active Rank</p>
                <p className="text-xl font-black text-white">Elite Pro</p>
              </div>
           </div>
        </div>
      </div>

      <div className="pro-card rounded-[2.5rem] overflow-hidden">
        {isLoading ? (
          <div className="p-32 flex flex-col items-center gap-4">
             <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
             <p className="text-slate-600 font-bold text-sm tracking-widest uppercase">Fetching Logs...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900/50 border-b border-slate-800">
                  <th className="px-10 py-6 text-xs font-bold text-slate-500 uppercase tracking-widest">Assessment Name</th>
                  <th className="px-10 py-6 text-xs font-bold text-slate-500 uppercase tracking-widest text-center">Date Taken</th>
                  <th className="px-10 py-6 text-xs font-bold text-slate-500 uppercase tracking-widest text-center">Score Ratio</th>
                  <th className="px-10 py-6 text-xs font-bold text-slate-500 uppercase tracking-widest text-center">Global Rank</th>
                  <th className="px-10 py-6 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {history.map((item, i) => (
                  <motion.tr 
                    key={item.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="hover:bg-indigo-600/[0.02] transition-colors"
                  >
                    <td className="px-10 py-8">
                      <p className="text-lg font-bold text-white mb-1">{item.title}</p>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">ID: {item.id}</p>
                    </td>
                    <td className="px-10 py-8 text-center">
                      <div className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400">
                        <Calendar className="w-4 h-4" /> {item.date}
                      </div>
                    </td>
                    <td className="px-10 py-8">
                      <div className="flex flex-col items-center gap-2">
                        <div className="flex justify-between w-32 text-[10px] font-bold text-slate-500 mb-1 uppercase tracking-widest">
                          <span className={item.status === 'Passed' ? 'text-emerald-500' : 'text-rose-500'}>{item.status}</span>
                          <span className="text-slate-300 font-black">{item.score}/{item.total}</span>
                        </div>
                        <div className="h-2 w-32 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                           <div 
                             className={`h-full rounded-full transition-all duration-1000 ${item.status === 'Passed' ? 'bg-indigo-500' : 'bg-rose-500'}`} 
                             style={{ width: `${(item.score / item.total) * 100}%` }}
                           />
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-8 text-center">
                       <span className="px-4 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs font-black text-slate-300">
                         {item.rank}
                       </span>
                    </td>
                    <td className="px-10 py-8 text-right">
                      <Link to={`/attempts/${item.id}/result`}>
                        <Button variant="ghost" className="text-xs font-bold gap-2">
                          View Report <ExternalLink className="w-4 h-4" />
                        </Button>
                      </Link>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;