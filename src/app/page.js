
// import Link from 'next/link';

// export default function Home() {
//   return (
//     <main className="container mx-auto px-4 py-8 sm:py-12 md:py-16 lg:py-20 max-w-6xl min-h-screen">
//       <div className="text-center mb-12 sm:mb-16 md:mb-20">
//         <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 sm:mb-6 leading-tight">
//           Quick Decision Maker
//         </h1>
//         <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 max-w-sm sm:max-w-md md:max-w-2xl mx-auto px-4 sm:px-0 leading-relaxed">
//           Create polls that auto-expire. Get quick decisions from friends and colleagues.
//         </p>
//         <Link 
//           href="/polls/new"
//           className="inline-flex items-center justify-center gap-2 sm:gap-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-2xl text-sm sm:text-base md:text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 w-full sm:w-auto max-w-sm mx-auto block sm:inline-block"
//         >
//           Create Your First Poll
//         </Link>
//       </div>
      
//       <div className="flex justify-center">
//         <Link 
//           href="/polls"
//           className="block w-full sm:w-auto max-w-sm sm:max-w-md bg-white/80 backdrop-blur-sm hover:bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 text-center"
//         >
//           <h3 className="text-xl sm:text-2xl md:text-2xl font-bold text-gray-900 mb-2 leading-tight">
//             Browse All Polls
//           </h3>
//           <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
//             See what others are deciding
//           </p>
//         </Link>
//       </div>
//     </main>
//   );
// }



import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900 text-white">
      <div className="container mx-auto px-4 py-16 sm:py-24 md:py-32 flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight mb-4">
          Quick Decision Maker
        </h1>

 <p className="text-lg sm:text-xl md:text-2xl text-indigo-100 max-w-4xl mx-auto mb-8 px-4 sm:px-0 leading-tight">
  Turn any question into a real‑time poll that expires automatically, get quick, fair decisions from friends, teams, or anyone, and let outcomes settle without endless back‑and‑forth discussion.
</p>


        <div className="flex flex-col sm:flex-row items-center gap-4 mb-12">
          <Link
            href="/polls/new"
            className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-black px-8 py-4 sm:px-10 sm:py-5 rounded-3xl text-base sm:text-lg shadow-2xl hover:shadow-emerald-500/30 transition-all hover:-translate-y-1 w-full sm:w-auto max-w-xs sm:max-w-none"
          >
            Create Poll
          </Link>
          <Link
            href="/polls"
            className="inline-flex items-center justify-center gap-3 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-semibold px-8 py-4 sm:px-10 sm:py-5 rounded-3xl text-base sm:text-lg border border-white/40 shadow-lg hover:shadow-white/20 transition-all hover:-translate-y-1 w-full sm:w-auto max-w-xs sm:max-w-none"
          >
            View Polls
          </Link>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl max-w-sm sm:max-w-md mx-auto">
          <div className="flex flex-col gap-3">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="flex items-center justify-between px-4 py-3 bg-white/10 rounded-2xl"
              >
                <span className="text-sm sm:text-base font-medium">
                  What should we eat tonight?
                </span>
                <span className="text-sm font-bold bg-gradient-to-r from-blue-400 to-blue-500 px-3 py-1 rounded-full">
                  +{8 + i}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
