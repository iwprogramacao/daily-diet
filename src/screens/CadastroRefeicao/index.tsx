import React, { useState } from 'react';
import {
  Container,
  Content,
  HeaderCard,
  HeaderTitle,
  InputText,
  InputTitle,
  LargeInputText,
  SetaEsquerda,
  SidedInputs,
} from './styles';
import { TouchableOpacity, View } from 'react-native';

export function CadastroRefeicao() {
  const [data, setData] = useState<Date>(new Date());
  const [hora, setHora] = useState<Date>(new Date());

  return (
    <Container>
      <HeaderCard>
        <TouchableOpacity>
          <SetaEsquerda />
        </TouchableOpacity>
        <HeaderTitle>Nova refeição</HeaderTitle>
      </HeaderCard>
      <Content>
        <InputTitle>Nome</InputTitle>
        <InputText />
        <InputTitle>Descrição</InputTitle>
        <LargeInputText numberOfLines={4} multiline />

        <SidedInputs>
          <View style={{ width: '48.6%' }}>
            <InputTitle>Data</InputTitle>
          </View>
          <View style={{ width: '48.6%' }}>
            <InputTitle>Hora</InputTitle>
          </View>
        </SidedInputs>
      </Content>
    </Container>
  );
}
