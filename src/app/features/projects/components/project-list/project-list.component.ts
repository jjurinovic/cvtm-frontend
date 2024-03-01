import { Component, ElementRef, ViewChild } from '@angular/core';

import { Store } from '@ngrx/store';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  fromEvent,
  tap,
} from 'rxjs';

import { Project } from '../../models/project.model';
import { PageFilter } from 'src/app/shared/models/page-filter.model';
import {
  selectProjects,
  selectProjectsPageFilter,
} from '../../state/projects.selectors';
import { AuthService } from 'src/app/core/services/auth.service';
import { Role } from 'src/app/features/users/enums/role.enum';
import { selectCompanyId } from 'src/app/features/company/state/company.selectors';
import * as ProjectActions from '../../state/projects.actions';
import { SortDirection } from '@angular/material/sort';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.scss',
})
export class ProjectListComponent {
  displayedColumns: string[] = [
    'name',
    'description',
    'start_date',
    'end_date',
    'estimated_date',
    'active',
    'action',
  ];
  projects: Project[] = [];
  pageFilter: PageFilter = {
    page: 1,
    size: 10,
    total: 0,
    sort: null,
    sort_field: null,
    q: null,
  };
  private debounceTime = 500;

  companyId!: number;
  @ViewChild('input') input?: ElementRef;

  constructor(private store: Store, private _auth: AuthService) {}

  ngOnInit(): void {
    this.store.select(selectProjects).subscribe((data) => {
      this.projects = data;
    });

    this.store
      .select(selectProjectsPageFilter)
      .subscribe((pageFilter) => (this.pageFilter = { ...pageFilter }));

    if (this._auth.getRole() === Role.ROOT) {
      this.store.select(selectCompanyId).subscribe((companyId) => {
        if (companyId) {
          this.companyId = companyId;
          this.getData();
        }
      });
    } else {
      this.getData();
    }
  }

  ngAfterViewInit() {
    fromEvent(this.input?.nativeElement, 'keyup')
      .pipe(
        filter(Boolean),
        debounceTime(this.debounceTime),
        distinctUntilChanged(),
        tap(() => {
          this.pageFilter.q = this.input?.nativeElement.value;
          this.getData();
        })
      )
      .subscribe();
  }

  getData(): void {
    this.store.dispatch(
      ProjectActions.getAllProjects({
        payload: {
          companyId: this.companyId,
          ...this.pageFilter,
        },
      })
    );
  }

  /** Page change */
  pageChange({
    pageIndex,
    pageSize,
  }: {
    pageIndex: number;
    pageSize: number;
  }): void {
    this.pageFilter.page = pageIndex + 1;
    this.pageFilter.size = pageSize;
    this.getData();
  }

  /** On sort */
  onSort({ active, direction }: { active: string; direction: string }): void {
    this.pageFilter.sort = direction;
    this.pageFilter.sort_field = active;
    this.getData();
  }

  getSortField(): string {
    return this.pageFilter.sort_field || '';
  }

  getSort(): SortDirection {
    return (this.pageFilter.sort as SortDirection) || '';
  }

  clearSearch(): void {
    this.pageFilter.q = null;
    this.getData();
  }
}
