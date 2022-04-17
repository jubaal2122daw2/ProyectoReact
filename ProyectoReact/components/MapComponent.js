import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

const MapComponent = (props) => {
  const puntoMapa = [];
  for(let prop of props["cinesBDD"]){
    const punto = <MapView.Marker
        key={prop["id"]}
        coordinate={{
          latitude: prop["lat"],
          longitude: prop["long"]
        }}
        title={ prop["nombre"].toString() }
        description={prop["valoracion"].toString() }
        />;
    puntoMapa.push(punto);
  }
    return (
      <View style={styles.container}>
        <MapView style={styles.map}
          showsMyLocationButton={true}
          showsUserLocation={true}>
            {puntoMapa}
        </MapView>
      </View>
    );
}
export {MapComponent};