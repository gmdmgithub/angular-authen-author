import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { catchError, map, tap } from "rxjs/operators";
import { throwError } from "rxjs";

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {
  }

  login(credentials) { 
    return this.http
      .post("/api/authenticate", credentials)
      .pipe(
        map(response => {
          console.log(response);
          return response;
        }),
        catchError(
            (error: Response) => {
              console.log(error);
              return throwError(error);
        })
      );
  }

  logout() { 
  }

  isLoggedIn() { 
    return false;
  }


} 