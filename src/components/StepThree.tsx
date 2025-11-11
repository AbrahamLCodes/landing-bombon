import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import bombon1 from "../assets/bombon1.jpeg";

interface Props {
  onNext: () => void;
  onBack: () => void;
}

export default function StepThree({ onNext, onBack }: Props) {
  const [displayText, setDisplayText] = useState("");
  const [timeDiff, setTimeDiff] = useState({ days: 0, hours: 0, minutes: 0 });
  const [showImage, setShowImage] = useState(false);
  const [showNext, setShowNext] = useState(false);

  const targetDate = new Date("2025-09-26T21:00:00");
  const message = ` Pero hoy es un día diferente... 
He estado pensandolo desde nuestra primera cita hace:`;

  // Typing effect
  useEffect(() => {
    setDisplayText("");
    let i = 0;
    const interval = setInterval(() => {
      setDisplayText(message.slice(0, i + 1));
      i++;
      if (i === message.length) {
        clearInterval(interval);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Live counter
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const diffMs = now.getTime() - targetDate.getTime();
      const totalMinutes = Math.floor(diffMs / (1000 * 60));
      const days = Math.floor(totalMinutes / (60 * 24));
      const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
      const minutes = totalMinutes % 60;
      setTimeDiff({ days, hours, minutes });
    };

    updateTime();
    const interval = setInterval(updateTime, 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Show image and next button
  useEffect(() => {
    if (displayText.length === message.length) {
      const timer1 = setTimeout(() => setShowImage(true), 1500);
      const timer2 = setTimeout(() => setShowNext(true), 3500);
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [displayText]);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen w-full text-center text-white px-8 py-10 overflow-hidden">
      {/* ✅ Background */}
      <div
        className="absolute inset-0 bg-cover bg-center brightness-75"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1528763380143-65b3f43b34b0?auto=format&fit=crop&w=1400&q=80')",
        }}
      ></div>

      {/* ✅ Back button (top-left) */}
      <button
        onClick={onBack}
        className="absolute top-6 left-6 z-20 px-4 py-2 bg-white/30 backdrop-blur-sm text-white rounded-full hover:bg-white/50 transition-all"
      >
        ⬅ Atrás
      </button>

      {/* ✅ Main Content */}
      <div className="relative z-10 max-w-2xl mt-10">
        {/* Typing text */}
        <motion.p
          className="whitespace-pre-line text-lg sm:text-xl md:text-2xl leading-relaxed font-light drop-shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {displayText}
          <span className="animate-pulse">|</span>
        </motion.p>

        {/* Counter */}
        {displayText.length === message.length && (
          <motion.div
            className="mt-6 text-xl md:text-2xl font-semibold text-white drop-shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {timeDiff.days} días, {timeDiff.hours} horas y {timeDiff.minutes} minutos
          </motion.div>
        )}

        {/* Image */}
        {showImage && (
          <motion.img
            src={bombon1}
            alt="Bombon"
            className="mt-12 rounded-2xl shadow-lg w-64 h-auto mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          />
        )}
      </div>

      {/* ✅ Next button */}
      {showNext && (
        <motion.button
          onClick={onNext}
          className="relative z-10 mt-12 px-6 py-2 bg-white text-orange-700 rounded-full font-semibold shadow-md hover:scale-105 transition-transform"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Continuar ➡
        </motion.button>
      )}
    </div>
  );
}
