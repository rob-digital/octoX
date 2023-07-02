import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AllProductsService {

  urlPrefix = environment.BASE_URL;

  constructor(private httpClient: HttpClient) { }

  getAllProducts(): Observable<any> {
    return this.httpClient.get<any>(this.urlPrefix + '/api/v1/octopus/products',  { responseType: 'json' } ) ;
  }
}
