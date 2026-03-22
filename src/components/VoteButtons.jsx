'use client';

import { useState } from 'react';
import Button from './ui/Button';

export default function VoteButtons({ options, onVote, disabled }) {
  const [selected, setSelected] = useState(null);
  const totalVotes = options.reduce((sum, opt) => sum + opt.votes, 0);

  const handleVote = (optionId) => {
    setSelected(optionId);
    onVote(optionId);
  };

  return (
    <div className="space-y-4">
      {options.map((option, index) => {
        const percentage = totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0;
        return (
          <div key={option._id} className="group">
            <button
              onClick={() => !disabled && handleVote(option._id)}
              disabled={disabled}
              className={`w-full p-4 rounded-2xl border-2 transition-all group hover:shadow-md ${
                disabled 
                  ? 'border-slate-200 bg-slate-50 cursor-not-allowed' 
                  : selected === option._id
                    ? 'border-primary bg-primary/10 shadow-lg scale-105' 
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 bg-gradient-to-br from-primary to-blue-600 text-white rounded-xl flex items-center justify-center font-bold text-sm">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <div>
                    <p className="font-semibold text-slate-900">{option.text}</p>
                    <div className="flex items-center gap-2 text-sm text-slate-500 mt-1">
                      <span className="w-4 h-4 inline-block bg-slate-400 rounded-full mr-1"></span>
                      <span>{option.votes} votes</span>
                      {totalVotes > 0 && <span>({percentage}%)</span>}
                    </div>
                  </div>
                </div>
                {totalVotes > 0 && (
                  <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                )}
              </div>
            </button>
          </div>
        );
      })}
      
      {disabled && (
        <p className="text-center text-sm text-slate-500 py-4">
          Voting closed - poll expired
        </p>
      )}
    </div>
  );
}
