import { Address } from 'src/app/shared/models/address';

export interface Company {
  id: number;
  name: string;
  vat: string;
  address: Address;
}
