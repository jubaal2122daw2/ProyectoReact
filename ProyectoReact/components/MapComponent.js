import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

const coords = [{
  lat: 41.390205,
  lng: 2.174007,
}, {
  lat: 41.380205,
  lng: 2.175007,
}]

export class MapComponent extends React.Component {

  constructor(props) {
    super(props);
  }
//[{lat: this.coords[0].lat, lng: this.coords[0].lng}]

  state = {lat: coords[0].lat, lng: coords[0].lng};
  render() {
    return (
      <View style={styles.container}>
        <MapView style={styles.map}
          showsMyLocationButton={true}
          showsUserLocation={true}
        >
          <MapMarker lat= {this.state.lat} lng={this.state.lng}/>
          {/* <MapView.Polyline
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
          /> */}
        </MapView>
      </View>
    );
  }
}

export class MapMarker extends React.Component{
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <MapView.Marker
        coordinate={{
          latitude: this.props.lat,
          longitude: this.props.lng
        }}
        title={"sortida"}
        description={"punt A"}
      />
    );
  }
}