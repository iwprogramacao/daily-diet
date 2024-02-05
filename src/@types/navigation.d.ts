import { RefeicaoDTO } from 'src/interfaces/RefeicaoDTO';

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      refeicoes: undefined;
      cadastroRefeicao: {
        refeicao?: RefeicaoDTO;
      };
      detalhamentoRefeicao: {
        refeicao: RefeicaoDTO;
      };
      feedback: {
        isDentroDaDieta: boolean;
      };
      estatisticas: {
        porcentagemDentroDaDieta: number;
        sequenciaDentroDaDieta: number;
        refeicoesRegistradas: number;
        refeicoesDentroDaDieta: number;
        refeicoesForaDaDieta: number;
      };
    }
  }
}
