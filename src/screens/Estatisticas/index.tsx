import React from 'react';
import {
  Card,
  CardSubtitle,
  CardTitle,
  Container,
  Content,
  HeaderCard,
  Percentage,
  SetaEsquerda,
  SidedCards,
  Subtitle,
  Texto,
} from './styles';
import { TouchableOpacity } from 'react-native';
import { Functions } from 'src/Utils/Functions';

type Props = {
  type?: 'PRIMARY' | 'SECONDARY';
};
export function Estatisticas({ type = 'PRIMARY' }: Props) {
  const functions = new Functions();
  return (
    <Container type={type}>
      <HeaderCard type={type}>
        <TouchableOpacity>
          <SetaEsquerda type={type} size={24} />
          <Percentage>{functions.formatarPorcentagem(90.86)}</Percentage>
          <Subtitle>das refeições dentro da dieta</Subtitle>
        </TouchableOpacity>
      </HeaderCard>
      <Content>
        <Texto>Estatísticas gerais</Texto>

        <Card type="NEUTRAL">
          <CardTitle>22</CardTitle>
          <CardSubtitle>
            melhor sequência de pratos dentro da dieta
          </CardSubtitle>
        </Card>
        <Card type="NEUTRAL">
          <CardTitle>109</CardTitle>
          <CardSubtitle>refeições registradas</CardSubtitle>
        </Card>
        <SidedCards>
          <Card type="PRIMARY">
            <CardTitle>99</CardTitle>
            <CardSubtitle>refeições dentro da dieta</CardSubtitle>
          </Card>
          <Card type="SECONDARY">
            <CardTitle>10</CardTitle>
            <CardSubtitle>refeições fora da dieta</CardSubtitle>
          </Card>
        </SidedCards>
      </Content>
    </Container>
  );
}
