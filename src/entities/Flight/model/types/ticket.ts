import {Flight} from "entities/Flight";

export interface Ticket {
  id: string;
  airline: string;
  price: number;
  flights: Flight[];
}