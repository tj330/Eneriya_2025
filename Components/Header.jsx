import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import logo from "../assets/logo.png"

const Header = () => {
  return (
    <View style={s.header}>
      <Image source={logo} style={s.logo}/>
      <Text style={s.title}>PANIC</Text>
    </View>
  )
}

export default Header

const s=StyleSheet.create({
    header:{
        display:'flex',
        flexDirection:'row',
        gap: 10,
        alignItems:'center',
    },
    logo:{
        width: 40,
        height: 40,
        objectFit:'contain'
    },
    title:{
        fontSize: 20,
        fontWeight: 'bold',
    }
})