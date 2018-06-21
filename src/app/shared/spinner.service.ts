import { NgxSpinnerService } from 'ngx-spinner';
import { Injectable } from '@angular/core';

@Injectable()
export class SpinnerService {
    constructor(private spinner: NgxSpinnerService) { }

    showSpinner(){
        this.spinner.show();
    }

    hideSpinner(){
        this.spinner.hide();
    }

}