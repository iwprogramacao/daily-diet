import React from 'react';
import { ActivityIndicator, StatusBar } from 'react-native';
import {
  NunitoSans_400Regular,
  NunitoSans_700Bold,
  useFonts,
} from '@expo-google-fonts/nunito-sans';
import { ThemeProvider } from 'styled-components';
import theme from './src/theme';
import { Refeicoes } from '@screens/Refeicoes';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Estatisticas } from '@screens/Estatisticas';
import { CadastroRefeicao } from '@screens/CadastroRefeicao';
import { Feedback } from '@screens/Feedback';

export default function App() {
  const [fontsLoaded] = useFonts({ NunitoSans_400Regular, NunitoSans_700Bold });
  return (
    <ThemeProvider theme={theme}>
      <SafeAreaProvider>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent
        />
        {fontsLoaded ? <Feedback /> : <ActivityIndicator />}
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
