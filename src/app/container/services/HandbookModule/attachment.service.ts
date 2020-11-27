import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AttachmentService {

  private url:string=environment.BackendURL + 'attachment/';

  constructor(private _http:HttpClient) { }

  download(id:number){
  return   this._http.get(this.url+'download/'+id) as Observable<string>   
  }


}
