import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, map, tap } from "rxjs/operators";

@Injectable()
export class OrderService {
  constructor(private http: HttpClient) {}

  getOrders() {
    let token = localStorage.getItem("token");
    let headers = {
      headers: new HttpHeaders({ Authorization: "Bearer " + token })
    };

    return this.http.get("/api/orders", headers).pipe(map(orders => orders));
  }
}
