import React from "react";
import GoogleMapReact from "google-map-react";
import { Paper, Typography, useMediaQuery } from "@material-ui/core";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import Rating from '@material-ui/lab/Rating';

import useStyles from "./styles";
import mapStyle from "./mapStyle";

const Map = ({ setCoordinates, setBounds, coordinates,places,setChildClicked,weatherData }) => {
  // console.log(weatherData);
  const matches = useMediaQuery('(min-width:600px)');
  // console.log(matches); 
  const classes = useStyles();


  const handleMapChange = (e) => {
    // console.log("Map change event:", e);
    setCoordinates({ lat: e.center.lat, lng: e.center.lng });
    setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
  };

  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyD_DXHHLQlPn4JWfH1M5jvJ86DPtGDSfaQ" }}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={{disableDefaultUI:true, zoomControl:true,  styles:mapStyle}}
        onChange={handleMapChange}
        onChildClick={(child) => setChildClicked(child)}
      >
          {places && places.length > 0 && places.map((place, i) => (
          <div
            className={classes.markerContainer}
            lat={Number(place.latitude)}
            lng={Number(place.longitude)}
            key={i}
          >
            {
              !matches
                      ? (
                <LocationOnOutlinedIcon color="primary" fontSize="large" />
            ): (
                <Paper elevation={3} className={classes.paper}>
                  <Typography className={classes.typography} variant="subtitle2" gutterBottom> {place.name}</Typography>
                  <img
                    className={classes.pointer}
                    src={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
                    alt={place.name}
                  />
                  <Rating name="read-only" size="small" value={Number(place.rating)} readOnly />
                </Paper>
              )}
          </div>
        ))}
        {weatherData?.list?.map((data, i) => {
             // Check if data.coord exists before trying to access its properties
             if (data.coord && data.coord.lat !== undefined && data.coord.lon !== undefined) {
             console.log(`Item ${i}:`, data);

        return (
               <div key={i} lat={data.coord.lat} lng={data.coord.lon}>
               <img 
                  height={100} 
                  src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`} 
                 alt="weather" 
               />
        </div>
           );
           } else {
             console.warn(`Invalid data at index ${i}:`, data);
              return null; // Return null if data is invalid to avoid rendering errors
              }
         })}

      </GoogleMapReact>
    </div>
  );
};

export default Map;
