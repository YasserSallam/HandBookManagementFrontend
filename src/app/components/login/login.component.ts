import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  constructor(private _fb:FormBuilder,private _rouer:Router) { }

  ngOnInit(): void {
    this.loginForm=this._fb.group({
      userName:['',[Validators.required],],
      password:['',[Validators.required]]
    });
  }
login(){
let user:string=this.loginForm.get('userName').value;
  localStorage.setItem('user',user.toLowerCase());
this._rouer.navigate(['/handbook']);
}

}
