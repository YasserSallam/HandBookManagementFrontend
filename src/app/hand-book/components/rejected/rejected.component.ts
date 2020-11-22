import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HandbookListingDTO } from 'src/app/container/models/handBookModule/HandbookListingDTO';

@Component({
  selector: 'app-rejected',
  templateUrl: './rejected.component.html',
  styleUrls: ['./rejected.component.css']
})
export class RejectedComponent implements OnInit {

  currentPage:number;
  handbooks:HandbookListingDTO[]=[
    {id:1,title:'H1',guideInfo:'info1',guideDate:null },
    {id:2,title:'H2',guideInfo:'info2',guideDate:null },
    {id:3,title:'H3',guideInfo:'info3',guideDate:null },
    {id:4,title:'H4',guideInfo:'info4',guideDate:null },
    {id:5,title:'H5',guideInfo:'info5',guideDate:null },
  ]
  user:string;
  constructor(private _router:Router) { }

  ngOnInit(): void {
    this.user=localStorage.getItem('user');
  }


  changePage($event){}

  view(event,id){
    event.preventDefault();
this._router.navigate(['handbook/details/'+id]);
  }
  edit(event,id){
    event.preventDefault();
this._router.navigate(['handbook/edit/'+id]);
  }


}
