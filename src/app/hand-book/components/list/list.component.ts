import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StatusEnum } from 'src/app/container/enums/statusEnum';
import { IPagedList } from 'src/app/container/interfaces/IPagedList';
import { HandbookListingDTO } from 'src/app/container/models/handBookModule/HandbookListingDTO';
import { SearchDTO } from 'src/app/container/models/handBookModule/SearchDTO';
import { HandbookService } from 'src/app/container/services/HandbookModule/handbook.service';
import { SharedService } from 'src/app/container/services/shared/shared.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  status: string;
  pageSize: number;
  currentPage: number = 1;
  searchObj: SearchDTO;
  handbooks: IPagedList<HandbookListingDTO> = {} as IPagedList<HandbookListingDTO>;
  constructor(private _router: Router, private _sharedServ: SharedService,
    private _handbookServ: HandbookService, private _route: ActivatedRoute) { }

  ngOnInit(): void {

    this.pageSize = this._sharedServ.PageSize;
    this.initSearchObj()
    this.getPendingHandbooks(this.searchObj);
  }
  initSearchObj() {
    this.searchObj = new SearchDTO();
    this.searchObj.pageSize = this.pageSize;
    this.searchObj.pagenumber = this.currentPage;
    this.status = this._route.snapshot.paramMap.get('status');
    if (this.status == 'pending')
      this.searchObj.handbookStatus = StatusEnum.Pending
    else
      this.searchObj.handbookStatus = StatusEnum.Rejected
  }

  getPendingHandbooks(search: SearchDTO) {
    this._handbookServ.getHandbooks(search).subscribe(res => {
      this.handbooks = res
    },
      err => {
        console.log(err)
  })
}
edit(event, id) {
  event.preventDefault();
  this._router.navigate(['handbook/edit/' + id]);
}

changePage(pagenumber) {
  this.currentPage = parseInt(pagenumber);
  this.searchObj.pagenumber=this.currentPage;
  this.getPendingHandbooks(this.searchObj);  // fire get

}

view(event, id) {
  event.preventDefault();
  this._router.navigate(['handbook/details/' + id]);
}


}
