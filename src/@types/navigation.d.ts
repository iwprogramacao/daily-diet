import { RefeicaoDTO } from "src/interfaces/RefeicaoDTO";

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      refeicoes: undefined;
      new: undefined;
      estatisticas: {
        sequenciaDentroDaDieta: string;
        refeicoesRegistradas: string;
        refeicoesDentroDaDieta: string;
        refeicoesForaDaDieta: string;
      };
      editar: RefeicaoDTO;
    }
  }
}
