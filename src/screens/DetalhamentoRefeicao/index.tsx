import React from 'react';
import {
  Container,
  Content,
  Description,
  HeaderCard,
  HeaderTitle,
  Indicator,
  SetaEsquerda,
  Subtitle,
  Tag,
  TagDescription,
  Title,
} from './styles';
import { View } from 'react-native';
import { Button } from '@components/Button';

export function DetalhamentoRefeicao() {
  return (
    <Container>
      <HeaderCard type="PRIMARY">
        <SetaEsquerda type="PRIMARY" />
        <HeaderTitle>Refeição</HeaderTitle>
      </HeaderCard>
      <Content>
        <Title>Sanduíche</Title>
        <Description>
          Sanduíche de pão integral com atum e salada de alface e tomate
        </Description>
        <Subtitle>Data e hora</Subtitle>
        <Description>12/01/2024 às 16:00</Description>
        <Tag>
          <Indicator type="PRIMARY" />
          <TagDescription>dentro da dieta</TagDescription>
        </Tag>
      </Content>
      <View
        style={{ flex: 1, justifyContent: 'flex-end', padding: 24, gap: 6 }}
      >
        <Button title="Editar refeição" icon="edit" />
        <Button title="Excluir refeição" icon="delete" type="SECONDARY" />
      </View>
    </Container>
  );
}
