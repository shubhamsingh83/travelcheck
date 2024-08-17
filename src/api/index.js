import axios from 'axios';



export const getPlacesData = async (type, sw, ne) => {
  try {
    const response = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
      params: {
        bl_latitude: sw.lat,
        tr_latitude: ne.lat,
        bl_longitude: sw.lng,
        tr_longitude: ne.lng,
      },
      headers: {
        'x-rapidapi-key': '6b136f50b3mshad49a878b4e652dp1e3dedjsnccfe5309200c',
        'x-rapidapi-host': 'travel-advisor.p.rapidapi.com'
      },
      timeout: 10000, // Timeout after 10 seconds
    });

    if (response.status === 200) {
      const { data } = response.data; // Safely access data
      // console.log(data);
      return data;
    } else {
      console.log('Error:', response.status, response.statusText);
    }
  } catch (error) {
    if (error.response) {
      // Server responded with a status other than 200 range
      console.log('Server Error:', error.response.status, error.response.data);
    } else if (error.request) {
      // Request was made but no response received
      console.log('Network Error:', error.request);
    } else {
      // Something happened in setting up the request
      console.log('Error:', error.message);
    }
  }
};


export const getWeatherData = async (lat, lng) => {
  //  console.log("line 44",lat,lng);
  try {
    if (lat && lng) {
      const { data } = await axios.get(`https://open-weather13.p.rapidapi.com/city/latlon/${lat}/${lng}`, {
        // params: { lat:lat, lon: lng },
        headers: {
          'x-rapidapi-key': '6b136f50b3mshad49a878b4e652dp1e3dedjsnccfe5309200c',
          'x-rapidapi-host': 'open-weather13.p.rapidapi.com'
        },
      });
      console.log(data);
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

