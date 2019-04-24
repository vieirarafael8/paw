export interface Reserva {
  title: string;
  content: string;
}

export interface Reserva2 {
  espaco: Espaco;
  user: User;
  estado: boolean;
}

export enum tipo {
  openspace = 1,
  reuniao = 2,
  formacao = 3
}
export enum extras {
  tele = 1,
  correio = 2,
  internet = 3
}

export interface Espaco {
  tipo: tipo;
  secretarias: number;
  pessoas: number;
  extras: extras;
  estado: boolean;
}

export interface User {
    nome: string;
    email: string;
    nif: number;
    morada: string;
}


