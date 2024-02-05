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
import { Alert, TouchableOpacity, View } from 'react-native';
import { Button } from '@components/Button';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RefeicaoDTO } from 'src/interfaces/RefeicaoDTO';
import { Functions } from 'src/Utils/Functions';
import { excluirRefeicao } from '@storage/refeicao/excluirRefeicao';

type RouteParams = {
  refeicao: RefeicaoDTO;
};
export function DetalhamentoRefeicao() {
  const functions = new Functions();
  const route = useRoute();
  const { refeicao } = route.params as RouteParams;
  const navigation = useNavigation();

  function handleEditarRefeicao() {
    console.log(refeicao);
    navigation.navigate('cadastroRefeicao', { refeicao });
  }

  async function handleExcluirRefeicao() {
    if (await excluirRefeicao(refeicao)) {
      Alert.alert('Refeição', 'Refeição excluída com sucesso.');
      navigation.navigate('refeicoes');
    } else {
      Alert.alert('Refeição', 'Não foi possível excluir a refeição.');
      navigation.navigate('refeicoes');
    }
  }
  function handleGoToRefeicoes() {
    navigation.navigate('refeicoes');
  }
  return (
    <Container>
      <HeaderCard type="PRIMARY">
        <TouchableOpacity onPress={handleGoToRefeicoes}>
          <SetaEsquerda type="PRIMARY" />
        </TouchableOpacity>
        <HeaderTitle>Refeição</HeaderTitle>
      </HeaderCard>
      <Content>
        <Title>{refeicao.nome}</Title>
        <Description>{refeicao.descricao}</Description>
        <Subtitle>Data e hora</Subtitle>
        <Description>
          {refeicao.data.toLocaleDateString('pt-br')} às{' '}
          {functions.converterHoraMinuto(
            refeicao.hora.toLocaleTimeString('pt-br')
          )}
        </Description>
        <Tag>
          <Indicator
            type={refeicao.isDentroDaDieta ? 'PRIMARY' : 'SECONDARY'}
          />
          <TagDescription>
            {refeicao.isDentroDaDieta ? 'Dentro' : 'Fora'} da dieta
          </TagDescription>
        </Tag>
      </Content>
      <View
        style={{ flex: 1, justifyContent: 'flex-end', padding: 24, gap: 6 }}
      >
        <Button
          title="Editar refeição"
          icon="edit"
          onPress={handleEditarRefeicao}
        />
        <Button
          title="Excluir refeição"
          icon="delete"
          type="SECONDARY"
          onPress={handleExcluirRefeicao}
        />
      </View>
    </Container>
  );
}
