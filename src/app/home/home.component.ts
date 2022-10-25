import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import axios from 'axios';
import {Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('fileSelect') myInputVariable?: ElementRef;
  
  filename: any;
  format: any;
  formfile: any;
  file:any;
  showLoader: boolean = false;
  disables: boolean=true;

  constructor(private router:Router,private _snackBar: MatSnackBar,private http: HttpClient){

      console.log("Home component")
    //   let datas=localStorage.getItem('authtokens');
    //   console.log(datas);
    //   if(datas){
    //   try {
    //     axios({
    //       method: 'post',
    //       url: 'http://127.0.0.1:5002/checkAuth',
    //       data:JSON.parse(datas)
    //     }).then( (response) => {
    //         console.log(response);
    //         if(response.data){
    //           if(response.data.status==="Valid"){ 
    //             console.log("Valid auth");                
    //           }
    //           else{
    //             alert("Please login!..")
    //             localStorage.removeItem('authtokens');
    //             this.router.navigate(['/login']);
    //           }
    //         }
    //         else{
    //           alert("Please login!..")
    //           localStorage.removeItem('authtokens');
    //           this.router.navigate(['/login']);
    //         }
    //       });
    //   }catch (error) {
    //     alert("Internal Server Error!..");
    //     localStorage.removeItem('authtokens');
    //     this.router.navigate(['/login']);
    //     console.log(error);        
    //   }  
    // }
   }

  ngOnInit(): void {
  }

  onFileSelect(event: any) {
    try {
       this.file = event.target.files[0];
      if (this.file) {
        this.filename = this.file.name;
        this.format = this.file.name.split('.');
        // this.format = this.format[1];
        if (this.format[1] != 'csv') {
          this._snackBar.open("Please select only CSV file", "Close", { duration: 3000 });
          this.deleteFile();
        } else {
          this.formfile = new FormData();
          this.formfile.append('file', this.file);
          this._snackBar.open("Successfully selected CSV file", "OK", { duration: 3000 });
          console.log("this.formfile", this.formfile);
        }
      }
    } catch (error) {
      this.deleteFile();
      console.log('no file was selected...');
    }
  }
  fileUpload() {
     if (this.file) {
      this.showLoader = true;
      let url = "http://127.0.0.1:5002/uploadcsv"
      this.http.post(url, this.formfile).subscribe((res) => {
        console.log(res);
        let d=[];
        this.disables = false;
        this.showLoader = false;
        this._snackBar.open("File successfully uploaded", "Ok", { duration: 5000 });
      },(error) => {
          console.log(error);
          this.disables=true;
          this.showLoader = false;
          this._snackBar.open(error.message, "Close", { duration: 5000 });
        });
    }else{
      this._snackBar.open("Please select the file", "Ok", { duration: 3000 });
    }
  }
  deleteFile(){
    this.file = null;
    this.format = null;
    this.filename = null;
    this.disables=true;
    this.formfile.delete('file');
  }
  logout(){
    console.log("Logout");
  }
  submit(){
    console.log("Submit")
  }
}
