import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HandbookDetailsDTO } from '../../models/handBookModule/HandbookDetailsDTO';
import { HandBookDTO } from '../../models/handBookModule/HandBookDTO';
import { HandbookListingDTO } from '../../models/handBookModule/HandbookListingDTO';
import { HandBookStatus } from '../../models/handBookModule/HandBookStatus';
import { SearchDTO } from '../../models/SearchDTO';

@Injectable({
  providedIn: 'root'
})
export class HandbookService {
private url:string='backend url'
  constructor(private _http:HttpClient) { }

  create(handbbok:HandBookDTO){
    this._http.post(this.url,handbbok);
  }
  get(searchDTO:SearchDTO):Observable<HandbookListingDTO[]>{
   return this._http.post(this.url,searchDTO) as Observable<HandbookListingDTO[]>;
  }
  updateStatus(handbook:HandBookStatus){
    return this._http.post(this.url,handbook) ;
  }

  getDetails(id:number):Observable<HandbookDetailsDTO>{
    return this._http.get(this.url+'/id') as Observable<HandbookDetailsDTO> ;
  }
  updateDetails(handbook:HandbookDetailsDTO){
    return this._http.post(this.url,handbook) ;

  }
}
