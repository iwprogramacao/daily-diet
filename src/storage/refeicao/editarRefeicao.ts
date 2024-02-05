import AsyncStorage from '@react-native-async-storage/async-storage';
import { REFEICOES_COLLECTION } from '@storage/storageConfigs';
import { RefeicaoDTO } from 'src/interfaces/RefeicaoDTO';
import { obterTodasRefeicoes } from './obterTodasRefeicoes';

export async function editarRefeicao(
  refeicaoParaEditar: RefeicaoDTO,
  refeicaoEditada: RefeicaoDTO
) {
  try {
    const storedRefeicoes = await obterTodasRefeicoes();

    let refeicoes = storedRefeicoes.filter(
      (refeicao) =>
        refeicao.data !== refeicaoParaEditar.data &&
        refeicao.hora !== refeicaoParaEditar.hora &&
        refeicao.descricao !== refeicaoParaEditar.descricao
    );

    refeicoes.push(refeicaoEditada);

    await AsyncStorage.setItem(REFEICOES_COLLECTION, JSON.stringify(refeicoes));
    return true;
  } catch (error) {
    throw error;
  }
}
