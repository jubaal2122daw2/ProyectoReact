import * as React from 'react';
import { View, useWindowDimensions, StyleSheet, Text, Image} from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';

const IndexRoute = () => (
  <View style={styles.container}>
    <Image style={styles.image} source = {require("./assets/logo.png")}/>
      <Text>Open up App.js to start working on your app!</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f52f2f',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white'
  },
  image: {
    marginBottom: 40,
    width: 300,
    height: 300,
  }
});

const MapRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#673ab7' }} />
);

const renderScene = SceneMap({
  index: IndexRoute,
  map: MapRoute,
});

export default function TabViewExample() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'index', title: 'Inici' },
    { key: 'map', title: 'Mapa' },
  ]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      tabBarPosition="bottom"
    />
  );
}