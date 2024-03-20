import React from 'react';
import "./Descriptions.scss";

import { FaArrowDown } from 'react-icons/fa';
import { FaArrowUp } from 'react-icons/fa';
import { FaThermometerThreeQuarters } from 'react-icons/fa';
import { BsMoisture } from 'react-icons/bs';
import { MdOutlineCompress } from 'react-icons/md';
import { SiWindicss } from 'react-icons/si';




const Descriptions = ({weather, units}) => {

    const tempUnit = units === 'metric' ? '°C' : '°F'
    const windUnit = units === 'metric' ? 'm/s' : 'mph'

    const cards = [
        {
            id: 1,
            icon: <FaArrowUp />,
            title: "max",
            data: weather.temp_max.toFixed(),
            unit: tempUnit,
        },
        {
            id: 2,
            icon: <FaArrowDown />,
            title: "min",
            data: weather.temp_min.toFixed(),
            unit: tempUnit,
        },
        {
            id: 3,
            icon: <FaThermometerThreeQuarters />,
            title: "feels like",
            data: weather.feels_like.toFixed(),
            unit: tempUnit,
        },
        {
            id: 4,
            icon: <BsMoisture />,
            title: "humidity",
            data: weather.humidity.toFixed(),
            unit: "%",
        },
        {
            id: 5,
            icon: <MdOutlineCompress />,
            title: "pressure",
            data: weather.pressure,
            unit: "hPa",
        },
        {
            id: 6,
            icon: <SiWindicss />,
            title: "wind speed",
            data: weather.speed.toFixed(),
            unit: windUnit,
        },
        
    ]



  return (
  <div className="section section__descriptions">
    {cards.map(({id,icon,title,data,unit}) => (

    <div key ={id} className="card">
        <div className="description__card-icon">
            {icon}
            <small>{title}</small>
        </div>
        <h2>{`${data} ${unit}`}</h2>
    </div>
    ))} 
  </div>
  );
}

export default Descriptions