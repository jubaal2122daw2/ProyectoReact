import React, { useState } from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, Alert, Modal, Pressable } from 'react-native';

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
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
});

const MapComponent = (props) => {
  const puntoMapa = [];
  const [modalVisible, setModalVisible] = useState(false);
  const [cine, setCine] = useState({});
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
        </MapView>
    </View>
  );
}

export { MapComponent };