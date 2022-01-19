import * as React from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { ChunkManager } from '@callstack/repack/client';
import Config from "react-native-config";

import { AppNavigator, AuthNavigator } from './src/app/components/AppNavigator';

ChunkManager.configure({
  forceRemoteChunkResolution: true,
  resolveRemoteChunk: async (chunkId, parentId) => {
    let url;
    console.log(Config.LOCAL_IP);
    switch (parentId) {
      case 'wbooks':
        url = `http://${Config.LOCAL_IP}:9001/${chunkId}.chunk.bundle`
        break;
      case 'app3':
        url = `http://${Config.LOCAL_IP}:9002/${chunkId}.chunk.bundle`
        break;
      // case 'home':
      //   url = `http://localhost:9002/${chunkId}.chunk.bundle`
      //   break;
      case 'login':
        url = `http://${Config.LOCAL_IP}:9004/${chunkId}.chunk.bundle`
        break;
      case 'main':
      default:
        url = {
          app3: `http://${Config.LOCAL_IP}:9002/app3.container.bundle`,
          // home: 'http://localhost:9002/app3.container.bundle',
          login: `http://${Config.LOCAL_IP}:9004/login.container.bundle`,
        }[chunkId] ?? `http://${Config.LOCAL_IP}:8081/${chunkId}.chunk.bundle`
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
});

export function Root() {
  // TODO: change this when add redux
  const currentUser = true;
  return (
    <NavigationContainer>
      {currentUser ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
