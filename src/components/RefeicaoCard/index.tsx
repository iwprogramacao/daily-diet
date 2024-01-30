import React from 'react';
import { Container, DietaIndicator, Hora, Refeicao, Separator } from './styles';

type Props = {
  hora: string;
  refeicao: string;
  isDentroDaDieta: boolean;
};
export function RefeicaoCard({ hora, refeicao, isDentroDaDieta }: Props) {
  return (
    <Container>
      <Hora>{hora}</Hora>
      <Separator></Separator>
      <Refeicao numberOfLines={1} ellipsizeMode="tail">
        {refeicao}
      </Refeicao>
      <DietaIndicator isDentroDaDieta={isDentroDaDieta} />
    </Container>
  );
}
