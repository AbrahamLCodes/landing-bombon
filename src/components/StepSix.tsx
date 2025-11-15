import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  onRestart: () => void;
  onBack: () => void;
}

interface Heart {
  id: number;
  left: number;
  delay: number;
  duration: number;
  scale: number;
  rotate: number;
  color: string;
}

export default function StepSix({ onRestart, onBack }: Props) {
  const [showHearts, setShowHearts] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showMainContent, setShowMainContent] = useState(true);
  const [showNoMessage, setShowNoMessage] = useState(false);
  const [hearts, setHearts] = useState<Heart[]>([]);

  const heartColors = ["text-pink-500", "text-red-500", "text-amber-400"];

  useEffect(() => {
    const generated = Array.from({ length: 100 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 4,
      duration: Math.random() * 6 + 5,
      scale: Math.random() * 0.8 + 0.5,
      rotate: Math.random() * 360,
      color: heartColors[Math.floor(Math.random() * heartColors.length)],
    }));
    setHearts(generated);
  }, []);

  const handleYesClick = () => {
    setShowMainContent(false);
    setShowHearts(true);
    setTimeout(() => setShowMessage(true), 1000);
  };

  const handleNoClick = () => {
    setShowMainContent(false);
    setTimeout(() => setShowNoMessage(true), 800);
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen w-full text-center px-8 py-10 overflow-hidden bg-gradient-to-b from-amber-100 to-pink-200 text-gray-800">
      {/* 🌸 Background */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1604335399105-89a79d4c48e1?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center opacity-40"></div>

      {/* ❤️ Heart Rain */}
      <AnimatePresence>
        {showHearts &&
          hearts.map((h) => (
            <motion.div
              key={h.id}
              initial={{
                y: -400,
                opacity: 0.9,
                scale: h.scale,
                rotate: h.rotate,
              }}
              animate={{
                y: "110vh",
                x: ["0%", "10%", "-10%", "0%"],
                opacity: [1, 1, 0.8, 0.9],
              }}
              transition={{
                duration: h.duration,
                delay: h.delay,
                ease: "easeInOut",
                repeat: Infinity,
              }}
              className={`absolute ${h.color} text-4xl pointer-events-none select-none`}
              style={{
                left: `${h.left}%`,
              }}
            >
              ❤️
            </motion.div>
          ))}
      </AnimatePresence>

      {/* 🌟 Main content */}
      <motion.div
        className="relative z-10 flex flex-col items-center backdrop-blur-sm rounded-2xl p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {/* 💐 Header + Buttons */}
        <AnimatePresence>
          {showMainContent && (
            <motion.div
              key="main-content"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center"
            >
              <h1 className="text-4xl sm:text-5xl font-bold mb-8 drop-shadow-lg">
                Favor de leer el mensaje en el ramo 💐
              </h1>

              <div className="flex flex-col sm:flex-row gap-6 mt-6">
                <button
                  onClick={handleYesClick}
                  className="px-8 py-3 bg-green-600 text-white rounded-full text-xl font-semibold shadow-lg hover:scale-105 transition-transform"
                >
                  💖 Sí, quiero
                </button>
                <button
                  onClick={handleNoClick}
                  className="px-8 py-3 bg-white/60 backdrop-blur-md text-gray-800 rounded-full text-xl font-semibold shadow-lg hover:bg-white/80 transition-all"
                >
                  😅 Ahorita no traemos joven
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 💞 Message after YES */}
        <AnimatePresence>
          {showMessage && (
            <motion.p
              key="love-message"
              className="text-2xl sm:text-4xl font-bold text-white mt-4 mb-8 px-4 py-2 bg-orange-600/60 rounded-lg backdrop-blur-md shadow-xl"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              ¡Aceptaste, excelente decisión! <br /> <br /> El inicio de algo bonito 💞
            </motion.p>
          )}
        </AnimatePresence>

        {/* 🍻 Funny Message after NO */}
        <AnimatePresence>
          {showNoMessage && (
            <motion.p
              key="no-message"
              className="text-2xl font-semibold text-amber-800 mt-4 mb-8"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              Este... Bueno, pues todavía podemos pistear xd 🍻
            </motion.p>
          )}
        </AnimatePresence>

        {/* 📸 Upload UI */}
        {/* <AnimatePresence>
          {showUpload && (
            <motion.div
              key="upload"
              className="bg-white/70 rounded-xl p-4 shadow-md mb-8 w-full max-w-md"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              <label className="block text-lg font-medium mb-2">
                Adjunta una foto especial 📷
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setPhoto(e.target.files?.[0] || null)}
                className="block w-full text-sm text-gray-700 bg-white/80 border border-gray-300 rounded-lg p-2 cursor-pointer"
              />
              {photo && (
                <motion.div
                  className="mt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8 }}
                >
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="Preview"
                    className="w-48 h-auto rounded-xl shadow-md mx-auto"
                  />
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence> */}

        {/* 🫥 Invisible functional buttons (for build/logic refs) */}
        <div className="hidden">
          <button onClick={onRestart}>Hidden Restart</button>
          <button onClick={onBack}>Hidden Back</button>
        </div>
      </motion.div>
    </div>
  );
}