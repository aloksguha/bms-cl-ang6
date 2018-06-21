import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  model : any = {};
  constructor(private authservice : AuthService) { }

  ngOnInit() {
  }

  onSignup(form: NgForm){
    console.log(form.valid);
    if(form.valid){
      const email = form.value.email;
      const pwd = form.value.password;
      this.authservice.singupUser(email, pwd);
    }
    else{
      console.log(form.errors);
    }
    
  }

}
