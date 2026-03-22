// 'use client';

// import Link from 'next/link';
// import { usePathname } from 'next/navigation';

// export default function MainLayout({ children }) {
//   const pathname = usePathname();

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
//       <nav className="bg-white/95 backdrop-blur-xl border-b border-slate-200 sticky top-0 z-50 shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 py-4">
//           <div className="flex items-center justify-between">
//             <Link href="/" className="text-3xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//               QuickDecision
//             </Link>
//             <div className="flex items-center space-x-4">
//               <Link 
//                 href="/polls" 
//                 className={`px-6 py-3 rounded-2xl font-semibold transition-all ${
//                   pathname.startsWith('/polls') 
//                     ? 'bg-blue-600 text-white shadow-lg' 
//                     : 'text-slate-700 hover:bg-slate-100'
//                 }`}
//               >
//                  Polls
//               </Link>
//               <Link 
//                 href="/polls/new"
//                 className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all"
//               >
//                 + New Poll
//               </Link>
//             </div>
//           </div>
//         </div>
//       </nav>
//       <main>{children}</main>
//     </div>
//   );
// }


'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function MainLayout({ children }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Mobile-first responsive nav */}
      <nav className="bg-white/95 backdrop-blur-xl border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-sm sm:max-w-2xl md:max-w-4xl lg:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            {/* Logo - Responsive sizing */}
            <Link 
              href="/" 
              className="text-xl sm:text-2xl lg:text-3xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:scale-105 transition-transform"
            >
              QuickDecision
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
                 <Link 
                href="/" 
                className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-2xl font-semibold text-sm lg:text-base transition-all ${
                  pathname.startsWith('/polls') 
                    ? 'bg-blue-600 text-white shadow-lg hover:shadow-xl' 
                    : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                Home
              </Link>
              <Link 
                href="/polls" 
                className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-2xl font-semibold text-sm lg:text-base transition-all ${
                  pathname.startsWith('/polls') 
                    ? 'bg-blue-600 text-white shadow-lg hover:shadow-xl' 
                    : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                All Polls
              </Link>
              <Link 
                href="/polls/new"
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-2xl font-semibold text-sm lg:text-base shadow-lg hover:shadow-xl transition-all hover:scale-105"
              >
                + New Poll
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 transition-all">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Mobile Menu (Hidden by default) */}
      <div className="md:hidden bg-white/90 backdrop-blur-lg border-b border-slate-200">
        <div className="max-w-sm sm:max-w-2xl mx-auto px-4 py-4 space-y-2">
          <Link 
            href="/polls" 
            className={`block w-full text-left px-6 py-4 rounded-2xl font-semibold transition-all text-sm ${
              pathname.startsWith('/polls') 
                ? 'bg-blue-600 text-white shadow-lg' 
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            Polls
          </Link>
          <Link 
            href="/polls/new"
            className="block w-full text-center bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all text-sm"
          >
            + New Poll
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <main className="pb-8 sm:pb-12 lg:pb-16 px-4 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}
