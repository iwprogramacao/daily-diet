export class Functions {
  constructor() {}

  formatarPorcentagem(valor: number): string {
    return valor.toString().replace('.', ',').concat('%');
  }
}
