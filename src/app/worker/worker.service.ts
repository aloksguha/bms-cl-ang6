import { Injectable } from "@angular/core";
import { HomeWorker } from "./homeworker.model";
import { Attendance } from "./attendance.model";
import { Subject, BehaviorSubject } from "rxjs";

@Injectable()
export class WorkerService{
    workersSubject = new Subject<HomeWorker>();
    selectedDate = new Subject<any>();
    eventSubject = new Subject<any>();
    eventsobs = this.eventSubject.asObservable();
    eventsUpdated =  new Subject<string>();

    constructor(){

    }
    private homeworker: HomeWorker[] = [
        new HomeWorker('1','Sunita', 'Cook', new Date('June 1, 2018  03:24:00'), 3000, [
            new Attendance('1',true, new Date('June 1, 2018  08:00:00')),
        

        ]),
        new HomeWorker('2','Sangita', 'Sweeper', new Date('June 2, 2018  03:24:00'), 2000, [
            new Attendance('2',false, new Date('June 11, 2018  08:00:00'))
        ])
    ] ;

    getHomeWorkers(){
        return this.homeworker.slice();
    }

    getHomeWorker(id: number){
        return this.homeworker.slice()[id];
    }

    addEvent(id: number, newevent: Attendance){
        this.homeworker[id].attendanceEvents.push(newevent);
        this.eventsUpdated.next('updated');
        console.log(this.homeworker[id]);
    }
}