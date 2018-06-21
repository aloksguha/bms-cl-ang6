import { Component, OnInit, Input } from '@angular/core';
import { HomeWorker } from '../../homeworker.model';
import { DataStorageService } from '../../../shared/datastorage.service';

@Component({
  selector: 'app-worker-card',
  templateUrl: './worker-card.component.html',
  styleUrls: ['./worker-card.component.css']
})
export class WorkerCardComponent implements OnInit {
  @Input() homeworker : HomeWorker;
  constructor(private dataservice: DataStorageService) { }

  ngOnInit() {
  }

}
