import { TipoEspaco } from '../enums/tipoEspaco';
import { EstadoEspaco } from '../enums/estadoEspaco';

export class Espaco {
  id: string;
  tipoEspaco: TipoEspaco;
  numComp: number;
  numOpenspace: number;
  numSalaReuniao: number;
  numSalaFormacao: number;
  estadoEspaco: EstadoEspaco;
  creator: string;
  taxaSecretaria: number;
  taxaTele: number;
  taxaCorreio: number;
  taxaInternet: number;
  taxaReuniao: number;
  taxaFormacao: number;
}


