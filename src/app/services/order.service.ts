import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class OrderService {
  constructor(private http: HttpClient) {}

  getOrders() {
    const token = localStorage.getItem('token');
    const headers = {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + token })
    };

    return this.http.get('/api/orders', headers).pipe(map(orders => orders));
  }
}
