import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Country } from 'src/app/container/models/handBookModule/Country';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  handbookId: any;
  fileNames: any[] = [];
  imageUploaded: boolean = false;
  countries: any[] = [];
  decisionForm: FormGroup;
  user: string;

  constructor(private _route: ActivatedRoute, private _fb: FormBuilder) { }

  ngOnInit(): void {
    this.user = localStorage.getItem('user');
    this.handbookId = this._route.snapshot.paramMap.get('id');

    this.decisionForm = this._fb.group({
      status: ['', Validators.required],
      reason: ['']
    })

  }

  SaveDecision(){


  }

}
