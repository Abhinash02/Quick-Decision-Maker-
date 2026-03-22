// 'use client';

// import { useState } from 'react';
// import Button from './ui/Button';

// export default function VoteButtons({ options, onVote, disabled }) {
//   const [selected, setSelected] = useState(null);
//   const totalVotes = options.reduce((sum, opt) => sum + opt.votes, 0);

//   const handleVote = (optionId) => {
//     setSelected(optionId);
//     onVote(optionId);
//   };

//   return (
//     <div className="space-y-4">
//       {options.map((option, index) => {
//         const percentage = totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0;
//         return (
//           <div key={option._id} className="group">
//             <button
//               onClick={() => !disabled && handleVote(option._id)}
//               disabled={disabled}
//               className={`w-full p-4 rounded-2xl border-2 transition-all group hover:shadow-md ${
//                 disabled 
//                   ? 'border-slate-200 bg-slate-50 cursor-not-allowed' 
//                   : selected === option._id
//                     ? 'border-primary bg-primary/10 shadow-lg scale-105' 
//                     : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
//               }`}
//             >
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-3">
//                   <span className="w-8 h-8 bg-gradient-to-br from-primary to-blue-600 text-white rounded-xl flex items-center justify-center font-bold text-sm">
//                     {String.fromCharCode(65 + index)}
//                   </span>
//                   <div>
//                     <p className="font-semibold text-slate-900">{option.text}</p>
//                     <div className="flex items-center gap-2 text-sm text-slate-500 mt-1">
//                       <span className="w-4 h-4 inline-block bg-slate-400 rounded-full mr-1"></span>
//                       <span>{option.votes} votes</span>
//                       {totalVotes > 0 && <span>({percentage}%)</span>}
//                     </div>
//                   </div>
//                 </div>
//                 {totalVotes > 0 && (
//                   <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
//                     <div 
//                       className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full transition-all duration-500"
//                       style={{ width: `${percentage}%` }}
//                     />
//                   </div>
//                 )}
//               </div>
//             </button>
//           </div>
//         );
//       })}
      
//       {disabled && (
//         <p className="text-center text-sm text-slate-500 py-4">
//           Voting closed - poll expired
//         </p>
//       )}
//     </div>
//   );
// }



// 'use client';

// import { useState } from 'react';
// import Button from './ui/Button';

// export default function VoteButtons({ options, onVote, disabled }) {
//   const [selected, setSelected] = useState(null);
//   const totalVotes = options.reduce((sum, opt) => sum + opt.votes, 0);

//   const handleVote = (optionId) => {
//     setSelected(optionId);
//     onVote(optionId);
//   };

//   return (
//     <div className="w-full space-y-3 sm:space-y-4 p-2 sm:p-4">
//       {options.map((option, index) => {
//         const percentage = totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0;
//         return (
//           <div key={option._id} className="group w-full">
//             <button
//               onClick={() => !disabled && handleVote(option._id)}
//               disabled={disabled}
//               className={`w-full min-h-[52px] sm:min-h-[60px] p-3 sm:p-4 rounded-xl sm:rounded-2xl border-2 transition-all group hover:shadow-md active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-200 ${
//                 disabled 
//                   ? 'border-slate-200 bg-slate-50/80 cursor-not-allowed opacity-60' 
//                   : selected === option._id
//                     ? 'border-blue-500 bg-blue-500/10 shadow-lg scale-105 ring-2 ring-blue-200/50' 
//                     : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/80 active:bg-slate-100'
//               }`}
//             >
//               <div className="flex items-center justify-between h-full">
//                 <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
//                   <span className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg sm:rounded-xl flex items-center justify-center font-bold text-sm sm:text-base shadow-lg flex-shrink-0">
//                     {String.fromCharCode(65 + index)}
//                   </span>
//                   <div className="min-w-0 flex-1">
//                     <p className="font-semibold text-slate-900 text-sm sm:text-base truncate leading-tight">{option.text}</p>
//                     <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-slate-500 mt-1 sm:mt-1.5">
//                       <span className="w-3 h-3 sm:w-4 sm:h-4 inline-block bg-slate-400 rounded-full"></span>
//                       <span>{option.votes} votes</span>
//                       {totalVotes > 0 && <span>({percentage}%)</span>}
//                     </div>
//                   </div>
//                 </div>
//                 {totalVotes > 0 && (
//                   <div className="w-20 sm:w-24 h-1.5 sm:h-2 bg-slate-200 rounded-full overflow-hidden ml-4 flex-shrink-0">
//                     <div 
//                       className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full shadow-inner transition-all duration-500"
//                       style={{ width: `${percentage}%` }}
//                     />
//                   </div>
//                 )}
//               </div>
//             </button>
//           </div>
//         );
//       })}
      
