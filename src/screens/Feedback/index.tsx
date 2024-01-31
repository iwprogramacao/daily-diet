import React from 'react';
import { BoldSubtitle, Container, Image, Subtitle, Title } from './styles';
import feedbackNegativo from '@assets/feedbackNegativo.png';
import feedbackPositivo from '@assets/feedbackPositivo.png';
import { Button } from '@components/Button';

type Props = {
  isDentroDaDieta: boolean;
};
export function Feedback({ isDentroDaDieta }: Props) {
  return (
    <Container>
      <Title type={isDentroDaDieta ? 'PRIMARY' : 'SECONDARY'}>
        {isDentroDaDieta ? 'Continue assim!' : 'Que pena!'}
      </Title>
      <Subtitle>
        {isDentroDaDieta ? 'Você continua' : 'Você'}{' '}
        <BoldSubtitle>
          {isDentroDaDieta ? 'dentro' : 'fora'} da dieta
        </BoldSubtitle>
        .{' '}
        {isDentroDaDieta
          ? 'Muito bem!'
          : 'dessa vez, mas continue se esforçando e não desista!'}
      </Subtitle>
      <Image source={isDentroDaDieta ? feedbackPositivo : feedbackNegativo} />
      <Button title="Ir para a página inicial" />
    </Container>
  );
}
