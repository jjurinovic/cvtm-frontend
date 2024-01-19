import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from '../models/company.model';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private baseUrl = 'http://localhost:8000/company/';

  constructor(private http: HttpClient) {}

  /**
   * Return all companies. It's only available for ROOT user
   * @returns {Observable<Company[]>} Returns observable with list of all companies
   */
  public getAllCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(this.baseUrl);
  }

  /**
   * Return company by given company id
   * @param {number} id company id
   * @returns {Observable<Company>} Return observable with company data
   */
  public getCompanyById(id: number): Observable<Company> {
    return this.http.get<Company>(this.baseUrl + id);
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
