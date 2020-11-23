import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LookupDTO } from '../../models/lookup/lookupDTO';

@Injectable({
  providedIn: 'root'
})
export class LookupService {

  constructor(private _http:HttpClient) { }
  getCountries():Observable<LookupDTO[]> {
    return  this._http.get('country url') as Observable<LookupDTO[]>
  }
}
