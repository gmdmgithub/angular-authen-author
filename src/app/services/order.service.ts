import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class OrderService {

  constructor(private http: HttpClient) {
  }

  getOrders() { 
    console.log('get orders');
    
    return this.http.get('/api/orders').pipe(
      map( orders => orders)
    );
  }
} 