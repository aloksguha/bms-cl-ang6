import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { WorkerService } from '../../worker.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Attendance } from '../../attendance.model';
import { DataStorageService } from '../../../shared/datastorage.service';

@Component({
  selector: 'app-worker-event-add',
  templateUrl: './worker-event-add.component.html',
  styleUrls: ['./worker-event-add.component.css']
})
export class WorkerEventAddComponent implements OnInit{
  @ViewChild('f') slForm: NgForm;
  eventData : any;
  constructor(private service: WorkerService,
    private router: Router,
    private route : ActivatedRoute,
    private dataService : DataStorageService) { }

    ngOnInit() {
      this.service.selectedDate.subscribe(
        (data:any) => {
          console.log(data);
          this.eventData = data;
          this.initForm();
        });
  }

  initForm(){
      this.slForm.setValue({
        dt : this.eventData.day.date,
        attdn : "true"
      });
  }




  onAddItem(form : NgForm){
    const val = form.value;
    let attdendc = val.attdn === "true" ? true : false;
    console.log(val.dt);
   // this.service.addEvent(this.eventData.selectedWorker, new Attendance(null, attdendc, new Date(this.eventData.day.date)));
    this.dataService.saveEvent(this.eventData.selectedWorker, new Attendance(null, attdendc, new Date(this.eventData.day.date)))
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onCancel(){
    this.router.navigate(['../'], {relativeTo: this.route});
  }

}
