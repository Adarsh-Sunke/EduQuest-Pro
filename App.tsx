import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import QuizListPage from './pages/QuizListPage';
import QuizDetailsPage from './pages/QuizDetailsPage';
import QuizPlayerPage from './pages/QuizPlayerPage';
import ResultPage from './pages/ResultPage';
import HistoryPage from './pages/HistoryPage';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';

const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617]">
      <motion.div 
        animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="w-12 h-12 border-2 border-violet-500 border-t-transparent rounded-full"
      />
    </div>
  );
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return null;
  return !isAuthenticated ? <>{children}</> : <Navigate to="/quizzes" />;
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-[#020617]">
      {/* Navbar is now always rendered across all pages as requested */}
      <Navbar />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
            <Route path="/login" element={<PublicRoute><PageTransition><LoginPage /></PageTransition></PublicRoute>} />
            <Route path="/register" element={<PublicRoute><PageTransition><RegisterPage /></PageTransition></PublicRoute>} />
            
            <Route path="/quizzes" element={<PrivateRoute><PageTransition><QuizListPage /></PageTransition></PrivateRoute>} />
            <Route path="/quizzes/:quizId" element={<PrivateRoute><PageTransition><QuizDetailsPage /></PageTransition></PrivateRoute>} />
            <Route path="/attempts/:attemptId" element={<PrivateRoute><PageTransition><QuizPlayerPage /></PageTransition></PrivateRoute>} />
            <Route path="/attempts/:attemptId/result" element={<PrivateRoute><PageTransition><ResultPage /></PageTransition></PrivateRoute>} />
            <Route path="/profile/history" element={<PrivateRoute><PageTransition><HistoryPage /></PageTransition></PrivateRoute>} />
            
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <AnimatedRoutes />
      </Router>
    </AuthProvider>
  );
};

export default App;