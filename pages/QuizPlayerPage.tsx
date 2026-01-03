import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Timer, ChevronLeft, ChevronRight, CheckCircle, Shield, AlertCircle } from 'lucide-react';
import { Question, Attempt } from '../types';
import Button from '../components/Button';
import { QuestionSkeleton } from '../components/Skeleton';

const QuizPlayerPage: React.FC = () => {
  const { attemptId } = useParams<{ attemptId: string }>();
  const navigate = useNavigate();
  const [attempt, setAttempt] = useState<Attempt | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  useEffect(() => {
    setTimeout(() => {
      const mockAttempt: Attempt = {
        id: attemptId!,
        quizId: '1',
        userId: '1',
        status: 'IN_PROGRESS',
        answers: {},
        markedForReview: [],
        startTime: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 45 * 60 * 1000).toISOString(),
      };
      const mockQuestions: Question[] = Array.from({ length: 15 }).map((_, i) => ({
        id: `q-${i}`,
        text: `Critical Scenario Analysis ${i + 1}: How should a high-traffic production application manage state updates when dealing with a massive WebSocket data stream to ensure 60fps performance?`,
        options: [
          { id: 'a', text: 'Batch updates using requestAnimationFrame or custom throttles' },
          { id: 'b', text: 'Offload all state calculation to a dedicated Web Worker' },
          { id: 'c', text: 'Use a purely mutable state container like MobX for direct updates' },
          { id: 'd', text: 'Implement an Atomic State system using signals or recoil' }
        ]
      }));
      setAttempt(mockAttempt);
      setQuestions(mockQuestions);
      setIsLoading(false);
    }, 1200);
  }, [attemptId]);

  useEffect(() => {
    if (!attempt?.expiresAt) return;
    const timer = setInterval(() => {
      const remaining = Math.max(0, Math.floor((new Date(attempt.expiresAt).getTime() - Date.now()) / 1000));
      setTimeLeft(remaining);
      if (remaining === 0) handleSubmit();
    }, 1000);
    return () => clearInterval(timer);
  }, [attempt?.expiresAt]);

  const handleOptionSelect = (optionId: string) => {
    if (!attempt) return;
    setIsSaving(true);
    setAttempt({ ...attempt, answers: { ...attempt.answers, [questions[currentIndex].id]: optionId } });
    setTimeout(() => setIsSaving(false), 400);
  };

  const handleSubmit = async () => {
    if (window.confirm("Are you sure you want to finish the assessment? This action cannot be undone.")) {
      setIsSubmitting(true);
      setTimeout(() => navigate(`/attempts/${attemptId}/result`), 1500);
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  if (isLoading) return <div className="p-40 flex justify-center"><QuestionSkeleton /></div>;

  const currentQuestion = questions[currentIndex];
  const selectedOption = attempt?.answers[currentQuestion.id];

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col text-slate-100">
      {/* High-Contrast HUD Header */}
      <header className="h-20 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-8 sticky top-0 z-[100]">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-black">Q</div>
            <span className="font-bold tracking-tight hidden sm:inline">EDUQUEST PRO PLAYER</span>
          </div>
          <div className="h-6 w-[1px] bg-slate-800 hidden sm:block" />
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
            <Shield className="w-4 h-4 text-emerald-500" />
            <span className="hidden sm:inline">ID:</span> {attemptId?.slice(0, 10)}
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3 bg-slate-950 px-4 py-2 rounded-xl border border-slate-800">
             <div className={`w-2 h-2 rounded-full ${isSaving ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`} />
             <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
               {isSaving ? 'Saving Data...' : 'Auto-Saved'}
             </span>
          </div>
          
          <div className={`flex items-center gap-3 px-6 py-2 rounded-xl border-2 ${ (timeLeft || 0) < 300 ? 'border-rose-600 bg-rose-950/20 text-rose-500' : 'border-indigo-600 bg-indigo-950/20 text-indigo-400'}`}>
            <Timer className="w-5 h-5" />
            <span className="text-xl font-bold font-mono">{formatTime(timeLeft || 0)}</span>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Navigation Map - Professional Index */}
        <aside className="w-72 bg-slate-900 border-r border-slate-800 hidden lg:flex flex-col">
          <div className="p-8">
            <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-6">Question Map</h3>
            <div className="grid grid-cols-4 gap-3">
              {questions.map((q, idx) => (
                <button
                  key={q.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-10 rounded-lg text-xs font-bold transition-all border ${
                    idx === currentIndex ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg' :
                    attempt?.answers[q.id] ? 'bg-slate-800 border-slate-700 text-slate-300' : 'border-slate-800 text-slate-600 hover:border-slate-700'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-auto p-8 border-t border-slate-800">
             <Button variant="primary" className="w-full py-4 rounded-2xl" onClick={handleSubmit} isLoading={isSubmitting}>
               Submit Assessment
             </Button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-[#020617] p-8 md:p-20">
          <div className="max-w-3xl mx-auto">
            <div className="mb-12 flex items-center justify-between">
              <span className="px-4 py-1.5 bg-indigo-600/10 text-indigo-400 border border-indigo-600/20 rounded-full text-xs font-bold">
                Question {currentIndex + 1} of {questions.length}
              </span>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                <AlertCircle className="w-4 h-4" /> Professional Tier Assessment
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-12"
              >
                <h2 className="text-2xl md:text-4xl font-bold leading-tight text-white font-display">
                  {currentQuestion.text}
                </h2>

                <div className="grid grid-cols-1 gap-4">
                  {currentQuestion.options.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => handleOptionSelect(opt.id)}
                      className={`group w-full p-6 md:p-8 rounded-2xl border-2 text-left transition-all duration-200 flex items-center gap-6 ${
                        selectedOption === opt.id 
                        ? 'bg-indigo-600/10 border-indigo-600' 
                        : 'bg-slate-900 border-slate-800 hover:border-slate-600'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 ${
                        selectedOption === opt.id ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-500'
                      }`}>
                        {opt.id.toUpperCase()}
                      </div>
                      <span className={`text-lg md:text-xl font-medium ${selectedOption === opt.id ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}`}>
                        {opt.text}
                      </span>
                      {selectedOption === opt.id && <CheckCircle className="w-6 h-6 text-indigo-500 ml-auto shrink-0" />}
                    </button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Controls */}
            <div className="mt-20 flex justify-between gap-4 pt-12 border-t border-slate-900">
               <Button 
                variant="outline" 
                onClick={() => setCurrentIndex(p => Math.max(0, p - 1))}
                disabled={currentIndex === 0}
                className="flex-1 py-4"
               >
                 <ChevronLeft className="w-5 h-5 mr-2" /> Previous
               </Button>
               <Button 
                variant="outline" 
                onClick={() => setCurrentIndex(p => Math.min(questions.length - 1, p + 1))}
                disabled={currentIndex === questions.length - 1}
                className="flex-1 py-4"
               >
                 Next <ChevronRight className="w-5 h-5 ml-2" />
               </Button>
               <div className="lg:hidden flex-1">
                 <Button variant="primary" className="w-full py-4" onClick={handleSubmit}>Submit</Button>
               </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default QuizPlayerPage;