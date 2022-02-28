import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppSettings } from 'src/app/app-settings';
import { CustomerModel } from 'src/app/models/customer.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': ['application/json', 'application/x-www-form-urlencoded'],
    Authorization: 'Bearer ' + localStorage.getItem('token')
  })
}

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(
    private http: HttpClient,
    private appSettings: AppSettings
  ) { }

  private defaultAPIURLHost: string = this.appSettings.APIURLHost;


  // Get all Customer list
  getAllCustomers(): Observable<[boolean, any[]]> {
    return new Observable<[boolean, any[]]>((observer) => {

      let customerList: CustomerModel[] = [];

      this.http.get<any>(this.defaultAPIURLHost + '/api/customers', httpOptions).subscribe(
        response => {

          let results = response['data']
          if (results != null) {

            var data = results
            if (data.length > 0) {

              for (let i = 0; i <= data.length - 1; i++) {
                customerList.push({
                  id: data[i].id,
                  customer: data[i].customer,
                  contact_person: data[i].contact_person,
                  contact_number: data[i].contact_number,
                  particulars: data[i].particulars
                });
              }
            }
          }

          observer.next([true, customerList]);
          observer.complete();
        },
        (error) => {

          observer.next([false, error]);
          observer.complete();
        })
    })
  }


  // Get Customer by ID
  getCustomerById(id: number): Observable<[boolean, any]> {

    return new Observable<[boolean, any]>((observer) => {

      let customer: CustomerModel;

      this.http.get<any>(this.defaultAPIURLHost + '/api/customers/' + id, httpOptions).subscribe(
        (response) => {
          let result = response['data']
          if (result != null) {
            customer = {
              id: result.id,
              customer: result.company,
              contact_person: result.address,
              contact_number: result.contact_number,
              particulars: result.particulars
            };
          }

          observer.next([true, customer]);
          observer.complete();
        },
        (error) => {

          observer.next([false, error]);
          observer.complete();
        })
    })
  }


  // Register new Customer
  addCustomer(data: CustomerModel): Observable<[boolean, CustomerModel]> {
    let customer: CustomerModel = {
      id: data.id,
      customer: data.customer,
      contact_person: data.contact_person,
      contact_number: data.contact_number,
      particulars: data.particulars
    };
    return new Observable<[boolean, CustomerModel]>((observer) => {

      this.http.post<CustomerModel>(this.defaultAPIURLHost + '/api/customers', customer, httpOptions).subscribe(
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

  // Updated Exsisting Customer
  updateCustomer(id: number, data: CustomerModel): Observable<[boolean, CustomerModel]> {
    let customer: CustomerModel = {
      id: data.id,
      customer: data.customer,
      contact_person: data.contact_person,
      contact_number: data.contact_number,
      particulars: data.particulars
    };
    return new Observable<[boolean, CustomerModel]>((observer) => {

      this.http.put<CustomerModel>(this.defaultAPIURLHost + '/api/customers/' + id, customer, httpOptions).subscribe(
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


  // Delete Customer By ID
  deleteCustomer(id: number): Observable<[boolean, CustomerModel]> {

    return new Observable<[boolean, CustomerModel]>((observer) => {

      this.http.delete<CustomerModel>(this.defaultAPIURLHost + '/api/customers/' + id, httpOptions).subscribe(
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
