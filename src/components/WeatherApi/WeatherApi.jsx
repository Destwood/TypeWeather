import React, { useEffect, useState } from "react";
import style from "./WeatherApi.module.css";

import loc from "./assets/location.svg";
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
        }, 1000);
        console.log(info);
      } catch (e) {
        console.log(e);
      } finally {
      }
    } else {
      setInfo();
    }
  };

  useEffect(() => {
    handleLocation();
  }, []);

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
            <img src={loc} alt="not found" className={style.searchLogo} />

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
              <div>
                <div>
                  <div>loading</div>
                  <div>loading</div>
                  <div>loading</div>
                  <div>loading</div>
                  <div>loading</div>
                  <div>loading</div>
                </div>
              </div>
            ) : info ? (
              <div className="">got some data</div>
            ) : (
              <div className={style.none}>dont have data</div>
            )}
          </div>
          {/* {!info && (
            <img className={style.weatherImg} src={err} alt="not found" />
          )}
          {info && (
            <div className={style.weatherContent}>
              <div className={style.temperatureContainer}>
                <img
                  className={style.weatherImg}
                  src={imgChooser()}
                  alt="not found"
                />
                <p className={style.mainTemp}>
                  {Math.round(info.list[0].main.temp - 273.15)}
                  <sup>°C</sup>
                </p>
              </div>
              <div className={style.weatherInfoContainer}>
                <div className={style.weatheInfoItem}>
                  <img
                    src={humidity}
                    alt="not found"
                    className={style.weatherInfoIcon}
                  />
                  <div>
                    <p className={style.info}>{info.list[0].main.humidity}</p>
                    <p>Humidity</p>
                  </div>
                </div>
                <div className={style.weatheInfoItem}>
                  <img
                    src={wind}
                    alt="not found"
                    className={style.weatherInfoIcon}
                  />
                  <div>
                    <p className={style.info}>{info.list[0].wind.speed}</p>
                    <p>Wind Speed</p>
                  </div>
                </div>
              </div>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
}

export default WeatherApi;
