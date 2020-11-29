import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FileTypeEnum } from 'src/app/container/enums/FileTypeEnum';
import { AttachmentDTO } from 'src/app/container/models/handBookModule/AttachmentDTO';
import { Country } from 'src/app/container/models/handBookModule/Country';
import { HandbookDetailsDTO } from 'src/app/container/models/handBookModule/HandbookDetailsDTO';
import { HandBookDTO } from 'src/app/container/models/handBookModule/HandBookDTO';
import { LookupDTO } from 'src/app/container/models/lookup/lookupDTO';
import { AttachmentService } from 'src/app/container/services/HandbookModule/attachment.service';
import { HandbookService } from 'src/app/container/services/HandbookModule/handbook.service';
import { LookupService } from 'src/app/container/services/lookup/lookup.service';
import { SharedService } from 'src/app/container/services/shared/shared.service';
import * as FileSaver from 'file-saver'
import { ToastrService } from 'ngx-toastr';
import { error } from 'protractor';
import { HandBookStatusDTO } from 'src/app/container/models/handBookModule/HandBookStatusDTO';
import {formatDate }from '@angular/common'
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
  countries: LookupDTO[];
  formData: FormData;
  selectedImage: File;
  selectedFiles: File[] = [];
  selectedImageUrl = '';
  selectedImageName = null;
  imageUploaded: boolean = false;
  baseFileUrl: string = 'assets/images/';
  fileExcessed: boolean = false;
  user: string;
  imgSrc = 'data:image/jpeg;base64,'
  attachments: AttachmentDTO[] = [];
  handbookFiles: AttachmentDTO[] = [];
  removedFiles: number[] = [];
  today:any;
  constructor(private _fb: FormBuilder, private _handbookServ: HandbookService,
    private _route: ActivatedRoute, private _lookupServ: LookupService,
    private _sharedServ: SharedService,
    private _attachmentServ: AttachmentService,
    private _router:Router,
    private _tostar:ToastrService
  ) { }

  ngOnInit(): void {
    this.today=formatDate(new Date(),'yyyy-MM-dd','en');
    this.user = localStorage.getItem('user');
    this.initForm();
    if (this.user === 'admin') {
      this.handBookForm.disable();
    }
    this.loodLookups();

    this.handbookId = +this._route.snapshot.paramMap.get('id');
    if (this.handbookId)
      this.GetHandbook(+this.handbookId);
  }
  initForm() {
    this.handBookForm = this._fb.group({
      title: ['', [Validators.required,Validators.pattern('^[^(0-9)]+$')]],
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
    ;
    if (value == '2') {
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

  manageFileType(name: string): string {
    return this._sharedServ.manageFileType(name)
  }

  loodLookups() {
    this._lookupServ.getCountries().subscribe(res => {
      this.countries = res
    },
      err => { console.log(err) }
    );
  }
  GetHandbook(id: number) {
    this._handbookServ.getDetails(id).subscribe(
      res => {
        ;
        this.handbook = res;
        this.imgSrc = this.imgSrc + res.image
        this.attachments = res.attachments
        this.ExtractFiles()
        this.handBookForm.patchValue(res);
        this.handbook.guideDate=new Date(this.handbook.guideDate)
        this.handBookForm.get('guideDate').setValue(formatDate(res.guideDate,'yyyy-MM-dd', 'en'));
     },
      error => console.log(error)
    )
  }
  Save() { 
    this.formData = new FormData()
    this.formData.append("id", this.handbookId.toString())
    this.formData.append("title", this.handBookForm.controls.title.value)
    this.formData.append("countryId", this.handBookForm.controls.countryId.value)
    this.formData.append("guideDate", this.handBookForm.controls.guideDate.value)
    this.formData.append("guideInfo", this.handBookForm.controls.guideInfo.value)
    if(this.removedFiles.length>0)
    for (let index = 0; index < this.removedFiles.length; index++) {
    this.formData.append("deletedAttachments", this.removedFiles[index].toString())
      
    }
    if(this.selectedImage !=null)
      this.formData.append("newAttachments", this.selectedImage)
    if (this.selectedFiles.length > 0) {
      this.selectedFiles.forEach(f => {
        let file: FormDataEntryValue = f
        this.formData.append('newAttachments', file);

      });
    }

    this._handbookServ.updateDetails(this.formData).subscribe(
      res => {
        if (res)
          this.handBookForm.reset();
        this._tostar.success("Updated Successfully");
        this._router.navigate(['handbook']);
      },
     err=>  this._tostar.error("Some Errors Occured")
      
    );
  
  }

  SaveDecision(){
    let HandbookStaus=new HandBookStatusDTO();
    HandbookStaus.handbookId=this.handbookId;
    HandbookStaus.status=+this.decisionForm.get('status').value;
    HandbookStaus.reason=this.decisionForm.get('reason').value;

this._handbookServ.updateStatus(HandbookStaus).subscribe(
  res=>{
    this.handBookForm.reset()
    this._tostar.success("updated Successfully");
    this._router.navigate(['handbook'])
  },
  error=>{
    this._tostar.error("Some Errors Occured");
  }

)

  }
  removeFile(id: number) {
    this.handbookFiles = this.handbookFiles.filter(a => a.id != id);
    this.removedFiles.push(id);
  }

  ExtractFiles() {
    this.handbookFiles = this.attachments.filter(f => f.type == FileTypeEnum.file)

  }
  uploadFiles(files) {
    if (files.length === 0) {
      return;
    }
    if (files.length > 5 || (this.handbookFiles.length + files.length) > 5 ) {
      this.fileExcessed = true;
      return;
    }
    let filesToUpload: File[] = files;
    Array.from(filesToUpload).map((file, index) => {
        this.handbookFiles.push({name:file.name,id:null,type:null});
        this.selectedFiles.push(file);
    });
  }

  uploadImage(event) {
    this.selectedImage = event.target.files[0];
    this.removedFiles.push(this.attachments.find(i=>i.type== FileTypeEnum.image).id);
    //display
    let reader = new FileReader();
    reader.readAsDataURL(this.selectedImage)
    reader.onload = (f) => {
      this.imgSrc = <string>f.target.result;
      this.imageUploaded = true;
    }

  }

  downloadFile(id, fileName: string) {
    let extension = fileName.split('.')[0];

    this._attachmentServ.download(id)
      .subscribe((res) => {
        var blob = this.convertBase64ToBlobData(res, 'application' + `/` + extension);
        FileSaver.saveAs(blob, fileName);
      }, error => console.log(error))


  }


  convertBase64ToBlobData(base64Data: string, contentType: string, sliceSize = 512) {
    const byteCharacters = window.atob(base64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }

  getToday(): string {
     return new Date().toISOString().split('T')[0]
 }


}
