import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

const Weather = () => {
  return (
    <SafeAreaProvider>
        <SafeAreaView style={{flex:1,padding:20}}>
            <View style={s.c1}>

            </View>
            <View>

            </View>
        </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default Weather

const s=StyleSheet.create({
    c1:{
        flex:1,
    }
})