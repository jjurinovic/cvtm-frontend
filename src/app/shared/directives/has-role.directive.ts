import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Role } from 'src/app/features/users/enums/role.enum';

@Directive({
  selector: '[appHasRole]',
  standalone: true,
})
export class HasRoleDirective implements OnInit {
  @Input() set appHasRole(role: Role | undefined) {
    if (!role && role !== 0) {
      role = Role.USER;
    }
    this.role = role;
  }

  private role: Role = Role.USER;

  constructor(
    private template: TemplateRef<any>,
    private view: ViewContainerRef,
    private _auth: AuthService
  ) {}

  ngOnInit(): void {
    if (this.checkRole()) {
      this.view.createEmbeddedView(this.template);
    } else {
      this.view.clear();
    }
  }

  private checkRole(): boolean {
    return this._auth.getRole() <= this.role;
  }
}
