import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
export class MapComponent extends React.Component {

  coords = [{
    lat: 41.390205,
    lng: 2.174007,  
  }, {
    lat: 41.380205,
    lng: 2.175007,
  }]

  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <View style={styles.container}>
        <MapView style={styles.map} initialRegion={{
          latitude: this.coords[0].lat,
          longitude: this.coords[0].lng,
          latitudeDelta: 0.0622,
          longitudeDelta: 0.0121,
        }}>
          <MapView.Marker
            coordinate={{
              latitude: this.coords[0].lat,
              longitude: this.coords[0].lng
            }}
            title={"sortida"}
            description={"punt A"}
          />
          <MapView.Marker
            coordinate={{
              latitude: this.coords[1].lat,
              longitude: this.coords[1].lng
            }}
            title={"arribada"}
            description={"punt B"}
          />
          <MapView.Polyline
            coordinates={[
              { latitude: 41.390205, longitude: 2.174007, },
              { latitude: 41.380205, longitude: 2.175007 },
            ]}
            strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
            strokeColors={[
              '#7F0000',
              '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
              '#B24112',
              '#E5845C',
              '#238C23',
              '#7F0000'
            ]}
            strokeWidth={6}
          />
        </MapView>
      </View>
    );
  }
}