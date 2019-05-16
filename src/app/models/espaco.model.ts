import { TipoEspaco } from '../enums/tipoEspaco';
import { EstadoEspaco } from '../enums/estadoEspaco';

export class Espaco {
  id: string;
  numSecretOpenSpace: number;
  numSalaReuniao: number;
  numSalaFormacao: number;
  estadoEspaco: EstadoEspaco;
  taxaSecretaria: number;
  taxaTele: number;
  taxaCorreio: number;
  taxaInternet: number;
  taxaReuniao: number;
  taxaFormacao: number;
}


