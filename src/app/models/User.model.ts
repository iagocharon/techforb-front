import { Card } from './Card.model';
import { Transaction } from './Transaction';

export class User {
  id!: number;
  username!: string;
  password!: string;
  name!: string;
  email!: string;
  phone!: string;
  dni!: string;
  balance!: number;
  incomingTransactions!: Transaction[];
  outgoingTransactions!: Transaction[];
  cards!: Card[];
}
