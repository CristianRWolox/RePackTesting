import * as React from 'react';
import { Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { ChunkManager } from '@callstack/repack/client';


async function loadComponent(scope, module) {
  // Initializes the share scope. This fills it with known provided modules from this build and all remotes
  await __webpack_init_sharing__("default");
  // Download and execute container
  await ChunkManager.loadChunk(scope, 'main');

  const container = self[scope];

  // Initialize the container, it may provide shared modules
  await container.init(__webpack_share_scopes__.default);
  const factory = await container.get(module);
  const exports = factory();
  return exports;
}

const App1 = React.lazy(
  () => loadComponent('app1', './App.js')
);

const Wbooks = React.lazy(
  () => loadComponent('wbooks', './App.tsx')
);

const App3 = React.lazy(
  () => loadComponent('app3', './App.js')
);

const Home = React.lazy(
  () => loadComponent('app3', './Home.js')
);

const Login = React.lazy(
  () => loadComponent('login', './App.js')
);

function App1Wrapper() {
  return (
    <React.Suspense fallback={<Text style={{ textAlign: 'center' }}>Loading...</Text>}>
      <App1 />
    </React.Suspense>
  );
}

function HomeWrapper() {
  return (
    <React.Suspense fallback={<Text style={{ textAlign: 'center' }}>Loading...</Text>}>
      <Home />
    </React.Suspense>
  );
}

function WbooksWrapper() {
  return (
    <React.Suspense fallback={<Text style={{ textAlign: 'center' }}>Loading...</Text>}>
      <Wbooks />
    </React.Suspense>
  );
}

const Drawer = createDrawerNavigator();

function App3Wrapper() {
  return (
    <React.Suspense fallback={<Text style={{ textAlign: 'center' }}>Loading...</Text>}>
      <App3 Drawer={Drawer} />
    </React.Suspense>
  );
}

function LoginWrapper() {
  return (
    <React.Suspense fallback={<Text style={{ textAlign: 'center' }}>Loading...</Text>}>
      <Login />
    </React.Suspense>
  );
}

const AuthStack = createStackNavigator();
const AppStack = createStackNavigator();

export const AuthNavigator = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen name="Login" component={LoginWrapper} />
  </AuthStack.Navigator>
);

export const AppNavigator = () => (
  <AppStack.Navigator>
    <AppStack.Screen name="App3" component={App3Wrapper} />
  </AppStack.Navigator>
);
