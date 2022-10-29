import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup | any;
  title = 'material-login';
  
  constructor(private router:Router) 
  {
  this.loginForm = new FormGroup({
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
  async onSubmit(){
    if(!this.loginForm.valid){
      return;
    }
    console.log(this.loginForm.value);
    localStorage.setItem('user',this.loginForm.value);
    //  this.httpClient.get('http://127.0.0.1:5002/').subscribe((data: any) => {
    //    console.log(data);
    // })
    try {
      await axios({
        method: 'post',
        url: 'http://127.0.0.1:5002/auth',
        data:this.loginForm.value
      }).then( (response) => {
          console.log(response);
          if(response.data.data){
            let data = response.data.data;
            if(response.data.status==="Verified"){
              console.log(data,data[0])
              localStorage.setItem('authtokens',JSON.stringify(data[0]));
              alert("verified Successfully!..");
              this.router.navigate(['/home']);
            }
          }
          else{
            // this.toastr.error('Invalid Cre dentials!', 'Try again!');
            alert("Invalid Credential!..")
          }
        });
    } catch (error) {
      alert("Internal Server Error!..");
      console.log(error);
    } 
    
  }
  signUp(){
    this.router.navigate(['/signup']);
  }
}
