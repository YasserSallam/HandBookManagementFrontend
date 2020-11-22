import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Country } from 'src/app/container/models/handBookModule/Country';
import { HandBookDTO } from 'src/app/container/models/handBookModule/HandBookDTO';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  handBook: HandBookDTO;
  handBookForm: FormGroup;
  decisionForm: FormGroup;
  countries: Country[];
  formData: FormData;
  selectedImage: File;
  selectedFiles: File[]=[];
  selectedImageUrl = '';
  selectedImageName = '';
  imageUploaded: boolean = false;
  fileNames: string[] = [];
  baseFileUrl: string = 'assets/images/';
  fileExcessed: boolean = false;

  constructor(private _fb:FormBuilder) { }

  ngOnInit(): void {

  
   this.handBookForm = this._fb.group({
      title: ['', [Validators.required]],
      countryId: ['', Validators.required],
      guideDate: ['', Validators.required],
      guideInfo: ['', [Validators.required, Validators.maxLength(250)]],

    })

  }
Save(){}

uploadImage(event){}
uploadFiles(event){}



}
