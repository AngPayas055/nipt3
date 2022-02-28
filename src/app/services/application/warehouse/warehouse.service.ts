import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppSettings } from 'src/app/app-settings';
import { WarehouseModel } from 'src/app/models/warehouse.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': ['application/json', 'application/x-www-form-urlencoded'],
    Authorization: 'Bearer ' + localStorage.getItem('token')
  })
}

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {

  constructor(
    private http: HttpClient,
    private appSettings: AppSettings
  ) { }

  private defaultAPIURLHost: string = this.appSettings.APIURLHost;

  // Get all warehouses
  getAllwarehouses(): Observable<[boolean, any[]]> {
    return new Observable<[boolean, any[]]>((observer) => {

      let warehouses: WarehouseModel[] = [];

      this.http.get<any>(this.defaultAPIURLHost + '/api/warehouses', httpOptions).subscribe(
        response => {

          let results = response['data']
          if (results != null) {

            var data = results
            if (data.length > 0) {

              for (let i = 0; i <= data.length - 1; i++) {

                warehouses.push({
                  id: data[i].id,
                  branch_id: data[i].branch_id,
                  warehouse: data[i].warehouse,
                  particulars: data[i].particulars,
                });
              }
            }
          }

          observer.next([true, warehouses]);
          observer.complete();
        },
        (error) => {

          observer.next([false, error]);
          observer.complete();
        })
    })
  }


  // Get warehouse by ID
  getWarehouseById(id: number): Observable<[boolean, any]> {

    return new Observable<[boolean, any]>((observer) => {

      let warehouse: WarehouseModel;

      this.http.get<any>(this.defaultAPIURLHost + '/api/warehouses/' + id, httpOptions).subscribe(
        (response) => {
          let result = response['data']
          if (result != null) {
            warehouse = {
              id: result.id,
              branch_id: result.branch_id,
              warehouse: result.warehouse,
              particulars: result.particulars,
            };
          }

          observer.next([true, warehouse]);
          observer.complete();
        },
        (error) => {

          observer.next([false, error]);
          observer.complete();
        })
    })
  }


  // Register new warehouse
  addWarehouse(data: WarehouseModel): Observable<[boolean, WarehouseModel]> {

    let warehouse: WarehouseModel = {
      id: data.id,
      branch_id: data.branch_id,
      warehouse: data.warehouse,
      particulars: data.particulars,
    };

    return new Observable<[boolean, WarehouseModel]>((observer) => {

      this.http.post<WarehouseModel>(this.defaultAPIURLHost + '/api/warehouses', warehouse, httpOptions).subscribe(
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

  // Updated Exsisting warehouse
  updateWarehouse(id: number, data: WarehouseModel): Observable<[boolean, WarehouseModel]> {

    let warehouse: WarehouseModel = {
      id: data.id,
      branch_id: data.branch_id,
      warehouse: data.warehouse,
      particulars: data.particulars,
    };
    return new Observable<[boolean, WarehouseModel]>((observer) => {

      this.http.put<WarehouseModel>(this.defaultAPIURLHost + '/api/warehouses/' + id, warehouse, httpOptions).subscribe(
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
  deleteWarehouse(id: number): Observable<[boolean, WarehouseModel]> {

    return new Observable<[boolean, WarehouseModel]>((observer) => {

      this.http.delete<WarehouseModel>(this.defaultAPIURLHost + '/api/warehouse/' + id, httpOptions).subscribe(
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
