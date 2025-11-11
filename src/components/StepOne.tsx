import { useEffect, useState } from "react";

interface Props {
  onNext: () => void;
}

export default function StepOne({ onNext }: Props) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // fake loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center text-center p-6">
      {loading ? (
        <>
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mb-6"></div>
          <h1 className="text-2xl font-semibold">Loading Menu...</h1>
          <p className="mt-2 text-sm opacity-80">Please wait while we prepare your experience 🍽️</p>
        </>
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-4">Welcome to Bombón Restaurant</h1>
          <p className="text-lg mb-6">Tap to see our exclusive menu 💝</p>
          <button
            onClick={onNext}
            className="px-6 py-3 bg-white text-pink-600 rounded-full font-semibold shadow-md hover:scale-105 transition-transform"
          >
            Continue
          </button>
        </>
      )}
    </div>
  );
}
