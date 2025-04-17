import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  const navigate = useNavigate();
  const [showCurtain, setShowCurtain] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCurtain(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-dvh bg-[#0E0E0E] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
      {showCurtain && (
        <>
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: "-100%" }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute top-0 left-0 w-1/2 h-full bg-white z-50"
          />
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: "100%" }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute top-0 right-0 w-1/2 h-full bg-white z-50"
          />
        </>
      )}

      <motion.h1
        initial={{ filter: "blur(10px)", opacity: 0, y: 20 }}
        animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-8xl text-white font-mono font-bold drop-shadow-lg"
      >
        Snapster📸
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="text-xl sm:text-xl md:text-4xl lg:text-4xl xl:text-4xl text-white w-[60%] font-mono mt-10 drop-shadow-lg"
      >
        Your{" "}
        <span className="bg-green-400 text-black font-bold">
          {" "}
          funky online photobooth
        </span>{" "}
        funky online photobooth with {""}
        <span className="bg-yellow-400 text-black font-bold">
          filters,
        </span>{" "}
        countdowns, and collage magic!✨
      </motion.p>

      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        onClick={() => navigate("/booth")}
        className="mt-10 px-8 py-4  text-white text-lg font-medium border-b-2 border-amber-400 hover:bg-yellow-300  hover:text-black  transition-all duration-300 shadow-lg"
      >
        Start Snapping!
      </motion.button>
    </div>
  );
};

export default Home;
