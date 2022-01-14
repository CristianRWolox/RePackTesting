import * as React from 'react';
import { AppRegistry, Text, Platform, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { ChunkManager } from '@callstack/repack/client';

ChunkManager.configure({
  forceRemoteChunkResolution: true,
  resolveRemoteChunk: async (chunkId, parentId) => {
    let url;

    switch (parentId) {
      case 'app1':
        url = `http://localhost:9000/${chunkId}.chunk.bundle`
        break;
      case 'wbooks':
        url = `http://localhost:9001/${chunkId}.chunk.bundle`
        break;
      case 'app3':
        url = `http://localhost:9002/${chunkId}.chunk.bundle`
        break;
      case 'login':
        url = `http://localhost:9004/${chunkId}.chunk.bundle`
        break;
      case 'main':
      default:
        url = {
          // containers
          app1: 'http://localhost:9000/app1.container.bundle',
          // wbooks: 'http://localhost:9001/wbooks.container.bundle',
          app3: 'http://localhost:9002/app3.container.bundle',
          login: 'http://localhost:9004/login.container.bundle',
        }[chunkId] ?? `http://localhost:8081/${chunkId}.chunk.bundle`
        break;
    }

    return {
      url,
      query: {
        platform: Platform.OS,
      },
      excludeExtension: true,
    }
  }
})




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


// function MyDrawer() {
//   return (
//     <Drawer.Navigator>
//       <Drawer.Screen name="Feed" component={App3Wrapper} />
//     </Drawer.Navigator>
//   );
// }

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export function Root() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginWrapper} />
        {/* <Tab.Screen name="Wbooks" component={Wbooks} /> */}
        <Stack.Screen name="App3" component={App3Wrapper} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
