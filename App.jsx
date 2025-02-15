import React, { useEffect, useState, useRef } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import { setNotificationHandler } from "expo-notifications";
import { requestNotificationPermissions, showNotification } from "./services/Notification";
import socket from "./services/socket";

import Home from "./Pages/Home";
import Location from "./Pages/Location";
import Weather from "./Pages/Weather";
import audio from "./assets/eas.mp3";
import { MarkersProvider } from "./context/MarkersContext";

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
  const soundRef = useRef(null);

  useEffect(() => {
    getCoord();
    requestNotificationPermissions();

    const handleDistressSignal = async (data) => {
      console.log(data);
      try {
        const { sound } = await Audio.Sound.createAsync(audio);
        soundRef.current = sound;
        await sound.playAsync();
      } catch (error) {
        console.error("Error playing audio:", error);
      }

      const message = `Distress signal received: ${data.message}. Location: ${data.lat}, ${data.lon}`;
      showNotification("Time to be a hero", message);
    };

    socket.on("receive_distress", handleDistressSignal);

    return () => {
      socket.off("receive_distress", handleDistressSignal);
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
    };
  }, []);

  async function getCoord() {
    const { status } = await requestForegroundPermissionsAsync();
    if (status === 'granted') {
      const loc = await getCurrentPositionAsync();
      setLocation({ lon: loc.coords.longitude, lat: loc.coords.latitude });
    } else {
      setLocation({ lon: 0, lat: 0 });
    }
  }

  return (
    <MarkersProvider>
      <NavigationContainer
        linking={{
          prefixes: ["panic://"],
          config: {
            screens: {
              Home: "home",
              Location: "location",
              Info: "info",
            },
          },
        }}
      >
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ color, size }) => {
              let iconName;
              if (route.name === "Home") iconName = "home-outline";
              else if (route.name === "Location") iconName = "location-outline";
              else if (route.name === "Info") iconName = "cloud-outline";

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "tomato",
            tabBarInactiveTintColor: "gray",
          })}
        >
          <Tab.Screen name="Home" component={Home} initialParams={location} />
          <Tab.Screen name="Location" component={Location} />
          <Tab.Screen name="Info" component={Weather} initialParams={location} />
        </Tab.Navigator>
      </NavigationContainer>
    </MarkersProvider>
  );
}

