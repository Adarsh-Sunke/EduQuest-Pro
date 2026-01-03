
import React from 'react';

export const QuizCardSkeleton = () => (
  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm animate-pulse">
    <div className="h-6 w-3/4 bg-slate-100 rounded mb-4"></div>
    <div className="space-y-2 mb-6">
      <div className="h-3 w-full bg-slate-50 rounded"></div>
      <div className="h-3 w-5/6 bg-slate-50 rounded"></div>
    </div>
    <div className="flex justify-between items-center mt-auto pt-4 border-t border-slate-50">
      <div className="h-4 w-20 bg-slate-100 rounded"></div>
      <div className="h-4 w-16 bg-slate-100 rounded"></div>
    </div>
  </div>
);

export const QuestionSkeleton = () => (
  <div className="animate-pulse space-y-8">
    <div className="space-y-3">
      <div className="h-4 w-24 bg-slate-100 rounded"></div>
      <div className="h-8 w-full bg-slate-100 rounded"></div>
      <div className="h-8 w-2/3 bg-slate-100 rounded"></div>
    </div>
    <div className="space-y-4">
      {[1, 2, 3, 4].map(i => (
        <div key={i} className="h-16 w-full bg-slate-50 rounded-xl"></div>
      ))}
    </div>
  </div>
);
