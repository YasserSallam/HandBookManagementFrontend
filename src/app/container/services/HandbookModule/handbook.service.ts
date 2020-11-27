import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HandbookDetailsDTO } from '../../models/handBookModule/HandbookDetailsDTO';
import { HandBookDTO } from '../../models/handBookModule/HandBookDTO';
import { HandbookListingDTO } from '../../models/handBookModule/HandbookListingDTO';
import { HandBookStatus } from '../../models/handBookModule/HandBookStatus';
import { SearchDTO } from '../../models/handBookModule/SearchDTO';
import { IPagedList } from '../../interfaces/IPagedList';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HandbookService {
  private url:string=environment.BackendURL + 'handbook/';

  constructor(private _http:HttpClient) { }
  create(handbbok:any) : Observable<boolean>{
  return  this._http.post(this.url+'create',handbbok) as Observable<boolean>;
    
  }
 
  getHandbooks(searchDTO:SearchDTO):Observable<IPagedList<HandbookListingDTO>>{
   return this._http.post(this.url+'getHandbooks',searchDTO) as Observable<IPagedList<HandbookListingDTO>>;
  }
  updateStatus(handbook:HandBookStatus){
    return this._http.post(this.url,handbook) ;
  }

  getDetails(id:number):Observable<HandbookDetailsDTO>{
    return this._http.get(this.url+'details/'+id) as Observable<HandbookDetailsDTO> ;
  }
  updateDetails(handbook:HandbookDetailsDTO){
    return this._http.post(this.url,handbook) ;

  }
}
