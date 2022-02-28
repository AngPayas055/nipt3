import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppSettings } from 'src/app/app-settings';
import { MaterialTypeModel } from 'src/app/models/material-type.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': ['application/json', 'application/x-www-form-urlencoded'],
    Authorization: 'Bearer ' + localStorage.getItem('token')
  })
}

@Injectable({
  providedIn: 'root'
})
export class MaterialTypeService {

  constructor(
    private http: HttpClient,
    private appSettings: AppSettings
  ) { }

  private defaultAPIURLHost: string = this.appSettings.APIURLHost;

  // Get all material Type list
  getAllMaterialTypes(): Observable<[boolean, any[]]> {
    return new Observable<[boolean, any[]]>((observer) => {

      let materialTypeList: MaterialTypeModel[] = [];

      this.http.get<any>(this.defaultAPIURLHost + '/api/material_types', httpOptions).subscribe(
        response => {

          let results = response['data']
          if (results != null) {

            var data = results
            if (data.length > 0) {

              for (let i = 0; i <= data.length - 1; i++) {
                materialTypeList.push({
                  id: data[i].id,
                  material_type: data[i].material_type,
                  particulars: data[i].particulars,
                });
              }
            }
          }

          observer.next([true, materialTypeList]);
          observer.complete();
        },
        (error) => {

          observer.next([false, error]);
          observer.complete();
        })
    })
  }


  // Get Material Type by ID
  getMaterialTypeById(id: number): Observable<[boolean, any]> {

    return new Observable<[boolean, any]>((observer) => {

      let materialType: MaterialTypeModel;

      this.http.get<any>(this.defaultAPIURLHost + '/api/material_types/' + id, httpOptions).subscribe(
        (response) => {
          let result = response['data']
          if (result != null) {
            materialType = {
              id: result.id,
              material_type: result.material_type,
              particulars: result.particulars,
            };
          }

          observer.next([true, materialType]);
          observer.complete();
        },
        (error) => {

          observer.next([false, error]);
          observer.complete();
        })
    })
  }


  // Register new Material Type
  addMaterialType(data: MaterialTypeModel): Observable<[boolean, MaterialTypeModel]> {
    let materialType: MaterialTypeModel = {
      id: data.id,
      material_type: data.material_type,
      particulars: data.particulars,
    };
    return new Observable<[boolean, MaterialTypeModel]>((observer) => {

      this.http.post<MaterialTypeModel>(this.defaultAPIURLHost + '/api/material_types', materialType, httpOptions).subscribe(
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

  // Updated Exsisting Material Type
  updateMaterialType(id: number, data: MaterialTypeModel): Observable<[boolean, MaterialTypeModel]> {
    let materialType: MaterialTypeModel = {
      id: data.id,
      material_type: data.material_type,
      particulars: data.particulars,
    };
    return new Observable<[boolean, MaterialTypeModel]>((observer) => {

      this.http.put<MaterialTypeModel>(this.defaultAPIURLHost + '/api/material_types/' + id, materialType, httpOptions).subscribe(
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


  // Delete Material Type By ID
  deleteMaterialType(id: number): Observable<[boolean, MaterialTypeModel]> {

    return new Observable<[boolean, MaterialTypeModel]>((observer) => {

      this.http.delete<MaterialTypeModel>(this.defaultAPIURLHost + '/api/material_types/' + id, httpOptions).subscribe(
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
