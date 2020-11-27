import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Country } from 'src/app/container/models/handBookModule/Country';
import { HandbookDetailsDTO } from 'src/app/container/models/handBookModule/HandbookDetailsDTO';
import { HandBookDTO } from 'src/app/container/models/handBookModule/HandBookDTO';
import { HandbookService } from 'src/app/container/services/HandbookModule/handbook.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  handbookId: number;
  handbook: HandbookDetailsDTO;
  handBookForm: FormGroup;
  decisionForm: FormGroup;
  countries: Country[];
  formData: FormData;
  selectedImage: File;
  selectedFiles: File[] = [];
  selectedImageUrl = '';
  selectedImageName = '';
  imageUploaded: boolean = false;
  fileNames: string[] = [];
  baseFileUrl: string = 'assets/images/';
  fileExcessed: boolean = false;
  user: string;

  constructor(private _fb: FormBuilder, private _handbookServ: HandbookService, private _route: ActivatedRoute) { }

  ngOnInit(): void {
    let today: Date = new Date();
    this.user = localStorage.getItem('user');

    this.handbookId = parseInt(this._route.snapshot.paramMap.get('id'));

    // this.getHandbook();
    this.initForm();
  
    if (this.user === 'admin') {
      this.handBookForm.disable();

    }
    
  }
  initForm() {
    this.handBookForm = this._fb.group({
      title: ['', [Validators.required]],
      countryId: ['', Validators.required],
      guideDate: ['', Validators.required],
      guideInfo: ['', [Validators.required, Validators.maxLength(250)]],

    })

    this.decisionForm = this._fb.group({
      status: ['', Validators.required],
      reason: ['']
    })
    this.decisionForm.get('status').valueChanges.subscribe(
      value => {
        this.handbookStatusChange(value)
      })

  }
  handbookStatusChange(value: string) {
    if (value == 'Rejected') {
      this.decisionForm.get('reason').enable();
      this.decisionForm.get('reason').setValidators(Validators.required);
    }
    else {
      this.decisionForm.get('reason').clearValidators();
      this.decisionForm.get('reason').setValue('');
      this.decisionForm.get('reason').disable();
    }
    this.decisionForm.get('reason').updateValueAndValidity();

  }


  getHandbook() {
    this._handbookServ.getDetails(this.handbookId).subscribe(
      res => {
        this.handbook = res
      },
      err => console.log(err)
    )
  }

  Save() { }

  uploadImage(event) { }
  uploadFiles(event) { }



}
