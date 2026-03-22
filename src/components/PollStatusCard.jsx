export default function PollStatus({ isExpired }) {
  return (
    <div className={`px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 rounded-full text-xs sm:text-sm font-semibold shadow-sm w-fit transition-all`}>
      {isExpired ? (
        <div className="bg-gradient-to-r from-orange-400/20 to-orange-500/20 text-orange-800 border border-orange-200/50 backdrop-blur-sm">
          Expired
        </div>
      ) : (
        <div className="bg-gradient-to-r from-emerald-400/20 to-emerald-500/20 text-emerald-800 border border-emerald-200/50 backdrop-blur-sm">
          Active
        </div>
      )}
    </div>
  );
}
