import { View, Text, TextInput, Pressable} from 'react-native'
import React, {useState} from 'react'
import MapView from 'react-native-maps'
import {PROVIDER_GOOGLE} from 'react-native-maps'
// import TextInputExample from '../components/TextInput'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';



const HomeScreen = () => {

  const [startLocLat, setStartLocLat] = useState(100);
  const [startLocLong, setStartLocLong] = useState(132.32);
  const [endLocLat, setEndLocLat] = useState(21.4);
  const [endLocLong, setEndLocLong] = useState(12.3);
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [route, setRoute] = useState({
    "distanceMeters": 772,
    "duration": "165s",
    "polyline": {
      "encodedPolyline": "ipkcFfichVnP@j@BLoFVwM{E?"
    }
  })

  const getRoutesFromApi = async (startlat, startlong, endlat, endlong) => {
    const test = await fetch('https://routes.googleapis.com/directions/v2:computeRoutes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': 'AIzaSyBAvDy55Oz9_AibZAXd_t9bMi22qZZ9HmM',
        'X-Goog-FieldMask': 'routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline'
      },
      // body: '{\n  "origin":{\n    "location":{\n      "latLng":{\n        "latitude": 37.419734,\n        "longitude": -122.0827784\n      }\n    }\n  },\n  "destination":{\n    "location":{\n      "latLng":{\n        "latitude": 37.417670,\n        "longitude": -122.079595\n      }\n    }\n  },\n  "travelMode": "DRIVE",\n  "routingPreference": "TRAFFIC_AWARE",\n  "departureTime": "2023-10-15T15:01:23.045123456Z",\n  "computeAlternativeRoutes": false,\n  "routeModifiers": {\n    "avoidTolls": false,\n    "avoidHighways": false,\n    "avoidFerries": false\n  },\n  "languageCode": "en-US",\n  "units": "IMPERIAL"\n}',
      body: JSON.stringify({
        'origin': {
          'location': {
            'latLng': {
              'latitude': startlat,
              'longitude': startlong
            }
          }
        },
        'destination': {
          'location': {
            'latLng': {
              'latitude': endlat,
              'longitude': endlong
            }
          }
        },
        'travelMode': 'DRIVE',
        'routingPreference': 'TRAFFIC_AWARE',
        'departureTime': '2023-10-15T15:01:23.045123456Z',
        'computeAlternativeRoutes': false,
        'routeModifiers': {
          'avoidTolls': false,
          'avoidHighways': false,
          'avoidFerries': false
        },
        'languageCode': 'en-US',
        'units': 'METRIC'
      })
    }).then((res) => res.json());

    // console.log(startlat);
  
  // console.log(test)
  return test
}
  // const [text, setText] = useState('');
  // const [text, setText] = useState('');
  

  return (
    <View >
               <GooglePlacesAutocomplete
         styles={{
          container:{
            flex:0,
            backgroundColor:"red"
          }
         }}

         placeholder='start'
         nearbyPlacesAPI='GooglePlacesSearch'
         debounce={400}
         enablePoweredByContainer={false}
         onPress={(data,details =null) =>{
          
          // console.log("najprv"+details.geometry.location.lng);
          // console.log(details.geometry.location.lng);
          setStartLocLat(details.geometry.location.lat)
          setStartLocLong(details.geometry.location.lng)
          // console.log("potom"+startLocLat);
          // console.log(startLocLong);
          const newRegion = {
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
            latitudeDelta: 0.002,
            longitudeDelta: 0.0004,
          };
          setRegion(newRegion)
         }}
         fetchDetails={true}
         query={{
          key:"AIzaSyBAvDy55Oz9_AibZAXd_t9bMi22qZZ9HmM",
          language:"en",

        }}
         />
        <GooglePlacesAutocomplete
         styles={{
          container:{
            flex:0,
            backgroundColor:"red"
          }
         }}

         placeholder='end'
         nearbyPlacesAPI='GooglePlacesSearch'
         debounce={400}
         enablePoweredByContainer={false}
         onPress={(data,details = null) =>{
          // setEndLoc(details.geometry.location),
          // console.log(details.geometry.location);
          
          setEndLocLat(details.geometry.location.lat)
          // console.log({endLocLat});
          setEndLocLong(details.geometry.location.lng)
          
          
          // console.log(data);
          // console.log(details);
         }}
         fetchDetails={true}
         query={{
          key:"AIzaSyBAvDy55Oz9_AibZAXd_t9bMi22qZZ9HmM",
          language:"en",

        }}
         />
         <MapView 
         region={region}
          style={{
            height: '50%',
            width: '100%'
            }
          }
          // mapType="mutedStandard"
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: startLocLat,
            longitude: startLocLong,
            latitudeDelta: 0.0004,
            longitudeDelta: 0.0004
            }
          }
         /> 
          <Pressable style={{flex:1}} onPress={() => getRoutesFromApi(startLocLat, startLocLong, endLocLat, endLocLong).then((res)=>console.log(res))}><Text>cauky mnauky</Text></Pressable>
         {/* <Text>{text}</Text> */}
    </View>
  )
}


export default HomeScreen;