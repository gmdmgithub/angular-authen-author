import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { JwtHelperService } from "@auth0/angular-jwt";

import { catchError, map, tap } from "rxjs/operators";
import { throwError } from "rxjs";

@Injectable()
export class AuthService {
  userlogin: string;

  constructor(private http: HttpClient) {}

  login(credentials) {
    this.userlogin = credentials.email;
    return this.http.post("/api/authenticate", credentials).pipe(
      map(response => {
        // console.log(response);
        return response;
      }),
      catchError((error: Response) => {
        // console.log(error);
        return throwError(error);
      })
    );
  }

  logout() {
    this.validateLogin(false);
  }

  isLoggedIn() {
    let token = localStorage.getItem("token");
    if (!token) return false;

    let jwtHelper = new JwtHelperService();
    let isTokenExpired = jwtHelper.isTokenExpired(token);

    // console.log('exp date',jwtHelper.getTokenExpirationDate(token));
    // console.log('token', jwtHelper.decodeToken(token));

    return !isTokenExpired;
  }

  public validateLogin(validLogin, token?) {
    validLogin
      ? localStorage.setItem("token", token)
      : localStorage.removeItem("token");
  }

  getLogin() {
    let jwtHelper = new JwtHelperService();
    let token = localStorage.getItem("token");
    if (token) {
      console.log("exp date", jwtHelper.getTokenExpirationDate(token));
      console.log("token", jwtHelper.decodeToken(token));
    }

    return this.isLoggedIn() ? this.userlogin : "";
  }
  get currentUser() {
    let jwtHelper = new JwtHelperService();
    let token = localStorage.getItem("token");
    if (token) {
      console.log("token", jwtHelper.decodeToken(token));
      return jwtHelper.decodeToken(token);
    }
    return {'admin':false, 'user':''};
  }
}
