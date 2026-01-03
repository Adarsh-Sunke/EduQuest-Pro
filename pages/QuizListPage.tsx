import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Timer, LayoutGrid, Search, ArrowRight, Filter, BookOpen } from 'lucide-react';
import { Quiz } from '../types';
import { QuizCardSkeleton } from '../components/Skeleton';
import Button from '../components/Button';

const QuizListPage: React.FC = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setQuizzes([
        { id: '1', title: 'React Performance Engineering', category: 'Software Development', duration: 45, totalQuestions: 30, difficulty: 'Advanced', description: 'Advanced patterns for virtualization, bundle splitting, and render cycle optimization.' },
        { id: '2', title: 'Cybersecurity Fundamentals', category: 'Information Security', duration: 30, totalQuestions: 20, difficulty: 'Beginner', description: 'Understand basic threat modeling, encryption, and network security protocols.' },
        { id: '3', title: 'Cloud Native Architecture', category: 'DevOps', duration: 60, totalQuestions: 40, difficulty: 'Intermediate', description: 'Master Docker, Kubernetes, and serverless infrastructure scaling strategies.' },
        { id: '4', title: 'Product Design Systems', category: 'Design', duration: 25, totalQuestions: 15, difficulty: 'Advanced', description: 'Creating scalable UI libraries and accessibility-compliant design components.' },
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-32">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div className="max-w-xl">
          <div className="flex items-center gap-2 text-indigo-500 font-bold uppercase tracking-widest text-xs mb-4">
            <BookOpen className="w-4 h-4" /> Assessment Directory
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6">Choose Your <br /> <span className="gradient-text">Expertise.</span></h1>
          <p className="text-slate-400 text-lg">Browse professional-grade quizzes designed to challenge your current knowledge base.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search topics..." 
              className="bg-slate-900 border border-slate-800 rounded-2xl py-4 pl-12 pr-6 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all text-white placeholder-slate-600 min-w-[300px]"
            />
          </div>
          <Button variant="outline" className="rounded-2xl h-full py-4 px-6">
            <Filter className="w-4 h-4 mr-2" /> Filter
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => <QuizCardSkeleton key={i} />)
        ) : quizzes.map((quiz, i) => (
          <motion.div
            key={quiz.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="pro-card p-8 rounded-[2rem] flex flex-col group"
          >
            <div className="flex justify-between items-start mb-8">
              <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest px-3 py-1 bg-indigo-500/10 rounded-lg">{quiz.category}</span>
              <span className={`text-[10px] font-bold uppercase tracking-widest ${
                quiz.difficulty === 'Advanced' ? 'text-rose-400' : 
                quiz.difficulty === 'Intermediate' ? 'text-amber-400' : 'text-emerald-400'
              }`}>
                {quiz.difficulty}
              </span>
            </div>

            <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-indigo-400 transition-colors">{quiz.title}</h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-10 flex-1">{quiz.description}</p>
            
            <div className="pt-6 border-t border-slate-800 flex items-center justify-between">
              <div className="flex gap-6">
                <div className="flex items-center gap-2 text-xs text-slate-400 font-bold">
                  <Timer className="w-4 h-4 text-indigo-500" /> {quiz.duration}m
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400 font-bold">
                  <LayoutGrid className="w-4 h-4 text-indigo-500" /> {quiz.totalQuestions} Questions
                </div>
              </div>
              <Link to={`/quizzes/${quiz.id}`}>
                <Button variant="ghost" className="!p-0 hover:!bg-transparent text-indigo-500 hover:text-white">
                  Start <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default QuizListPage;