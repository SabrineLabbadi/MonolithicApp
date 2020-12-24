import { Moment } from 'moment';

export interface ICustomer {
  id?: number;
  dob?: Moment;
  address?: string;
  firstName?: string;
  lastName?: string;
  concertName?: string;
  concertId?: number;
}

export class Customer implements ICustomer {
  constructor(
    public id?: number,
    public dob?: Moment,
    public address?: string,
    public firstName?: string,
    public lastName?: string,
    public concertName?: string,
    public concertId?: number
  ) {}
}
