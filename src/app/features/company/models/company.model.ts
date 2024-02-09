import { Address } from 'src/app/shared/models/address.model';
import { LocalParams } from 'src/app/shared/models/local-params.model';

export interface Company {
  id?: number;
  name: string;
  vat: string;
  address: Address;
  inactive: boolean;
}

export interface CompanyWithLocalParams extends Company, LocalParams {}
