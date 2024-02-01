import React, { useState } from 'react';
import { ButtonTitle, Container, Logo } from './styles';
import logo from '@assets/logo.png';
import { StatisticsCard } from '@components/StatisticsCard';
import { Button } from '@components/Button';
import { SectionList } from 'react-native';
import { RefeicaoCard } from '@components/RefeicaoCard';
import { DietaContainerTitle } from '@components/RefeicaoCard/styles';
import { Functions } from '../../Utils/Functions';
import { RefeicaoDTO } from 'src/interfaces/RefeicaoDTO';
import { ListEmpty } from '@components/ListEmpty';
import { useNavigation } from '@react-navigation/native';

type DietaDTO = {
  dataFormatada: string;
  refeicoes: RefeicaoDTO[];
};
type SectionListProps = {
  title: string;
  data: RefeicaoDTO[];
};
type EstatisticasProps = {
  porcentagemDentroDaDieta: number;
  sequenciaDentroDaDieta: number;
  refeicoesRegistradas: number;
  refeicoesDentroDaDieta: number;
  refeicoesForaDaDieta: number;
};

export function Refeicoes() {
  const functions = new Functions();
  const navigation = useNavigation();

  const [dietas, setDietas] = useState<DietaDTO[]>([]);
  const [estatisticas, setEstatisticas] = useState<EstatisticasProps>({
    porcentagemDentroDaDieta: 0,
    refeicoesDentroDaDieta: 0,
    refeicoesForaDaDieta: 0,
    refeicoesRegistradas: 0,
    sequenciaDentroDaDieta: 0,
  });

  const DATA: SectionListProps[] = [];

  function preencherSectionList() {
    for (const dieta of dietas) {
      DATA.push({ title: dieta.dataFormatada, data: dieta.refeicoes });
    }
  }

  function handleGoToEstatisticas() {
    navigation.navigate('estatisticas', { ...estatisticas });
  }

  function handleGoToCadastroRefeicao() {
    navigation.navigate('cadastroRefeicoes', {});
  }

  function gerarEstatisticas() {
    const stats: EstatisticasProps = {
      porcentagemDentroDaDieta: 0,
      refeicoesDentroDaDieta: 0,
      refeicoesForaDaDieta: 0,
      refeicoesRegistradas: 0,
      sequenciaDentroDaDieta: 0,
    };

    stats.porcentagemDentroDaDieta =
      calcularPorcentagemRefeicoesNaDieta(dietas);

    for (const dieta of dietas) {
      stats.refeicoesDentroDaDieta += dieta.refeicoes.filter(
        (dieta) => dieta.isDentroDaDieta
      ).length;

      stats.refeicoesForaDaDieta += dieta.refeicoes.filter(
        (dieta) => !dieta.isDentroDaDieta
      ).length;

      stats.refeicoesRegistradas += dieta.refeicoes.length;
    }

    stats.sequenciaDentroDaDieta = encontrarMaiorSequenciaEmDietas(dietas);

    setEstatisticas(stats);
  }
  function encontrarMaiorSequencia(dieta: DietaDTO): number {
    let maiorSequenciaAtual = 0;
    let maiorSequenciaTotal = 0;

    for (const refeicao of dieta.refeicoes) {
      if (refeicao.isDentroDaDieta) {
        maiorSequenciaAtual++;
        maiorSequenciaTotal = Math.max(
          maiorSequenciaTotal,
          maiorSequenciaAtual
        );
      } else {
        maiorSequenciaAtual = 0;
      }
    }

    return maiorSequenciaTotal;
  }
  function encontrarMaiorSequenciaEmDietas(dietas: DietaDTO[]): number {
    let maiorSequenciaGlobal = 0;

    for (const dieta of dietas) {
      const maiorSequenciaDieta = encontrarMaiorSequencia(dieta);
      maiorSequenciaGlobal = Math.max(
        maiorSequenciaGlobal,
        maiorSequenciaDieta
      );
    }

    return maiorSequenciaGlobal;
  }
  function calcularPorcentagemRefeicoesNaDieta(dietas: DietaDTO[]): number {
    let totalRefeicoes = 0;
    let refeicoesNaDieta = 0;

    // Iterar sobre as dietas e refeições
    dietas.forEach((dieta) => {
      totalRefeicoes += dieta.refeicoes.length;
      dieta.refeicoes.forEach((refeicao) => {
        if (refeicao.isDentroDaDieta) {
          refeicoesNaDieta++;
        }
      });
    });

    // Calcular a porcentagem
    if (totalRefeicoes === 0) {
      return 0; // Evitar divisão por zero
    }

    return (refeicoesNaDieta / totalRefeicoes) * 100;
  }

  return (
    <Container>
      <Logo source={logo} />
      <StatisticsCard
        percentage={functions.formatarPorcentagem(90.86)}
        onPress={handleGoToEstatisticas}
      />
      <ButtonTitle>Refeições</ButtonTitle>
      <Button icon="add" title="Nova refeição" />

      <SectionList
        sections={DATA}
        keyExtractor={(item, index) => item.hora.toString() + index}
        contentContainerStyle={DATA.length !== 0 ? { gap: 9 } : { flex: 1 }}
        renderItem={({ item }) => (
          <RefeicaoCard
            hora={item.hora.toLocaleTimeString()}
            refeicao={item.nome}
            isDentroDaDieta={item.isDentroDaDieta}
          />
        )}
        renderSectionHeader={({ section: { title } }) => (
          <DietaContainerTitle>{title}</DietaContainerTitle>
        )}
        ListEmptyComponent={<ListEmpty />}
      />
    </Container>
  );
}
