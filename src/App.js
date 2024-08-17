import React, { useState, useEffect } from "react";
import { CssBaseline, Grid } from "@material-ui/core";

import { getPlacesData , getWeatherData} from "./api";
import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";
// import PlaceDetails from "./components/PlaceDetails/PlaceDetails";

const App = () => {
    const [places, setPlaces] = useState([]);
    const [weatherData, setWeatherData] = useState([]);
    const [childClicked, setChildClicked] = useState(null);
    const [filteredPlaces,setFilteredPlaces] = useState([]);

    const [coordinates, setCoordinates] = useState({});
    const [bounds, setBounds] = useState(null); // topright and bottomleft corner 

    const[isLoading,setIsLoading] = useState(false);
    const [type, setType] = useState('restaurants');
    const [rating, setRating] = useState('');
  

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
            setCoordinates({ lat: latitude, lng: longitude });
        });
    }, []);

    useEffect(() =>{
         const filteredPlaces  =  places.filter((place) => place.rating > rating);
          
         setFilteredPlaces(filteredPlaces);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[rating]);

    useEffect(() => {
        // console.log("Bounds:", bounds); // Add this line
        if (bounds?.sw && bounds?.ne) { 
            // console.log("App.js Line 40" ,coordinates.lat,coordinates.lng  );
            setIsLoading(true);
            getWeatherData(coordinates.lat,coordinates.lng)
                 .then((data)=>setWeatherData(data));
            getPlacesData(type, bounds.sw, bounds.ne)
                .then((data) => {
                    // console.log("Fetched Places Data:", data);
                    setPlaces(data?.filter((place) => place.name && place.num_reviews > 0)); 
                    setFilteredPlaces([]);
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.log("Error fetching data:", error);
                });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [type, bounds]);
    

    return (
        <>
            <CssBaseline />
            <Header setCoordinates={setCoordinates}/>
            <Grid container spacing={3} style={{ width: '100%' }}>
                <Grid item xs={12} md={4}>
                    <List
                     places ={filteredPlaces.length ? filteredPlaces : places}
                     childClicked={childClicked}
                     isLoading={isLoading}
                     type={type}
                     setType={setType}
                     rating={rating}
                     setRating={setRating}
                            
                    />
                </Grid>
                <Grid item xs={12} md={8}>
                    <Map
                        setCoordinates={setCoordinates}
                        setBounds={setBounds}
                        coordinates={coordinates}
                        places={filteredPlaces.length ? filteredPlaces : places}
                        setChildClicked={setChildClicked}
                        weatherData={weatherData}
                    />
                </Grid>
            </Grid>
        </>
    );
};

export default App;
