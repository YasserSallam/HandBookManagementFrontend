import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { StatusEnum } from 'src/app/container/enums/statusEnum';
import { IPagedList } from 'src/app/container/interfaces/IPagedList';
import { HandbookListingDTO } from 'src/app/container/models/handBookModule/HandbookListingDTO';
import { SearchDTO } from 'src/app/container/models/handBookModule/SearchDTO';
import { HandbookService } from 'src/app/container/services/HandbookModule/handbook.service';
import { LookupService } from 'src/app/container/services/lookup/lookup.service';
import { SharedService } from 'src/app/container/services/shared/shared.service';

@Component({
  selector: 'app-approved',
  templateUrl: './approved.component.html',
  styleUrls: ['./approved.component.css']
})
export class ApprovedComponent implements OnInit {
  pageSize: number;
  countries: any[] = [];
  searchForm: FormGroup;
  currentPage: number = 1;
  searchObj:SearchDTO;
  handbooks: IPagedList<HandbookListingDTO> ={} as IPagedList<HandbookListingDTO>;
  constructor(private _router: Router, private _fb: FormBuilder, private _sharedServ: SharedService,
    private _handbookServ:HandbookService,private _lookupServ:LookupService) { }

  ngOnInit(): void {
    this.pageSize = this._sharedServ.PageSize;
    this.searchForm = this._fb.group({
      countryId: [],
      title: [],
      fromDate: [],
      toDate: []

    })

    this.initSearchObj()
    this.getLookups();
   this.getApprovedHandbooks(this.searchObj);
  }

  initSearchObj() {
    this.searchObj = new SearchDTO();
    this.searchObj.pageSize = this.pageSize;
    this.searchObj.pagenumber = this.currentPage;
    this.searchObj.handbookStatus = StatusEnum.Approved;
  }
  getLookups(){
    this._lookupServ.getCountries().subscribe(
      res=>this.countries=res,
      err=>console.log(err)
    )
  }
  getApprovedHandbooks(search: SearchDTO) {
    this._handbookServ.getHandbooks(search).subscribe(res => {
      this.handbooks = res
    },
      err => console.log(err))
  }

  Search() { 
    this.searchObj.countryId=this.searchForm.get('countryId').value;
    this.searchObj.fromDate=this.searchForm.get('fromDate').value;
    this.searchObj.toDate=this.searchForm.get('toDate').value;
    this.searchObj.title=this.searchForm.get('title').value;
    this.currentPage=1;
    this.searchObj.pagenumber=this.currentPage;
    this.getApprovedHandbooks(this.searchObj);
  }

  changePage(pageNumber) {
    this.currentPage = parseInt(pageNumber);
    this.searchObj.pagenumber=this.currentPage;
    this.getApprovedHandbooks(this.searchObj);
  }

  view(event, id) {
    event.preventDefault();
    this._router.navigate(['handbook/details/' + id]);
  }


}
