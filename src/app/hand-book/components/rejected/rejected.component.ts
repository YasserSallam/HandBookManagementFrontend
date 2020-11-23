import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StatusEnum } from 'src/app/container/enums/statusEnum';
import { HandbookListingDTO } from 'src/app/container/models/handBookModule/HandbookListingDTO';
import { SearchDTO } from 'src/app/container/models/handBookModule/SearchDTO';
import { HandbookService } from 'src/app/container/services/HandbookModule/handbook.service';
import { SharedService } from 'src/app/container/services/shared/shared.service';

@Component({
  selector: 'app-rejected',
  templateUrl: './rejected.component.html',
  styleUrls: ['./rejected.component.css']
})
export class RejectedComponent implements OnInit {
  pageSize: number;
  currentPage: number = 1;
  searchObj: SearchDTO;
  handbooks: HandbookListingDTO[] = [
    { id: 1, title: 'H1', guideInfo: 'info1', guideDate: null },
    { id: 2, title: 'H2', guideInfo: 'info2', guideDate: null },
    { id: 3, title: 'H3', guideInfo: 'info3', guideDate: null },
    { id: 4, title: 'H4', guideInfo: 'info4', guideDate: null },
    { id: 5, title: 'H5', guideInfo: 'info5', guideDate: null },
  ]
  user: string;
  constructor(private _router: Router, private _sharedServ: SharedService, private _handbookServ: HandbookService) { }

  ngOnInit(): void {
    this.pageSize = this._sharedServ.PageSize;
    this.initSearchObj()
    this.getRejectedHandbooks(this.searchObj);
    this.user = localStorage.getItem('user');
  }

  initSearchObj() {
    this.searchObj = new SearchDTO();
    this.searchObj.pageSize = this.pageSize;
    this.searchObj.pagenumber = this.currentPage;
    this.searchObj.handbookStatus = StatusEnum.Rejected;
  }
  changePage(pageNumber) {
    this.currentPage = parseInt(pageNumber);

  }

  view(event, id) {
    event.preventDefault();
    this._router.navigate(['handbook/details/' + id]);
  }
  edit(event, id) {
    event.preventDefault();
    this._router.navigate(['handbook/edit/' + id]);
  }

  getRejectedHandbooks(searchObj: SearchDTO) {
    this._handbookServ.get(searchObj).subscribe(res => {
      this.handbooks = res
    },
      err => console.log(err))

  }

}
