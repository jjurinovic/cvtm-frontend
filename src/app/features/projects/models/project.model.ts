import { User } from '../../users/models/user.model';

export interface Project {
  start_date: string;
  end_date: string;
  estimated_date: string;
  company_id: number;
  name: string;
  description: string;
  id: number;
  users: User[];
  active: boolean;
  created_date: string;
  updated_date: string;
  updated_by: number;
}
