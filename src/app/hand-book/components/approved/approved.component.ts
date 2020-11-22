import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HandbookListingDTO } from 'src/app/container/models/handBookModule/HandbookListingDTO';

@Component({
  selector: 'app-approved',
  templateUrl: './approved.component.html',
  styleUrls: ['./approved.component.css']
})
export class ApprovedComponent implements OnInit {
countries:any[]=[];
  searchForm:FormGroup;
  currentPage:number;
  handbooks:HandbookListingDTO[]=[
    {id:1,title:'H1',guideInfo:'info1',guideDate:null },
    {id:2,title:'H2',guideInfo:'info2',guideDate:null },
    {id:3,title:'H3',guideInfo:'info3',guideDate:null },
    {id:4,title:'H4',guideInfo:'info4',guideDate:null },
    {id:5,title:'H5',guideInfo:'info5',guideDate:null },
  ]
  constructor(private _router:Router,private _fb:FormBuilder) { }

  ngOnInit(): void {
    this.searchForm=this._fb.group({
      countryId:[],
      title:[],
      fromDate:[],
      toDate:[]

    })
  }

  Search(){}

  changePage($event){}

  view(event,id){
    event.preventDefault();
this._router.navigate(['handbook/details/'+id]);
  }


}
