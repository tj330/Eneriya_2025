import { View, Text ,StyleSheet} from 'react-native'
import React from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import Body from '../Components/Body'
import Header from '../Components/Header'
import socket from '../services/socket'
import { showNotification } from '../services/Notification'

const Home = ({route}) => {
    const [buttonClicked, setButtonClicked] = React.useState(false);

  const handleButtonClicked = (e) => {
    setButtonClicked(e);
    const { lat, lon } = route.params;
    socket.emit("distress", { lat, lon });
    showNotification("Calling for help")
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={[styles.container, buttonClicked && { backgroundColor: 'rgb(121, 4, 4)' }]}>
        <View style={styles.header}>
          <Header />
        </View>
        <View style={styles.body}>
          <Body handleChange={handleButtonClicked} btnSts={buttonClicked}/>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default Home

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
