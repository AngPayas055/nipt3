import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppSettings } from 'src/app/app-settings';
import { StorageTypeModel } from 'src/app/models/storage-type.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': ['application/json', 'application/x-www-form-urlencoded'],
    Authorization: 'Bearer ' + localStorage.getItem('token')
  })
}

@Injectable({
  providedIn: 'root'
})
export class StorageTypeService {

  constructor(
    private http: HttpClient,
    private appSettings: AppSettings
  ) { }

  private defaultAPIURLHost: string = this.appSettings.APIURLHost;


  // Get all Storage Type List
  getAllStorageTypes(): Observable<[boolean, any[]]> {
    return new Observable<[boolean, any[]]>((observer) => {

      let storageTypeList: StorageTypeModel[] = [];

      this.http.get<any>(this.defaultAPIURLHost + '/api/storage_types', httpOptions).subscribe(
        response => {

          let results = response['data']
          if (results != null) {

            var data = results
            if (data.length > 0) {

              for (let i = 0; i <= data.length - 1; i++) {
                storageTypeList.push({
                  id: data[i].id,
                  storage_type: data[i].storage_type,
                  color_indicator: data[i].color_indicator,
                  particulars: data[i].particulars
                });
              }
            }
          }

          observer.next([true, storageTypeList]);
          observer.complete();
        },
        (error) => {

          observer.next([false, error]);
          observer.complete();
        })
    })
  }


  // Get Storage Type by ID
  getStorageTypeById(id: number): Observable<[boolean, any]> {

    return new Observable<[boolean, any]>((observer) => {

      let storagetype: StorageTypeModel;

      this.http.get<any>(this.defaultAPIURLHost + '/api/storage_types/' + id, httpOptions).subscribe(
        (response) => {
          let result = response['data']
          if (result != null) {
            storagetype = {
              id: result.id,
              storage_type: result.storage_type,
              color_indicator: result.color_indicator,
              particulars: result.particulars,
            };
          }

          observer.next([true, storagetype]);
          observer.complete();
        },
        (error) => {

          observer.next([false, error]);
          observer.complete();
        })
    })
  }


  // Register new Storage Type
  addStorageType(data: StorageTypeModel): Observable<[boolean, StorageTypeModel]> {
    let storageType: StorageTypeModel = {
      id: data.id,
      storage_type: data.storage_type,
      color_indicator: data.color_indicator,
      particulars: data.particulars,
    };
    return new Observable<[boolean, StorageTypeModel]>((observer) => {

      this.http.post<StorageTypeModel>(this.defaultAPIURLHost + '/api/storage_types', storageType, httpOptions).subscribe(
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

  // Updated Exsisting Storage Type
  updateStorageType(id: number, data: StorageTypeModel): Observable<[boolean, StorageTypeModel]> {
    let materialType: StorageTypeModel = {
      id: data.id,
      storage_type: data.storage_type,
      color_indicator: data.color_indicator,
      particulars: data.particulars,
    };
    return new Observable<[boolean, StorageTypeModel]>((observer) => {

      this.http.put<StorageTypeModel>(this.defaultAPIURLHost + '/api/storage_types/' + id, materialType, httpOptions).subscribe(
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


  // Delete Storage Type By ID
  deleteStorageType(id: number): Observable<[boolean, StorageTypeModel]> {

    return new Observable<[boolean, StorageTypeModel]>((observer) => {

      this.http.delete<StorageTypeModel>(this.defaultAPIURLHost + '/api/storage_types/' + id, httpOptions).subscribe(
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
