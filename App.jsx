import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";


import Home from "./Pages/Home";
import Location from "./Pages/Location";
import Weather from "./Pages/Weather";
import { requestNotificationPermissions } from "./services/Notification";
import { setNotificationHandler } from "expo-notifications";

const Tab = createBottomTabNavigator();

setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {

  useEffect( () => {
    requestNotificationPermissions();
  } )

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
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Location" component={Location} />
        <Tab.Screen name="Info" component={Weather}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}


