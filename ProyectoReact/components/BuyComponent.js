import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Button, TouchableHighlight } from 'react-native';
import { Camera } from 'expo-camera';

export function BuyComponent(props) {
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [foto, setFoto] = useState('');
    const cameraRef = useRef(null)

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
            console.log(status);
        })();
    }, []);

    const hacerFoto = async () => {
        console.log("Hacer foto");
        if (cameraRef) {
            const options = { base64: true };
            const data = await cameraRef.current.takePictureAsync(options);
            props.setFoto(data.base64);
        } else {
            console.log("No hay camara");
        }
    }
    const cerrarCamara = () => {
        props.setCamara(false);
    }

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={styles.container}>
            <Camera style={styles.camera} type={type} ref={cameraRef}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.capture}
                        onPress={() => hacerFoto()}
                    />
                    <TouchableOpacity
                        style={styles.cerrar}
                        onPress={() => cerrarCamara()}
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            setType(
                                type === Camera.Constants.Type.back
                                    ? Camera.Constants.Type.front
                                    : Camera.Constants.Type.back
                            );
                        }}>
                        <Text style={styles.text}> Flip </Text>
                    </TouchableOpacity>
                </View>
            </Camera>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        position: 'absolute',
    },
    camera: {
        flex: 1,
    },
    capture: {
        width: 40,
        height: 40,
        borderRadius: 35,
        borderWidth: 5,
        borderColor: '#FFF',
        marginBottom: 15,
        backgroundColor: 'orange',
    },
    buttonContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        margin: 20,
    },
    button: {
        flex: 0.1,
        // alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        color: 'white',
    },
    cerrar:{
        width: 40,
        height: 40,
        borderRadius: 35,
        borderWidth: 5,
        borderColor: '#FFF',
        marginBottom: 15,
        backgroundColor: 'red',
    }
});