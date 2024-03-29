import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Company } from '../models/company.model';
import { environment } from 'src/environments/environment';
import { PageResponse } from 'src/app/shared/models/page-response.model';
import { CompanyPageFilter } from '../models/company-page-filter.model';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private baseUrl = environment.apiUrl + '/company';

  constructor(private http: HttpClient) {}

  /**
   * Return all companies. It's only available for ROOT user
   * @param {PageRequest} req object with all params
   * @returns {Observable<PageResponse<Company>>} Returns observable with list of all companies
   */
  public getAllCompanies(
    req: CompanyPageFilter
  ): Observable<PageResponse<Company>> {
    let params = new HttpParams();
    params = params.append('size', req.size);
    params = params.append('page', req.page);

    if (req.sort) {
      params = params.append('sort', req.sort);
      params = params.append('sort_field', req.sort_field as string);
    }

    if (req.q) {
      params = params.append('q', req.q);
    }

    return this.http.get<PageResponse<Company>>(this.baseUrl + '/list', {
      params,
    });
  }

  /**
   * Return company by given company id
   * @param {number} id company id
   * @returns {Observable<Company>} Return observable with company data
   */
  public getCompanyById(id?: number): Observable<Company> {
    return this.http.get<Company>(this.baseUrl + '/' + (id ? id : ''));
  }

  /**
   * Create company with given data
   * @param {Company} company
   * @returns {Observable<Company>} Return observable with company data
   */
  public createCompany(company: Company): Observable<Company> {
    return this.http.post<Company>(this.baseUrl, company);
  }

  /**
   * Update company with given data
   * @param {Company} company
   * @returns {Observable<Company>} Return observable with company data
   */
  public updateCompany(company: Company): Observable<Company> {
    return this.http.put<Company>(this.baseUrl, company);
  }

  /**
   * Delete company from database
   * @param {number} id company id
   * @returns Delete company and return message
   */
  public deleteCompany(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  /**
   * Toggle inactive status
   * @param id company id
   * @returns {Company} Returns company object
   */
  public statusChange(id: number): Observable<Company> {
    return this.http.put<Company>(`${this.baseUrl}/${id}/status-change`, {});
  }
}
