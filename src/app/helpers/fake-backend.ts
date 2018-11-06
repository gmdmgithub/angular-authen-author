import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
 
@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    
    
    constructor() { }
 
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      console.log("fake start", request, next);
      
        // array in local storage for registered users
        let users: any[] = JSON.parse(localStorage.getItem('users')) || [];
        
        //admin
      let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkdyZWcgTSIsImVtYWlsIjoiZ3JlZ0BleGFtcGxlLmNvbSIsImFkbWluIjp0cnVlLCJleHAiOjE4NTE1MTg1NDQsInJvbGVzIjpbIkFETUlOIiwiSFIiXSwianRpIjoiNzcxYzA2NDMtNTg1ZC00ZDZlLWE1YWYtZmRjZmQwYjQzMGFlIiwiaWF0IjoxNTQxNTE4NTQ0fQ.e2LwCBUK7CkBxp2ckjEpykBt72RSm0JPzb8_o5JtJjk";
      //not admin
      // let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkdyZWcgTSIsImVtYWlsIjoiZ3JlZ0BleGFtcGxlLmNvbSIsImFkbWluIjpmYWxzZSwiZXhwIjoxODUxNTE4NTQ0LCJyb2xlcyI6WyJBRE1JTiIsIkhSIl0sImp0aSI6Ijc3MWMwNjQzLTU4NWQtNGQ2ZS1hNWFmLWZkY2ZkMGI0MzBhZSIsImlhdCI6MTU0MTUxODU0NH0.AdyqN27avdMhf_Fit30BBPUnpphC5CpqNdbhe9QRCt8";
      // wrap in delayed observable to simulate server api call
        return of(null).pipe(
          
          mergeMap(() => {
            // authenticate
            if (request.url.endsWith('/api/authenticate') && request.method === 'POST') {
               
                // find if any user matches login credentials
                let body = request.body;

                console.log('fake start - POST',body);
 
                if (body.email === 'greg@domain.com' && body.password === '54321') {
                    return of(new HttpResponse({ status: 200, body: {token: token} }));
 
                  } else {
                    return throwError({ error: { message: 'Username or password is incorrect' } });
                  }
            }
            
            // get orders
            if (request.url.endsWith('/api/orders') && request.method === 'GET') {
              console.log("orders ", request.headers);
              
                // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer ' + token) {
                    return of(new HttpResponse({ status: 200, body: [1, 2, 3] }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return throwError({ error: { message: 'Unauthorised' } });
                }
            }
 
            // pass through any requests not handled above
            return next.handle(request);
             
        }))
 
        // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
        .pipe(materialize())
        .pipe(delay(500))
        .pipe(dematerialize());
    }
}
 
export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};