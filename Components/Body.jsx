import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import circle from "../assets/circle.png"

const Body = () => {
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
            <Image source={circle} style={{width:'100%',height:'100%',objectFit:'contain'}}/>
            <Text style={s.sos}>SOS</Text>
        </View>
    </View>
  )
}

export default Body

const s=StyleSheet.create({
    container:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        height:'100%',
    },
    c1:{
        width:"100%",
        height:'50%',
        display:'flex',
        flexDirection:'row',
    },
    c2:{
        width:"100%",
        height:'50%',
    },
    r1:{
        width:"70%",
        height:'100%',
    },
    r2:{
        width:"30%",
        height:'100%',
    },
    title:{
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom:20
    },
    desc:{
        fontSize: 20,
    },
    sos:{
        position:'absolute',
        fontWeight: 'w900',
        color:'black',
    }
})