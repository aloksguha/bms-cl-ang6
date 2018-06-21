import { Injectable, OnInit } from "@angular/core";
import { Http, Response } from "@angular/http";
import { AuthService } from "../auth/auth.service";
import { SpinnerService } from "./spinner.service";
import { HomeWorker } from "../worker/homeworker.model";
import * as firebase from 'firebase';
import { WorkerService } from "../worker/worker.service";
import { Attendance } from "../worker/attendance.model";

@Injectable()
export class DataStorageService {
    triggerRegistered : boolean = false;
    constructor(private http: Http,
        private authservice: AuthService,
        private spinnerService: SpinnerService,
        private homeWorkerService : WorkerService
    ) {

    }

    createWorkerDatabaseUpdateTrigger() {
        this.triggerRegistered = true;
        console.log('trigger registered');
        let currentUser = this.authservice.getCurrentUser();
        firebase.database().ref('/workers').child(currentUser.uid).
        limitToLast(1).on('child_added',(snapshot)=>{
            console.log('trigger worked');
           // snapshot.forEach((childSnapshot) => {
                // key will be "ada" the first time and "alan" the second time
                 var key = snapshot.key;
                console.log(key)
                // childData will be the actual contents of the child
                var childData = snapshot.val();
                console.log(childData)
               // works.push(childData);
                //new HomeWorker()
                if(key !== undefined && childData!== undefined){
                    let hworker = new HomeWorker(key.toString(), 
                        childData.name,
                        childData.description,
                        childData.startDate, 
                        childData.wages, []);
                    this.homeWorkerService.workersSubject.next(hworker);
                }
               
         // });
        });
    }


    saveEvent(workerid: string, newEvent: Attendance) {
        console.log(newEvent.onDate);
        let currentUser = this.authservice.getCurrentUser();

        firebase.database().ref('/events').child(currentUser.uid).child(workerid).push({
            status:newEvent.status,
            onDate: +newEvent.onDate
        }, function (error) {
            if (error) {
                console.log('Error has occured during saving process');
            }
            else {
                console.log("Event has been saved succesfully !!")
            }
        })
    }

    saveHomeWorker(worker: HomeWorker) {
        console.log(worker);
        if(!this.triggerRegistered){
            this.createWorkerDatabaseUpdateTrigger();
        }
        
        let currentUser = this.authservice.getCurrentUser();
        firebase.database().ref('/workers').child(currentUser.uid).push({
            name : worker.name,
            description : worker.description,
            startDate : worker.startDate,
            wages : worker.wages
        }, function (error) {
            if (error) {
                console.log('Error has occured during saving process');
            }
            else {
                console.log("Data hss been saved succesfully")
            }
        })
    }
    //firebase.database().ref('/events').child(currentUser.uid).child(workerid)

    getWorkersEvents(workerid: string){
        let currentUser = this.authservice.getCurrentUser();
        firebase.database().ref('/events').child(currentUser.uid).child(workerid).orderByKey()
        .once("value", (snapshot) => {
           // console.log(typeof snapshot)
            console.log(snapshot)
            console.log(JSON.stringify(snapshot));
            //console.log(snapshot.key)

            snapshot.forEach((childSnapshot) => {
                  var key = childSnapshot.key;
                  console.log(key)
                var childData = childSnapshot.val();
                console.log(childData)
                if(key !== undefined && childData !== undefined ){
                    let hworker = new Attendance(key.toString(), childData.status, new Date(childData.onDate));
                    var calEvent = {
                        id : hworker.id,
                        title: hworker.status ? 'Present': 'Absent',
                        start: hworker.onDate,
                        end: hworker.onDate,
                        cssClass : 'eventcursor',
                        draggable: false
                    }
                    this.homeWorkerService.eventSubject.next(hworker);
                }
          });
        })
    }

    getWorkers(){
        let currentUser = this.authservice.getCurrentUser();
        var ref = firebase.database().ref('/workers').child(currentUser.uid).orderByKey();
        ref.once("value", (snapshot) => {
            //this.homeWorkerService
            //let works = []
            console.log(snapshot)
            console.log(JSON.stringify(snapshot));
            snapshot.forEach((childSnapshot) => {
                // key will be "ada" the first time and "alan" the second time
                  var key = childSnapshot.key;
                //  console.log(key)
                // childData will be the actual contents of the child
                var childData = childSnapshot.val();
                //console.log(childData)
               // works.push(childData);
                //new HomeWorker()
                if(key !== undefined && childData !== undefined ){
                    console.log('coming in')
                    let hworker = new HomeWorker(key.toString(), childData.name, childData.description,childData.startDate, childData.wages, []);
                    this.homeWorkerService.workersSubject.next(hworker);
                }
          });
        })
    }
        //firebase.database().ref().

        // storeRecipes(){
        //     const token = this.authservice.getToken();
        //     return this.http.put(
        //         'https://recipe-shopping-udemy.firebaseio.com/recipes.json?auth='+token,
        //         this.recipeService.getRecipes()
        //      );
        // }

        // getRecipes(){
        //     const token = this.authservice.getToken();
        //     return this.http.get(
        //         'https://recipe-shopping-udemy.firebaseio.com/recipes.json?auth='+token
        //     ).map(
        //         (response : Response) =>{
        //             const recipes : Recipe[] = response.json();
        //             for(let recipe of recipes){
        //                 if(!recipe['ingrediants']){
        //                     recipe['ingrediants'] = [];
        //                 }
        //             }
        //             return recipes;
        //         }
        //     )

        //     .subscribe(
        //         (recipes : Recipe[]) => {
        //             this.recipeService.updateRecipes(recipes);
        //         }
        //     );
        // }

    
}