import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup | any;
  coloumns:any;
  selectedValue: string="";
  disables: boolean=true;
  selectedDate: Date | undefined;
  
  title = 'material-login';
  constructor(private router:Router) 
  {this.loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email,Validators.pattern(
      '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,63}$',
    ),]),
    password: new FormControl('', [Validators.required,Validators.pattern(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$'
    )])
  }); 
  }

  ngOnInit(): void {
    this.coloumns=[{ value: 'buyer', viewValue: 'buyer' },
    { value: 'seller', viewValue: 'seller' },
    { value: 'admin', viewValue: 'admin' },
    { value: 'client', viewValue: 'client' }];
    this.disables=false;
  }
  onSubmit(){
    if(!this.loginForm.valid){
      return;
    }

    console.log(this.loginForm.value);
    localStorage.setItem('user',this.loginForm.value)
    // this.router.navigate(['/home'])
  }
}
