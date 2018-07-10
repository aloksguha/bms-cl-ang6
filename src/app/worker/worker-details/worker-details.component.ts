import { Component, OnInit, OnChanges, OnDestroy, Input } from '@angular/core';
import { CalendarEvent } from 'calendar-utils';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import { WorkerService } from '../worker.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { HomeWorker } from '../homeworker.model';
import { Attendance } from '../attendance.model';
import { Title } from '@angular/platform-browser';
import { Subject, Subscription, Observable, BehaviorSubject } from 'rxjs';
import { map, startWith, take } from 'rxjs/operators';
import { DataStorageService } from '../../shared/datastorage.service';
import {NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FFE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  },
  green: {
    primary: '#00FF00',
    secondary: '#ffFF88'
  }
};

@Component({
  selector: 'app-worker-details',
  templateUrl: './worker-details.component.html',
  styleUrls: ['./worker-details.component.css']
})
export class WorkerDetailsComponent implements OnInit, OnDestroy {
  id: string;
  eventsSubscription: Subscription;
  paramSubscription: Subscription;
  selectedWorker: HomeWorker;
  view: string = 'month';
  viewDate: Date = new Date();
  localeventSubject = new BehaviorSubject<any>([]);
  events$: Observable<Array<CalendarEvent<any>>>;
  activeDayIsOpen = false;
  eventsOnDay : any[] = [];
  selectedDate;

  sample: any = {
    title: 'Present',
    start: startOfDay(new Date()),
    end: addHours(new Date(), 2),
    color: colors.green,
    cssClass: 'eventcursor',
    draggable: false
  };

  constructor(private service: WorkerService,
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataStorageService,
    private modalService: NgbModal) { }

  ngOnInit() {
    console.log('initializing detail component')
    this.paramSubscription = this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.localeventSubject.next([]);
        this.dataService.getWorkersEvents(params['id']);
      }
    );

    this.events$ = this.localeventSubject.asObservable();
    this.eventsSubscription = this.service.eventSubject.subscribe(
      (val) => {
        const calEvent = {
          id: val.id,
          title: val.status ? 'Present' : 'Absent',
          start: startOfDay(val.onDate),
          end: addHours(val.onDate, 2),
          color: val.status ? colors.green : colors.red,
          cssClass: 'eventcursor',
          draggable: false
        }
        this.events$.pipe(take(1)).subscribe(
          (vals) => {
            console.log(vals);
            const newArr = [...vals, calEvent];
            this.localeventSubject.next(newArr);
          })
      }
    );
  }

  openModel(content){
    console.log('clicked');
    this.modalService.open(content);


  }

  onDayClick({ date, events }: { date: Date; events: CalendarEvent[] }, content: any): void {
    console.log(date);
    console.log(events);
    console.log(content);
    this.modalService.open(content, {backdropClass: 'light-blue-backdrop'});
    this.eventsOnDay = events;
    this.selectedDate = date;
    // if (events.length > 0 && isSameMonth(date, this.viewDate)) {
    //   if (
    //     (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
    //     events.length === 0
    //   ) {
    //     this.activeDayIsOpen = false;
    //   } else {
    //     this.activeDayIsOpen = true;
    //     this.viewDate = date;
    //   }
    // }
  }




  eventClicked(data: any) {
    // console.log(data.event.id);
    // data['selectedWorker'] = this.id;
    // this.service.selectedDate.next(data);
    // this.router.navigate([data.event.id, 'edit'], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.eventsSubscription.unsubscribe();
    this.paramSubscription.unsubscribe();
  }
}

