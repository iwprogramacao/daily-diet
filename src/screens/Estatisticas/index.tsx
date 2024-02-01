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
import { useNavigation, useRoute } from '@react-navigation/native';

type Props = {
  type?: 'PRIMARY' | 'SECONDARY';
};
type RouteParams = {
  porcentagemDentroDaDieta: number;
  sequenciaDentroDaDieta: number;
  refeicoesRegistradas: number;
  refeicoesDentroDaDieta: number;
  refeicoesForaDaDieta: number;
};
export function Estatisticas({ type = 'PRIMARY' }: Props) {
  const functions = new Functions();
  const route = useRoute();
  const navigation = useNavigation();
  const estatisticas = route.params as RouteParams;

  function handleGoToRefeicoes() {
    navigation.navigate('refeicoes');
  }
  return (
    <Container type={type}>
      <HeaderCard type={type}>
        <TouchableOpacity onPress={handleGoToRefeicoes}>
          <SetaEsquerda type={type} size={24} />
          <Percentage>
            {functions.formatarPorcentagem(
              estatisticas.porcentagemDentroDaDieta
            )}
          </Percentage>
          <Subtitle>das refeições dentro da dieta</Subtitle>
        </TouchableOpacity>
      </HeaderCard>
      <Content>
        <Texto>Estatísticas gerais</Texto>

        <Card type="NEUTRAL">
          <CardTitle>{estatisticas.refeicoesDentroDaDieta}</CardTitle>
          <CardSubtitle>
            melhor sequência de pratos dentro da dieta
          </CardSubtitle>
        </Card>
        <Card type="NEUTRAL">
          <CardTitle>{estatisticas.refeicoesRegistradas}</CardTitle>
          <CardSubtitle>refeições registradas</CardSubtitle>
        </Card>
        <SidedCards>
          <Card type="PRIMARY">
            <CardTitle>{estatisticas.refeicoesDentroDaDieta}</CardTitle>
            <CardSubtitle>refeições dentro da dieta</CardSubtitle>
          </Card>
          <Card type="SECONDARY">
            <CardTitle>{estatisticas.refeicoesForaDaDieta}</CardTitle>
            <CardSubtitle>refeições fora da dieta</CardSubtitle>
          </Card>
        </SidedCards>
      </Content>
    </Container>
  );
}
