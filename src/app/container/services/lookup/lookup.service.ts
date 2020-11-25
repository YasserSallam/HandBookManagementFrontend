import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LookupDTO } from '../../models/lookup/lookupDTO';

@Injectable({
  providedIn: 'root'
})
export class LookupService {
  url:string=environment.BackendURL + 'lookup/';

  constructor(private _http:HttpClient) { }
  getCountries():Observable<LookupDTO[]> {
    return  this._http.get(this.url+'getCountries') as Observable<LookupDTO[]>
  }
}
