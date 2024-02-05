import AsyncStorage from '@react-native-async-storage/async-storage';
import { REFEICOES_COLLECTION } from '@storage/storageConfigs';
import { RefeicaoDTO } from 'src/interfaces/RefeicaoDTO';

export async function obterTodasRefeicoes() {
  try {
    const storage = await AsyncStorage.getItem(REFEICOES_COLLECTION);

    const refeicoes: RefeicaoDTO[] = storage ? JSON.parse(storage) : [];
    for (const refeicao of refeicoes) {
      refeicao.data = new Date(refeicao.data);
      refeicao.hora = new Date(refeicao.hora);
    }
    return refeicoes;
  } catch (error) {
    throw error;
  }
}
