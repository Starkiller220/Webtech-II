import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {ApiService} from '../../service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  hide = true;

  username = new FormControl('');
  password = new FormControl('');

  constructor(private _apiservice: ApiService,private _router: Router) { }

  ngOnInit(): void {
  }


  loginButton():void
  {
    if(this.username.valid && this.password.valid)
    {

      this._apiservice.getUser(this.username.value).subscribe(
        (res) => {
          if(this.password.value == res.password)
          {
            console.log("Login successfull!");
            this._router.navigate(["home"]);
          }
          else{
            console.log("Invalid username or password!")
          }

        }, (error) => {
          console.log(error);
        });
    }
  }

}
  
