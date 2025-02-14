import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Header from '../Components/Header'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

const Location = () => {
    return (
        <SafeAreaProvider>
            <SafeAreaView>
                <View style={s.container}>
                    <Header />
                    <Text>Location</Text>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

export default Location

const s=StyleSheet.create({
    container:{
            padding: 20,
    }
})