import { ErrorHandler, Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root'
})
export class ErrorhandlerService implements ErrorHandler{
    constructor() {}
handleError(error: any) {
        // Implement your own way of handling errors
    }
}