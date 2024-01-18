import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { logout } from '../../../state/auth/auth.actions';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrl: './base.component.scss',
})
export class BaseComponent {
  constructor(private _auth: AuthService) {}

  logout(): void {
    this._auth.logout();
  }
}
