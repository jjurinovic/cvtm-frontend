import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from 'src/app/features/users/models/user.model';

@Component({
  selector: 'app-project-users',
  templateUrl: './project-users.component.html',
  styleUrl: './project-users.component.scss',
})
export class ProjectUsersComponent {
  @Input({ required: true }) users: User[] = [];
  displayedColumns = ['first_name', 'last_name', 'actions'];

  @Output() removeUser: EventEmitter<number> = new EventEmitter();
}
