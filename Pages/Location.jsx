import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import disaster from "../assets/crisis.png"
import help from "../assets/help.png"

const Location = () => {
    const [markers,setMarkers] = useState([]);
    const [region, setRegion] = useState(null);

      const helperMarkers = [
        { id: 1, title: "Helper 1", latitude: 10.8505, longitude: 76.2711 },
        { id: 2, title: "Helper 2", latitude: 11.0168, longitude: 76.9558 },
        { id: 3, title: "Helper 3", latitude: 12.2958, longitude: 76.6394 },
        { id: 4, title: "Helper 4", latitude: 13.0827, longitude: 80.2707 },
        { id: 5, title: "Helper 5", latitude: 15.3173, longitude: 75.7139 },
      ];

      useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setRegion({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.3,
                longitudeDelta: 0.3,
            });
        })();
    }, []);


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
                        provider={PROVIDER_GOOGLE}
                        style={styles.map}
                        region={region}
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