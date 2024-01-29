import React from 'react';
import { Container, Logo } from './styles';
import logo from '@assets/logo.png';
import { StatisticsCard } from '@components/StatisticsCard';

export function Refeicoes() {
  function formatarPorcentagem(valor: number): string {
    return valor.toString().replace('.', ',').concat('%');
  }
  return (
    <Container>
      <Logo source={logo} />
      <StatisticsCard percentage={formatarPorcentagem(90.86)} />
    </Container>
  );
}
