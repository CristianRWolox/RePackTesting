import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Reactotron from 'reactotron-react-native';
import SplashScreen from 'react-native-splash-screen';
import AppNavigator from '@components/AppNavigator/indexWebpack';
import { ErrorHandler } from '@components/ErrorBoundary';
import { ExceptionHandler } from '@components/ErrorBoundary/ExceptionHandler';
import { apiSetup } from '@config/api';
import { actionCreators as AuthActions } from '@redux/auth/actions';
import Home from '@screens/Home';
import './i18n';

const App = ({ HomeNavigator }: { HomeNavigator: any }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  useEffect(() => {
    apiSetup();
    dispatch(AuthActions.init());
    ExceptionHandler();
  }, [dispatch]);

  return (
    <ErrorHandler>
      <AppNavigator HomeNavigator={HomeNavigator} />
    </ErrorHandler>
  );
};

const MyAppWithOverlay = __DEV__ ? Reactotron.overlay(App) : App;

export default MyAppWithOverlay;
