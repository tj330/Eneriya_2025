import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import disaster from "../assets/crisis.png"
import help from "../assets/help.png"

const Location = () => {

    const markers = [
        { id: 1, title: "Kochi", latitude: 9.9312, longitude: 76.2673 },
        { id: 2, title: "Bangalore", latitude: 12.9716, longitude: 77.5946 },
        { id: 3, title: "Mumbai", latitude: 19.076, longitude: 72.8777 },
        { id: 4, title: "Delhi", latitude: 28.7041, longitude: 77.1025 },
        { id: 5, title: "Chennai", latitude: 13.0827, longitude: 80.2707 },
        { id: 6, title: "Hyderabad", latitude: 17.385, longitude: 78.4867 },
        { id: 7, title: "Kolkata", latitude: 22.5726, longitude: 88.3639 },
      ];

      const helperMarkers = [
        { id: 1, title: "Helper 1", latitude: 10.8505, longitude: 76.2711 },
        { id: 2, title: "Helper 2", latitude: 11.0168, longitude: 76.9558 },
        { id: 3, title: "Helper 3", latitude: 12.2958, longitude: 76.6394 },
        { id: 4, title: "Helper 4", latitude: 13.0827, longitude: 80.2707 },
        { id: 5, title: "Helper 5", latitude: 15.3173, longitude: 75.7139 },
      ];

    return (
        <SafeAreaProvider>
            <SafeAreaView style={{flex:1}}>
                <View style={styles.container}>
                    <MapView
                        provider={PROVIDER_GOOGLE}
                        style={styles.map}
                        initialRegion={{
                            latitude: 10.8505, // Kerala's latitude
                            longitude: 76.2711, // Kerala's longitude
                            latitudeDelta: 8, // Adjust zoom level
                            longitudeDelta: 8,
                        }}
                    >
                        <Marker
                            coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
                            title="My Location"
                            description="This is where I am!"
                        />
                        {markers.map((marker) => <Marker 
                        coordinate={{latitude:marker.latitude,longitude:marker.longitude}} 
                        title={marker.title} 
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