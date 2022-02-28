import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppSettings } from 'src/app/app-settings';
import { BranchModel } from 'src/app/models/branch.models';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': ['application/json', 'application/x-www-form-urlencoded'],
    Authorization: 'Bearer ' + localStorage.getItem('token')
  })
}

@Injectable({
  providedIn: 'root'
})
export class BranchService {

  constructor(
    private http: HttpClient,
    private appSettings: AppSettings
  ) { }

  private defaultAPIURLHost: string = this.appSettings.APIURLHost;


  // Get all branches list
  getAllBranches(): Observable<[boolean, any[]]> {
    return new Observable<[boolean, any[]]>((observer) => {

      let branchList: BranchModel[] = [];

      this.http.get<any>(this.defaultAPIURLHost + '/api/branches', httpOptions).subscribe(
        response => {

          let results = response['data']
          if (results != null) {

            var data = results
            if (data.length > 0) {

              for (let i = 0; i <= data.length - 1; i++) {
                branchList.push({
                  id: data[i].id,
                  comapany_id: data[i].comapany_id,
                  branch: data[i].branch,
                  address: data[i].address,
                });
              }
            }
          }

          observer.next([true, branchList]);
          observer.complete();
        },
        (error) => {

          observer.next([false, error]);
          observer.complete();
        })
    })
  }


  // Get branch by ID
  getBranchById(id: number): Observable<[boolean, any]> {

    return new Observable<[boolean, any]>((observer) => {

      let branch: BranchModel;

      this.http.get<any>(this.defaultAPIURLHost + '/api/branches/' + id, httpOptions).subscribe(
        (response) => {
          let result = response['data']
          if (result != null) {
            branch = {
              id: result.id,
              comapany_id: result.comapany_id,
              branch: result.branch,
              address: result.address,
            };
          }

          observer.next([true, branch]);
          observer.complete();
        },
        (error) => {

          observer.next([false, error]);
          observer.complete();
        })
    })
  }


  // Register new branch
  addBranch(data: BranchModel): Observable<[boolean, BranchModel]> {
    let branch: BranchModel = {
      id: data.id,
      comapany_id: data.comapany_id,
      branch: data.branch,
      address: data.address,
    };
    return new Observable<[boolean, BranchModel]>((observer) => {

      this.http.post<BranchModel>(this.defaultAPIURLHost + '/api/branches', branch, httpOptions).subscribe(
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

  // Updated Exsisting Branch
  updateBranch(id: number, data: BranchModel): Observable<[boolean, BranchModel]> {
    let branch: BranchModel = {
      id: data.id,
      comapany_id: data.comapany_id,
      branch: data.branch,
      address: data.address,
    };
    return new Observable<[boolean, BranchModel]>((observer) => {

      this.http.put<BranchModel>(this.defaultAPIURLHost + '/api/branches/' + id, branch, httpOptions).subscribe(
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

  // Delete Branch By ID
  deleteBranch(id: number): Observable<[boolean, BranchModel]> {

    return new Observable<[boolean, BranchModel]>((observer) => {

      this.http.delete<BranchModel>(this.defaultAPIURLHost + '/api/branches/' + id, httpOptions).subscribe(
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
