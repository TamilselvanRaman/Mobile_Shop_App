"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-white text-center px-4">
      <h1 className="text-8xl font-black text-rose-500 mb-4">500</h1>
      <h2 className="text-3xl font-bold mb-4">Something went wrong</h2>
      <p className="text-slate-400 mb-8 max-w-md">
        An unexpected error occurred. Please try again.
      </p>
      <button
        onClick={reset}
        className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-semibold transition-colors"
      >
        Try Again
      </button>
    </div>
  );
}
