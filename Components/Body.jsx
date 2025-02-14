import { View, Text, StyleSheet, Image, TouchableOpacity, Linking } from 'react-native'
import React, { useState, useEffect } from 'react'
import circle from "../assets/sos.png"
import * as Font from "expo-font";
import { ActivityIndicator } from "react-native";
import { Audio } from 'expo-av';
import audio from "../assets/eas.mp3"
import FontAwesome from '@expo/vector-icons/FontAwesome';

const Body = ({ handleChange }) => {
    const [fontsLoaded, setFontsLoaded] = useState(false);


    const [sound, setSound] = useState(null)

    const playSound = async () => {
        try {
            const { sound } = await Audio.Sound.createAsync(audio)
            setSound(sound)

            await sound.playAsync()
        } catch (error) {
            console.log(error)
        }
    }

    const stopSound = async () => {
        if (sound) {
            await sound.stopAsync();
        }
    };

    const onSOS = () => {
        const phn = "tel:112"

        Linking.openURL(phn)
    }

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
            </View>
            <View style={s.c2}>
                <TouchableOpacity style={s.btn} onPress={() => {
                    playSound()
                    handleChange(true),
                        onSOS()
                    setTimeout(() => {
                        handleChange(false)
                        stopSound()

                    }, 5000)
                }}>
                    <Image source={circle} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                    {/* <View style={{display:'flex',alignItems:'center',justifyContent:'center',width:'100%',height:'100%',position:'absolute'}}>
                        <FontAwesome name="bell" size={24} color="white" />
                        <Text style={s.sos}>SOS</Text>
                    </View> */}
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
        height: '30%',
        display: 'flex',
        flexDirection: 'row',
    },
    c2: {
        width: "100%",
        height: '70%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    r1: {
        width: "100%",
        height: '100%',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        fontFamily: 'Kanit'
    },
    desc: {
        fontSize: 16,
        fontFamily: 'Poppins'
    },
    sos: {
        position: 'absolute',
        fontWeight: 'bold',
        fontSize: 80,
        color: 'white',
        fontFamily: 'Kanit'
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