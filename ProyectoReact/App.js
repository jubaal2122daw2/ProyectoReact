import * as React from 'react';
import { View, useWindowDimensions, StyleSheet, Text, Image} from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { HomeComponent } from './components/HomeComponent';
import { MapComponent } from './components/MapComponent';
import { BuyComponent } from './components/BuyComponent';
import Icon from 'react-native-vector-icons/MaterialIcons';

const DummyRoute = () => ( // DEBUG
  <View style={{ flex: 1, backgroundColor: '#fff' }} />
);

const renderScene = SceneMap({
  index: HomeComponent,
  map: MapComponent,
  purchase: BuyComponent
});

const renderTabBar = props => (
  <TabBar
    {...props}
    style={{ backgroundColor: '#121212' }}
    indicatorStyle={{ backgroundColor: '#222', height: '100%' }}
    renderIcon={({ route, focused, color }) => (
      <Icon
        name={route.icon}
        color={color}
        style={{ width: '100%' }}
      />
    )}
  />
);

export default function App() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'index', title: 'Inicio', icon: 'home' },
    { key: 'map', title: 'Mapa', icon: 'map' },
    { key: 'purchase', title: 'Comprar', icon: 'shopping-cart' },
  ]);

  return (
    <TabView
      renderTabBar={renderTabBar}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      tabBarPosition="bottom"
      swipeEnabled={ false }
    /> 
  );
}