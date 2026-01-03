
import React from 'react';
import { useNavigate } from 'react-router-dom';
// Explicitly import Variants to fix type inference issues with animation properties
import { motion, Variants } from 'framer-motion';
import { ArrowRight, CheckCircle2, Zap, BarChart3, Globe, Shield, Trophy, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';

const HomePage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Explicitly typing variants as Variants to ensure 'type: string' literal narrowing
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  // Explicitly typing variants as Variants to fix AnimationGeneratorType errors for 'spring'
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: 'spring', damping: 15, stiffness: 100 }
    }
  };

  return (
    <div className="relative min-h-screen bg-[#020617] overflow-x-hidden">
      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[70vw] h-[70vw] bg-indigo-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-violet-600/10 rounded-full blur-[100px]" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-48 pb-32 px-6">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.5 }}
            transition={{ duration: 0.6 }}
            className="mb-10 px-6 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-xs font-black tracking-[0.2em] uppercase flex items-center gap-3"
          >
            <Trophy className="w-4 h-4" /> THE ELITE ASSESSMENT STANDARD
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ amount: 0.5 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.9] mb-12 text-white uppercase"
          >
            UNRIVALED <br />
            <span className="gradient-text">MASTERY.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ amount: 0.5 }}
            transition={{ delay: 0.2, duration: 1 }}
            className="max-w-3xl text-slate-400 text-xl md:text-2xl font-medium mb-16 leading-relaxed"
          >
            Elevate your cognitive profile with the world's most sophisticated assessment engine. Built for professionals who demand absolute precision.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.5 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-6"
          >
            {isAuthenticated ? (
              <Button size="lg" onClick={() => navigate('/quizzes')} className="h-20 px-16 text-xl rounded-2xl group">
                Open Dashboard <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </Button>
            ) : (
              <>
                <Button size="lg" onClick={() => navigate('/register')} className="h-20 px-16 text-xl rounded-2xl">
                  Get Started <ArrowRight className="ml-3 w-6 h-6" />
                </Button>
                <Button variant="outline" size="lg" onClick={() => navigate('/login')} className="h-20 px-16 text-xl rounded-2xl border-slate-700">
                  Member Login
                </Button>
              </>
            )}
          </motion.div>

          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            className="mt-32 text-slate-700"
          >
            <ChevronDown className="w-10 h-10" />
          </motion.div>
        </div>
      </section>

      {/* Feature Grid - Multiple Trigger Reveal */}
      <section className="py-40 px-6 bg-slate-950/30">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.3 }}
            className="flex flex-col items-center text-center mb-24"
          >
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8">Professional Core.</h2>
            <p className="text-slate-500 text-xl max-w-2xl font-medium">Enterprise-grade tools for high-stakes assessments, designed with absolute focus in mind.</p>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            {[
              { icon: Zap, title: 'Instant Processing', desc: 'Real-time scoring engine that provides millisecond-accurate results and analytics.' },
              { icon: Shield, title: 'Safe Session', desc: 'Encrypted assessment tunnels that protect your integrity and data privacy.' },
              { icon: BarChart3, title: 'Skill Mapping', desc: 'Intelligent visual reports that map your cognitive strengths and weaknesses.' },
              { icon: Globe, title: 'Edge Network', desc: 'Latency-free testing from anywhere in the world on our distributed cloud.' },
              { icon: Trophy, title: 'Certified', desc: 'Earn verifiable digital credentials recognized by industry leaders globally.' },
              { icon: CheckCircle2, title: 'Autosave+', desc: 'Never lose a single answer with our dual-redundant cloud synchronization.' }
            ].map((f, i) => (
              <motion.div 
                key={i} 
                variants={itemVariants}
                className="pro-card p-12 rounded-[3rem] hover:bg-slate-900/50 group cursor-default"
              >
                <div className="w-16 h-16 rounded-3xl bg-indigo-600/10 flex items-center justify-center text-indigo-500 mb-10 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
                  <f.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-6 text-white">{f.title}</h3>
                <p className="text-slate-500 text-lg leading-relaxed font-medium">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Dynamic Stats Section */}
      <section className="py-32 border-y border-slate-900 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.5 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-16"
          >
            {[
              { label: 'Platform Users', val: '250K+' },
              { label: 'Exams Completed', val: '4.8M' },
              { label: 'Accuracy Rating', val: '99.9%' },
              { label: 'Global Nodes', val: '142' },
            ].map((s, i) => (
              <motion.div key={i} variants={itemVariants} className="text-center">
                <div className="text-5xl lg:text-7xl font-black mb-4 gradient-text">{s.val}</div>
                <div className="text-xs font-black uppercase tracking-[0.3em] text-slate-500">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-48 px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ amount: 0.3 }}
          transition={{ duration: 0.8, type: 'spring' }}
          className="max-w-6xl mx-auto bg-gradient-to-br from-indigo-600 to-violet-700 p-20 md:p-32 rounded-[5rem] text-center shadow-2xl shadow-indigo-500/20"
        >
          <h2 className="text-5xl md:text-7xl font-black text-white mb-10 tracking-tight">Ready for the Next Level?</h2>
          <p className="text-indigo-100 text-xl md:text-2xl mb-16 max-w-2xl mx-auto font-medium opacity-90">
            Join the community of top-tier professionals mastering their craft every day.
          </p>
          <Button size="lg" variant="secondary" onClick={() => navigate('/register')} className="h-20 px-20 text-xl bg-white text-indigo-600 hover:bg-slate-100 shadow-none rounded-2xl">
            Start Free Assessment
          </Button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-24 px-6 border-t border-slate-900">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-16">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-black text-2xl">Q</div>
            <span className="text-3xl font-black text-white tracking-tighter uppercase">EduQuest <span className="text-indigo-500">Pro</span></span>
          </div>
          <div className="flex gap-12 text-slate-500 font-bold text-sm">
            <a href="#" className="hover:text-indigo-400 transition-colors uppercase tracking-widest">Privacy</a>
            <a href="#" className="hover:text-indigo-400 transition-colors uppercase tracking-widest">Terms</a>
            <a href="#" className="hover:text-indigo-400 transition-colors uppercase tracking-widest">Security</a>
          </div>
          <p className="text-slate-600 text-sm font-bold tracking-widest uppercase">&copy; 2025 EDUQUEST PRO SYSTEMS</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
