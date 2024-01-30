export class Functions {
  constructor() {}

  formatarPorcentagem(valor: number): string {
    return valor.toString().replace('.', ',').concat('%');
  }

  converterHoraMinuto(hora: string): string {
    const partes = hora.split(':');
    const horaAndMinuto = partes.slice(0, 2).join(':');
    return horaAndMinuto;
  }
}
