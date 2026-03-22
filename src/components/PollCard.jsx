'use client';

import Link from 'next/link';

export default function PollCard({ poll }) {
  const isExpired = new Date() > new Date(poll.expiry);
  const totalVotes = poll.options.reduce((sum, opt) => sum + opt.votes, 0);
  const winner = poll.options.reduce((prev, curr) => curr.votes > prev.votes ? curr : prev);
  
  const getPercentage = (votes) => totalVotes > 0 ? Math.round((votes / totalVotes) * 100) : 0;

  return (
    <div className="group bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-3 border border-white/50 h-full">
      {/* Status Badge */}
      <div className="flex justify-between items-start mb-6">
        <div className={`px-4 py-2 rounded-full text-sm font-bold shadow-md ${
          isExpired 
            ? 'bg-gradient-to-r from-orange-400 to-orange-500 text-white' 
            : 'bg-gradient-to-r from-emerald-400 to-emerald-500 text-white'
        }`}>
          {isExpired ? 'Expired' : 'Active'}
        </div>
        <div className="text-2xl font-bold text-slate-700">
          {totalVotes} votes
        </div>
      </div>

      {/* Question */}
      <h3 className="text-2xl font-bold text-slate-900 mb-6 leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors">
        {poll.question}
      </h3>

      {/* Options Preview */}
      <div className="space-y-3 mb-8 max-h-64 overflow-y-auto">
        {poll.options.map((option, index) => {  //slice(0, 3)
          const percentage = getPercentage(option.votes);
          return (
            <div key={`${poll._id}-${option._id}`} className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl group-hover:from-slate-100">
              <div className="flex items-center gap-4">
                <span className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl flex items-center justify-center font-bold text-lg shadow-lg">
                  {String.fromCharCode(65 + index)}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-slate-900 truncate">{option.text}</p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="font-bold text-sm text-slate-700">{option.votes}</span>
                {totalVotes > 0 && (
                  <div className="w-20 h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full shadow-inner transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}
        {poll.options.length > 3 && (
          <div className="text-center text-sm text-slate-500 py-3 bg-slate-50 rounded-2xl">
            +{poll.options.length - 3} more options
          </div>
        )}
      </div>

      {/* Winner & Action */}
      <div className="pt-6 border-t border-slate-200 space-y-3">
        {isExpired && (
          <div className="flex items-center gap-3 bg-gradient-to-r from-emerald-400 to-emerald-500 text-white px-6 py-3 rounded-2xl shadow-lg">
            <span className="text-2xl">🏆</span>
            <span className="font-bold text-lg truncate">{winner.text}</span>
            <span className="ml-auto text-sm opacity-90">({getPercentage(winner.votes)}%)</span>
          </div>
        )}
        <Link 
          href={`/polls/${poll._id}`}
          className="w-full block text-center bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-4 px-6 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all hover:scale-105"
        >
          {isExpired ? ' View Results' : ' Vote Now'}
        </Link>
      </div>
    </div>
  );
}
