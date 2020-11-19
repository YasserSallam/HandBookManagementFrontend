import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Country } from '../../models/country';
import { HandBookDTO } from '../../models/HandBookDTO';

@Component({
  selector: 'app-handbook-form',
  templateUrl: './handbook-form.component.html',
  styleUrls: ['./handbook-form.component.css']
})
export class HandbookFormComponent implements OnInit {
  handBook:HandBookDTO;
  handBookForm:FormGroup;
  countries: Country[];
  formData: FormData=new FormData();
  selctedImage: File;
  selectedImageUrl = '';
  selectedImageName= '';
  imageUploaded: boolean = false;

  constructor(private _fb:FormBuilder) { }

  ngOnInit(): void {
    this.handBookForm=this._fb.group({
      title:['',[Validators.required]],
      countryId:['',Validators.required],
      guideDate:['',Validators.required],
      guideInfo:['',Validators.required],

    })
  }
  Create(){

  }
  uploadFile(event) {
    debugger;
    this.selctedImage = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(this.selctedImage)
    reader.onload = (f) => {
      debugger;
      this.selectedImageUrl = <string>f.target.result;
      this.formData.append('imageg', this.selctedImage, this.selctedImage.name);
      this.imageUploaded = true;
    }

  }
}
