import Link from 'next/link';

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="text-center mb-20">
        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
          Quick Decision Maker
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Create polls that auto-expire. Get quick decisions from friends and colleagues.
        </p>
        <Link 
          href="/polls/new"
          className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold px-8 py-4 rounded-2xl text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
        >
          Create Your First Poll
        </Link>
      </div>
      <Link 
        href="/polls"
        className="block text-center bg-white/80 backdrop-blur-sm hover:bg-white border border-gray-200 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 mx-auto max-w-md"
      >
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Browse All Polls</h3>
        <p className="text-gray-600">See what others are deciding</p>
      </Link>
    </main>
  );
}
