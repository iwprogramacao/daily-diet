import React from 'react';
import { Container, DietaIndicator, Hora, Refeicao, Separator } from './styles';
import { TouchableOpacityProps } from 'react-native';

type Props = TouchableOpacityProps & {
  hora: string;
  refeicao: string;
  isDentroDaDieta: boolean;
};
export function RefeicaoCard({
  hora,
  refeicao,
  isDentroDaDieta,
  ...rest
}: Props) {
  return (
    <Container {...rest}>
      <Hora>{hora}</Hora>
      <Separator></Separator>
      <Refeicao numberOfLines={1} ellipsizeMode="tail">
        {refeicao}
      </Refeicao>
      <DietaIndicator isDentroDaDieta={isDentroDaDieta} />
    </Container>
  );
}
