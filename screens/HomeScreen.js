import { View, Text} from 'react-native'
import React from 'react'
import MapView from 'react-native-maps'
import {PROVIDER_GOOGLE} from 'react-native-maps'
const HomeScreen = () => {
  return (
    
    <View className="bg-white min-h-screen items-center justify-center ">
         <MapView style={{height: '50%', width: '100%'}}
         provider={PROVIDER_GOOGLE} /> 
    </View>
  )
}


export default HomeScreen;