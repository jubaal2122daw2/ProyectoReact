import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, useWindowDimensions, StyleSheet, Text, Image, Pressable } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { HomeComponent } from './components/HomeComponent';
import { MapComponent } from './components/MapComponent';
import { BuyComponent } from './components/BuyComponent';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Location from 'expo-location';
import * as SQLite from 'expo-sqlite';

const styles = StyleSheet.create({
  pressable: {
    height: 50,
    backgroundColor: 'red',
    width: 50,
  }
});

/*CONEXION LOCATION y llamada a BDD*/
const Tab = createBottomTabNavigator();
function MapLocation() {
  const [location, setLocation] = useState(null);
  const [cinesBDD, setCinesBDD] = useState([]);
  const cinesBDDesFalse = false;
  const db = SQLite.openDatabase("db.db");

  db.transaction(tx => {
    //tx.executeSql('DROP TABLE IF EXISTS cines', []);
    tx.executeSql(
      "create table if not exists cines (id integer primary key not null, nombre string, valoracion int, lat real, long real, imagen blop);"
    );
  });

  db.transaction(
    tx => {
      tx.executeSql("insert into cines (id, nombre, valoracion, lat, long) values (?, ?, ?, ? ,?)", [0, 'Cinesa', '5', 41.390205, 2.174007]);
      tx.executeSql("insert into cines (id, nombre, valoracion, lat, long) values (?, ?, ?, ? ,?)", [1, 'Filmax Granvia', '5', 41.380205, 2.175007]);
      tx.executeSql("insert into cines (id, nombre, valoracion, lat, long) values (?, ?, ?, ? ,?)", [2, 'Prueba', '5', 41.370205, 2.176007]);
      // tx.executeSql("select * from cines", [], (_, { rows }) =>
      //   console.log(JSON.stringify(rows))
      // );
    }
  );

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  useEffect(() => {
    db.transaction(
      tx => {
        tx.executeSql("select * from cines", [], (_, { rows:{ _array } }) =>
          setCinesBDD(_array)
        );
      }
    );
}, []);

return (
  <View>
      {cinesBDD.length > 0 && (<MapComponent cinesBDD ={cinesBDD} />)}
  </View>
);
}

/*CONEXION BDD */

export default function App() {

  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Home">
        <Tab.Screen name="Home" component={HomeComponent}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <Icon name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen name="Map" component={MapLocation}
          options={{
            tabBarLabel: 'Map',
            tabBarIcon: ({ color, size }) => (
              <Icon name="map" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen name="Buy" component={BuyComponent}
          options={{
            tabBarLabel: 'Buy',
            tabBarIcon: ({ color, size }) => (
              <Icon name="shopping-cart" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}