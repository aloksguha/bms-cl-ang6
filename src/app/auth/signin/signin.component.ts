import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit, OnDestroy {
  model : any = {};
  error : any = {}
  constructor(private authservice: AuthService) { }
  ngOnInit() {
    
  }

  ngOnDestroy(){
  }

  onSignin(form: NgForm){
    if(form.valid){
      const email = form.value.email;
      const pwd = form.value.password;
      this.authservice.singinUser(email, pwd);
    }
  }

  onSigninAsTestUser(){
    this.authservice.signinAsTestUser();
  }
}
