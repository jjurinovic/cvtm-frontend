import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Project } from '../models/project.model';
import { PageResponse } from 'src/app/shared/models/page-response.model';
import { ProjectPageFilter } from '../models/project-page-filter.model';
import { ProjectUsers } from '../models/project-users.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  private baseUrl = environment.apiUrl + '/project';

  constructor(private http: HttpClient) {}

  /**
   * Create new project
   * @param {Project} project project for create
   * @returns Observable with created project
   */
  public createProject(project: Project): Observable<Project> {
    return this.http.post<Project>(this.baseUrl, project);
  }

  /**
   * Update existing project
   * @param {Project} project project for update
   * @returns Observable with updated project
   */
  public updateProject(project: Project): Observable<Project> {
    return this.http.put<Project>(this.baseUrl, project);
  }

  /**
   * Get project by given id
   * @param {Project} project project objekt
   * @returns Observable with project for given id
   */
  public getProject(id: number): Observable<Project> {
    return this.http.get<Project>(this.baseUrl + '/' + id);
  }

  /**
   * Get projects by given companyId
   * @param {number} company_id company id
   * @returns Observable with projects for given company id
   */
  public getProjectList(
    req: ProjectPageFilter
  ): Observable<PageResponse<Project>> {
    let params = new HttpParams();
    params = params.append('size', req.size);
    params = params.append('page', req.page);
    params = params.append('company_id', req.companyId);

    if (req.sort) {
      params = params.append('sort', req.sort);
      params = params.append('sort_field', req.sort_field as string);
    }

    if (req.q) {
      params = params.append('q', req.q);
    }
    return this.http.get<PageResponse<Project>>(this.baseUrl + '/list', {
      params,
    });
  }

  /**
   * Assign users to the project
   * @param {ProjectUsers} assignUsers object with project id and user id list
   * @returns Project with assigned users
   */
  public assignUsers(assignUsers: ProjectUsers): Observable<Project> {
    return this.http.post<Project>(this.baseUrl + '/assign-users', assignUsers);
  }

  /**
   * Remove users from the project
   * @param {ProjectUsers} assignUsers object with project id and user id list
   * @returns Project with updated users
   */
  public removeUsers(removeUsers: ProjectUsers): Observable<Project> {
    return this.http.post<Project>(this.baseUrl + '/remove-users', removeUsers);
  }

  /**
   * Return projects by given user id
   * @param {number} userId user id
   * @returns Return array with projects for given user
   */
  public getProjectsByUser(userId: number): Observable<Project[]> {
    return this.http.get<Project[]>(this.baseUrl + '/user/' + userId);
  }
}
