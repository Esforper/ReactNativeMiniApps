import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';

// Sayfaları import edin
import Page1 from './screens/Page1';
import Page2 from './screens/Page2';
import Page3 from './screens/Page3';
import Page4 from './screens/Page4';

// Drawer Navigator oluşturun
// test
const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Sayfa 1">
        <Drawer.Screen name="Sayfa 10" component={Page1} />
        <Drawer.Screen name="Sayfa 20" component={Page2} />
        <Drawer.Screen name="Sayfa 30" component={Page3} />
        <Drawer.Screen name="Sayfa 40" component={Page4} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
