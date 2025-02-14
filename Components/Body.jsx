import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React,{useState,useEffect} from 'react'
import circle from "../assets/circle.png"
import * as Font from "expo-font";
import { ActivityIndicator } from "react-native";

const Body = () => {
      const [fontsLoaded, setFontsLoaded] = useState(false);
    
      useEffect(() => {
        async function loadFonts() {
          await Font.loadAsync({
            "Poppins": require("../assets/fonts/Poppins-Regular.ttf"),
            "Kanit": require("../assets/fonts/Kanit-Bold.ttf"),
          });
          setFontsLoaded(true);
        }
    
        loadFonts();
      }, []);
    
      if (!fontsLoaded) {
        return <ActivityIndicator size="large" style={s.loader} />;
      }
    return (
        <View style={s.container}>
            <View style={s.c1}>
                <View style={s.r1}>
                    <Text style={s.title}>Are you in an Emergency?</Text>
                    <Text style={s.desc}>Press the SOS button we are here to help you!</Text>
                </View>
                <View style={s.r2}>
                    <Text>Body</Text>
                </View>
            </View>
            <View style={s.c2}>
                <TouchableOpacity style={s.btn} onPress={() => alert('SOS Button Pressed')}>
                    <Image source={circle} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                    <Text style={s.sos}>SOS</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Body

const s = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
    },
    c1: {
        width: "100%",
        height: '50%',
        display: 'flex',
        flexDirection: 'row',
    },
    c2: {
        width: "100%",
        height: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    r1: {
        width: "70%",
        height: '100%',
        justifyContent: 'center'
    },
    r2: {
        width: "30%",
        height: '100%',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
        fontFamily:'Kanit'
    },
    desc: {
        fontSize: 20,
        fontFamily:'Poppins'
    },
    sos: {
        position: 'absolute',
        fontWeight: 'bold',
        fontSize: 80,
        color: 'white',
    },
    btn: {
        width: "100%", 
        height: "100%", 
        position: 'relative', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    loader: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      },
})