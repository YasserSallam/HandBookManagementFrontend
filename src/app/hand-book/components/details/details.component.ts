import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Country } from 'src/app/container/models/handBookModule/Country';
import { HandBookStatus } from 'src/app/container/models/handBookModule/HandBookStatus';
import { HandbookService } from 'src/app/container/services/HandbookModule/handbook.service';

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

  constructor(private _route: ActivatedRoute,
    private _fb: FormBuilder,
    private _handbookServ: HandbookService,
    private _router: Router) { }

  ngOnInit(): void {
    this.user = localStorage.getItem('user');
    this.handbookId = this._route.snapshot.paramMap.get('id');

    this.decisionForm = this._fb.group({
      status: ['', Validators.required],
      reason: ['']
    })

  }

  SaveDecision() {
    let handbookStatus: HandBookStatus = new HandBookStatus();
    handbookStatus.id = this.handbookId;
    handbookStatus.statusId = parseInt(this.decisionForm.get('status').value);
    handbookStatus.reason = this.decisionForm.get('reason').value;
    this._handbookServ.updateStatus(handbookStatus).subscribe(
      res => this._router.navigate(['handbook']),
      err => console.log(err)
    )

  }

}
