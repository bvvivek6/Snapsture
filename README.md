# 📸 Snapsture

**Snap. Style. Share.** Your funky online photobooth with filters, countdowns & collage magic! ✨

A modern, web-based photo booth application that lets users capture photos with creative filters, countdown timers, and automatically generates beautiful polaroid-style collages.

## 🌟 Features

- **🎨 Creative Filters**: Transform your photos with 8 unique filters including Warm Glow, B&W Sketch, Sunset Vibe, Gothic, Dreamy, and more
- **⏰ Smart Countdown**: Perfect timing with 3-second countdown timers for group photos and selfies
- **🎭 Collage Magic**: Automatically creates beautiful polaroid-style collages with multiple photos
- **📱 Responsive Design**: Works seamlessly on desktop and mobile devices
- **🎉 Interactive Effects**: Confetti animations and smooth transitions enhance user experience
- **💾 Download Ready**: Save your creations directly to your device
- **🎬 Curtain Reveal**: Dramatic opening animation for an immersive experience

## 🚀 Live Demo

Visit the live application: [Your Deployment URL]

## 🛠️ Tech Stack

### Frontend Framework

- **React 19.0.0** - Modern React with latest features
- **Vite 6.3.0** - Fast build tool and development server
- **React Router DOM 7.5.0** - Client-side routing

### Styling & UI

- **Tailwind CSS 4.1.4** - Utility-first CSS framework
- **Framer Motion 12.7.3** - Smooth animations and transitions
- **Custom CSS** - Additional styling for unique components

### Camera & Media APIs

- **navigator.mediaDevices.getUserMedia()** - Browser's native camera access API
- **HTML5 Canvas API** - Image processing and filter application
- **Web Audio API** - For future sound effects integration

### Interactive Features

- **Canvas Confetti 1.9.3** - Celebration animations
- **React Simple Typewriter 5.0.1** - Dynamic text effects

### Development Tools

- **ESLint 9.22.0** - Code linting and quality
- **Vite Plugin React 4.3.4** - React support for Vite
- **TypeScript Types** - Type definitions for better development experience

### Deployment

- **Vercel** - Serverless deployment platform
- **SPA Configuration** - Single Page Application setup

## 🎯 Core Technologies

### Camera Access Implementation

The application uses the **WebRTC getUserMedia API** for camera access:

```javascript
const stream = await navigator.mediaDevices.getUserMedia({
  video: { facingMode: "user" },
  audio: false,
});
```

### Filter System

Real-time filter application using **CSS filters** and **Canvas 2D API**:

```javascript
const canvasFilter = {
  "Warm Glow": "brightness(1.1) sepia(0.3) saturate(1.5)",
  "B&W Sketch": "grayscale(1) contrast(1.4) brightness(1.1)",
  "Sunset Vibe": "sepia(0.7) saturate(1.3) hue-rotate(-20deg)",
};
```

### Image Processing Pipeline

1. **Capture**: Video frame captured to canvas
2. **Filter**: CSS filters applied during rendering
3. **Mirror Fix**: Horizontal flip correction for natural selfie experience
4. **Export**: Canvas converted to base64 PNG format
5. **Collage**: Multiple images combined into polaroid-style layout

## 📁 Project Structure

```text
frontend/
├── public/
│   ├── snapsture-logo.svg
│   ├── vite.svg
│   └── sounds/
│       └── shutter-output.mp3
├── src/
│   ├── components/
│   │   ├── Home.jsx          # Landing page with features
│   │   ├── Booth.jsx         # Main photo booth interface
│   │   └── Booth.md          # Component documentation
│   ├── assets/               # Static assets
│   ├── App.jsx              # Main app component with routing
│   ├── main.jsx             # Application entry point
│   └── index.css            # Global styles
├── package.json             # Dependencies and scripts
├── vite.config.js          # Vite configuration
├── vercel.json             # Deployment configuration
└── eslint.config.js        # ESLint configuration
```

## 🔧 Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager
- Modern web browser with camera support

### Local Development

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd snapture
   ```

2. **Navigate to frontend directory**

   ```bash
   cd frontend
   ```

3. **Install dependencies**

   ```bash
   npm install
   ```

4. **Start development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   - Visit `http://localhost:5173`
   - Allow camera permissions when prompted

### Production Build

```bash
npm run build
npm run preview
```

## 🎮 How to Use

1. **🎨 Style**: Choose from 8 creative filters
2. **📊 Configure**: Select number of photos (1-3)
3. **📸 Capture**: Click the camera button to start
4. **⏰ Pose**: Get ready during the 3-second countdown
5. **🎉 Enjoy**: Watch the confetti and view your collage
6. **💾 Save**: Download your creation to keep forever

## 🌐 Browser Compatibility

### Supported Browsers

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 11+
- ✅ Edge 79+

### Required Permissions

- **Camera Access**: Required for photo capture
- **Microphone**: Not used (audio: false)

### Mobile Support

- iOS Safari 11+
- Chrome Mobile 60+
- Samsung Internet 8+

## 🔒 Privacy & Security

- **No Server Storage**: All photos are processed locally in your browser
- **No Data Collection**: No personal information is stored or transmitted
- **Local Processing**: All image processing happens on your device
- **Secure HTTPS**: Camera access requires secure connection in production

## 🎨 Available Filters

| Filter Name | Effect                             |
| ----------- | ---------------------------------- |
| None        | Original image                     |
| Contrast    | Enhanced contrast and saturation   |
| Warm Glow   | Bright, sepia-toned warm effect    |
| B&W Sketch  | High-contrast black and white      |
| Sunset Vibe | Warm sepia with hue rotation       |
| Gothic      | Dark, desaturated mood             |
| Dreamy      | Soft blur with enhanced brightness |
| Frosted     | Clean, bright enhancement          |

## 🚀 Deployment

### Vercel Deployment

This project is configured for Vercel deployment:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

### Environment Setup

1. Connect your GitHub repository to Vercel
2. Deploy automatically on commits to main branch
3. Ensure HTTPS is enabled for camera access

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).
