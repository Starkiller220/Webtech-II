import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {ApiService} from '../../service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  hide = true;
  
  username = new FormControl('');
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('');

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  constructor(private _apiservice: ApiService, private _router: Router) { }

  ngOnInit(): void {
  }

  registerButton():void{
    if(this.username.valid && this.email.valid && this.password.valid)
    {
      let data = {
        username: this.username.value,
        email: this.email.value,
        password: this.password.value
      }

      this._apiservice.createUser(data).subscribe(
        (res) => {
          console.log('User successfully created!');
          this._router.navigate(["login"])
        }, (error) => {
          console.log(error);
        });
      console.log(data)
    }
  }

}
