import React, { useState } from "react";
import style from "./Home.module.scss";
import "../loader.css";

import logo from "../../assets/logo.svg";

function WeatherApi() {
  const [value, setValue] = useState("");
  const [info, setInfo] = useState();
  const [loading, setLoading] = useState(false);

  // keys
  const googeApiKey = ``;
  const weatherApiKey = ``;

  const handleInputChange = (e) => {
    e.preventDefault();
    setValue(e.target.value);
  };

  // logic
  const autocomplete = () => {
    const proxyUrl = "https://cors-anywhere.herokuapp.com/";
    const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${value}&types=geocode&key=${googeApiKey}`;

    fetch(proxyUrl + apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      console.log("enter");
      handleLocation();
      // autocomplete();
    }
  };
  const handleLocation = async () => {
    console.log("request");
    try {
      setLoading(true);
      setInfo(null);

      const response = await fetch(
        `api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=${weatherApiKey}`
      );

      if (response.ok) {
        const data = await response.json();
        setInfo(data);
      } else {
        console.error("Request failed with status:", response.status);
      }

      setLoading(false);
    } catch (e) {
      console.error("There was an error:", e);
    } finally {
    }
  };

  // getting data

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <a href="/" className={style.logoContainer}>
          <img className={style.logoIcon} src={logo} alt="" />
          <p className={style.logoText}>TypeWeather</p>
        </a>
        <div className={style.search}>
          <div className="">
            <h1 className={style.title}>
              Welcome to <a href="/">TypeWeather</a>
            </h1>
            <h3 className={style.desc}>
              Choose a location to view the weather forecast
            </h3>
          </div>
          <input
            className={style.input}
            type="text"
            name=""
            id=""
            value={value}
            placeholder="Search location"
            onChange={(e) => {
              handleInputChange(e);
            }}
            onKeyPress={(e) => handleKeyPress(e)}
          />
        </div>
      </div>
    </div>
  );
}

export default WeatherApi;