//       {disabled && (
//         <div className="text-center py-4 sm:py-6 px-4">
//           <p className="text-sm sm:text-base text-slate-500 bg-slate-50/80 px-4 py-3 rounded-xl border border-slate-200">
//             Voting closed - poll expired
//           </p>
//         </div>
//       )}
//     </div>
//   );
// }



'use client';

import { useState } from 'react';

export default function VoteButtons({ options, onVote, disabled }) {
  const [selected, setSelected] = useState(null);
  const totalVotes = options.reduce((sum, opt) => sum + opt.votes, 0);

  const handleVote = (optionId) => {
    setSelected(optionId);
    onVote(optionId);
  };

  return (
    <div className="w-full space-y-3 sm:space-y-3.5 md:space-y-4 p-3 sm:p-4 md:p-6 max-w-md mx-auto">
      {options.map((option, index) => {
        const percentage = totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0;
        return (
          <div key={option._id} className="group w-full">
            <button
              onClick={() => !disabled && handleVote(option._id)}
              disabled={disabled}
              className={`w-full min-h-[54px] sm:min-h-[58px] md:min-h-[62px] p-3.5 sm:p-4 md:p-5 rounded-2xl border-2 transition-all duration-200 group hover:shadow-lg active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-blue-200/50 ${
                disabled 
                  ? 'border-slate-200/60 bg-slate-50/90 cursor-not-allowed opacity-70 shadow-sm' 
                  : selected === option._id
                    ? 'border-blue-500 bg-gradient-to-r from-blue-500/10 to-blue-600/10 shadow-xl ring-2 ring-blue-200/60 scale-[1.02]' 
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/90 active:bg-slate-100 shadow-md hover:shadow-lg'
              }`}
            >
              <div className="flex items-stretch justify-between h-full">
                <div className="flex items-center gap-2.5 sm:gap-3 md:gap-4 flex-1 min-w-0 pr-2 sm:pr-3">
                  {/* Letter Badge */}
                  <span className="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl sm:rounded-2xl flex items-center justify-center font-bold text-sm sm:text-base md:text-lg shadow-lg flex-shrink-0">
                    {String.fromCharCode(65 + index)}
                  </span>
                  
                  {/* Option Text & Stats */}
                  <div className="min-w-0 flex-1 py-1">
                    <p className="font-semibold text-slate-900 text-sm sm:text-base md:text-lg truncate leading-tight line-clamp-1">
                      {option.text}
                    </p>
                    <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm md:text-base text-slate-500 mt-1">
                      <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 inline-block bg-slate-400 rounded-full flex-shrink-0"></span>
                      <span className="font-medium">{option.votes} votes</span>
                      {totalVotes > 0 && (
                        <span className="font-medium">({percentage}%)</span>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Progress Bar */}
                {totalVotes > 0 && (
                  <div className="w-20 sm:w-24 md:w-28 h-2 sm:h-2.5 md:h-3 bg-slate-200/80 rounded-full overflow-hidden ml-3 sm:ml-4 flex-shrink-0 shadow-inner">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 rounded-full shadow-md transition-all duration-700 ease-out"
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    />
                  </div>
                )}
              </div>
            </button>
          </div>
        );
      })}
      
      {/* Disabled State Message */}
      {disabled && (
        <div className="text-center py-5 sm:py-6 md:py-8 px-4 sm:px-6">
          <div className="text-sm sm:text-base md:text-lg text-slate-500/80 bg-gradient-to-r from-slate-50/90 to-slate-100/90 px-6 sm:px-8 py-4 sm:py-5 md:py-6 rounded-2xl border border-slate-200/60 shadow-lg backdrop-blur-sm">
            <div className="flex items-center justify-center gap-2 mb-1">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-semibold">Voting Closed</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500">Poll has expired</p>
          </div>
        </div>
      )}
    </div>
  );
}
