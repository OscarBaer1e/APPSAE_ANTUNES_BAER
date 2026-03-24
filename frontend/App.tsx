import React, { useState } from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Sae } from './src/types/sae';
import ListScreen from './src/screens/ListScreen';
import DetailScreen from './src/screens/DetailScreen';
import AddFormScreen from './src/screens/AddFormScreen';

type Screen = 'list' | 'detail' | 'add';

export default function App() {
  const [screen, setScreen] = useState<Screen>('list');
  const [selectedSae, setSelectedSae] = useState<Sae | null>(null);

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="dark" />
      {screen === 'list' && (
        <ListScreen
          onSelectSae={(sae) => {
            setSelectedSae(sae);
            setScreen('detail');
          }}
          onAddPress={() => setScreen('add')}
        />
      )}
      {screen === 'detail' && selectedSae && (
        <DetailScreen
          sae={selectedSae}
          onBack={() => {
            setSelectedSae(null);
            setScreen('list');
          }}
        />
      )}
      {screen === 'add' && (
        <AddFormScreen
          onSuccess={() => setScreen('list')}
          onCancel={() => setScreen('list')}
        />
      )}
    </View>
  );
}
