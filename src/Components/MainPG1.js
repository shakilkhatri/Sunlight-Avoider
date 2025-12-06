import React, { useState } from "react";
import LocationSearchInput from "./GoogleAutocomplete";
import SunlightScene from "./SunlightScene";
import "./MainPG1.css";

const MainPG1 = () => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [sunData, setSunData] = useState({ azimuth: 180, elevation: 45, pathAngle: 0 });


  const calculateSunData = () => {
    if (!origin || !destination) {
        alert("Please select both Origin and Destination from the dropdown suggestions.");
        return;
    }

    let originLat, originLng, destinationLat, destinationLng;
    try {
        originLat = JSON.parse(origin).lat;
        originLng = JSON.parse(origin).lng;
        destinationLat = JSON.parse(destination).lat;
        destinationLng = JSON.parse(destination).lng;
    } catch (e) {
        console.error("Coordinate parsing error", e);
        alert("Error parsing coordinates. Please re-select locations.");
        return;
    }

    if (isNaN(originLat) || isNaN(destinationLat)) return;

    let LatDiff = destinationLat - originLat;
    let LngDiff = destinationLng - originLng;

    if (LatDiff === 0 && LngDiff === 0) {
      alert("Origin and Destination cannot be the same.");
      return;
    }

    let arctan = (Math.atan(LatDiff / LngDiff) * 180) / Math.PI;
    let angle = 0;

    if (LatDiff >= 0 && LngDiff >= 0) {
      angle = arctan;
    } else if (LatDiff > 0 && LngDiff < 0) {
      angle = 180 + arctan;
    } else if (LatDiff < 0 && LngDiff < 0) {
      angle = 180 + arctan;
    } else if (LatDiff < 0 && LngDiff > 0) {
      angle = 360 + arctan;
    }

    // Current Time
    const today = new Date();
    const curHr = today.getHours();
    // const curHr = 15; // Mock

    // Elevation (Simple Model)
    // 6am=0, 12pm=90, 6pm=0
    let elevation = 0;
    if (curHr >= 6 && curHr <= 18) {
        elevation = 90 - Math.abs(12 - curHr) * 15;
    }

    // Azimuth (Simple Model)
    // 6am=90 (E), 12pm=180 (S), 6pm=270 (W)
    let azimuth = 90 + (curHr - 6) * 15;
    if (curHr < 6) azimuth = 90; 
    if (curHr > 18) azimuth = 270;

    setSunData({ azimuth, elevation, pathAngle: angle });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    calculateSunData();
  };

  // Adjust Sun Azimuth relative to Bus (Fixed at 0 local)
  // SceneAzim = (SunAzim - BusAngle) + 180
  const sceneAzimuth = (sunData.azimuth - sunData.pathAngle) + 180;

  return (
    <div className="MainPG1">
      <div className="header-section">
        <h1 className="title">SUNLIGHT AVOIDER</h1>
        <p className="subtitle">Plan your commute. Dodge the sun.</p>
      </div>

      <div className="content-grid">
        <div className="controls-panel">
            <form className="Form" onSubmit={handleSubmit}>
                <LocationSearchInput
                    placeholder={"Origin"}
                    setOrigin={setOrigin}
                    key={"Origin"}
                />
                <LocationSearchInput
                    placeholder={"Destination"}
                    setDestination={setDestination}
                    key={"Destination"}
                />
                <button type="submit" className="button">
                    DETECT SUNLIGHT
                </button>
            </form>
            <div className="info-panel">
                <div className="data-row">
                    <span>Time:</span>
                    <span>{new Date().getHours()}:00</span>
                </div>
                <div className="data-row">
                    <span>Sun Angle:</span>
                    <span>{Math.round(sunData.azimuth)}°</span>
                </div>
                <div className="data-row">
                    <span>Bus Heading:</span>
                    <span>{Math.round(sunData.pathAngle)}°</span>
                </div>
                <div className="data-row">
                    <span>Shadow Direction:</span>
                    <span>{sceneAzimuth % 360}° (Rel)</span>
                </div>
            </div>
        </div>

        <div className="scene-panel">
            <SunlightScene 
                sunAzimuth={sceneAzimuth} 
                sunElevation={sunData.elevation} 
            />
            <div className="scene-overlay">
                <p>3D Previz</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default MainPG1;
