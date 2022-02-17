import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppSettings } from '../../../app-settings';

@Injectable({
  providedIn: 'root'
})
export class UserListService {

  constructor( private appSettings: AppSettings,
    private httpClient: HttpClient ) { }

  defaultAPIURLHost: string = this.appSettings.APIURLHost;
  options: any = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Bearer '+ localStorage.getItem('token')
    })
  };

  getAllUsers(): Observable<any> {
    let url = this.defaultAPIURLHost + "/api/users";
    return this.httpClient.get(url, this.options).pipe(catchError(this.handleError))
  }

  handleError(error : HttpErrorResponse){
    return throwError(error);
  }

}
