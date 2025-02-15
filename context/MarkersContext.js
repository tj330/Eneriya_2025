import React, { createContext, useState, useEffect } from 'react';
import { getCurrentPositionAsync, requestForegroundPermissionsAsync } from 'expo-location';

export const MarkersContext = createContext({
  location: { lon: 0, lat: 0 },
  markers: [],
  helpers: [],
  addDistressMarker: () => {},
  addHelperMarker: () => {},
  clearDistressMarker: () => {},
  clearHelperMarker: () => {},
});

export const MarkersProvider = ({ children }) => {
  const [location, setLocation] = useState({ lon: 0, lat: 0 });
  const [markers, setMarkers] = useState([]);
  const [helpers, setHelpers] = useState([]);

  useEffect(() => {
    const getCoord = async () => {
      try {
        const { status } = await requestForegroundPermissionsAsync();
        if (status === 'granted') {
            console.log("Succesfuly got location");
          const loc = await getCurrentPositionAsync();
          setLocation({ lon: loc.coords.longitude, lat: loc.coords.latitude });
        } else {
          setLocation({ lon: 0, lat: 0 });
        }
      } catch (error) {
        console.error("Error getting location:", error);
        setLocation({ lon: 0, lat: 0 });
      }
    };

    getCoord();
  }, []);

  const addDistressMarker = (marker) => {
    setMarkers((prevMarkers) => [...prevMarkers, marker]);
  };

  const addHelperMarker = (marker) => {
    setHelpers((prevHelpers) => [...prevHelpers, marker]);
  };

  const clearHelperMarker = () => {
    setHelpers([]);
  };

  const clearDistressMarker = () => {
    setMarkers([]);
  };

  return (
    <MarkersContext.Provider value={{ location, markers, helpers, addDistressMarker, addHelperMarker, clearDistressMarker, clearHelperMarker }}>
      {children}
    </MarkersContext.Provider>
  );
};
