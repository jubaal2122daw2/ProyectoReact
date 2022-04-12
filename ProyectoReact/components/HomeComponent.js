import React from 'react';
import { View, StyleSheet, Text, Image} from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f52f2f',
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      color: 'black',
      fontSize: 23,
    },
    image: {
      marginBottom: 40,
      width: 300,
      height: 300,
    },
  });

export class HomeComponent extends React.Component{
    render(){
        return(
            <View style={styles.container}>
                <Image style={styles.image} source = {require("../assets/logo.png")}/>
              <Text style={styles.text}>Encuentra los cines más cercanos</Text>
            </View>
        );
    }
}
