import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import help from '../assets/help.png';
import disaster from '../assets/crisis.png';
import * as LocationAPI from 'expo-location';

const Location = () => {
  const [markers, setMarkers] = useState([]);
  const [region, setRegion] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await LocationAPI.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let location = await LocationAPI.getCurrentPositionAsync({});
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.3,
        longitudeDelta: 0.3,
      });

      // Set a single marker with the current location
      setMarkers([
        {
          lat: location.coords.latitude,
          lon: location.coords.longitude,
          type: 'Current Location',
          id: 'current',
        },
      ]);
    })();
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
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
            {markers.map((marker) => (
              <Marker
                coordinate={{ latitude: marker.lat, longitude: marker.lon }}
                title={marker.type}
                key={marker.id.toString()}
                image={disaster}
              />
            ))}
          </MapView>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Location;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});