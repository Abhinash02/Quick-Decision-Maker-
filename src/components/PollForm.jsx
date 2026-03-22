'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Button from './ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from './ui/Card';

export default function PollForm({ initialData = null }) {
  const router = useRouter();
  const params = useParams();
  const [formData, setFormData] = useState({
    question: '',
    options: ['', '', '', ''],
    expiry: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        question: initialData.question,
        options: initialData.options.map(opt => opt.text),
        expiry: new Date(initialData.expiry).toISOString().slice(0, 16)
      });
    }
  }, [initialData]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.question.trim()) {
      newErrors.question = 'Question is required';
    }
    
    const validOptions = formData.options.filter(opt => opt.trim());
    if (validOptions.length < 2 || validOptions.length > 4) {
      newErrors.options = 'Select 2-4 options';
    }
    
    if (!formData.expiry || new Date(formData.expiry) <= new Date()) {
      newErrors.expiry = 'Select future expiry time';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    const url = initialData 
      ? `/api/polls/${initialData._id}`
      : '/api/polls';
    
    const method = initialData ? 'PUT' : 'POST';
    
    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: formData.question.trim(),
          options: formData.options.filter(opt => opt.trim()),
          expiry: new Date(formData.expiry)
        })
      });
      
      if (res.ok) {
        router.push('/polls');
        router.refresh();
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateOption = (index, value) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    setFormData({ ...formData, options: newOptions });
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-3xl">
          {initialData ? 'Edit Poll' : 'Create New Poll'}
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Question
            </label>
            <input
              type="text"
              value={formData.question}
              onChange={(e) => setFormData({ ...formData, question: e.target.value })}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              placeholder="What should I eat for dinner?"
              maxLength={200}
            />
            {errors.question && (
              <p className="mt-1 text-sm text-red-600">{errors.question}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-4">
              Options (2-4 required)
            </label>
            {formData.options.map((option, index) => (
              <input
                key={index}
                type="text"
                value={option}
                onChange={(e) => updateOption(index, e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent mb-3 transition-all"
                placeholder={`Option ${index + 1}`}
              />
            ))}
            {errors.options && (
              <p className="mt-1 text-sm text-red-600">{errors.options}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Expiry Time
            </label>
            <input
              type="datetime-local"
              value={formData.expiry}
              onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              min={new Date(Date.now() + 5 * 60 * 1000).toISOString().slice(0, 16)}
            />
            {errors.expiry && (
              <p className="mt-1 text-sm text-red-600">{errors.expiry}</p>
            )}
          </div>

          <div className="flex gap-4 pt-4">
            <Button type="submit" isLoading={loading} className="flex-1">
              {loading ? 'Saving...' : (initialData ? 'Update Poll' : 'Create Poll')}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => router.push('/polls')}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
