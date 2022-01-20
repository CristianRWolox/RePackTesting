import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Routes from '@constants/routes';
import { RoutesParamList } from '@constants/routesParamList';
import {appStackNavConfig, tabNavConfig} from '@config/navigation';
import { inferRoute } from '@utils/navUtils';
import Home from '@screens/Home';

const Stack = createStackNavigator<RoutesParamList>();

const Tab = createBottomTabNavigator<RoutesParamList>();
function HomeTabs() {
  return (
    <Tab.Navigator {...tabNavConfig}>
      {inferRoute(Tab)(Routes.Tab1, Home)}
      {inferRoute(Tab)(Routes.Tab2, Home)}
    </Tab.Navigator>
  );
}

function AppStack() {
  return <>{inferRoute(Stack)(Routes.Home,HomeTabs)}</>;
}

const Navigator = () => {
  return <Stack.Navigator {...appStackNavConfig}>{AppStack()}</Stack.Navigator>;
};

export default Navigator;
