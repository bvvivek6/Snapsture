import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

const filters = ["None", "Black & White", "Sepia", "Vintage", "Pop Art"];

const padding = 10;
const polaroidMarginBottom = 10;

const filterClasses = {
  None: "",
  "Black & White": "grayscale",
  Sepia: "sepia",
  Vintage: "contrast-125 brightness-90",
  "Pop Art": "contrast-200 saturate-200",
};

const Booth = () => {
  const [selectedFilter, setSelectedFilter] = useState("None");
  const [photoCount, setPhotoCount] = useState(1);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [capturedPhotos, setCapturedPhotos] = useState([]);
  const [collageImage, setCollageImage] = useState(null);
  const [countdown, setCountdown] = useState(null);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsCameraOn(true);
    } catch (err) {
      console.error("Camera access denied:", err);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraOn(false);
  };

  const capturePhotos = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    const ctx = canvasRef.current.getContext("2d");
    const width = videoRef.current.videoWidth;
    const height = videoRef.current.videoHeight;

    canvasRef.current.width = width;
    canvasRef.current.height = height;

    const canvasFilter = {
      None: "none",
      "Black & White": "grayscale(1)",
      Sepia: "sepia(1)",
      Vintage: "contrast(1.25) brightness(0.9)",
      "Pop Art": "contrast(2) saturate(2)",
    };

    const capturedImages = [];

    for (let i = 0; i < photoCount; i++) {
      for (let sec = 3; sec > 0; sec--) {
        setCountdown(sec);
        await new Promise((res) => setTimeout(res, 1000));
      }
      setCountdown("Smile!!");
      setCountdown(null);

      ctx.filter = canvasFilter[selectedFilter] || "none";
      ctx.drawImage(videoRef.current, 0, 0, width, height);
      const dataURL = canvasRef.current.toDataURL("image/png");
      capturedImages.push(dataURL);

      await new Promise((res) => setTimeout(res, 500));
    }

    confetti({
      particleCount: 120,
      spread: 200,
      origin: { y: 1 },
    });

    const imagePromises = capturedImages.map(
      (dataUrl) =>
        new Promise((resolve) => {
          const img = new Image();
          img.src = dataUrl;
          img.onload = () => resolve(img);
        })
    );

    const images = await Promise.all(imagePromises);

    //dimensions
    const frameWidth = width + padding * 2;
    const frameHeight = height + padding + polaroidMarginBottom;
    const totalHeight = images.length * (frameHeight + padding) - padding;

    const collageCanvas = document.createElement("canvas");
    collageCanvas.width = frameWidth;
    collageCanvas.height = totalHeight + 60;

    const collageCtx = collageCanvas.getContext("2d");

    collageCtx.fillStyle = "#ffffff";
    collageCtx.fillRect(0, 0, collageCanvas.width, collageCanvas.height);

    images.forEach((img, i) => {
      const x = padding;
      const y = i * (frameHeight + padding) + padding;

      collageCtx.fillStyle = "#ffffff";
      collageCtx.fillRect(x, y, width, height + polaroidMarginBottom);

      collageCtx.drawImage(img, x, y, width, height);
    });
    //add date at the bottom
    const date = new Date().toLocaleDateString();
    collageCtx.fillStyle = "#ffffff";
    collageCtx.fillRect(0, frameHeight * photoCount, width, 20);

    collageCtx.fillStyle = "#000000";
    collageCtx.font = "24px sans-serif";
    collageCtx.textAlign = "center";
    collageCtx.fillText(date, width / 2, frameHeight * photoCount + 40);

    const collageDataURL = collageCanvas.toDataURL("image/png");
    setCollageImage(collageDataURL);
    setCapturedPhotos(capturedImages);
  };

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, []);

  return (
    <>
      <div className="min-h-dvh bg-[#0E0E0E] flex justify-center text-center px-4 text-white font-mono">
        <motion.div
          initial={{ filter: "blur(10px)", opacity: 0 }}
          animate={{ filter: "blur(0px)", opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col md:flex-row m-auto ] p-1 rounded-xl w-full"
        >
          <div className="flex flex-col items-center w-full">
            <div className="w-full  aspect-video rounded-xl border border-[#333] shadow-lg relative">
              <div className="relative w-full h-full overflow-hidden">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className={`absolute w-full h-full object-cover rounded-xl ${filterClasses[selectedFilter]}`}
                />
                {countdown !== null && (
                  <div className="absolute inset-0 flex items-center justify-center text-white text-6xl font-bold">
                    {countdown}
                  </div>
                )}
              </div>
            </div>

            <canvas ref={canvasRef} className="hidden" />

            {collageImage && (
              <div className="mt-4 flex flex-col items-center space-y-4">
                <img
                  src={collageImage}
                  alt="Photo Booth Collage"
                  className="shadow-lg w-full md:w-2/3"
                />
                <button
                  onClick={() => {
                    const link = document.createElement("a");
                    link.href = collageImage;
                    link.download = "photo_booth_collage.png";
                    link.click();
                  }}
                  className="p-3 bg-green-600 text-white rounded-full shadow-md text-lg"
                >
                  Download Collage
                </button>
              </div>
            )}
          </div>

          <div className="mt-6 space-y-9 w-full">
            <div className="flex flex-col space-y-2 items-center">
              <label className="text-xl">Choose a Filter:</label>
              <select
                className="p-3 text-white bg-[#181818] rounded-full w-2/3 text-lg"
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
              >
                {filters.map((filter) => (
                  <option key={filter} value={filter}>
                    {filter}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col space-y-2 items-center">
              <label className="text-xl">Number of Photos</label>
              <input
                type="number"
                min="1"
                max="4"
                value={photoCount}
                onChange={(e) => setPhotoCount(Number(e.target.value))}
                className="p-3 text-center bg-[#181818] rounded-full text-white w-2/3 text-lg"
              />
            </div>

            <button
              onClick={capturePhotos}
              className="p-4 w-[100px] h-[100px] rounded-full md:m-3 bg-yellow-600 text-white text-4xl transition-all duration-300 shadow-lg"
            >
              📸
            </button>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Booth;
