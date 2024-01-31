import { RefeicaoDTO } from 'src/interfaces/RefeicaoDTO';

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      refeicoes: undefined;
      cadastroRefeicoes: {
        refeicao: RefeicaoDTO;
      };
      detalhamentoRefeicao: {
        refeicao: RefeicaoDTO;
      };
      feedback: {
        isDentroDaDieta: boolean;
      };
      estatisticas: {
        sequenciaDentroDaDieta: string;
        refeicoesRegistradas: string;
        refeicoesDentroDaDieta: string;
        refeicoesForaDaDieta: string;
      };
    }
  }
}
