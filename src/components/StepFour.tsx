import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Props {
  onBack: () => void;
  onNext: () => void;
}

export default function StepFour({ onBack, onNext }: Props) {
  const [text, setText] = useState("");
  const message = "Ya es hora de que tengas a un novio vagueto 😎";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(message.slice(0, i + 1));
      i++;
      if (i === message.length) clearInterval(interval);
    }, 70);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center text-center min-h-screen w-full overflow-hidden bg-gradient-to-b from-amber-100 to-orange-300 text-gray-900 px-8 py-10">
      {/* ✅ Back button (top-left) */}
      <button
        onClick={onBack}
        className="absolute top-6 left-6 z-20 px-4 py-2 bg-white/50 backdrop-blur-sm text-gray-900 rounded-full hover:bg-white/70 transition-all"
      >
        ⬅ Atrás
      </button>

      {/* ✅ Rotating car image */}
      <motion.img
        src="https://guiavolks.wordpress.com/wp-content/uploads/2016/04/gol.jpg?w=672"
        alt="Vagueto Gol"
        className="w-48 h-auto mb-16 rounded-xl shadow-lg"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
      />

      {/* ✅ Typing text */}
      <p className="text-2xl sm:text-3xl font-semibold tracking-wide mb-12">
        {text}
        <span className="animate-pulse">|</span>
      </p>

      {/* ✅ Next button */}
      <motion.button
        onClick={onNext}
        className="relative z-10 mt-4 px-6 py-2 bg-orange-600 text-white rounded-full font-semibold shadow-md hover:scale-105 transition-transform"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        Continuar ➡
      </motion.button>
    </div>
  );
}
