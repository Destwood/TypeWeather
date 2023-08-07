import React, { useState } from "react";
import style from "./WeatherApi.module.css";
import "./loader.css";

import place from "./assets/place.svg";
import search from "./assets/search.svg";
import err from "./assets/404.png";
import clear from "./assets/clear.png";
import cloud from "./assets/cloud.png";
import mist from "./assets/mist.png";
import rain from "./assets/rain.png";
import snow from "./assets/snow.png";
import humidity from "./assets/humidity.svg";
import wind from "./assets/wind.svg";
// <img src={err} alt="" />
const APIKey = "7d5bc3825570c37fac6bfa984c844535";

function WeatherApi() {
  const [location, setLocation] = useState();
  const [info, setInfo] = useState();
  const [loading, setLoading] = useState(false);

  // getting data
  const handleLocation = async () => {
    if (location) {
      setLoading(true);
      setInfo(null);

      try {
        setTimeout(async () => {
          const response = await fetch(
            `http://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${APIKey}`
          );
          setInfo(await response.json());

          setLoading(false);
        }, 2000);
        console.log(info);
      } catch (e) {
        console.log(e);
      } finally {
      }
    } else {
      setInfo();
    }
  };

  // getting data

  // choosing which img to show
  const imgChooser = () => {
    switch (info.list[0].weather[0].main) {
      case "Clouds":
        return cloud;
      case "Rain":
        return rain;
      case "Mist":
        return mist;
      case "Snow":
        return snow;
      default:
        return clear;
    }
  };
  // choosing which img to show

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        {/* header */}
        <header>
          <div className={style.search}>
            <img src={place} alt="not found" className={style.searchLogo} />

            <input
              className={style.input}
              type="text"
              value={location}
              placeholder="Search..."
              onChange={(event) => {
                setLocation(event.target.value);
              }}
            />

            <button onClick={handleLocation}>
              <img src={search} alt="not found" className={style.searchLogo} />
            </button>
          </div>
        </header>

        {/* header end */}

        <div>
          <div className={style.contentContainer}>
            {loading ? (
              <div class="loadingspinner">
                <div id="square1"></div>
                <div id="square2"></div>
                <div id="square3"></div>
                <div id="square4"></div>
                <div id="square5"></div>
              </div>
            ) : info ? (
              <>
                <img className={style.img} src={imgChooser()} alt="" />
                <div className={style.weather}>
                  <div className={style.main}>
                    <p className={style.temperature}>
                      {Math.round(info.list[0].main.temp - 273.15)}
                      <sup>°C</sup>
                    </p>
                    <p className={style.weatherName}>
                      {info.list[0].weather[0].main}
                    </p>
                  </div>
                  {/* datails */}
                  <div className={style.details}>
                    {/* Humidity */}
                    <div className={style.detailsItem}>
                      <img
                        src={humidity}
                        alt="not found"
                        className={style.detailsIcon}
                      />
                      <div>
                        <p className={style.detailsInfo}>
                          {info.list[0].main.humidity}
                        </p>
                        <p>Humidity</p>
                      </div>
                    </div>
                    {/* Wind */}
                    <div className={style.detailsItem}>
                      <img
                        src={wind}
                        alt="not found"
                        className={style.detailsIcon}
                      />
                      <div>
                        <p className={style.detailsInfo}>
                          {info.list[0].wind.speed}
                        </p>
                        <p>Wind Speed</p>
                      </div>
                    </div>
                  </div>
                  {/* datails */}
                </div>
              </>
            ) : (
              <div className={style.none}>
                <img className={style.img} src={err} alt="" />
                <p>Can't get data</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherApi;
