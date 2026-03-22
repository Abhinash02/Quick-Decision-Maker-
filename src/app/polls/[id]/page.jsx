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
          userId: user?.id,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setHasVoted(true);
        setMessage('Vote recorded! Thanks!');
        fetchPoll();
        router.refresh();
      } else {
        setMessage(` ${data.error || 'Vote failed'}`);
      }
    } catch (error) {
      setMessage('Network error');
    } finally {
      setVoting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!poll) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="w-full max-w-xs sm:max-w-md text-center p-5 bg-white rounded-2xl sm:rounded-3xl shadow-2xl">
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">Poll Not Found</h1>
          <Link
            href="/polls"
            className="bg-blue-600 text-white px-4 py-3 sm:px-5 sm:py-4 rounded-xl sm:rounded-2xl font-bold inline-block text-sm sm:text-base"
          >
            ← Back to Polls
          </Link>
        </div>
      </div>
    );
  }

  const isExpired = new Date() > new Date(poll.expiry);
  const totalVotes = poll.options.reduce((sum, opt) => sum + opt.votes, 0) || 0;
  const winner = totalVotes > 0
    ? poll.options.reduce((prev, curr) => (curr.votes > prev.votes ? curr : prev), poll.options[0])
    : null;
  const percentage = (votes) => (totalVotes > 0 ? Math.round((votes / totalVotes) * 100) : 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-6 px-4 sm:py-10">
      <div className="max-w-xs sm:max-w-2xl md:max-w-3xl mx-auto w-full">
        <Link
          href="/polls"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-bold mb-6 sm:mb-10 text-sm sm:text-base"
        >
          ← Back to All Polls
        </Link>

        <div className="bg-white/90 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 shadow-2xl border border-white/50">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-8 sm:mb-10">
            <div
              className={`px-4 py-2.5 sm:px-6 sm:py-3 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-bold shadow-md ${
                isExpired
                  ? 'bg-gradient-to-r from-orange-400 to-orange-500 text-white'
                  : 'bg-gradient-to-r from-emerald-400 to-emerald-500 text-white'
              }`}
            >
              {isExpired ? 'Poll Expired' : 'Voting Active'}
            </div>
            <div className="text-xl sm:text-2xl md:text-3xl font-black text-slate-700 text-right">
              {totalVotes} votes
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 mb-6 sm:mb-8 md:mb-10 text-center leading-tight">
            {poll.question}
          </h1>

          {/* Expiry */}
          <div className="text-center mb-6 sm:mb-8 p-4 sm:p-6 bg-slate-50 rounded-xl sm:rounded-2xl border">
            <p className="text-xs sm:text-sm text-slate-500 mb-1 sm:mb-2">Expires on</p>
            <p className="text-xl sm:text-2xl font-bold text-slate-900">
              {new Date(poll.expiry).toLocaleString()}
            </p>
          </div>

          {/* Vote Status */}
          {!isExpired && user && (
            <div
              className={`p-4 sm:p-5 rounded-xl sm:rounded-2xl mb-6 sm:mb-10 text-center font-bold text-lg sm:text-xl border-2 ${
                hasVoted
                  ? 'bg-emerald-100 text-emerald-800 border-emerald-400'
                  : 'bg-blue-100 text-blue-800 border-blue-400'
              }`}
            >
              {hasVoted ? 'You have voted!' : '🗳️ Cast your one vote below'}
            </div>
          )}

          {/* Options */}
          <div className="space-y-4 sm:space-y-6">
            {poll.options.map((option, index) => {
              const optionPercentage = percentage(option.votes);

              return (
                <div
                  key={option._id}
                  className={`p-5 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl transition-all border-2 ${
                    isExpired || hasVoted || voting
                      ? 'bg-slate-50/50 border-slate-200 cursor-not-allowed opacity-75'
                      : 'bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 border-blue-200 hover:shadow-xl sm:hover:shadow-2xl cursor-pointer'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6 mb-4 sm:mb-6">
                    <div className="flex items-center gap-4 sm:gap-6 flex-1">
                      <span
                        className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl sm:rounded-2xl font-black text-lg sm:text-xl md:text-2xl flex items-center justify-center shadow-xl"
                        aria-hidden="true"
                      >
                        {String.fromCharCode(65 + index)}
                      </span>
                      <div className="min-w-0 flex-1">
                        <h2 className="font-black text-base sm:text-xl md:text-2xl text-slate-900 mb-1 truncate">
                          {option.text}
                        </h2>
                        <p className="text-xl sm:text-2xl font-black text-slate-700">{option.votes} votes</p>
                      </div>
                    </div>

                    {totalVotes > 0 && (
                      <div className="flex flex-col items-center sm:items-end gap-2 sm:gap-3 flex-shrink-0 w-full sm:w-auto">
                        <span className="text-lg sm:text-xl md:text-2xl font-black text-slate-600">
                          {optionPercentage}%
                        </span>
                        <div className="w-32 sm:w-40 md:w-48 h-3 sm:h-4 md:h-6 bg-slate-200 rounded-full overflow-hidden shadow-inner">
                          <div
                            className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full shadow-sm"
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
                      className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 disabled:opacity-50 text-white py-4 sm:py-5 px-6 sm:px-8 rounded-xl sm:rounded-2xl font-bold text-base sm:text-xl shadow-lg sm:shadow-2xl transition-all flex items-center justify-center gap-2 sm:gap-3 text-center"
                    >
                      {voting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
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
            <div
              className={`mt-6 sm:mt-10 p-4 sm:p-6 rounded-xl sm:rounded-2xl text-center font-bold text-base sm:text-xl border-2 ${
                message.includes('Vote recorded')
                  ? 'bg-emerald-100 text-emerald-800 border-emerald-400 shadow-md sm:shadow-2xl'
                  : 'bg-red-100 text-red-800 border-red-400 shadow-sm'
              }`}
            >
              {message}
            </div>
          )}

          {/* Winner */}
          {isExpired && totalVotes > 0 && (
            <div className="mt-8 p-4 sm:p-5 md:p-6 bg-gradient-to-r from-emerald-400 to-emerald-500 text-white rounded-xl sm:rounded-2xl shadow-md sm:shadow-2xl text-center">
              <div className="text-3xl mb-2 sm:mb-3">🏆</div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-black mb-3 sm:mb-4">WINNER!</h2>
              <p className="text-lg sm:text-xl md:text-2xl font-black mb-3 sm:mb-4">{winner.text}</p>
              <p className="text-sm sm:text-base md:text-xl opacity-90">
                {Math.round((winner.votes / totalVotes) * 100)}% of {totalVotes} votes
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
