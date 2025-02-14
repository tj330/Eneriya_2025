import { useState, useEffect } from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import * as Font from "expo-font";
import Header from "./Components/Header";
import Body from "./Components/Body";

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        "CustomFont-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
        "CustomFont-Bold": require("./assets/fonts/Kanit-Bold.ttf"),
      });
      setFontsLoaded(true);
    }

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Header />
        </View>
        <View style={styles.body}>
          <Body />
        </View>
        <View style={styles.footer}>
          <Text style={styles.footerText}>Footer</Text>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    height: 60,
    justifyContent: "center",
  },
  body: {
    flex: 1,
  },
  footer: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: {
    fontFamily: "CustomFont-Regular",
    fontSize: 18,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
