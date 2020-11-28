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
import { SharedService } from 'src/app/container/services/shared/shared.service';
import { environment } from 'src/environments/environment';

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
  baseFileUrl: string = environment.FilesURL;
  fileExcessed: boolean = false;
  today: Date;
  constructor(private _fb: FormBuilder, private _lookupServ: LookupService
    , private _handbookSer: HandbookService, private _router: Router,
     private _tostar: ToastrService,
     private _sharedServ:SharedService) { }

  ngOnInit(): void {

    this.today = new Date();

    this.handBookForm = this._fb.group({
      title: ['', [Validators.required, Validators.pattern('^[^(0-9)]+$')]],
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
    if (files.length === 0) {
      return;
    }
    if (files.length > 5 || this.fileNames.length >= 5) {
      this.fileExcessed = true;
      return;
    }
    let filesToUpload: File[] = files;
    Array.from(filesToUpload).map((file, index) => {
      ;
      if (!this.fileNames.includes(file.name)) {
        this.fileNames.push(file.name);
        this.selectedFiles.push(file);
      }
    });
  }
  
  removeFile(fileName) {
    this.fileNames = this.fileNames.filter(name => name != fileName);
    this.formData.delete(fileName);


  }

  manageFileType(name: string): string{
return this._sharedServ.manageFileType(name)
  }

}
