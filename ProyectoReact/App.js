import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source = {require("./assets/logo.png")}/>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f52f2f',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white'
  },
  image: {
    marginBottom: 40,
    width: 300,
    height: 300,
  }
});
