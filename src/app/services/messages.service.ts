import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Message } from '../models/message.model';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, toArray, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class MessagesService {
  // @@ Nir: TEMP
  baseurl = 'http://localhost:3000';

  constructor(private http:HttpClient) { }

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  // GET
  GetMessages(): Observable<Message[]> {
    return this.http.get<Message[]>(this.baseurl + '/messages/')
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  // POST
  CreateMessage(data: Message): Observable<Message> {
    return this.http.post<Message>(this.baseurl + '/messages/', JSON.stringify(data), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }  

  //@@ Nir: TEMP
  // Test(formData: FormData): Observable<any> {
  //   return this.http.post('https://localhost:44304/api/Test/NirTestFileUpload', formData)
  //   .pipe(
  //     retry(1),
  //     catchError(this.errorHandl)
  //   )
  // }

  // Error handling
  errorHandl(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
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
