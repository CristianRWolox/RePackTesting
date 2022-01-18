import * as React from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { ChunkManager } from '@callstack/repack/client';

import { AppNavigator, AuthNavigator } from './src/app/components/AppNavigator';

ChunkManager.configure({
  forceRemoteChunkResolution: true,
  resolveRemoteChunk: async (chunkId, parentId) => {
    let url;

    switch (parentId) {
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
});

export function Root() {
  // TODO: change this when add redux
  const currentUser = false;
  return (
    <NavigationContainer>
      {currentUser ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
