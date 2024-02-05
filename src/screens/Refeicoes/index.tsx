import React, { useCallback, useEffect, useState } from 'react';
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
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { obterTodasRefeicoes } from '@storage/refeicao/obterTodasRefeicoes';

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
  const [refeicoes, setRefeicoes] = useState<RefeicaoDTO[]>([]);
  const [estatisticas, setEstatisticas] = useState<EstatisticasProps>({
    porcentagemDentroDaDieta: 0,
    refeicoesDentroDaDieta: 0,
    refeicoesForaDaDieta: 0,
    refeicoesRegistradas: 0,
    sequenciaDentroDaDieta: 0,
  });
  const [data, setData] = useState<SectionListProps[]>([]);

  function preencherSectionList(datas: Date[], refeicoes: RefeicaoDTO[]) {
    const DATA: SectionListProps[] = [];

    for (const data of datas) {
      const refeicoesNaData = refeicoes.filter((refeicao) => {
        const dataSemHorario = new Date(
          data.getFullYear(),
          data.getMonth(),
          data.getDate()
        );
        const dataRefeicaoSemHorario = new Date(
          refeicao.data.getFullYear(),
          refeicao.data.getMonth(),
          refeicao.data.getDate()
        );
        return (
          dataSemHorario.toISOString() == dataRefeicaoSemHorario.toISOString()
        );
      });

      DATA.push({
        title: data.toLocaleDateString('pt-br'),
        data: refeicoesNaData,
      });
    }
    setData(DATA);
  }
  function handleGoToEstatisticas() {
    navigation.navigate('estatisticas', { ...estatisticas });
  }
  function handleGoToCadastroRefeicao() {
    navigation.navigate('cadastroRefeicao', {});
  }
  function handleGoToDescricao(refeicao: RefeicaoDTO) {
    navigation.navigate('detalhamentoRefeicao', { refeicao });
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
  async function handleGetRefeicoes() {
    await getRefeicoes();
  }
  async function getRefeicoes() {
    try {
      const refeicoes = await obterTodasRefeicoes();
      setRefeicoes(refeicoes);

      const datasDistintasSet = new Set();

      const datasDistintas = refeicoes
        .filter((refeicao) => {
          const dataSemHorario = new Date(
            refeicao.data.getFullYear(),
            refeicao.data.getMonth(),
            refeicao.data.getDate()
          );
          const dataString = dataSemHorario.toISOString(); // Converte para string para garantir a comparação

          if (!datasDistintasSet.has(dataString)) {
            datasDistintasSet.add(dataString);
            return true;
          }
          return false;
        })
        .map((item) => item.data);

      preencherSectionList(datasDistintas, refeicoes);
    } catch (error) {
      console.error(error);
    }
  }

  useFocusEffect(
    useCallback(() => {
      handleGetRefeicoes();
      gerarEstatisticas();
    }, [])
  );

  return (
    <Container>
      <Logo source={logo} />
      <StatisticsCard
        percentage={functions.formatarPorcentagem(
          estatisticas.porcentagemDentroDaDieta
        )}
        onPress={handleGoToEstatisticas}
      />
      <ButtonTitle>Refeições</ButtonTitle>
      <Button
        icon="add"
        title="Nova refeição"
        onPress={handleGoToCadastroRefeicao}
      />

      <SectionList
        sections={data}
        keyExtractor={(item, index) => item.hora.toString() + index}
        contentContainerStyle={data.length !== 0 ? { gap: 9 } : { flex: 1 }}
        renderItem={({ item }) => (
          <RefeicaoCard
            hora={functions.converterHoraMinuto(item.hora.toLocaleTimeString())}
            refeicao={item.nome}
            isDentroDaDieta={item.isDentroDaDieta}
            onPress={() => handleGoToDescricao(item)}
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
