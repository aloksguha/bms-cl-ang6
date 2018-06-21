export class Attendance {
    id : string
    status : boolean;
    onDate : Date;

    constructor(id: string, status : boolean, onDate: Date){
        this.id = id;
        this.status = status;
        this.onDate = onDate;
    }
}