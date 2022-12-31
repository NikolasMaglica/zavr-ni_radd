import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  baseApiUrl:string=environment.apiUrl;


  constructor(private http:HttpClient) {}
  
  getAllOrders():Observable<Order[]>{
    return this.http.get<Order[]>(this.baseApiUrl +'api/order');
}
addOrder(addVehicleRequest:Order):Observable<Order>{
  return this.http.post<Order>(this.baseApiUrl +'api/order', addVehicleRequest);
}
getOrder(id:string):Observable<Order>{
  return this.http.get<Order>(this.baseApiUrl+'api/order/'+id);
}
updateOrder(id:string, updateOrderRequest:Order):Observable<Order>{
  return this.http.put<Order>(this.baseApiUrl +'api/order/'+id, updateOrderRequest);
}
deleteOrder(id:string):Observable<Order>{
  return this.http.delete<Order>(this.baseApiUrl +'api/vehicle/'+id);
}
}
