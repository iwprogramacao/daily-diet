import AsyncStorage from '@react-native-async-storage/async-storage';
import { REFEICOES_COLLECTION } from '@storage/storageConfigs';
import { RefeicaoDTO } from 'src/interfaces/RefeicaoDTO';
import { obterTodasRefeicoes } from './obterTodasRefeicoes';

export async function excluirRefeicao(refeicaoParaDeletar: RefeicaoDTO) {
  try {
    const storedRefeicoes = await obterTodasRefeicoes();

    const refeicoesFiltradas = storedRefeicoes.filter(
      (refeicao) =>
        refeicao.data !== refeicaoParaDeletar.data &&
        refeicao.hora !== refeicaoParaDeletar.hora &&
        refeicao.descricao !== refeicaoParaDeletar.descricao
    );

    await AsyncStorage.setItem(
      REFEICOES_COLLECTION,
      JSON.stringify(refeicoesFiltradas)
    );
    return true;
  } catch (error) {
    throw error;
  }
}
