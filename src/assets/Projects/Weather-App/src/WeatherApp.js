import warmBgd from "./assets/Warm.jpeg";
import coldBgd from "./assets/Cold.jpeg";
import Descriptions from "./components/Descriptions";
import { useEffect, useState } from "react";
import { getFormattedWeatherData } from "./weatherService";
import './WeatherApp.scss'
import ErrorMessage from "./components/Error";

function WeatherApp() {
  const [city, setCity] = useState("Austin");
  const [weather, setWeather] = useState(null);
  const [units,setUnits] = useState("metric");
  const [bgd, setBgd] = useState(warmBgd);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const data = await getFormattedWeatherData(city, units);
                console.log(data);

                if (!data.name) {
                    throw data;
                }


                setWeather(data);
                console.log(data);


                const threshold = units === 'metric' ? 20 : 68;
                setBgd(data.temp <= threshold ? coldBgd : warmBgd);
                setIsError(false);
                return data;
            } catch (error) {
                setIsError(true);
                setError(error);
                console.log(error);

                return error;
            }
        };

        fetchWeatherData().then(result => {
            console.log("Fetch result:", result);
        });
    }, [units, city]);

    const handleUnitsClick = (e) => {
    const button = e.currentTarget;
    const cuurentUnit = button.innerText.slice(1);
    
    const isCelsius = cuurentUnit === "C";
    button.innerText = isCelsius ? "°F" : "°C";
    setUnits(isCelsius ? "metric" : "imperial");
  };

  const enterKeyPressed = (e) => {
    if (e.keyCode === 13) {
      setCity(e.currentTarget.value);
      //e.currentTarget.blur();
    }
  };


  return (
    <div className ="app" style={{backgroundImage: `url(${bgd})
    `}}>

      <div className="overlay">
        { weather && (
            <>
                <div className="container">
                    {isError && <ErrorMessage message={error.message}/> }
                    <div className="section section__inputs">
                        <input
                            onKeyDown={enterKeyPressed}
                            type="text"
                            name="city"
                            placeholder="Enter City..."
                        />
                        <button onClick ={(e)=> handleUnitsClick(e)}>°F</button>
                    </div>

                    <div className="section__temperature">
                        <div className="icon">
                            <h3>{`${weather.name}, ${weather.country}`}</h3>
                            <img
                                className="image"
                                src={weather.iconURL}
                                alt="weatherIcon"
                            />
                            <h3>{weather.description}</h3>
                        </div>
                        <div className="temperature">
                            <h1>{`${weather.temp.toFixed()} °${units === 'metric' ? 'C' : 'F'}`}</h1>
                        </div>
                    </div>

                    {/*bottom description */}
                    <Descriptions weather={weather} units={units}/>
                </div>
            </>
            )}
      </div>
    </div>
  );
}

export default WeatherApp;
