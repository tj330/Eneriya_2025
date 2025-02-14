import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";


import Home from "./Pages/Home";
import Location from "./Pages/Location";

const Tab = createBottomTabNavigator();

export default function App() {

  const [sendPushToken, setSendPushToken] = useState("");

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === "Home") iconName = "home-outline";
            else if (route.name === "Location") iconName = "location-outline";

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Location" component={Location} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}


