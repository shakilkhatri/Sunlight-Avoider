import React, { useEffect, useState } from "react";
import LocationSearchInput from "./GoogleAutocomplete";

import "./MainPG1.css";

const MainPG1 = () => {
  const [origin, setOrigin] = useState("{}");
  const [destination, setDestination] = useState("{}");
  const [shadowX, setShadowX] = useState(0);
  const [shadowY, setShadowY] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [ang, setAng] = useState(0);

  let originLat = JSON.parse(origin).lat;
  let originLng = JSON.parse(origin).lng;
  let destinationLat = JSON.parse(destination).lat;
  let destinationLng = JSON.parse(destination).lng;

  let LatDiff = destinationLat - originLat;
  let LngDiff = destinationLng - originLng;
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

  var today = new Date();
  var curHr = today.getHours();
  // var curHr = 18;
  var sunlightDir = "";
  // console.log(curHr);

  let busShadowStyle = {
    boxShadow: `${shadowX}px ${shadowY}px 10px #000`,
  };

  let sunStyle = { transform: `rotate(${ang}deg)` };

  let x, y;
  let shadowLength;
  // angle = 250;
  let angleRad = (angle * 3.14) / 180;

  useEffect(() => {
    // eslint-disable-next-line
    // busShadowStyle = {
    //   boxShadow: `${shadowX}px ${shadowY}px 5px #F4AAB9`,
    // };
  }, [shadowX, shadowY, sunlightDir]);

  if (curHr >= 6 && curHr < 12) {
    if (angle <= 45 || angle >= 315) {
      sunlightDir = "Front";
    }
    if (angle >= 45 && angle <= 120) {
      sunlightDir = "Right";
    }
    if (angle >= 120 && angle <= 225) {
      sunlightDir = "Back";
    }
    if (angle >= 225 && angle <= 315) {
      sunlightDir = "Left";
    }
  }

  if (curHr > 14) {
    if (angle <= 45 || angle >= 315) {
      sunlightDir = "Back";
    }
    if (angle >= 45 && angle <= 120) {
      sunlightDir = "Left";
    }
    if (angle >= 120 && angle <= 225) {
      sunlightDir = "Front";
    }
    if (angle >= 225 && angle <= 315) {
      sunlightDir = "Right";
    }
  }
  if (curHr >= 12 && curHr <= 14) {
    sunlightDir = "Top";
  }
  if (curHr >= 19 || curHr < 6) {
    sunlightDir = "Nowhere";
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(originLat);
    // console.log(originLng);
    // console.log(destinationLat);
    // console.log(destinationLng);

    console.log("Latitude difference :" + LatDiff);
    console.log("Longitude difference :" + LngDiff);
    console.log("The path angle w.r.t. the East is :" + angle);

    if (isNaN(LatDiff) || isNaN(LngDiff)) {
      setShowResult(false);
      alert("Please select Origin and Destination.");
    } else if (LatDiff !== 0 || LngDiff !== 0) {
      setShowResult(true);
      setTimeout(() => {
        window.scroll({
          top: 1200,
          left: 0,
          behavior: "smooth",
        });
      }, 200);
    } else {
      setShowResult(false);
      alert("Origin and Destination cannot be the same.");
    }
    console.log(sunlightDir);

    // if (sunlightDir === "Front") {
    //   setShadowX(0);
    //   setShadowY(50);
    // } else if (sunlightDir === "Back") {
    //   setShadowX(0);
    //   setShadowY(-50);
    // } else if (sunlightDir === "Left") {
    //   setShadowX(50);
    //   setShadowY(0);
    // } else if (sunlightDir === "Right") {
    //   setShadowX(-50);
    //   setShadowY(0);
    // } else if (sunlightDir === "Top") {
    //   setShadowX(0);
    //   setShadowY(0);
    // }

    if (curHr >= 6 && curHr <= 12) {
      shadowLength = 30 - (curHr - 6) * 5;
    } else if (curHr > 12 && curHr <= 24) {
      shadowLength = (curHr - 12) * 5;
    } else {
      shadowLength = 0;
    }

    if (curHr > 6 && curHr <= 12) {
      if (angle >= 0 && angle <= 90) {
        x = -shadowLength * Math.sin(angleRad);
        y = shadowLength * Math.cos(angleRad);
      } else if (angle > 90 && angle <= 180) {
        x = -shadowLength * Math.cos(angleRad - Math.PI / 2);
        y = -shadowLength * Math.sin(angleRad - Math.PI / 2);
      } else if (angle > 180 && angle < 270) {
        x = shadowLength * Math.sin(angleRad - Math.PI);
        y = -shadowLength * Math.cos(angleRad - Math.PI);
      } else if (angle >= 270 && angle < 360) {
        x = shadowLength * Math.cos(angleRad - Math.PI * 1.5);
        y = shadowLength * Math.sin(angleRad - Math.PI * 1.5);
      }
    } else if (curHr > 12 && curHr < 19) {
      if (angle >= 0 && angle <= 90) {
        x = +shadowLength * Math.sin(angleRad);
        y = -shadowLength * Math.cos(angleRad);
      } else if (angle > 90 && angle <= 180) {
        x = shadowLength * Math.cos(angleRad - Math.PI / 2);
        y = shadowLength * Math.sin(angleRad - Math.PI / 2);
      } else if (angle > 180 && angle < 270) {
        x = -shadowLength * Math.sin(angleRad - Math.PI);
        y = +shadowLength * Math.cos(angleRad - Math.PI);
      } else if (angle >= 270 && angle < 360) {
        x = -shadowLength * Math.cos(angleRad - Math.PI * 1.5);
        y = -shadowLength * Math.sin(angleRad - Math.PI * 1.5);
      }
    } else {
      x = 0;
      y = 0;
    }
    setAng(angle);
    setShadowX(x);
    setShadowY(y);

    // console.log("angle", angle, angleRad);
    console.log(`${shadowX}px ${shadowY}px 5px #000`);

    // busShadowStyle = {
    //   boxShadow: `${shadowX}px ${shadowY}px 5px #F4AAB9`,
    // };
    // sunStyle = { transform: `rotate(${angle}deg)` };
  };

  return (
    <>
      <div className="info">
        <p>Welcome to Sunlight detector!</p>
        <p>
          Use this web-application before chosing a seat on public transport to
          avoid sitting directly into sunlight !
        </p>
        <p>NOTE: The path is assumed to be straight line.</p>
      </div>
      <div className="MainPG1">
        <form className="Form" onSubmit={handleSubmit}>
          <LocationSearchInput
            placeholder={"Origin"}
            setOrigin={setOrigin}
            key={"Origin"}
            showResult={showResult}
          />
          <LocationSearchInput
            placeholder={"Destination"}
            setDestination={setDestination}
            key={"Destination"}
            showResult={showResult}
          />
          <button type="submit" className="button">
            DETECT!
          </button>
          <span style={{ color: "gray" }}>
            {"Origin Coordinates: " + origin}
          </span>
          <span style={{ color: "gray" }}>
            {"Destination Coordinates: " + destination}
          </span>
        </form>

        {/* <span className="Map"></span> */}

        <span className="busbox">
          <span className="Bus" style={busShadowStyle}>
            Vehicle
          </span>
          {/* <img
            src={require("../Images/bus.png")}
            alt="Your vehicle"
            className="BusImg"
          /> */}

          <span className="sunBox" style={sunStyle}>
            {/* <p className="East">W</p> */}

            <img
              src={require("../Images/sun.jpg")}
              alt="sun"
              className="sunImage"
              style={{
                top: `${curHr >= 6 && curHr <= 18 ? (curHr - 6) * 20 : 300}px`,
              }}
            />

            {/* <p className="West">W</p> */}
          </span>
        </span>
      </div>
      {showResult ? (
        <h1> {`Sunlight is coming from: ${sunlightDir}`}</h1>
      ) : (
        <></>
      )}
    </>
  );
};

export default MainPG1;
