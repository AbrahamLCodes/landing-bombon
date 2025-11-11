import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  onNext: () => void;
  onBack: () => void;
}

export default function StepTwo({ onNext, onBack }: Props) {
  const [displayText, setDisplayText] = useState("");
  const [phase, setPhase] = useState<"intro" | "message">("intro");

  const introText =
    "No es cierto... en realidad quiero decirte, Cristina Suárez ❤️";
  const loveText = `Si pudiera elegir un lugar para quedarme, elegiría tu lado.
No porque el mundo sea perfecto contigo, sino porque contigo todo tiene sentido.
Cada día que te conozco un poco más, descubro razones nuevas para quererte.
Eres ese rincón seguro al que siempre quiero volver,
y la persona que sin saberlo, se volvió mi lugar favorito.`;

  useEffect(() => {
    const text = phase === "intro" ? introText : loveText;
    setDisplayText("");
    let i = 0;

    const interval = setInterval(() => {
      setDisplayText(text.slice(0, i + 1));
      i++;
      if (i === text.length) {
        clearInterval(interval);
        if (phase === "intro") {
          setTimeout(() => setPhase("message"), 1500);
        }
      }
    }, 50);

    return () => clearInterval(interval);
  }, [phase]);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen w-full text-center text-white px-8 py-10 overflow-hidden">
      {/* 🌇 Animated Gradient Background */}
      <motion.div
        className="absolute inset-0"
        initial={{ background: "linear-gradient(135deg, #f59e0b, #ea580c)" }}
        animate={{
          background: [
            "linear-gradient(135deg, #f59e0b, #ea580c)", // orange → red
            "linear-gradient(135deg, #fb923c, #b91c1c)", // soft orange → deeper red
            "linear-gradient(135deg, #f59e0b, #ea580c)", // loop back
          ],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* 🍁 Autumn photo overlay (soft & romantic) */}
      <div
        className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-50"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=80')",
        }}
      ></div>

      {/* 🔙 Back button */}
      <button
        onClick={onBack}
        className="absolute top-6 left-6 z-20 px-5 py-2 bg-white/20 backdrop-blur-md text-white rounded-full hover:bg-white/40 transition-all shadow-md"
      >
        ⬅ Atrás
      </button>

      {/* 💬 Typing Text */}
      <div className="relative z-10 max-w-2xl">
        <AnimatePresence mode="wait">
          <motion.p
            key={phase}
            className="whitespace-pre-line text-lg sm:text-xl md:text-2xl leading-relaxed font-light drop-shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 1 }}
          >
            {displayText}
            <span className="animate-pulse">|</span>
          </motion.p>
        </AnimatePresence>
      </div>

      {/* ➡ Next button (only when text finished) */}
      {phase === "message" && displayText.length === loveText.length && (
        <motion.div
          className="relative z-10 mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <button
            onClick={onNext}
            className="px-8 py-3 bg-white text-orange-700 rounded-full font-semibold shadow-lg hover:scale-105 transition-transform"
          >
            Continuar ➡
          </button>
        </motion.div>
      )}
    </div>
  );
}
