import { IPersona } from "./IPersona";

export interface IEquipo {
  id: number;
  nombre?: string;
  orden?: number;
  detalles?: string;
  division_id?: number,
  dt? : number
  d1?: number,
  d2?: number,
  escudo?: string,
  jugadores? : IPersona[],
  division? : number,
  readonly value: string
  readonly label: string
}
