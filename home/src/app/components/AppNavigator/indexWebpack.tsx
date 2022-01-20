import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer, NavigationState } from '@react-navigation/native';
import { navigationRef, getActiveRoute, getRoute } from '@navigationHelper';
import CustomStatusBar from '@components/CustomStatusBar';
import withLoadable from '@components/Loadable';
import { Nullable } from '@interfaces/globalInterfaces';
import { State } from '@interfaces/reduxInterfaces';

import Navigator from './navigatorWebpack';

const AppNavigator = ({ HomeNavigator }: { HomeNavigator: any }) => {
  const [routeName, setRouteName] = useState<Nullable<string>>(null);

  const onStateChange = (state?: NavigationState) => {
    const previousRouteName = routeName;
    const currentRouteName = getRoute(state).name;
    if (previousRouteName !== currentRouteName) {
      setRouteName(currentRouteName);
    }
  };

  return (
    <>
      <CustomStatusBar routeName={routeName} />
      <Navigator HomeNavigator={HomeNavigator} />
    </>
  );
};

export default withLoadable(() => useSelector((state: State) => state.auth.initialLoading))(AppNavigator);
