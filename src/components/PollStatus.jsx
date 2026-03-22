export default function PollStatus({ isExpired }) {
  if (!isExpired) {
    return (
      <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
        Active
      </div>
    );
  }

  return (
    <div className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-semibold">
      Expired
    </div>
  );
}
