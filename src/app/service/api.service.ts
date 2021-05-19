import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Item } from '../model/Item';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUri = 'http://localhost:4000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  createUser(data): Observable<any> {
    const url = `${this.baseUri}/createUser`;
    return this.http.post(url, data)
      .pipe(
        catchError(this.errorMSG)
      );
  }

  getUser(name): Observable<any> {
    const url = `${this.baseUri}/readUser/${name}`;
    return this.http.get(url, {headers: this.headers}).pipe(
      map((res: Response) => {
        return res || {};
      }),
      catchError(this.errorMSG)
    );
  }

  getAllUsers() {
    return this.http.get(`${this.baseUri}/allUsers`);
  }

  createItem(data): Observable<any> {
    const url = `${this.baseUri}/createItem`;
    return this.http.post(url, data)
      .pipe(
        catchError(this.errorMSG)
      );
  }

  getAllItems() :Observable<any> {
    return this.http.get(`${this.baseUri}/allItems`);
  }

  deleteItem(id): Observable<any> {
    const url = `${this.baseUri}/deleteItem/${id}`;
    return this.http.delete(url, { headers: this.headers }).pipe(
      catchError(this.errorMSG)
    );
  }

  updateItem(id, data): Observable<any> {
    const url = `${this.baseUri}/updateItem/${id}`;
    return this.http.put(url, data, { headers: this.headers }).pipe(
      catchError(this.errorMSG)
    );
  }
  
  errorMSG(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
