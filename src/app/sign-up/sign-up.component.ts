import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  loginForm: FormGroup | any;
  title = 'material-SignUp';
  constructor(private router:Router) 
  {
    this.loginForm = new FormGroup({
    uname:new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email,Validators.pattern(
      '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,63}$',
    ),]),
    password: new FormControl('', [Validators.required,Validators.pattern(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$'
    )])    
  }); 
  }

  ngOnInit(): void {
  }
  onSubmit(){
    if(!this.loginForm.valid){
      return;
    }
    console.log(this.loginForm.value);
    localStorage.setItem('user',this.loginForm.value);
    this.router.navigate(['/home']);
  }

}
