import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';




@Injectable()
export class ToasterService 
{

    
    config : any = {
        timeOut: 3000,
        progressAnimation: 'increasing',
        closeButton : true,
        progressBar : true
    } 

    constructor(private service: ToastrService){}

    showToasterMessage( messageType: string, message: string, messageHeader : string){
        messageType = messageType.toUpperCase();
        switch(messageType) {
            case "SUCCESS": {
                this.service.success(message, messageHeader, this.config);
                break;
            }
            case "ERROR": {
                this.service.error(message, messageHeader, this.config);
                break;
            }
            case "INFO": {
                this.service.info(message, messageHeader, this.config);
                break;
            }
            case "WARNING": {
                this.service.warning(message, messageHeader, this.config);
                break;
            }
            default: {
                this.service.info(message, messageHeader, this.config);
                break;
            } 
        }
    }


}