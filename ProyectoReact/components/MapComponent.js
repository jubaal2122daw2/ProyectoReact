import React from 'react';
import MapView ,{ MAP_TYPES, PROVIDER_DEFAULT,UrlTile } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions} from 'react-native';

const styles = StyleSheet.create({
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
      },
});

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 22.720555;
const LONGITUDE = 75.858633;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export class MapComponent extends React.Component{
    constructor(props) {
        super(props);
          this.state = {
            region: {
              latitude: LATITUDE,
              longitude: LONGITUDE,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            },
          };
      }
    get mapType() {
        return this.props.provider === PROVIDER_DEFAULT ? MAP_TYPES.STANDARD : MAP_TYPES.NONE;
     }
    render(){
        return(
            <View>
               <MapView
                    region={this.state.region}
                    provider={null}
                    mapType={this.mapType}
                    rotateEnabled={false}
                    style={{flex: 1}}
                    showsUserLocation>
                    <UrlTile
                    urlTemplate="http://a.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png"
                    maximumZ={19}/>
                </MapView>
            </View>
        );
    }
}