import { Address } from 'src/app/shared/models/address.model';

export interface Company {
  id?: number;
  name: string;
  vat: string;
  address: Address;
}
