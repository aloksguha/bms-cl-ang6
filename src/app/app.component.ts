import { Component, OnInit, OnDestroy } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{

  constructor(){

  }
  ngOnInit(){
  firebase.initializeApp({
    apiKey: "AIzaSyDzSysqYyC9kxZ7QkvAYBOdZqO4bqH4cc4",
    authDomain: "bms-server-a57e9.firebaseapp.com",
    databaseURL: "https://bms-server-a57e9.firebaseio.com",
    projectId: "bms-server-a57e9",
    storageBucket: "bms-server-a57e9.appspot.com",
    messagingSenderId: "1064933094771"
    })
  }

  ngOnDestroy(){

  }

}
