import { Injectable } from "@angular/core";
import * as firebase from 'firebase';
import { Router } from "@angular/router";
import { SpinnerService } from "../shared/spinner.service";
import { Subject } from "rxjs";
import { ToasterService } from "../shared/toaster.service";

@Injectable()
export class AuthService {
    token : string = null;
    istestUser = false;
    constructor(private router:Router, private spinner: SpinnerService, private tstService : ToasterService){

    }

    getCurrentUser(){
        return firebase.auth().currentUser;
    }
    signinAsTestUser(){
        this.istestUser = true;
        this.singinUser('test@test.com', 'alokalok');
    }

    singupUser(email: string, password: string){
        this.spinner.showSpinner();
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then( (success) => {
            console.log('success of signup');
            console.log(success);
            this.tstService.showToasterMessage('SUCCESS',"User is regisered, Please login !!","Almost there");
            this.spinner.hideSpinner();
            this.router.navigate(['/signin']);
        })
        .catch(
            (error) => {
                this.spinner.hideSpinner();
                console.error(error);
                this.tstService.showToasterMessage('ERROR',error.message,"Error");
            }
        );

    }

    singinUser(email: string, password: string){
        this.spinner.showSpinner();
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then( (success) => {
            this.spinner.hideSpinner();
            this.router.navigate(['/hw']);
            console.log('success of signin');
            console.log(success);
            this.tstService.showToasterMessage('INFO','User Authenticated Successfully',"User Authenticated");
            this.spinner.hideSpinner();
            firebase.auth().currentUser.getIdToken()
            .then(
                (newtoken: string) => {
                    this.token = newtoken;
                }
            );
        })
        .catch(
            (error) => {
                this.spinner.hideSpinner();
                this.tstService.showToasterMessage('ERROR',error.message,"Invalid Credientials");
            }
        );
    }

    signinfromgoogleAccount(){
        return firebase.auth().signInWithPopup(
            new firebase.auth.GoogleAuthProvider()
        ).then( (success) => {
            this.spinner.hideSpinner();
            this.router.navigate(['/hw']);
            console.log('success of signin');
            console.log(success);
            this.tstService.showToasterMessage('INFO','User Authenticated Successfully',"User Authenticated");
            this.spinner.hideSpinner();
            firebase.auth().currentUser.getIdToken()
            .then(
                (newtoken: string) => {
                    this.token = newtoken;
                }
            );
        })
        .catch(
            (error) => {
                this.spinner.hideSpinner();
                this.tstService.showToasterMessage('ERROR',error.message,"Invalid Credientials");
            }
        );

    }

    getToken(){
         firebase.auth().currentUser.getIdToken()
        .then(
            (newtoken: string) => {
                this.token = newtoken;
               
            }
        );
        return this.token;
    }

    isAuthenticated(){
        return this.token != null; 
    }

    logoutUser(){
        this.istestUser = false;
        firebase.auth().signOut();
        this.tstService.showToasterMessage('INFO',"User Logged-out successfully.","Logout");
        this.router.navigate(['/signin']);
        this.token = null;
    }

}