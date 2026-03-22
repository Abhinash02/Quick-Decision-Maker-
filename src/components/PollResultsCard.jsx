'use client';

import Link from 'next/link';

export default function PollCard({ poll }) {
  const isExpired = new Date() > new Date(poll.expiry);
  const totalVotes = poll.options.reduce((sum, opt) => sum + opt.votes, 0);
  const winner = poll.options.reduce((prev, curr) => curr.votes > prev.votes ? curr : prev);
  
  const getPercentage = (votes) => totalVotes > 0 ? Math.round((votes / totalVotes) * 100) : 0;

  return (
    <div className="w-full h-full group bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-lg sm:shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 sm:hover:-translate-y-3 border border-white/50">
      {/* Status Badge */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 sm:mb-6 gap-2 sm:gap-0">
        <div className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-bold shadow-md w-fit ${
          isExpired 
            ? 'bg-gradient-to-r from-orange-400 to-orange-500 text-white' 
            : 'bg-gradient-to-r from-emerald-400 to-emerald-500 text-white'
        }`}>
          {isExpired ? 'Expired' : 'Active'}
        </div>
        <div className="text-lg sm:text-2xl font-bold text-slate-700 text-center sm:text-right">
          {totalVotes} votes
        </div>
      </div>

      {/* Question */}
      <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 mb-4 sm:mb-6 leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors text-center sm:text-left">
        {poll.question}
      </h3>

      {/* Options Preview */}
      <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8 max-h-48 sm:max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100">
        {poll.options.slice(0, 4).map((option, index) => {
          const percentage = getPercentage(option.votes);
          return (
            <div key={`${poll._id}-${option._id}`} className="flex items-center justify-between p-3 sm:p-4 bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl group-hover:from-slate-100">
              <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
                <span className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl sm:rounded-2xl flex items-center justify-center font-bold text-sm sm:text-lg shadow-lg flex-shrink-0">
                  {String.fromCharCode(65 + index)}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-slate-900 text-sm sm:text-base truncate">{option.text}</p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1 sm:gap-1 min-w-[60px]">
                <span className="font-bold text-xs sm:text-sm text-slate-700">{option.votes}</span>
                {totalVotes > 0 && (
                  <div className="w-16 sm:w-20 h-1.5 sm:h-2 bg-slate-200 rounded-full overflow-hidden">
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
        {/* {poll.options.length > 3 && (
          // <div className="text-center text-xs sm:text-sm text-slate-500 py-2 sm:py-3 bg-slate-50 rounded-xl">
          //   +{poll.options.length - 4} more options
          // </div>
        )} */}
      </div>

      {/* Winner & Action */}
      <div className="pt-4 sm:pt-6 border-t border-slate-200 space-y-3">
        {isExpired && (
          <div className="flex items-center justify-center sm:justify-start gap-2 sm:gap-3 bg-gradient-to-r from-emerald-400 to-emerald-500 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl shadow-lg">
            <span className="text-xl sm:text-2xl">🏆</span>
            <span className="font-bold text-sm sm:text-lg truncate flex-1">{winner.text}</span>
            <span className="text-xs sm:text-sm opacity-90 whitespace-nowrap">({getPercentage(winner.votes)}%)</span>
          </div>
        )}
        <Link 
          href={`/polls/${poll._id}`}
          className="w-full block text-center bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-lg shadow-xl hover:shadow-2xl transition-all hover:scale-105 min-h-[44px] flex items-center justify-center"
        >
          {isExpired ? 'View Results' : 'Vote Now'}
        </Link>
      </div>
    </div>
  );
}
