import axios from "axios";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { GetForecastRequest } from "../hooks/useApiRequests";

import "../styles/GetForecast.css";

function GetForecast(props) {

    const [btn_current_selected, changeCurrentSelected] = useState(true);
    const [btn_5days_selected, change5daysSelected] = useState(false);

    const [forecast, setForecast] = useState([]);

    const loadForecast = (current) => {
        if (props.geoForecast.loaded) {
            if (!props.geoForecast.error) {
                const request = GetForecastRequest(current, 
                    props.geoForecast.coordinates.lat, props.geoForecast.coordinates.lng);
                axios.get(request).then(res => {
                    setForecast(res.data);
                });
                console.log(forecast);
            }
        }
    }

    const currentForecastBtnClick = () => {
        if (!btn_current_selected) {
            changeCurrentSelected(true);
            change5daysSelected(false);
        }
        loadForecast(true);
    }

    const fiveDaysForecastBtnClick = () => {
        if (!btn_5days_selected) {
            change5daysSelected(true);
            changeCurrentSelected(false);
        }
        loadForecast(false);
    }

    return (
        <div className="component-container-left">
            <div className="component-container-element">
                <Button
                    variant={btn_current_selected ? "dark" : "light"}
                    onClick={currentForecastBtnClick}>Current</Button>
            </div>
            <div className="component-container-element">
                <Button
                    variant={btn_5days_selected ? "dark" : "light"}
                    onClick={fiveDaysForecastBtnClick}>5 days</Button>
            </div>
        </div>
    );
}

export default GetForecast;