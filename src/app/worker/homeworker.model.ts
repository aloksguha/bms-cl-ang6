import { Attendance } from "./attendance.model";

export class HomeWorker {
    public id : string;
    public name: string; 
    public description: string;
    public startDate : Date;
    public wages : number;
    public attendanceEvents : Attendance[];
    
    constructor(id : string, name:string, desc:string, startDate : Date, wages : number, attendanceEvents: Attendance[]){
        this.id = id;
        this.name = name;
        this.description = desc;
        this.startDate = startDate;
        this.wages = wages;
        this.attendanceEvents = attendanceEvents;
    }
}