import {Espaco} from './espaco.model';
import {User} from './user.model';

export interface Reserva {
  title: string;
  content: string;
}

export interface Reserva2 {
  espaco: Espaco;
  user: User;
  estado: boolean;
}



