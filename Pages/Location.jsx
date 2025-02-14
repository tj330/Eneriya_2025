import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import MapView, { Marker } from "react-native-maps";
import disaster from "../assets/crisis.png"
import help from "../assets/help.png"
import { getCurrentPositionAsync, requestForegroundPermissionsAsync } from 'expo-location';

const Location = () => {

    const [markers,setMarkers] = React.useState([]);

      const helperMarkers = [
        { id: 1, title: "Helper 1", latitude: 10.8505, longitude: 76.2711 },
        { id: 2, title: "Helper 2", latitude: 11.0168, longitude: 76.9558 },
        { id: 3, title: "Helper 3", latitude: 12.2958, longitude: 76.6394 },
        { id: 4, title: "Helper 4", latitude: 13.0827, longitude: 80.2707 },
        { id: 5, title: "Helper 5", latitude: 15.3173, longitude: 75.7139 },
      ];


      useEffect(() => {
        fetch("http://panic-api.onrender.com/disasters").then((response) => response.json()).then((data) => {
            setMarkers(data);
        });
      }, []);

    return (
        <SafeAreaProvider>
            <SafeAreaView style={{flex:1}}>
                <View style={styles.container}>
                    <MapView
                        style={styles.map}
                        initialRegion={{
                            latitude: 10.8505, // Kerala's latitude
                            longitude: 76.2711, // Kerala's longitude
                            latitudeDelta: 8, // Adjust zoom level
                            longitudeDelta: 8,
                        }}
                    >
                        {markers.map((marker) => <Marker 
                        coordinate={{latitude:marker.lat,longitude:marker.lon}} 
                        title={marker.type} 
                        key={marker.id.toString()}
                        image={disaster}
                        />)}

                        {
                            helperMarkers.map((marker) => <Marker
                                coordinate={{ latitude: marker.latitude, longitude: marker.longitude ,key: marker.latitude }}
                                title={marker.title} 
                                key={marker.id.toString()}
                                image={help}
                            />)
                        }
                    </MapView>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

export default Location


const styles = StyleSheet.create({
    container: {
      flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    map: {
      width: "100%",
      height: "100%",
    },
  });