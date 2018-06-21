import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router"
import { SignupComponent } from "../auth/signup/signup.component";
import { SigninComponent } from "../auth/signin/signin.component";
import { WorkerComponent } from "../worker/worker/worker.component";
import { WorkerStartComponent } from "../worker/worker-start/worker-start.component";
import { WorkerDetailsComponent } from "../worker/worker-details/worker-details.component";
import { WorkerEventAddComponent } from "../worker/worker-details/worker-event-add/worker-event-add.component";
import { WorkerAddComponent } from "../worker/worker-add/worker-add.component";
import { AuthGuard } from "../auth/authgaurd.service";


const appRoutes : Routes = [
    {path : 'hw', component: WorkerComponent, canActivate: [AuthGuard],
        children : [
            {path : '', component : WorkerStartComponent, canActivate: [AuthGuard]},
            {path : 'add', component : WorkerAddComponent, canActivate: [AuthGuard]},
            {path : ':id', component : WorkerDetailsComponent, canActivate: [AuthGuard],  runGuardsAndResolvers: 'always', 
                children : [
                    {path : 'add', component : WorkerEventAddComponent, canActivate: [AuthGuard]},
                    {path : ':id/edit', component : WorkerEventAddComponent, canActivate: [AuthGuard]}
                ]
        }
        ]
    },
    { path: 'signup', component : SignupComponent},
    { path: 'signin', component : SigninComponent},
    { path : '', redirectTo: '/signin', pathMatch:'full'}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, { onSameUrlNavigation: 'reload'})],
    exports: [RouterModule]
})
export class AppRoutingModule {

}