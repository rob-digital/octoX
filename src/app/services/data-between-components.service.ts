import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataBetweenComponentsService {

  private presentableStartDate$ = new BehaviorSubject<string>('');
  private presentableEndDate$ = new BehaviorSubject<string>('');
  
  constructor() { }

  public addPresentableStartDate(item: any) {
    this.presentableStartDate$.next(item);
  }

  public getDataFromPresentableStartDate(): Observable<string> {
    return this.presentableStartDate$;
  }  
  
  public addPresentableEndDate(item: any) {
    this.presentableEndDate$.next(item);
  }

  public getDataFromPresentableEndDate(): Observable<string> {
    return this.presentableEndDate$;
  }
}
