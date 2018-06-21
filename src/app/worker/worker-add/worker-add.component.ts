import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm } from '@angular/forms';
import { DataStorageService } from '../../shared/datastorage.service';
import { HomeWorker } from '../homeworker.model';

@Component({
  selector: 'app-worker-add',
  templateUrl: './worker-add.component.html',
  styleUrls: ['./worker-add.component.css']
})
export class WorkerAddComponent implements OnInit {
  id;
  editMode = false;
  model : any = {};
  constructor(private router: Router,
              private route: ActivatedRoute,
              private dataService : DataStorageService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null; 
        this.initForm();
      }
    );
  }

  private initForm(){
    let recipeName = '';
    let recipeDesc = '';
    let recipeImagePath = '';
  }  

  onCancel(){
    this.router.navigate(['..'], { relativeTo : this.route});
  }

  onAddWorker(form: NgForm){
    console.log(form.value);
    if(form.valid){
      let nval = form.value;
      let newWorker = new HomeWorker(null, form.value.name, 
        form.value.jobtype, 
        form.value.startdt,
        form.value.wages,
        []);
        this.dataService.saveHomeWorker(newWorker);
        this.router.navigate(['..'], { relativeTo : this.route}); 
    }
  }

}
