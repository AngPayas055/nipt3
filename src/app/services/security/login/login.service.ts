import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppSettings } from '../../../app-settings';
import { LoginModel } from '../../../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private appSettings: AppSettings,
    private httpClient: HttpClient
  ) { }

  public defaultAPIURLHost: string = this.appSettings.APIURLHost;
  public options: any = {
    headers: new HttpHeaders({
      'Content-Type': ['application/x-www-form-urlencoded', 'application/json']
    })
  };

  userlogin(data: any): Observable<LoginModel | any> {
    let url = this.defaultAPIURLHost + "/api/login";
    return this.httpClient.post(url, data).pipe(catchError(this.handleErrorLogin));
  }

  handleErrorLogin(error: HttpErrorResponse) {
    return throwError(error);
  }
}
