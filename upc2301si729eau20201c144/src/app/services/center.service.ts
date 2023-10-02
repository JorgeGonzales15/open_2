import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Center } from '../models/center.model';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CenterService {
  base_Url = 'http://localhost:3000/api/v1/centers';

  constructor( private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }
  handleError( error: HttpErrorResponse){
    if(error.error instanceof ErrorEvent){
      console.log(`An error occured ${error.status}, body was: ${error.error}`);
    } else {
      console.log(`An error occured ${error.status}, body was: ${error.error}`);
    }
    return throwError('Something happened with request, try again later...')
  }
  createItem(item: any): Observable<Center>{
    return this.http
    .post<Center>(this.base_Url, JSON.stringify(item), this.httpOptions)
    .pipe(retry(2), catchError(this.handleError))
  }
  getList(): Observable<Center[]> {
    return this.http.get<Center[]>(this.base_Url)
      .pipe(retry(2), catchError(this.handleError))
  }
  getItem(id: number): Observable<Center>{
    return this.http
    .get<Center>(this.base_Url + '/' + id)
    .pipe(retry(2), catchError(this.handleError))
  }
  updateItem(id: number, item: any): Observable<Center>{
    return this.http
    .put<Center>(this.base_Url + '/' + id, JSON.stringify(item), this.httpOptions)
    .pipe(retry(2), catchError(this.handleError))
  }
  deleteItem(id: number): Observable<Center>{
    return this.http
    .delete<Center>(`${this.base_Url}/${id}`, this.httpOptions)
    .pipe(retry(2), catchError(this.handleError))
  }
}