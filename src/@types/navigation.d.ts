import { RefeicaoDTO } from 'src/interfaces/RefeicaoDTO';

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      refeicoes: undefined;
      cadastroRefeicoes: {
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
