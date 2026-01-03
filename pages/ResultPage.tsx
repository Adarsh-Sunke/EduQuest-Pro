import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trophy, Clock, Target, CheckCircle2, XCircle, ChevronRight, BarChart } from 'lucide-react';
import { QuizResult } from '../types';
import Button from '../components/Button';

const ResultPage: React.FC = () => {
  const { attemptId } = useParams<{ attemptId: string }>();
  const [result, setResult] = useState<QuizResult | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setResult({
        attemptId: attemptId || 'RES-9912',
        score: 420,
        totalScore: 500,
        percentage: 84,
        correctAnswers: 21,
        incorrectAnswers: 4,
        skippedAnswers: 0,
        timeTaken: '32:45',
        answersDetail: []
      });
    }, 1200);
  }, [attemptId]);

  if (!result) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950">
      <motion.div 
        animate={{ rotate: 360 }} 
        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
        className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full mb-6"
      />
      <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Generating Report...</p>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto px-6 py-32">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center mb-20"
      >
        <div className="inline-flex p-4 bg-indigo-600/10 border border-indigo-600/20 rounded-3xl mb-8">
          <Trophy className="w-12 h-12 text-indigo-500" />
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tight">Well Done.</h1>
        <p className="text-slate-400 text-xl font-medium">You've successfully completed the assessment.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {/* Main Score Card */}
        <div className="md:col-span-1 pro-card p-10 rounded-[2.5rem] flex flex-col items-center justify-center text-center">
          <div className="relative w-40 h-40 mb-8">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="80" cy="80" r="70" fill="none" stroke="#1e293b" strokeWidth="12" />
              <motion.circle 
                cx="80" cy="80" r="70" fill="none" stroke="#6366f1" strokeWidth="12" 
                strokeDasharray={440}
                initial={{ strokeDashoffset: 440 }}
                animate={{ strokeDashoffset: 440 * (1 - result.percentage / 100) }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-black text-white">{result.percentage}%</span>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Final Grade</span>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">High Pass</h3>
          <p className="text-slate-500 text-sm font-semibold">Exceeds Industry Standards</p>
        </div>

        {/* Stats Summary */}
        <div className="md:col-span-2 grid grid-cols-2 gap-6">
           {[
             { label: 'Total Score', val: `${result.score}/${result.totalScore}`, icon: Target, color: 'text-indigo-400', bg: 'bg-indigo-600/10' },
             { label: 'Time Spent', val: result.timeTaken, icon: Clock, color: 'text-violet-400', bg: 'bg-violet-600/10' },
             { label: 'Correct Items', val: result.correctAnswers, icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-600/10' },
             { label: 'Incorrect Items', val: result.incorrectAnswers, icon: XCircle, color: 'text-rose-400', bg: 'bg-rose-600/10' },
           ].map((s, i) => (
             <div key={i} className="pro-card p-8 rounded-3xl flex flex-col justify-center">
               <div className="flex items-center gap-3 mb-4">
                 <div className={`p-2 ${s.bg} rounded-lg ${s.color}`}>
                   <s.icon className="w-5 h-5" />
                 </div>
                 <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{s.label}</span>
               </div>
               <div className="text-3xl font-black text-white">{s.val}</div>
             </div>
           ))}
        </div>
      </div>

      {/* Recommended Next Steps */}
      <div className="pro-card p-10 rounded-[2.5rem] mb-16">
        <div className="flex items-center gap-3 mb-8">
          <BarChart className="w-6 h-6 text-indigo-500" />
          <h3 className="text-xl font-bold text-white uppercase tracking-tight">Performance Insight</h3>
        </div>
        <p className="text-slate-400 leading-relaxed mb-10 max-w-2xl">
          Based on your pattern of answers, you show strong proficiency in **Core Logic** and **Performance Metrics**. We recommend exploring the "Scalable Architecture" series to continue your progress.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/quizzes" className="flex-1">
            <Button className="w-full py-5 rounded-2xl">Browse Advanced Courses</Button>
          </Link>
          <Button variant="outline" className="flex-1 py-5 rounded-2xl">Download Official PDF Report</Button>
        </div>
      </div>

      <div className="text-center">
        <Link to="/" className="text-slate-500 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-2">
           Return to Main Portal <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

export default ResultPage;