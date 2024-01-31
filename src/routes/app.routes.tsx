import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CadastroRefeicao } from '@screens/CadastroRefeicao';
import { DetalhamentoRefeicao } from '@screens/DetalhamentoRefeicao';
import { Estatisticas } from '@screens/Estatisticas';
import { Feedback } from '@screens/Feedback';
import { Refeicoes } from '@screens/Refeicoes';
import React from 'react';

// const NativeStack = createNativeStackNavigator();

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="refeicoes" component={Refeicoes} />
      <Screen name="cadastroRefeicao" component={CadastroRefeicao} />
      <Screen name="detalhamentoRefeicao" component={DetalhamentoRefeicao} />
      <Screen name="estatisticas" component={Estatisticas} />
      <Screen name="feedback" component={Feedback} />
    </Navigator>
  );
}
