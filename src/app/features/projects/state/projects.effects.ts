import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError, tap } from 'rxjs/operators';

import { ProjectActionTypes } from './projects.actions';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { ProjectsService } from '../services/projects.service';
import { BaseError } from 'src/app/shared/models/error.model';
import { Project } from '../models/project.model';
import { Router } from '@angular/router';

@Injectable()
export class ProjectEffects {
  getAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectActionTypes.GetAllProjects),
      exhaustMap(({ payload }: any) =>
        this._project.getProjectList(payload).pipe(
          map((data) => ({
            type: ProjectActionTypes.GetAllProjectsSuccess,
            payload: data,
          })),
          catchError(({ error }) =>
            of({
              type: ProjectActionTypes.GetAllProjectsFail,
              payload: error,
            })
          )
        )
      )
    )
  );

  createProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectActionTypes.CreateProject),
      exhaustMap(({ payload }: any) =>
        this._project.createProject(payload).pipe(
          map((data) => ({
            type: ProjectActionTypes.CreateProjectSuccess,
            payload: data,
          })),
          catchError(({ error }: { error: BaseError }) =>
            of({
              type: ProjectActionTypes.CreateProjectFail,
              payload: error,
            })
          )
        )
      )
    )
  );

  createUserSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProjectActionTypes.CreateProjectSuccess),
        tap(({ payload }: { payload: Project }) => {
          this._snackbar.success('Project successfully created!', 10000);
          this.router.navigateByUrl(`projects/${payload.id}/edit`);
        })
      ),
    { dispatch: false }
  );

  updateCompany$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectActionTypes.UpdateProject),
      exhaustMap(({ payload }: any) =>
        this._project.updateProject(payload).pipe(
          map((data) => {
            return {
              type: ProjectActionTypes.UpdateProjectSuccess,
              payload: data,
            };
          }),
          catchError(({ error }) =>
            of({
              type: ProjectActionTypes.UpdateProjectFail,
              payload: error,
            })
          )
        )
      )
    )
  );
  updateProjectSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProjectActionTypes.UpdateProjectSuccess),
        tap(() => {
          this._snackbar.success('Project successfully updated!', 10000);
        })
      ),
    { dispatch: false }
  );

  getProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectActionTypes.GetProject),
      exhaustMap(({ payload }) =>
        this._project.getProject(payload).pipe(
          map((data) => ({
            type: ProjectActionTypes.GetProjectSuccess,
            payload: data,
          })),
          catchError(({ error }) =>
            of({
              type: ProjectActionTypes.GetProjectFail,
              payload: error,
            })
          )
        )
      )
    )
  );

  assignUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectActionTypes.AssignUsers),
      exhaustMap(({ payload }) =>
        this._project.assignUsers(payload).pipe(
          map((data) => ({
            type: ProjectActionTypes.AssignUsersSuccess,
            payload: data,
          })),
          catchError(({ error }) =>
            of({
              type: ProjectActionTypes.AssignUsersFail,
              payload: error,
            })
          )
        )
      )
    )
  );

  assignUsersSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProjectActionTypes.AssignUsersSuccess),
        tap(() => {
          this._snackbar.success(
            'User(s) successfully assigned to project!',
            10000
          );
        })
      ),
    { dispatch: false }
  );

  removeUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectActionTypes.RemoveUsers),
      exhaustMap(({ payload }) =>
        this._project.removeUsers(payload).pipe(
          map((data) => ({
            type: ProjectActionTypes.RemoveUsersSuccess,
            payload: data,
          })),
          catchError(({ error }) =>
            of({
              type: ProjectActionTypes.RemoveUsersFail,
              payload: error,
            })
          )
        )
      )
    )
  );

  removeUsersSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProjectActionTypes.RemoveUsersSuccess),
        tap(({ payload }: any) => {
          this._snackbar.success(
            'User(s) successfully removed from project!',
            10000
          );
        })
      ),
    { dispatch: false }
  );

  GetByUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectActionTypes.GetByUser),
      exhaustMap(({ payload }: any) =>
        this._project.getProjectsByUser(payload).pipe(
          map((data) => ({
            type: ProjectActionTypes.GetByUserSuccess,
            payload: { ...data, returnUrl: payload.returnUrl },
          })),
          catchError(({ error }) =>
            of({
              type: ProjectActionTypes.GetByUserFail,
              payload: error,
            })
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private _snackbar: SnackbarService,
    private _project: ProjectsService,
    private router: Router
  ) {}
}
