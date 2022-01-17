import React from 'react';
import {View, Text} from 'react-native';
import Home from './screens/Home';
import Profile from './screens/Profile';

function App({Drawer}) {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Profile" component={Profile} />
    </Drawer.Navigator>
  );
}

export default App;
