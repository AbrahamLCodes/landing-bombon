import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Props {
  onNext: () => void;
  onBack: () => void;
}

export default function StepFive({ onNext, onBack }: Props) {
  const defaultImage = "https://cdn-icons-png.flaticon.com/512/174/174836.png";
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const API_BASE = "http://64.23.157.16:1337";
  const ENDPOINT = `${API_BASE}/api/api-bombon/final-image`;

  useEffect(() => {
    const loadImage = async () => {
      try {
        const res = await fetch(ENDPOINT);
        const data = await res.json();

        const img = data?.finalImage;

        if (!img) throw new Error("Image missing");

        // Prefer medium > small > original
        const bestUrl =
          img.formats?.medium?.url ||
          img.formats?.small?.url ||
          img.url;

        if (!bestUrl) throw new Error("URL missing");

        setImageUrl(API_BASE + bestUrl);
      } catch (err) {
        console.error("Error loading Strapi image:", err);
        setImageUrl(defaultImage);
      } finally {
        setLoading(false);
      }
    };

    loadImage();
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen w-full text-center text-white px-8 py-10 overflow-hidden bg-gradient-to-b from-rose-200 to-pink-400">
      
      {/* Background */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center opacity-40"></div>

      {/* Back button */}
      <button
        onClick={onBack}
        className="absolute top-6 left-6 z-20 px-4 py-2 bg-white/40 backdrop-blur-sm text-white rounded-full hover:bg-white/60 transition-all"
      >
        ⬅ Atrás
      </button>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        <motion.h1
          className="text-3xl sm:text-4xl font-semibold mb-8 drop-shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          ¿Apoco no hacemos linda pareja?
        </motion.h1>

        {/* Image or Spinner */}
        {loading ? (
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mb-16"></div>
        ) : (
          <motion.img
            src={imageUrl || defaultImage}
            alt="Foto sorpresa"
            className="rounded-2xl shadow-2xl w-80 h-auto mb-16 border-4 border-white/60"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          />
        )}

        <motion.button
          onClick={onNext}
          className="px-6 py-2 bg-white text-rose-600 rounded-full font-semibold shadow-md hover:scale-105 transition-transform"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Continuar ➡
        </motion.button>
      </div>
    </div>
  );
}
