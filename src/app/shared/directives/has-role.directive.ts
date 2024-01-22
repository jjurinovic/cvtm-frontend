import { Directive, ElementRef, Input, OnInit } from '@angular/core';
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

  constructor(private elementRef: ElementRef, private _auth: AuthService) {}

  ngOnInit(): void {
    this.elementRef.nativeElement.style.display = this.checkRole();
  }

  private checkRole(): string {
    return this._auth.getRole() <= this.role ? 'block' : 'none';
  }
}
