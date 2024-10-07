import {Injectable} from '@angular/core';
import {User} from "./user";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, catchError, retry, throwError, timer} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/user/register';

  constructor(private http: HttpClient) {
  }

  registerUser(user: User): Observable<void> {
    return this.http.post<void>(this.apiUrl, user, {}).pipe(
      retry({
        count: 1,
        delay: (error: HttpErrorResponse) => {
          if (error.status !== 400) {
            return timer(100);
          }
          return throwError(() => error);
        }
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 400) {
          if (typeof error.error === 'string')
            return throwError(() => new Error(error.error));
          if (error.error instanceof Array && error.error.length > 0)
            return throwError(() => new Error(error.error[0].defaultMessage));
          return throwError(() => new Error('Unknown error occurred'));
        } else if (error.status === 500) {
          return throwError(() => new Error('Internal server error'));
        } else {
          return throwError(() => new Error('Unknown error occurred'));
        }
      })
    );
  }
}
