'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/components/context/AuthContext'; 
export default function PollDetail() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [poll, setPoll] = useState(null);
  const [loading, setLoading] = useState(true);
  const [voting, setVoting] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (params.id) {
      fetchPoll();
    }
  }, [params.id]);

  const fetchPoll = async () => {
    try {
      const res = await fetch(`/api/polls/${params.id}`);
      if (!res.ok) throw new Error('Poll not found');
      const data = await res.json();
      if (data.success) {
        setPoll(data.data);
        if (user && data.data.voters?.includes(user.id)) {
          setHasVoted(true);
        }
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (optionId) => {
    if (voting || hasVoted || !poll || new Date(poll.expiry) < new Date()) return;

    setVoting(true);
    setMessage('');

    try {
      const res = await fetch(`/api/polls/${params.id}/vote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          optionId, 
          userId: user?.id 
        })
      });

      const data = await res.json();
      
      if (res.ok) {
        setHasVoted(true);
        setMessage(' Vote recorded! Thanks!');
        fetchPoll();
        router.refresh();
      } else {
        setMessage(` ${data.error || 'Vote failed'}`);
      }
    } catch (error) {
      setMessage(' Network error');
    } finally {
      setVoting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!poll) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center p-8 bg-white rounded-3xl shadow-2xl">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Poll Not Found</h1>
          <Link href="/polls" className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold inline-block">
            ← Back to Polls
          </Link>
        </div>
      </div>
    );
  }

  const isExpired = new Date() > new Date(poll.expiry);
  const totalVotes = poll.options.reduce((sum, opt) => sum + opt.votes, 0) || 0;
  const winner = totalVotes > 0 
    ? poll.options.reduce((prev, curr) => curr.votes > prev.votes ? curr : prev)
    : null;
  const percentage = (votes) => totalVotes > 0 ? Math.round((votes / totalVotes) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link 
          href="/polls" 
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-bold mb-12"
        >
          ← Back to All Polls
        </Link>

        <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-white/50">
          {/* Header */}
          <div className="flex justify-between items-start mb-12">
            <div className={`px-6 py-3 rounded-2xl text-sm font-bold shadow-lg ${
              isExpired 
                ? 'bg-gradient-to-r from-orange-400 to-orange-500 text-white' 
                : 'bg-gradient-to-r from-emerald-400 to-emerald-500 text-white'
            }`}>
              {isExpired ? '⏰ Poll Expired' : 'Voting Active'}
            </div>
            <div className="text-3xl font-black text-slate-700">
              {totalVotes} total votes
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-12 text-center leading-tight">
            {poll.question}
          </h1>

          {/* Expiry */}
          <div className="text-center mb-12 p-6 bg-slate-50 rounded-2xl border">
            <p className="text-sm text-slate-500 mb-2">Expires on</p>
            <p className="text-2xl font-bold text-slate-900">
              {new Date(poll.expiry).toLocaleString()}
            </p>
          </div>

          {/* Vote Status */}
          {!isExpired && user && (
            <div className={`p-6 rounded-2xl mb-12 text-center font-bold text-xl border-4 ${
              hasVoted 
                ? 'bg-emerald-100 text-emerald-800 border-emerald-400' 
                : 'bg-blue-100 text-blue-800 border-blue-400'
            }`}>
              {hasVoted ? ' You have voted!' : '🗳️ Cast your one vote below'}
            </div>
          )}

          {/* Options */}
          <div className="space-y-6">
            {poll.options.map((option, index) => {
              const optionPercentage = percentage(option.votes);

              return (
                <div key={option._id} className={`p-8 rounded-3xl transition-all border-4 ${
                  isExpired || hasVoted || voting
                    ? 'bg-slate-50/50 border-slate-200 cursor-not-allowed opacity-75'
                    : 'bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 border-blue-200 hover:shadow-2xl cursor-pointer'
                }`}>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-6">
                      <span className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl font-black text-2xl flex items-center justify-center shadow-2xl">
                        {String.fromCharCode(65 + index)}
                      </span>
                      <div>
                        <h3 className="font-black text-2xl text-slate-900 mb-1">{option.text}</h3>
                        <p className="text-3xl font-black text-slate-700">{option.votes} votes</p>
                      </div>
                    </div>
                    
                    {totalVotes > 0 && (
                      <div className="flex flex-col items-end gap-3">
                        <span className="text-2xl font-black text-slate-600">{optionPercentage}%</span>
                        <div className="w-48 h-6 bg-slate-200 rounded-full overflow-hidden shadow-inner">
                          <div 
                            className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full shadow-lg"
                            style={{ width: `${optionPercentage}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Vote Button */}
                  {!isExpired && !hasVoted && !voting && user && (
                    <button
                      onClick={() => handleVote(option._id)}
                      disabled={voting}
                      className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 disabled:opacity-50 text-white py-5 px-8 rounded-2xl font-black text-xl shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center gap-3"
                    >
                      {voting ? (
                        <>
                          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Recording vote...
                        </>
                      ) : (
                        `🗳️ Vote for This (${option.votes} votes)`
                      )}
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {/* Messages */}
          {message && (
            <div className={`mt-12 p-8 rounded-3xl text-center font-bold text-2xl border-4 ${
              message.includes('Vote recorded') 
                ? 'bg-emerald-100 text-emerald-800 border-emerald-400 shadow-2xl' 
                : 'bg-red-100 text-red-800 border-red-400 shadow-lg'
            }`}>
              {message}
            </div>
          )}

          {/* Winner */}
          {isExpired && totalVotes > 0 && (
            <div className="mt-16 p-12 bg-gradient-to-r from-emerald-400 to-emerald-500 text-white rounded-3xl shadow-2xl text-center">
              <div className="text-6xl mb-6">🏆</div>
              <h2 className="text-4xl font-black mb-6">WINNER!</h2>
              <p className="text-3xl font-black mb-4">{winner.text}</p>
              <p className="text-2xl opacity-90">
                {Math.round((winner.votes / totalVotes) * 100)}% of {totalVotes} votes
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
