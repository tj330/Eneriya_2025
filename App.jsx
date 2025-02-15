import React, { useEffect, useState, useRef } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { getCurrentPositionAsync, requestForegroundPermissionsAsync } from 'expo-location';


import Home from "./Pages/Home";
import Location from "./Pages/Location";
import Weather from "./Pages/Weather";
import { requestNotificationPermissions, showNotification } from "./services/Notification";
import { setNotificationHandler } from "expo-notifications";
import socket from "./services/socket";

import audio from "./assets/eas.mp3"
import { Audio } from "expo-av";

const Tab = createBottomTabNavigator();

setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {

  const [location, setLocation] = useState({ lon: 0, lat: 0 });
  const locationRef = useRef(location);

  useEffect(() => {
    locationRef.current = location;
  }, [location]);

  useEffect(() => {
    getCoord();
    requestNotificationPermissions();

    const handleDistressSignal = (data) => {
      console.log(data);
      Audio.Sound.createAsync(audio);
      const currentLocation = locationRef.current;
      const message = `Distress signal received: ${data.message}. Location: ${currentLocation.lat}, ${currentLocation.lon}`;
      showNotification({ ...data, message });
    };
    socket.on("receive_distress", handleDistressSignal);

    return () => {
      socket.off("receive_distress", handleDistressSignal);
    };
  }, [])

  async function getCoord() {
    try {
      const { status } = await requestForegroundPermissionsAsync();
      if (status === 'granted') {
        console.log("Permission granted");
        const loc = await getCurrentPositionAsync();
        console.log(loc.coords.longitude, loc.coords.latitude);
        setLocation({ lon: loc.coords.longitude, lat: loc.coords.latitude });
      } else {
        setLocation({ lon: 0, lat: 0 });
      }

      console.log(location);
    } catch (error) {
      console.error("Error getting location:", error);
      setLocation({ lon: 0, lat:0});
    }
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === "Home") iconName = "home-outline";
            else if (route.name === "Location") iconName = "location-outline";
            else if(route.name === "Info") iconName = "cloud-outline";

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen name="Home" component={Home} initialParams={locationRef.current} />
        <Tab.Screen name="Location" component={Location} initialParams={ locationRef.current } />
        <Tab.Screen name="Info" component={Weather} initialParams={locationRef.current} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

