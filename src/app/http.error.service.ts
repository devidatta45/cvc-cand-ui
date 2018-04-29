import { Injectable } from '@angular/core';

import { Headers, Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';


import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';


@Injectable()
export class ErrorService {
    constructor(private http: Http, private toastyService: ToastyService, private toastyConfig: ToastyConfig) { }

    toastOptions: ToastOptions = {
        title: "Error",
        msg: "User does not exist",
        showClose: true,
        timeout: 5000,
        theme: 'material',
        onAdd: (toast: ToastData) => {
            console.log('Toast ' + toast.id + ' has been added!');
        },
        onRemove: function (toast: ToastData) {
            console.log('Toast ' + toast.id + ' has been removed!');
        }
    };

    showError(error:any):any {
        console.error('An error occurred', error);
        this.toastOptions.title = "Error";
        this.toastOptions.msg = "Server Error";
        this.toastyService.error(this.toastOptions);
    }
}