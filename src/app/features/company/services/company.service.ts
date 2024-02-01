import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from '../models/company.model';
import { environment } from 'src/environments/environment';
import { PageResponse } from 'src/app/shared/models/page-response';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private baseUrl = environment.apiUrl + '/company';

  constructor(private http: HttpClient) {}

  /**
   * Return all companies. It's only available for ROOT user
   * @returns {Observable<PageResponse<Company>>} Returns observable with list of all companies
   */
  public getAllCompanies(
    params: HttpParams
  ): Observable<PageResponse<Company>> {
    return this.http.get<PageResponse<Company>>(this.baseUrl, { params });
  }

  /**
   * Return company by given company id
   * @param {number} id company id
   * @returns {Observable<Company>} Return observable with company data
   */
  public getCompanyById(id: number): Observable<Company> {
    return this.http.get<Company>(this.baseUrl + '/' + id);
  }

  /**
   * Create company with given data
   * @param {Company} company
   * @returns {Observable<Company>} Return observable with company data
   */
  public createCompany(company: Company): Observable<Company> {
    return this.http.post<Company>(this.baseUrl, company);
  }
}
