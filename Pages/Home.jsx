import { View, Text, StyleSheet } from 'react-native';
import React, { useContext } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Body from '../Components/Body';
import Header from '../Components/Header';
import socket from '../services/socket';
import { showNotification } from '../services/Notification';
import { MarkersContext } from '../context/MarkersContext';

const message = "Help me! I am in danger";

const Home = () => {
  const [buttonClicked, setButtonClicked] = React.useState(false);
  const { location, addDistressMarker, clearHelperMarker } = useContext(MarkersContext);

  const handleButtonClicked = (e) => {
    setButtonClicked(e);
    if (e) {
      socket.emit("send_distress", { message, lat: location.lat, lon: location.lon });
      showNotification("Calling for help", `${location.lat}, ${location.lon}`, "panic://location");
      addDistressMarker({ id: Date.now(), lat: location.lat, lon: location.lon, type: "Distress" });
      clearHelperMarker()
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={[styles.container, buttonClicked && { backgroundColor: 'rgb(121, 4, 4)' }]}>
        <View style={styles.header}>
          <Header />
        </View>
        <View style={styles.body}>
          <Body handleChange={handleButtonClicked} btnSts={buttonClicked} />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Home;

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
    fontSize: 18,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
