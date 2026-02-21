// Result.jsx
import { useEffect } from "react";

function Result({ isOpen, onClose, resultData = {} }) {
  if (!isOpen) return null;

  const data = {
    score: resultData?.atsScore ?? 0,
    repetition: resultData?.repeatedWords?.length ?? 0,
    spellingMistakes: resultData?.spellingMistakeCount ?? 0,
    grammarMistakes: resultData?.grammarMistakeCount ?? 0, // only if backend sends it
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  const radius = 62;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (data?.score / 100) * circumference;

  const getScoreColor = (score) =>
    score >= 80 ? "#10b981" : score >= 60 ? "#f59e0b" : "#ef4444";

  const getMessage = (score) =>
    score >= 80
      ? "Great ATS Compatibility!"
      : score >= 60
        ? "Decent – Can Be Better"
        : "Needs Improvement";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/65 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md sm:max-w-lg 
                   overflow-hidden transform transition-all duration-300 scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-indigo-800 px-6 py-5 text-white">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
              ATS Score Report
            </h2>
            <button
              onClick={onClose}
              className="text-white/90 hover:text-white text-2xl leading-none transition-colors"
              aria-label="Close"
            >
              ×
            </button>
          </div>
        </div>

        {/* Content – more compact */}
        <div className="p-5 sm:p-7 space-y-2">
          {/* Score Circle – smaller & cleaner */}
          <div className="flex flex-col items-center">
            <div className="relative w-36 h-36 sm:w-44 sm:h-44">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
                <circle
                  cx="100"
                  cy="100"
                  r={radius}
                  fill="none"
                  stroke="#f3f4f6"
                  strokeWidth="12"
                />
                <circle
                  cx="100"
                  cy="100"
                  r={radius}
                  fill="none"
                  stroke={getScoreColor(data.score)}
                  strokeWidth="12"
                  strokeDasharray={circumference}
                  strokeDashoffset={offset}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl sm:text-6xl font-extrabold text-gray-800">
                  {data.score}
                </span>
                <span className="text-base sm:text-lg font-medium text-gray-500">
                  /100
                </span>
              </div>
            </div>

            <p className=" text-lg sm:text-xl font-semibold text-gray-800">
              {getMessage(data.score)}
            </p>
            <p className="text-sm text-gray-600 mt-1 text-center max-w-xs">
              {data.score >= 80
                ? "Strong chance of passing ATS filters"
                : "Optimize keywords and fix errors"}
            </p>
          </div>

          {/* Stats – compact cards with icons */}
          {/* <div className="grid grid-cols-3 gap-4">
            <div className="bg-indigo-50/60 border border-indigo-100 rounded-xl p-4 text-center hover:shadow transition-shadow">
              <div className="text-indigo-600 text-2xl mb-1">↻</div>
              <p className="text-2xl font-bold text-indigo-700">
                {data.repetition}
              </p>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">
                Repetitions
              </p>
            </div>

            <div className="bg-amber-50/60 border border-amber-100 rounded-xl p-4 text-center hover:shadow transition-shadow">
              <div className="text-amber-600 text-2xl mb-1">✗</div>
              <p className="text-2xl font-bold text-amber-600">
                {data.spellingMistakes}
              </p>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">Spelling</p>
            </div>

            <div className="bg-rose-50/60 border border-rose-100 rounded-xl p-4 text-center hover:shadow transition-shadow">
              <div className="text-rose-600 text-2xl mb-1">!</div>
              <p className="text-2xl font-bold text-rose-600">
                {data.grammarMistakes}
              </p>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">Grammar</p>
            </div>
          </div> */}

          {/* CTA – smaller & centered */}
          <div className="pt-4 text-center">
            <button
              onClick={onClose}
              className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 
                       text-white font-medium text-base rounded-xl shadow-md 
                       hover:shadow-lg transition-all duration-200 
                       active:scale-95 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Result;
