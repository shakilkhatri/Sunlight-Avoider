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

### 1. Route Calculation 🗺️
The app determines the geographic coordinates (Latitude/Longitude) of your **Origin** and **Destination**.
- It calculates the linear path bearing (heading) between these two points.
- This tells us which direction the bus is effectively facing (e.g., traveling North-East means a bearing of ~45°).

### 2. Time & Sun Position ⏰
Users can select a specific time for their trip (defaults to current device time).
- **Elevation**: Establishes how high the sun is. It assumes a simplified model where the sun rises at 6 AM (0°), peaks at 12 PM (90°), and sets at 6 PM (0°).
- **Azimuth**: Determines the sun's compass direction. approximated as East (90°) at 6 AM, South (180°) at 12 PM, and West (270°) at 6 PM.

### 3. The "Relative Logic" Engine 🧮
This is the core magic. In the 3D scene, the bus is always stationary, facing "forward" (0°). To simulate reality, we rotate the *Sun* around the bus.
- Formula: `SceneAzimuth = (RealSunAzimuth - BusRouteBearing) + 180`
- If you are driving North (0°) and the Sun is East (90°), the Sun hits you from the Right.
- If you turn East (90°) and the Sun is still East (90°), the Sun is now directly in front of you.

### 4. 3D Visualization 🚍
The computed `SceneAzimuth` controls the position of a directional light source in the React Three Fiber scene, casting accurate dynamic shadows on the bus model to show you exactly which seats will be in the shade.

---

*Note: This project is a simplified simulation. The sun position is approximated based on standard time-of-day models.*
