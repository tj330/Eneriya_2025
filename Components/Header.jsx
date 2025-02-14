import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useEffect } from 'react'
import logo from "../assets/logo.png"
import Entypo from '@expo/vector-icons/Entypo';

const Header = () => {

  return (
    <View style={s.hcontainer}>
          <View style={s.header}>
      <Image source={logo} style={s.logo}/>
      <Text style={s.title}>PANIC</Text>
    </View>
    <Entypo name="old-phone" size={24} color="gray" />
    </View>

  )
}

export default Header

const s=StyleSheet.create({
    hcontainer:{
      display:'flex',
      flexDirection:'row',
      justifyContent:'space-between'
    },
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