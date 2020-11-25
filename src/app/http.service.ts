import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private getBeerDetails: string;
  private getBeerImageDetails: string;
  constructor(private http: HttpClient) {
    this.getBeerDetails = 'https://s3-ap-southeast-1.amazonaws.com/he-public-data/beercraft5bac38c.json';
    this.getBeerImageDetails = 'https://s3-ap-southeast-1.amazonaws.com/he-public-data/beerimages7e0480d.json';
  }

  getBeerDetailsCall(): Observable<any> {
    return this.http.get(this.getBeerDetails);
  }
  getBeerImageDetailsCall(): Observable<any> {
    return this.http.get(this.getBeerImageDetails);
  }
}
