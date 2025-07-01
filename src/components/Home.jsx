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
    <>
      <div className="relative min-h-dvh bg-[#0E0E0E] flex flex-col tracking-tight items-center justify-center text-center px-4 overflow-hidden">
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
          className="text-4xl  md:text-6xl  text-white tracking-tight font-mono font-bold drop-shadow-lg"
        >
          Snapsture📸
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-xl sm:text-xl md:text-3xl lg:text-3xl xl:text-3xl text-white md:w-[60%] w-[90%] font-mono tracking-tighter mt-10 drop-shadow-lg"
        >
          <span className="bg-green-400 text-black font-bold">
            {" "}
            Snap. Style. Share.
          </span>{" "}
          Your funky online photobooth! with Filters, countdowns &{" "}
          <span className="bg-amber-300 text-black font-bold">
            collage magic!
          </span>
          ✨
        </motion.p>
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          onClick={() => navigate("/booth")}
          className="mt-12 px-6 py-3 text-white text-lg font-semibold relative overflow-hidden rounded-md border-2 border-yellow-400 shadow-md 
    hover:text-black transition-all duration-300 group"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-yellow-300 via-green-300 to-yellow-400 opacity-0 group-hover:opacity-100 transition-all duration-300 z-0 blur-sm scale-110"></span>
          <span className="relative z-10">Start Snapping!</span>
        </motion.button>
      </div>

      <div className="bg-[#0E0E0E] py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl text-white font-mono font-bold text-center mb-16 tracking-tight"
          >
            Why <span className="bg-green-400 text-black px-2">Snapsture</span>?
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                icon: "🎨",
                title: "Creative Filters",
                description:
                  "Transform your photos with stunning filters that make every shot unique",
              },
              {
                icon: "⏰",
                title: "Smart Countdown",
                description:
                  "Perfect timing with customizable countdown timers for group photos and selfies",
              },
              {
                icon: "🎭",
                title: "Collage Magic",
                description:
                  "Create beautiful collages with multiple layouts and artistic arrangements",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className=" p-8  rounded-2xl border border-[#ffffff30] hover:border-yellow-400 transition-all duration-300 group"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-mono font-bold text-white mb-4 group-hover:text-yellow-400 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-400 font-mono tracking-tight leading-tight">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-gradient-to-b from-[#0E0E0E] to-[#1a1a1a] py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl text-white font-mono font-bold text-center mb-16 tracking-tight"
          >
            How It <span className="bg-amber-300 text-black px-2">Works</span>
          </motion.h2>

          <div className="grid md:grid-cols-4 gap-2">
            {[
              {
                step: "01",
                title: "Style",
                description: "Apply filters and effects",
                icon: "✨",
              },
              {
                step: "02",
                title: "Click",
                description: "Hit the Start Snapping button",
                icon: "👆",
              },
              {
                step: "03",
                title: "Pose",
                description: "Get ready with the countdown",
                icon: "📸",
              },
              {
                step: "04",
                title: "Share",
                description: "Download or share your creation",
                icon: "🚀",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="text-center group border border-[#ffffff30] p-4 rounded-lg hover:bg-[#1a1a1a] transition-colors duration-300"
              >
                <div className="relative mb-6">
                  <div className="w-20 h-20 mx-auto  rounded-full flex items-center justify-center text-5xl group-hover:scale-110 transition-transform duration-300">
                    {step.icon}
                  </div>
                  <div className="absolute -top-2 -left-2 w-8 h-8 text-white rounded-full flex items-center justify-center font-mono font-bold text-lg">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-xl font-mono font-bold text-white mb-2 group-hover:text-green-400 transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-gray-400 font-mono text-sm tracking-tight">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-[#1a1a1a] py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl text-white font-mono font-bold mb-6 tracking-tight"
          >
            Ready to Create{" "}
            <span className="bg-gradient-to-r from-yellow-400 to-green-400 bg-clip-text text-transparent">
              Magic
            </span>
            ?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-gray-300 font-mono mb-10 tracking-tight"
          >
            Exlore and start creating amazing photos every day
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/booth")}
            className="px-8 py-4 text-xl font-mono font-bold text-black bg-gradient-to-r from-yellow-400 via-green-400 to-yellow-400 rounded-lg hover:from-yellow-300 hover:via-green-300 hover:to-yellow-300 transition-all duration-300 shadow-lg hover:shadow-xl tracking-tight"
          >
            Let's Get Started! 🚀
          </motion.button>
        </div>
      </div>
    </>
  );
};

export default Home;
