import { User } from './User.model';

export class Card {
  id!: number;
  name!: string;
  number!: string;
  cvv!: string;
  expirationDate!: string;
  issuer!: string;
  user!: User;
}
