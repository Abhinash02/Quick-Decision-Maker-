'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import PollCard from '@/components/PollCard';

const FILTERS = [
  { id: 'all', label: 'All Polls', value: '' },
  { id: 'active', label: 'Active', value: 'active' },
  { id: 'expired', label: 'Expired', value: 'expired' }
];

export default function PollsPage() {
  const [polls, setPolls] = useState([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPolls();
  }, [filter]);

  const fetchPolls = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ limit: '12' });
      if (filter) params.append('status', filter);
      
      const res = await fetch(`/api/polls?${params}`);
      const data = await res.json();
      setPolls(data.polls || []);
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-20">
        <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-6">
          Decision Polls
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Let the community help you decide. Vote now!
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 justify-center mb-16">
        {FILTERS.map(({ id, label, value }) => (
          <button
            key={id}
            onClick={() => setFilter(value)}
            className={`px-8 py-4 rounded-2xl font-bold text-lg shadow-lg transition-all transform hover:scale-105 ${
              filter === value
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-blue-500/50'
                : 'bg-white/80 text-slate-700 border-2 border-slate-200 hover:border-blue-300 hover:shadow-xl'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Polls Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? (
          <div className="col-span-full text-center py-24">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-xl text-slate-600">Loading polls...</p>
          </div>
        ) : polls.length === 0 ? (
          <div className="col-span-full text-center py-24">
            <div className="w-24 h-24 bg-slate-200 rounded-3xl mx-auto mb-8 flex items-center justify-center">
              <span className="text-4xl">📊</span>
            </div>
            <h3 className="text-3xl font-bold text-slate-900 mb-4">No polls found</h3>
            <p className="text-slate-600 mb-8 text-lg">Be the first to create one!</p>
            <Link 
              href="/polls/new"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-10 py-5 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-3xl hover:scale-105 transition-all"
            >
              🚀 Create First Poll
            </Link>
          </div>
        ) : (
          polls.map(poll => (
            <PollCard key={poll._id} poll={poll} />
          ))
        )}
      </div>
    </div>
  );
}
