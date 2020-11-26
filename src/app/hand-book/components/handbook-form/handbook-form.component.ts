import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { translate } from '@angular/localize/src/utils';
import { Router } from '@angular/router';
import { strict } from 'assert';
import { ToastrService } from 'ngx-toastr';
import { $ } from 'protractor';
import { Country } from 'src/app/container/models/handBookModule/Country';
import { HandBookDTO } from 'src/app/container/models/handBookModule/HandBookDTO';
import { LookupDTO } from 'src/app/container/models/lookup/lookupDTO';
import { HandbookService } from 'src/app/container/services/HandbookModule/handbook.service';
import { LookupService } from 'src/app/container/services/lookup/lookup.service';

@Component({
  selector: 'app-handbook-form',
  templateUrl: './handbook-form.component.html',
  styleUrls: ['./handbook-form.component.css']
})
export class HandbookFormComponent implements OnInit {
  handBook: HandBookDTO;
  handBookForm: FormGroup;
  countries: LookupDTO[];
  formData: FormData;
  selectedImage: File;
  selectedFiles: File[] = [];
  selectedImageUrl = '';
  selectedImageName = '';
  imageUploaded: boolean = false;
  fileNames: string[] = [];
  baseFileUrl: string = 'assets/images/';
  fileExcessed: boolean = false;
  today: Date;
  constructor(private _fb: FormBuilder, private _lookupServ: LookupService
    , private _handbookSer: HandbookService, private _router: Router, private _tostar: ToastrService) { }

  ngOnInit(): void {

    this.today = new Date();

    this.handBookForm = this._fb.group({
      title: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      countryId: ['', Validators.required],
      guideDate: ['', Validators.required],
      guideInfo: ['', [Validators.required, Validators.maxLength(250)]],

    })

    this.loodLookups();
  }

  loodLookups() {
    this._lookupServ.getCountries().subscribe(res => {
      this.countries = res
    },
      err => { console.log(err) }
    );
  }

  Create() {
    debugger
    this.formData = new FormData()
    this.formData.append("title", this.handBookForm.controls.title.value)
    this.formData.append("countryId", this.handBookForm.controls.countryId.value)
    this.formData.append("guideDate", this.handBookForm.controls.guideDate.value)
    this.formData.append("guideInfo", this.handBookForm.controls.guideInfo.value)
    this.formData.append("attachments", this.selectedImage)
    if (this.fileNames.length > 0) {
      this.selectedFiles.forEach(f => {
        let file: FormDataEntryValue = f
        this.formData.append('attachments', file);

      });
    }

    this._handbookSer.create(this.formData).subscribe(
      res => {
        if (res)
          this.handBookForm.reset();
        this._tostar.success("Created Successfully");
        this._router.navigate(['handbook']);
      },
     err=>  this._tostar.error("Some Errors Occured")
      
    );
  }
  uploadImage(event) {
    this.selectedImage = event.target.files[0];
    //display
    let reader = new FileReader();
    reader.readAsDataURL(this.selectedImage)
    reader.onload = (f) => {
      this.selectedImageUrl = <string>f.target.result;
      this.imageUploaded = true;
    }

  }

  uploadFiles(files) {
    debugger;

    if (files.length === 0) {
      return;
    }
    if (files.length > 5 || this.fileNames.length >= 5) {
      this.fileExcessed = true;
      return;

    }
    let filesToUpload: File[] = files;


    Array.from(filesToUpload).map((file, index) => {
      debugger;
      if (!this.fileNames.includes(file.name)) {
        this.fileNames.push(file.name);
        this.selectedFiles.push(file);
      }
    });
  }
  manageFileType(name: string): string {
    let fileNameArr = name.split('.');

    let extension = fileNameArr[fileNameArr.length - 1];
    switch (extension) {
      case 'pdf':
        return 'PDF.svg'
      case 'doc':
      case 'docx':
        return 'docx.svg'
    }


  }

  removeFile(fileName) {
    this.fileNames = this.fileNames.filter(name => name != fileName);
    this.formData.delete(fileName);


  }


}
