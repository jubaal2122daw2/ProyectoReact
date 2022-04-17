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
    const punto = <MapMarker key={prop["id"]} lat= {prop["lat"]} lng={prop["long"]}/>;
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