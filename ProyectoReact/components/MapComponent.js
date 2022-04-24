import React, { useState } from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, Alert, Modal, Pressable, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { BuyComponent } from './BuyComponent';

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  // centeredView: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   marginTop: 22,
  // },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  image: {
    marginBottom: 40,
    width: 300,
    height: 300,
  },
});

const MapComponent = (props) => {
  const  coordenadasPoly = [];
  const [modalVisible, setModalVisible] = useState(false);
  const [cine, setCine] = useState({});
  const [camara, setCamara] = useState(false);
  const [foto, setFoto] = useState(['']);
  props["cinesBDD"].map((prop,index) =>{
    coordenadasPoly.push({
      latitude: prop["lat"],
      longitude: prop["long"],
    });
  });
  // console.log(foto) //Para ver si llega el Base 64
  return (
    <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>{cine["nombre"]}</Text>
              <Image style={styles.image} source={{uri: `data:image/png;base64,${foto}`}} />
              <Icon name="camera" size={25} color="black" onPress={() => {setCamara(!camara), setModalVisible(!modalVisible)} }/>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Hide Modal</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <MapView style={styles.map}
          showsMyLocationButton={true}
          showsUserLocation={true}>
          {props["cinesBDD"].map((prop, index) => (
            <MapView.Marker
              key={prop["id"]}
              coordinate={{
                latitude: prop["lat"],
                longitude: prop["long"],
              }}
              title={prop["nombre"]}
              description={prop["valoracion"].toString()}>
              <MapView.Callout onPress={() => { setModalVisible(true), setCine(prop) }} >
              </MapView.Callout>
            </MapView.Marker>
          ))}
          <MapView.Polyline
            coordinates={coordenadasPoly}
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
        {camara &&(<BuyComponent setFoto={setFoto} setCamara={setCamara}></BuyComponent>)}
    </View>
  );
}

export { MapComponent };