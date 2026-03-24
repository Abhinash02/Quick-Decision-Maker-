'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CreatePoll() {
  const [formData, setFormData] = useState({
    question: '',
    options: ['', '', '', ''],
    expiry: ''
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validOptions = formData.options.filter(opt => opt.trim());
    if (!formData.question.trim() || validOptions.length < 2) {
      alert('Question + 2 options required');
      return;
    }

    setLoading(true);
    
    const res = await fetch('/api/polls', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        question: formData.question.trim(),
        options: validOptions,
        expiry: formData.expiry
      })
    });

    if (res.ok) {
      router.push('/polls');
      router.refresh();
    } else {
      alert('Failed to create poll');
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="max-w-2xl mx-auto p-6">
        <Link href="/polls" className="text-blue-600 font-bold mb-8 block">← All Polls</Link>
        
        <div className="bg-white rounded-3xl p-8 shadow-2xl border">
          <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Create New Poll</h1>
          <label className="block text-sm text-stone-800 font-semibold mb-2">Question:</label>
          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="text"
              placeholder="What should I eat tonight?"
              value={formData.question}
              onChange={(e) => setFormData({...formData, question: e.target.value})}
              className="w-full p-4 border border-gray-500 text-stone-700 rounded-2xl text-lg focus:ring-2 focus:ring-blue-500"
              required
            />
            
            <div>
              <label className="block text-sm text-stone-800 font-semibold mb-2">Options (2-4):</label>
              {formData.options.map((option, index) => (
                <input
                  key={index}
                  type="text"
                  placeholder={`Option ${index + 1}`}
                  value={option}
                  onChange={(e) => {
                    const newOptions = [...formData.options];
                    newOptions[index] = e.target.value;
                    setFormData({...formData, options: newOptions});
                  }}
                  className="w-full p-3 border border-gray-700 text-stone-700 rounded-xl mt-2"
                />
              ))}
            </div>
            <label className="block text-sm text-stone-800 font-semibold mb-2">Expiry Date & Time:</label>
            <input
              type="datetime-local"
              value={formData.expiry}
              onChange={(e) => setFormData({...formData, expiry: e.target.value})}
              className="w-full p-4 border border-gray-500 text-stone-600 rounded-2xl focus:ring-2 focus:ring-blue-500"
              min={new Date(Date.now() + 5*60*1000).toISOString().slice(0,16)}
              required
            />
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 px-8 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all"
            >
              {loading ? 'Creating...' : 'Create Poll'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
