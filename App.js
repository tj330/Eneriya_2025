import { StyleSheet, View ,Text} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Header from "./Components/Header";
import Body from "./Components/Body";

export default function App() {
  return <SafeAreaProvider>
    <SafeAreaView style={{ flex: 1 ,padding:20}}>  
      <View  style={s.header}>
        <Header/>
      </View>
      <View style={s.body}>
        <Body/>
      </View>
      <View style={s.footer}>
        <Text>Footer</Text>
      </View>
    </SafeAreaView>
  </SafeAreaProvider>
}

const s=StyleSheet.create({
  header:{
    flex:1,
  },
  body:{
    flex:10,
  },
  footer:{
    flex:1,
  }
})