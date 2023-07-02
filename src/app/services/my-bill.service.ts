import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MyBillService {

  urlPrefix = environment.BASE_URL;

  private results$ = new BehaviorSubject<any[]>([]);

  constructor(private httpClient: HttpClient) { }

  calculateBill(productCode: string, dateFrom: string, dateTo: string): Observable<any> {
    return this.httpClient.get<any>(
      this.urlPrefix + `/api/v1/octopus/bill/${productCode}/${dateFrom}/${dateTo}`,
      { responseType: 'json' }
      );
  }

  public addDataToResults(item: any[]) {
    this.results$.next(item);
  }

  public getDataFromResults(): Observable<any[]> {
    return this.results$;
  }
}
