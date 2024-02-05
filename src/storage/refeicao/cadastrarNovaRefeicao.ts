import { RefeicaoDTO } from 'src/interfaces/RefeicaoDTO';
import { obterTodasRefeicoes } from './obterTodasRefeicoes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { REFEICOES_COLLECTION } from '@storage/storageConfigs';

export async function cadastrarNovaRefeicao(novaRefeicao: RefeicaoDTO) {
  try {
    const storedRefeicoes = await obterTodasRefeicoes();

    storedRefeicoes.push(novaRefeicao); // Adiciona a nova refeição na lista
    storedRefeicoes.sort(compararDatas); // Ordena as refeições por data decrescente

    const storage = JSON.stringify(storedRefeicoes);

    await AsyncStorage.setItem(REFEICOES_COLLECTION, storage);
  } catch (error) {
    throw error;
  }
}

/*
  Organiza a lista de RefeicaoDTO da maior data para a menor
*/
function compararDatas(a: RefeicaoDTO, b: RefeicaoDTO) {
  // Comparação com base na data (da maior para a menor)
  const dataA = a.data.getTime();
  const dataB = b.data.getTime();
  if (dataA > dataB) {
    return -1;
  } else if (dataA < dataB) {
    return 1;
  }

  // Se as datas são iguais, compara apenas as horas e minutos
  const horaMinutoA = a.hora.getHours() * 60 + a.hora.getMinutes();
  const horaMinutoB = b.hora.getHours() * 60 + b.hora.getMinutes();
  return horaMinutoB - horaMinutoA;
}
