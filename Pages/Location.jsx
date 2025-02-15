import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect, useContext, useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import help from '../assets/help.png';
import disaster from '../assets/crisis.png';
import { MarkersContext } from '../context/MarkersContext';

const Location = () => {
  const { location, markers, helpers, addHelperMarker } = useContext(MarkersContext);
  const [region, setRegion] = useState({
    latitude: location.lat,
    longitude: location.lon,
    latitudeDelta: 0.3,
    longitudeDelta: 0.3,
  });

  useEffect(() => {
    setRegion({
      latitude: location.lat,
      longitude: location.lon,
      latitudeDelta: 0.3,
      longitudeDelta: 0.3,
    });
    const { lat, lon } = location;
    const id = "volunteer"
    addHelperMarker( { id, lat, lon } )
  }, [location]);

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
            {helpers.map((helper) => (
              <Marker
                coordinate={{ latitude: helper.lat, longitude: helper.lon }}
                title={helper.title}
                key={helper.id.toString()}
                image={help}
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