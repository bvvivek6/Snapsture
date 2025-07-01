import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

const filters = [
  "None",
  "Contrast",
  "Warm Glow",
  "B&W Sketch",
  "Sunset Vibe",
  "Gothic",
  "Dreamy",
  "Frosted",
];
const photoCountOptions = [1, 2, 3];

const padding = 10;
const polaroidMarginBottom = 10;

const filterClasses = {
  None: "",
  Contrast: "contrast(1.5) saturate(1.2) brightness(0.9)",
  "Warm Glow": "brightness(1.1) sepia(0.3) saturate(1.5)",
  "B&W Sketch": "grayscale(1) contrast(1.4) brightness(1.1)",
  "Sunset Vibe": "sepia(0.7) saturate(1.3) hue-rotate(-20deg)",
  Gothic: "grayscale(0.9) contrast(1.8) brightness(0.8)",
  Dreamy: "blur(1px) brightness(1.1) saturate(1.3)",
  Frosted: "brightness(1.1) contrast(1.2) ",
};

const Booth = () => {
  const [selectedFilter, setSelectedFilter] = useState("None");
  const [photoCount, setPhotoCount] = useState(1);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [capturedPhotos, setCapturedPhotos] = useState([]);
  const [collageImage, setCollageImage] = useState(null);
  const [countdown, setCountdown] = useState("");
  const [capturing, setCapturing] = useState(false);

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

    // Get drawing context of canvas
    const ctx = canvasRef.current.getContext("2d");

    // Get video dimensions from the live webcam feed
    const width = videoRef.current.videoWidth;
    const height = videoRef.current.videoHeight;

    // Set canvas dimensions to match the video feed
    canvasRef.current.width = width;
    canvasRef.current.height = height;

    // Effects
    const canvasFilter = {
      None: "",
      Contrast: "contrast(1.5) saturate(1.2) brightness(0.9)",
      "Warm Glow": "brightness(1.1) sepia(0.3) saturate(1.5)",
      "B&W Sketch": "grayscale(1) contrast(1.4) brightness(1.1)",
      "Sunset Vibe": "sepia(0.7) saturate(1.3) hue-rotate(-20deg)",
      Gothic: "grayscale(0.9) contrast(1.8) brightness(0.8)",
      Dreamy: "blur(1px) brightness(1.1) saturate(1.3)",
      Frosted: "brightness(1.1) contrast(1.2)",
    };

    // Array to Store base64 image strings captured from the canvas
    const capturedImages = [];

    for (let i = 0; i < photoCount; i++) {
      for (let sec = 3; sec > 0; sec--) {
        setCountdown(`${sec}`);
        await new Promise((res) => setTimeout(res, 1000));
      }

      setCountdown("📸");
      setCapturing(true);

      // Apply the selected filter
      ctx.filter = canvasFilter[selectedFilter] || "none";

      // Draw the current video frame to the canvas with filter
      ctx.drawImage(videoRef.current, 0, 0, width, height);

      // Conversion to base64 PNG and store it
      const dataURL = canvasRef.current.toDataURL("image/png");
      capturedImages.push(dataURL);

      // delay
      await new Promise((res) => setTimeout(res, 500));

      // Reset UI after each capture
      setCountdown(null);
      setCapturing(false);
    }

    // Trigger confetti animation after all photos are captured
    confetti({
      particleCount: 120,
      spread: 200,
      origin: { y: 1 },
    });

    // Convert base64 data URLs to <img> elements
    const imagePromises = capturedImages.map(
      (dataUrl) =>
        new Promise((resolve) => {
          const img = new Image();
          img.src = dataUrl;
          img.onload = () => resolve(img);
        })
    );
    const images = await Promise.all(imagePromises);

    // Define padding, frame, and layout dimensions
    const frameWidth = width + padding * 2;
    const frameHeight = height + padding + polaroidMarginBottom;
    const totalHeight = images.length * (frameHeight + padding) - padding;

    // Create a new canvas to hold the collage
    const collageCanvas = document.createElement("canvas");
    collageCanvas.width = frameWidth;
    collageCanvas.height = totalHeight + 60; // additional space for date

    const collageCtx = collageCanvas.getContext("2d");

    // Fill entire canvas background white
    collageCtx.fillStyle = "#ffffff";
    collageCtx.fillRect(0, 0, collageCanvas.width, collageCanvas.height);

    // Draw each image into the collage canvas with white background like Polaroid style
    images.forEach((img, i) => {
      const x = padding;
      const y = i * (frameHeight + padding) + padding;

      // Create white "frame" background for each photo
      collageCtx.fillStyle = "#ffffff";
      collageCtx.fillRect(x, y, width, height + polaroidMarginBottom);

      // Draw the image itself
      collageCtx.drawImage(img, x, y, width, height);
    });

    const date = new Date().toLocaleDateString();

    // White background strip for date
    collageCtx.fillStyle = "#ffffff";
    collageCtx.fillRect(0, frameHeight * photoCount, width, 20);

    // Draw the date in black text, centered
    collageCtx.fillStyle = "#000000";
    collageCtx.font = "20px 'DM Sans', sans-serif";
    collageCtx.textAlign = "center";
    collageCtx.fillText(date, width / 2, frameHeight * photoCount + 40);

    // Convert the full collage canvas to a base64 image
    const collageDataURL = collageCanvas.toDataURL(
      `image_${new Date().toLocaleDateString()}/png`
    );

    // Set final collage and individual photos into state
    setCollageImage(collageDataURL);
    setCapturedPhotos(capturedImages);
  };

  // Automatically start the camera when component mounts, and stop it on unmount
  useEffect(() => {
    startCamera(); // start webcam
    return () => stopCamera(); // cleanup webcam when component unmounts
  }, []);

  return (
    <div className="h-[100vh] bg-[#0E0E0E] flex justify-center text-center px-4 text-white font-mono">
      <motion.div
        initial={{ filter: "blur(10px)", opacity: 0 }}
        animate={{ filter: "blur(0px)", opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col md:flex-row pt-5 items-center rounded-xl w-full"
      >
        <div className="flex flex-col items-center w-full">
          <div className="w-full  aspect-square md:aspect-video rounded-xl border border-[#333] shadow-lg relative">
            <div className="relative w-full h-full overflow-hidden">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="absolute w-full h-full object-cover rounded-xl"
                style={{ filter: filterClasses[selectedFilter] || "none" }}
              />
              {countdown !== null && (
                <div
                  className={`absolute inset-0 rounded-xl flex duration-300  ${
                    capturing ? " bg-white text-black" : "text-white"
                  } items-center justify-center text-6xl font-bold`}
                >
                  {countdown}
                </div>
              )}
            </div>
          </div>

          <canvas ref={canvasRef} className="hidden" />

          {collageImage && (
            <div className="fixed inset-0 bg-[#00000095] flex items-center justify-center z-50">
              <div className="bg-[#151515] p-6 max-h-[90vh] rounded-lg overflow-y-auto shadow-xl w-[90%] md:w-[35%] max-w-3xl relative">
                <button
                  className="absolute top-1 right-3 text-white text-4xl font-semibold"
                  onClick={() => setCollageImage(null)}
                >
                  &times;
                </button>
                <div className="flex flex-col items-center space-y-4 mt-8">
                  <img
                    src={collageImage}
                    alt="Photo Booth Collage"
                    className="shadow-lg w-full"
                  />
                  <button
                    onClick={() => {
                      const link = document.createElement("a");
                      link.href = collageImage;
                      link.download = `photo_booth_${
                        (Math.floor(Math.random() * 1000) % 100) + 1
                      }.png`;
                      link.click();
                    }}
                    className="cursor-pointer  flex rounded-sm justify-between bg-green-600 p-3 px-4 text-white tracking-tigher shadow-xl hover:bg-gray-900 hover:scale-105 duration-500 hover:ring-1 font-normal w-full"
                  >
                    Add to memories😉
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="3"
                      stroke="currentColor"
                      class="w-5 h-5 animate-bounce"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 space-y-4 w-full">
          <div className="flex flex-col space-y-1 items-center">
            <label className="text-lg tracking-tight">Choose a Filter</label>
            <select
              className="p-3 bg-[#181818] w-full md:w-2/3 text-zinc-400 font-mono focus:ring-1 focus:ring-yellow-400 outline-none duration-300 rounded-full shadow-md focus:shadow-sm focus:shadow-yellow-400"
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

          <div className="flex flex-col space-y-1 items-center">
            <label className="text-lg tracking-tight">Number of Photos</label>
            <select
              className="p-3 bg-[#181818] w-full md:w-2/3 text-zinc-400 font-mono focus:ring-1 focus:ring-yellow-400 outline-none duration-300 rounded-full shadow-md focus:shadow-sm focus:shadow-yellow-400"
              value={photoCount}
              onChange={(e) => setPhotoCount(e.target.value)}
            >
              {photoCountOptions.map((count) => (
                <option key={count} value={count}>
                  {count}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={capturePhotos}
            className="relative w-24 h-24 rounded-full bg-gradient-to-br from-yellow-500 to-yellow-700 shadow-[inset_0_4px_8px_rgba(255,255,255,0.2),0_8px_15px_rgba(0,0,0,0.3)] 
             transition-transform duration-200 active:scale-90 hover:brightness-110"
          >
            <div className="absolute inset-2 rounded-full bg-yellow-600 border-4 border-yellow-400 shadow-inner"></div>
            <span className="absolute inset-0 flex items-center justify-center text-3xl"></span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
export default Booth;
