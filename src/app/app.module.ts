import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule} from '@angular/http';
import { AppComponent } from './app.component';
import { CalendarModule } from 'angular-calendar';
import { HeaderComponent } from './header/header.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AppRoutingModule } from './router/app.router.module';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/authgaurd.service';
import { WorkerComponent } from './worker/worker/worker.component';
import { WorkerStartComponent } from './worker/worker-start/worker-start.component';
import { WorkerEditComponent } from './worker/worker-edit/worker-edit.component';
import { WorkerDetailsComponent } from './worker/worker-details/worker-details.component';
import { WorkerListComponent } from './worker/worker-list/worker-list.component';
import { WorkerCardComponent } from './worker/worker-list/worker-card/worker-card.component';
import { WorkerService } from './worker/worker.service';
import { WorkerEventAddComponent } from './worker/worker-details/worker-event-add/worker-event-add.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SpinnerService } from './shared/spinner.service';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToasterService } from './shared/toaster.service';
import { WorkerAddComponent } from './worker/worker-add/worker-add.component';
import { DataStorageService } from './shared/datastorage.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { TestComponent } from './test/test.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SigninComponent,
    SignupComponent,
    WorkerComponent,
    WorkerStartComponent,
    WorkerEditComponent,
    WorkerDetailsComponent,
    WorkerListComponent,
    WorkerCardComponent,
    WorkerEventAddComponent,
    WorkerAddComponent,
    TestComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    CalendarModule.forRoot(),
    NgbModule.forRoot()
  ],
  providers: [AuthService, AuthGuard, WorkerService,SpinnerService, ToasterService, DataStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
