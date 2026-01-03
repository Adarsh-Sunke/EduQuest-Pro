import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, LayoutGrid, ShieldAlert, CheckCircle, Info } from 'lucide-react';
import api from '../api/axiosInstance';
import { Quiz } from '../types';
import Button from '../components/Button';

const QuizDetailsPage: React.FC = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [isStarting, setIsStarting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setQuiz({
        id: quizId || '1',
        title: 'React Performance Engineering',
        category: 'Software Engineering',
        duration: 45,
        totalQuestions: 30,
        difficulty: 'Advanced',
        description: 'This assessment evaluates your proficiency in diagnosing and resolving performance bottlenecks in large-scale React applications. You will be tested on Memoization, Virtualization, Bundle splitting, and Render cycle optimizations.',
      });
    }, 500);
  }, [quizId]);

  const handleStartQuiz = async () => {
    setIsStarting(true);
    setTimeout(() => {
      navigate(`/attempts/mock-attempt-${quizId}`);
    }, 1200);
  };

  if (!quiz) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
       <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto px-6 py-40">
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
        <Link to="/quizzes" className="inline-flex items-center text-xs font-black text-slate-500 hover:text-indigo-400 transition-colors mb-12 uppercase tracking-[0.2em] group">
          <ArrowLeft className="w-4 h-4 mr-3 transition-transform group-hover:-translate-x-2" />
          Back to Directory
        </Link>
      </motion.div>

      <div className="pro-card rounded-[4rem] overflow-hidden border-slate-800 shadow-2xl shadow-indigo-500/5">
        <div className="p-10 md:p-20 border-b border-slate-800 bg-indigo-600/[0.03]">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap gap-4 mb-10"
          >
             <span className="px-5 py-1.5 bg-slate-950 border border-indigo-500/30 text-indigo-400 text-[10px] font-black uppercase tracking-widest rounded-full">{quiz.category}</span>
             <span className="px-5 py-1.5 bg-slate-950 border border-rose-500/30 text-rose-400 text-[10px] font-black uppercase tracking-widest rounded-full">{quiz.difficulty}</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-7xl font-black text-white mb-10 leading-tight"
          >
            {quiz.title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-400 leading-relaxed max-w-3xl font-medium"
          >
            {quiz.description}
          </motion.p>
        </div>

        <div className="p-10 md:p-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16"
          >
            <div className="flex gap-6 items-center">
              <div className="w-16 h-16 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-center text-indigo-500">
                <Clock className="w-8 h-8" />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Duration</p>
                <p className="text-2xl font-black text-white">{quiz.duration}m</p>
              </div>
            </div>
            <div className="flex gap-6 items-center">
              <div className="w-16 h-16 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-center text-indigo-500">
                <LayoutGrid className="w-8 h-8" />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Questions</p>
                <p className="text-2xl font-black text-white">{quiz.totalQuestions} Items</p>
              </div>
            </div>
            <div className="flex gap-6 items-center">
              <div className="w-16 h-16 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-center text-indigo-500">
                <CheckCircle className="w-8 h-8" />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Attempts</p>
                <p className="text-2xl font-black text-white">1 Session</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ amount: 0.5 }}
            className="bg-slate-900/50 border border-slate-800 rounded-3xl p-10 mb-16"
          >
            <div className="flex items-center gap-3 mb-8">
              <ShieldAlert className="w-6 h-6 text-amber-500" />
              <h4 className="text-lg font-black text-white uppercase tracking-tight">Exam Protocol:</h4>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                "Focus mode enabled: Navigating away will freeze your session.",
                "Automated proctoring: Your responses are analyzed for integrity.",
                "Global benchmarking: Your score will be ranked against 250k+ users.",
                "Continuous sync: Your progress is mirrored to our edge servers."
              ].map((instruction, i) => (
                <li key={i} className="flex gap-4 text-slate-400 leading-relaxed font-medium">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2.5 shrink-0 shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>
                  {instruction}
                </li>
              ))}
            </ul>
          </motion.div>

          <div className="flex flex-col md:flex-row items-center gap-8">
            <Button size="lg" className="w-full md:w-auto min-w-[320px] h-20 text-xl rounded-2xl" isLoading={isStarting} onClick={handleStartQuiz}>
              Begin Assessment
            </Button>
            <div className="flex items-center gap-3 text-slate-500">
              <Info className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-widest">Est. Completion: {quiz.duration} mins</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizDetailsPage;