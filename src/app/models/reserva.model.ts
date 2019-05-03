
import { TipoEspaco } from '../enums/tipoEspaco';

export class Reserva {

  tipoEspaco: TipoEspaco;
  numComp: number;
  dataInicio: Date;
  dataFim: Date;
  tele: boolean;
  correio: boolean;
  internet: boolean;
}



