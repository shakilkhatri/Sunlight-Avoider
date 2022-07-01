import React, { useEffect, useState } from "react";
import LocationSearchInput from "./GoogleAutocomplete";

import "./MainPG1.css";

const MainPG1 = () => {
  const [origin, setOrigin] = useState("{}");
  const [destination, setDestination] = useState("{}");
  const [shadowX, setShadowX] = useState(0);
  const [shadowY, setShadowY] = useState(0);
  const [showResult, setShowResult] = useState(false);

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
  let sunlightDir;
  // console.log(curHr);

  if (curHr < 12 && curHr > 6) {
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

  let busShadowStyle = {
    boxShadow: `${shadowX}px ${shadowY}px 5px #F4AAB9`,
  };

  useEffect(() => {
    // eslint-disable-next-line
    busShadowStyle = {
      boxShadow: `${shadowX}px ${shadowY}px 5px #F4AAB9`,
    };
  }, [shadowX, shadowY]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(originLat);
    // console.log(originLng);
    // console.log(destinationLat);
    // console.log(destinationLng);
    console.log("Latitude difference :" + LatDiff);
    console.log("Longitude difference :" + LngDiff);
    console.log("The path angle w.r.t. the East is :" + angle);

    setShowResult(true);

    setTimeout(() => {
      window.scroll({
        top: 1200,
        left: 0,
        behavior: "smooth",
      });
    }, 200);

    if (sunlightDir === "Front") {
      setShadowX(0);
      setShadowY(50);
    } else if (sunlightDir === "Back") {
      setShadowX(0);
      setShadowY(-50);
    } else if (sunlightDir === "Left") {
      setShadowX(50);
      setShadowY(0);
    } else if (sunlightDir === "Right") {
      setShadowX(-50);
      setShadowY(0);
    } else if (sunlightDir === "Top") {
      setShadowX(0);
      setShadowY(0);
    }
    busShadowStyle = {
      boxShadow: `${shadowX}px ${shadowY}px 5px #F4AAB9`,
    };
  };

  return (
    <>
      <div
        style={{ color: "white", backgroundColor: "black", padding: "10px" }}
      >
        <p>Welcome to Sunlight detector!</p>
        <p>
          Use this web-application before chosing a seat on public transport to
          avoid sitting directly into sunlight !
        </p>
      </div>
      <div className="MainPG1">
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
            src={require("../Images/sun.jpg")}
            alt="sun"
            className="sunImage"
          /> */}
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
