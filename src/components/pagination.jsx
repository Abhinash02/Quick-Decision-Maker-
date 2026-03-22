'use client';

import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ current, totalPages }) {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    let start = Math.max(1, current - 2);
    let end = Math.min(totalPages, start + maxVisible - 1);
    
    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-16">
      <Link
        href={{ query: { ...window.location.search.split('&').reduce((acc, param) => {
          const [key, value] = param.split('=');
          if (key !== 'page') acc[key] = value;
          return acc;
        }, {}), page: current - 1 } }}
        className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:shadow-md transition-all disabled:opacity-50 disabled:pointer-events-none"
        prefetch={false}
      >
        <ChevronLeft className="w-4 h-4" />
        Previous
      </Link>

      {getPageNumbers().map(page => (
        <Link
          key={page}
          href={{ query: { ...window.location.search.split('&').reduce((acc, param) => {
            const [key, value] = param.split('=');
            if (key !== 'page') acc[key] = value;
            return acc;
          }, {}), page: page } }}
          className={`px-4 py-3 text-sm font-semibold rounded-xl transition-all ${
            current === page
              ? 'bg-gradient-to-r from-primary to-blue-600 text-white shadow-lg'
              : 'text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 hover:shadow-md'
          }`}
          prefetch={false}
        >
          {page}
        </Link>
      ))}

      <Link
        href={{ query: { ...window.location.search.split('&').reduce((acc, param) => {
          const [key, value] = param.split('=');
          if (key !== 'page') acc[key] = value;
          return acc;
        }, {}), page: current + 1 } }}
        className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:shadow-md transition-all disabled:opacity-50 disabled:pointer-events-none"
        prefetch={false}
      >
        Next
        <ChevronRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
