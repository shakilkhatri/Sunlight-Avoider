# Sunlight Avoider ☀️🚌

**Plan your commute. Dodge the sun.**

Sunlight Avoider is a modern web application designed to help public transport commuters choose the best seat to avoid direct sunlight. By analyzing your route, time of day, and direction of travel, the app predicts the angle of sunlight and visualizes it in a stunning 3D environment.

## ✨ Features

-   **3D Visualization**: Real-time 3D rendering of your vehicle and the sun using **Three.js** and **React Three Fiber**.
-   **Smart Prediction**: Calculates the sun's position (Azimuth & Elevation) relative to your vehicle's path.
-   **Shadow Logic**: Dynamically casts shadows on the vehicle to show exactly where the sun will hit.
-   **Responsive Design**: A sleek, modern UI that works perfectly on desktop and mobile.
-   **Global Support**: Works for any location using Google Places API (requires API Key).

## 🚀 Technologies

-   **React** (v18)
-   **Three.js** & **React Three Fiber** (3D Rendering)
-   **React Three Drei** (3D Helpers)
-   **Google Maps API** (Places Autocomplete)
-   **CSS3** (Glassmorphism & Gradients)

## 🛠️ Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/shakilkhatri/Sunlight-Avoider.git
    cd Sunlight-Avoider
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Start the development server:
    ```bash
    npm start
    ```

## 📸 How it Works

1.  **Enter Origin & Destination**: Input your starting point and destination.
2.  **Detect**: Click "DETECT SUNLIGHT".
3.  **Visualize**: The app calculates the bearing of your route and the current sun position.
4.  **Result**: Watch the 3D bus model to see which side is lit and where the shadows fall.

---

*Note: This project is a simplified simulation. The sun position is approximated based on standard time-of-day models.*
