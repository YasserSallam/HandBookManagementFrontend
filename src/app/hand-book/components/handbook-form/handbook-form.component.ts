import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { strict } from 'assert';
import { $ } from 'protractor';
import { Country } from 'src/app/container/models/handBookModule/Country';
import { HandBookDTO } from 'src/app/container/models/handBookModule/HandBookDTO';

@Component({
  selector: 'app-handbook-form',
  templateUrl: './handbook-form.component.html',
  styleUrls: ['./handbook-form.component.css']
})
export class HandbookFormComponent implements OnInit {
  handBook: HandBookDTO;
  handBookForm: FormGroup;
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
  today:Date;
  constructor(private _fb: FormBuilder) { }

  ngOnInit(): void {
    this.today=new Date();
    this.handBookForm = this._fb.group({
      title: ['', [Validators.required,Validators.pattern('^[a-zA-Z]+$')]],
      countryId: ['', Validators.required],
      guideDate: ['', Validators.required],
      guideInfo: ['', [Validators.required, Validators.maxLength(250)]],

    })
  }
  Create() {
    this.formData = new FormData()
    this.formData.append("title", this.handBookForm.controls.title.value)
    this.formData.append("countryId", this.handBookForm.controls.countryId.value)
    this.formData.append("guideDate", this.handBookForm.controls.guideDate.value)
    this.formData.append("guideInfo", this.handBookForm.controls.guideInfo.value)
    this.formData.append("image", this.selectedImage)

    if (this.fileNames.length > 0) {
      let attachments: FormDataEntryValue[] = [];
      this.selectedFiles.forEach(f => {
        let file: FormDataEntryValue =f
        // attachments.push(file);
        this.formData.append('attachments', file);

        // this.formData.append('attachments' , file);
      });
      // this.registerForm.controls.file.setValue(attachments);
    }
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
