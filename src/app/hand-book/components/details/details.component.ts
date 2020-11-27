import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from 'console';
import { HandbookDetailsDTO } from 'src/app/container/models/handBookModule/HandbookDetailsDTO';
import { HandBookStatus } from 'src/app/container/models/handBookModule/HandBookStatus';
import { LookupDTO } from 'src/app/container/models/lookup/lookupDTO';
import { HandbookService } from 'src/app/container/services/HandbookModule/handbook.service';
import { LookupService } from 'src/app/container/services/lookup/lookup.service';
import { SharedService } from 'src/app/container/services/shared/shared.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  handbook:HandbookDetailsDTO;
  handbookId: any;
  countries: LookupDTO[] = [];
  user: string;
  selectedImageUrl:string;
  baseFileUrl: string = environment.FilesURL;
imgSrc='data:image/jpeg;base64,'
  constructor(private _route: ActivatedRoute,
    private _handbookServ: HandbookService,
    private _router: Router,
    private _lookupServ:LookupService,
    private _sharedServ:SharedService) { }

  ngOnInit(): void {
    this.loodLookups();
    this.handbookId = this._route.snapshot.paramMap.get('id');
    if(this.handbookId)
      this.GetHandbook(+this.handbookId);
  }
  loodLookups() {
    this._lookupServ.getCountries().subscribe(res => {
      this.countries = res
    },
      err => { console.log(err) }
    );
  }
  GetHandbook(id:number){
    this._handbookServ.getDetails(id).subscribe(
      res=>
      {
        this.handbook=res;
      this.imgSrc=this.imgSrc+res.image
      },
      error=>console.log(error)
    )
  }
  
  manageFileType(name: string): string{
    return this._sharedServ.manageFileType(name)
      }

      downloadFile(id){
        debugger;
      }

}
