import { User } from 'src/app/features/users/models/user.model';

export interface AuthResponse {
  access_token: string;
  user: User;
}
