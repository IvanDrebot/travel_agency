import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SERVICES_URL, TOURS_URL } from 'src/endpoints';
import {
  IHttpTour,
  IService,
  IHttpAllTours,
} from 'src/store/models/tours/ITour.model';
import IResponse from 'src/store/models/IResponse.model';

@Injectable()
export class ToursService {
  constructor(private http: HttpClient) {}

  public getAll(params?: any): Observable<IHttpAllTours> {
    return this.http.get<IHttpAllTours>(TOURS_URL, { params });
  }

  public getServices(): Observable<IService[]> {
    return this.http.get<IService[]>(SERVICES_URL);
  }

  public create(tour: IHttpTour): Observable<IResponse> {
    return this.http.post<IResponse>(TOURS_URL, tour);
  }
}
