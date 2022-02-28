import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppSettings } from 'src/app/app-settings';
import { YardModel } from 'src/app/models/yard.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': ['application/json', 'application/x-www-form-urlencoded'],
    Authorization: 'Bearer ' + localStorage.getItem('token')
  })
}

@Injectable({
  providedIn: 'root'
})
export class YardService {

  constructor(
    private http: HttpClient,
    private appSettings: AppSettings
  ) { }

  private defaultAPIURLHost: string = this.appSettings.APIURLHost;

  // Get all Yard
  getAllYards(): Observable<[boolean, any[]]> {
    return new Observable<[boolean, any[]]>((observer) => {

      let yard: YardModel[] = [];

      this.http.get<any>(this.defaultAPIURLHost + '/api/yards', httpOptions).subscribe(
        response => {

          let results = response['data']
          if (results != null) {

            var data = results
            if (data.length > 0) {

              for (let i = 0; i <= data.length - 1; i++) {

                yard.push({
                  id: data[i].id,
                  branch_id: data[i].branch_id,
                  yard: data[i].yard,
                  particulars: data[i].particulars,
                });
              }
            }
          }

          observer.next([true, yard]);
          observer.complete();
        },
        (error) => {

          observer.next([false, error]);
          observer.complete();
        })
    })
  }


  // Get wyard by ID
  getYardById(id: number): Observable<[boolean, any]> {

    return new Observable<[boolean, any]>((observer) => {

      let yard: YardModel;

      this.http.get<any>(this.defaultAPIURLHost + '/api/yards/' + id, httpOptions).subscribe(
        (response) => {
          let result = response['data']
          if (result != null) {

            yard = {
              id: result.id,
              branch_id: result.branch_id,
              yard: result.yard,
              particulars: result.particulars,
            };
          }

          observer.next([true, yard]);
          observer.complete();
        },
        (error) => {

          observer.next([false, error]);
          observer.complete();
        })
    })
  }


  // Register new Yard
  addYard(data: YardModel): Observable<[boolean, YardModel]> {

    let yard: YardModel = {
      id: data.id,
      branch_id: data.branch_id,
      yard: data.yard,
      particulars: data.particulars,
    };

    return new Observable<[boolean, YardModel]>((observer) => {

      this.http.post<YardModel>(this.defaultAPIURLHost + '/api/yards', yard, httpOptions).subscribe(
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

  // Updated Exsisting yard
  updateYard(id: number, data: YardModel): Observable<[boolean, YardModel]> {

    let yard: YardModel = {
      id: data.id,
      branch_id: data.branch_id,
      yard: data.yard,
      particulars: data.particulars,
    };
    return new Observable<[boolean, YardModel]>((observer) => {

      this.http.put<YardModel>(this.defaultAPIURLHost + '/api/yards/' + id, yard, httpOptions).subscribe(
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


  // Delete Yard By ID
  deleteYard(id: number): Observable<[boolean, YardModel]> {

    return new Observable<[boolean, YardModel]>((observer) => {

      this.http.delete<YardModel>(this.defaultAPIURLHost + '/api/yards/' + id, httpOptions).subscribe(
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
