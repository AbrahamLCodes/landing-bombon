import { useEffect, useState } from "react";

interface Props {
  onNext: () => void;
}

export default function StepOne({ onNext }: Props) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen w-full text-center p-6 bg-gradient-to-b from-amber-50 to-rose-100 overflow-hidden">
      {/* 🍷 Fondo de restaurante elegante */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center opacity-50"></div>

      <div className="relative z-10 flex flex-col items-center justify-center backdrop-blur-sm bg-white/30 rounded-2xl p-8 shadow-lg">
        {loading ? (
          <>
            <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mb-6"></div>
            <h1 className="text-2xl font-semibold text-white drop-shadow-lg">
              Preparando tu mesa...
            </h1>
            <p className="mt-2 text-sm text-white/90 drop-shadow">
              Un momento por favor, estamos alistando todo para ti 🍽️
            </p>
          </>
        ) : (
          <>
            <h1 className="text-4xl font-bold mb-4 text-white drop-shadow-lg">
              Bienvenid@ a La Rosa Dorada 🍷
            </h1>
            <p className="text-lg mb-6 text-white/90">
              Toca para ver nuestro menú exclusivo 💝
            </p>
            <button
              onClick={onNext}
              className="px-8 py-3 bg-white/90 text-rose-700 rounded-full font-semibold shadow-md hover:scale-105 transition-transform hover:bg-white"
            >
              Continuar
            </button>
          </>
        )}
      </div>
    </div>
  );
}
