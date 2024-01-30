import React, { useState } from 'react';
import { ButtonTitle, Container, Logo } from './styles';
import logo from '@assets/logo.png';
import { StatisticsCard } from '@components/StatisticsCard';
import { Button } from '@components/Button';
import { SectionList } from 'react-native';
import { RefeicaoCard } from '@components/RefeicaoCard';
import { DietaContainerTitle } from '@components/RefeicaoCard/styles';

type RefeicoesDTO = {
  hora: string;
  refeicao: string;
  isDentroDaDieta: boolean;
};
type DietaDTO = {
  dataFormatada: string;
  refeicoes: RefeicoesDTO[];
};
type SectionListProps = {
  title: string;
  data: RefeicoesDTO[];
};

export function Refeicoes() {
  const [dietas, setDietas] = useState<DietaDTO[]>([
    {
      dataFormatada: '12.08.22',
      refeicoes: [
        { hora: '20:00', refeicao: 'X-tudo', isDentroDaDieta: false },
        { hora: '20:00', refeicao: 'Whey protein', isDentroDaDieta: true },
        {
          hora: '20:00',
          refeicao: 'Salada cesar com frango desfiado',
          isDentroDaDieta: true,
        },
        {
          hora: '20:00',
          refeicao: 'Vitamina de banana com doce de leite',
          isDentroDaDieta: true,
        },
      ],
    },
    {
      dataFormatada: '12.08.22',
      refeicoes: [{ hora: '20:00', refeicao: 'X-tudo', isDentroDaDieta: true }],
    },
    {
      dataFormatada: '12.08.22',
      refeicoes: [{ hora: '20:00', refeicao: 'X-tudo', isDentroDaDieta: true }],
    },
  ]);

  const DATA: SectionListProps[] = [];
  for (const dieta of dietas) {
    DATA.push({ title: dieta.dataFormatada, data: dieta.refeicoes });
  }
  function formatarPorcentagem(valor: number): string {
    return valor.toString().replace('.', ',').concat('%');
  }

  return (
    <Container>
      <Logo source={logo} />
      <StatisticsCard percentage={formatarPorcentagem(90.86)} />
      <ButtonTitle>Refeições</ButtonTitle>
      <Button icon="add" title="Nova refeição" />

      <SectionList
        sections={DATA}
        keyExtractor={(item, index) => item.hora + index}
        contentContainerStyle={{ gap: 9 }}
        renderItem={({ item }) => (
          <RefeicaoCard
            hora={item.hora}
            refeicao={item.refeicao}
            isDentroDaDieta={item.isDentroDaDieta}
          />
        )}
        renderSectionHeader={({ section: { title } }) => (
          <DietaContainerTitle>{title}</DietaContainerTitle>
        )}
      />
    </Container>
  );
}
