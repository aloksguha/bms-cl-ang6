import { Component, OnInit } from '@angular/core';
import { HomeWorker } from '../homeworker.model';
import { WorkerService } from '../worker.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscriber, Subscription } from 'rxjs';
import { DataStorageService } from '../../shared/datastorage.service';

@Component({
  selector: 'app-worker-list',
  templateUrl: './worker-list.component.html',
  styleUrls: ['./worker-list.component.css']
})
export class WorkerListComponent implements OnInit {
  workersSub : Subscription;
  homeworkers : HomeWorker[] = [];
  constructor(private service: WorkerService,
              private router: Router,
              private route : ActivatedRoute,
              private dataservice : DataStorageService) { }

  ngOnInit() {
    this.dataservice.getWorkers();
    this.workersSub = this.service.workersSubject.subscribe(
      (worker: HomeWorker) => {
        //console.log(worker);
        this.homeworkers.push(worker);
      }
    )
    //this.homeworkers = this.service.getHomeWorkers();
  }

  onclickNewWorker(){
    this.router.navigate(['add'], { relativeTo : this.route});
  }

}
