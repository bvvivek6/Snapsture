# Booth.jsx Component Documentation

## Overview

`Booth.jsx` is a React component that implements a virtual photo booth. It allows users to take a series of photos using their webcam, apply visual filters, and download a collage of the captured images. The component features a modern UI, filter selection, countdown timer, and a confetti animation upon photo capture.

---

## Main Features

- **Webcam Integration:** Accesses the user's camera to display a live video feed.
- **Photo Capture:** Takes 1-4 photos in sequence, with a countdown before each shot.
- **Filters:** Users can select from several visual filters (e.g., Contrast, Warm Glow, B&W Sketch, etc.) to apply to their photos.
- **Collage Creation:** Captured photos are combined into a vertical collage with a polaroid-style frame and the current date.
- **Download Option:** Users can download the final collage image.
- **Confetti Animation:** A confetti effect is shown after capturing photos.

---

## How It Works

### 1. State Management

- `selectedFilter`: The currently selected filter.
- `photoCount`: Number of photos to capture (1-4).
- `isCameraOn`: Whether the camera is active.
- `capturedPhotos`: Array of captured photo data URLs.
- `collageImage`: The final collage image data URL.
- `countdown`: Countdown timer value (3, 2, 1, 📸).
- `capturing`: Boolean for flash effect during capture.

### 2. Camera Control

- **startCamera:** Requests webcam access and sets the video stream.
- **stopCamera:** Stops the webcam stream when the component unmounts.

### 3. Photo Capture Process

- For each photo:
  - Shows a countdown (3, 2, 1, 📸).
  - Applies the selected filter to the video frame.
  - Captures the frame as an image.
- After all photos are taken:
  - Triggers a confetti animation.
  - Creates a collage by stacking the images vertically with a white background and polaroid effect.
  - Adds the current date at the bottom.
  - Sets the collage image for display and download.

### 4. UI Elements

- **Video Preview:** Shows the live camera feed with the selected filter.
- **Filter Selector:** Dropdown to choose a filter.
- **Photo Count Selector:** Dropdown to choose the number of photos.
- **Capture Button:** Starts the photo capture sequence.
- **Collage Modal:** Displays the final collage with a download button.

---

## Key Libraries Used

- **React:** UI framework.
- **framer-motion:** For smooth UI animations.
- **canvas-confetti:** For confetti animation after photo capture.

---

## Usage

1. The camera starts automatically when the component mounts.
2. Select a filter and the number of photos.
3. Click the capture button. The countdown and flash effect will play for each photo.
4. After all photos are taken, a collage is shown in a modal.
5. Download the collage using the provided button.

---

## Customization

- **Filters:** Add or modify filters in the `filters` array and `filterClasses` object.
- **Photo Layout:** Adjust padding, margins, or collage layout in the collage creation logic.
- **UI Styling:** Modify Tailwind CSS classes for a different look.

---

## File Location

- `frontend/src/components/Booth.jsx`
