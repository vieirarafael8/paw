
import { TipoEspaco } from '../enums/tipoEspaco';
import { Estado } from '../enums/estado';

export class Reserva {
  id: string;
  tipoEspaco: TipoEspaco;
  numComp: number;
  dataInicio: Date;
  dataFim: Date;
  tele: boolean;
  correio: boolean;
  internet: boolean;
  estado: Estado;
  creator: string;
  custo: number;
}



