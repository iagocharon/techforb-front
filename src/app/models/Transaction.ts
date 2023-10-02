import { User } from './User.model';

export class Transaction {
  id!: number;
  origin!: User;
  target!: User;
  type!: string;
  date!: Date;
  amount!: number;
}
