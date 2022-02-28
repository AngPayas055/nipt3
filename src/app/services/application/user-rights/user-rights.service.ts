import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppSettings } from 'src/app/app-settings';
import { UserRightsModel } from 'src/app/models/user-rights.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': ['application/json', 'application/x-www-form-urlencoded'],
    Authorization: 'Bearer ' + localStorage.getItem('token')
  })
}

@Injectable({
  providedIn: 'root'
})
export class UserRightsService {

  constructor(
    private http: HttpClient,
    private appSettings: AppSettings
  ) { }

  private defaultAPIURLHost: string = this.appSettings.APIURLHost;


  // Get all User Rights
  getAllUserRights(): Observable<[boolean, any[]]> {
    return new Observable<[boolean, any[]]>((observer) => {

      let userRights: UserRightsModel[] = [];

      this.http.get<any>(this.defaultAPIURLHost + '/api/user_rights', httpOptions).subscribe(
        response => {

          let results = response['data']
          if (results != null) {

            var data = results
            if (data.length > 0) {

              for (let i = 0; i <= data.length - 1; i++) {

                userRights.push({
                  id: data[i].id,
                  user_id: data[i].user_id,
                  system_module_id: data[i].system_module_id,
                  can_add: data[i].can_add,
                  can_edit: data[i].can_edit,
                  can_delete: data[i].can_delete,
                  can_print: data[i].can_print,
                  can_lock: data[i].can_lock
                });
              }
            }
          }

          observer.next([true, userRights]);
          observer.complete();
        },
        (error) => {

          observer.next([false, error]);
          observer.complete();
        })
    })
  }


  // Get User Rights by ID
  getUserRightsById(id: number): Observable<[boolean, any]> {

    return new Observable<[boolean, any]>((observer) => {

      let userRights: UserRightsModel;

      this.http.get<any>(this.defaultAPIURLHost + '/api/user_rights/' + id, httpOptions).subscribe(
        (response) => {
          let result = response['data']
          if (result != null) {
            userRights = {
              id: result.id,
              user_id: result.user_id,
              system_module_id: result.system_module_id,
              can_add: result.can_add,
              can_edit: result.can_edit,
              can_delete: result.can_delete,
              can_print: result.can_print,
              can_lock: result.can_lock
            };
          }

          observer.next([true, userRights]);
          observer.complete();
        },
        (error) => {

          observer.next([false, error]);
          observer.complete();
        })
    })
  }


  // Register new UuserRigths
  adduserRights(data: UserRightsModel): Observable<[boolean, UserRightsModel]> {

    let userRights: UserRightsModel = {
      id: data.id,
      user_id: data.user_id,
      system_module_id: data.system_module_id,
      can_add: data.can_add,
      can_edit: data.can_edit,
      can_delete: data.can_delete,
      can_print: data.can_print,
      can_lock: data.can_lock
    };

    return new Observable<[boolean, UserRightsModel]>((observer) => {

      this.http.post<UserRightsModel>(this.defaultAPIURLHost + '/api/user_rights', userRights, httpOptions).subscribe(
        (response) => {
          let data = response;
          observer.next([true, data]);
          observer.complete();
        },
        (error) => {

          observer.next([false, error['error'].message]);
          observer.complete();
        });
    });
  }

  // Updated Exsisting User Rights
  updateUserRights(id: number, data: UserRightsModel): Observable<[boolean, UserRightsModel]> {

    let userRights: UserRightsModel = {
      id: data.id,
      user_id: data.user_id,
      system_module_id: data.system_module_id,
      can_add: data.can_add,
      can_edit: data.can_edit,
      can_delete: data.can_delete,
      can_print: data.can_print,
      can_lock: data.can_lock
    };
    return new Observable<[boolean, UserRightsModel]>((observer) => {

      this.http.put<UserRightsModel>(this.defaultAPIURLHost + '/api/user_rights/' + id, userRights, httpOptions).subscribe(
        (response) => {

          let data = response;
          observer.next([true, data]);
          observer.complete();
        }, (error) => {
          observer.next([false, error['error'].message]);
          observer.complete();
        })
    })
  }


  // Delete User Rights By ID
  deleteUserRights(id: number): Observable<[boolean, UserRightsModel]> {

    return new Observable<[boolean, UserRightsModel]>((observer) => {

      this.http.delete<UserRightsModel>(this.defaultAPIURLHost + '/api/user_rights/' + id, httpOptions).subscribe(
        (response) => {

          observer.next([true, response]);
          observer.complete();
        },
        (error) => {

          observer.next([false, error.error]);
          observer.complete();
        })
    })
  }
}
