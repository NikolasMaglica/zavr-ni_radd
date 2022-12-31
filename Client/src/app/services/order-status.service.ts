import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Order_Material } from '../models/order_material.model';
import { Order_Status } from '../models/order_status';

@Injectable({
  providedIn: 'root'
})
export class OrderStatusService {

  baseApiUrl:string=environment.apiUrl;


  constructor(private http:HttpClient) {}
  
  getAllOrder_Status():Observable<Order_Status[]>{
    return this.http.get<Order_Status[]>(this.baseApiUrl +'api/order_status');
}
addOrder(addOrder_StatusRequest:Order_Status):Observable<Order_Status>{
  return this.http.post<Order_Status>(this.baseApiUrl +'api/order_status', addOrder_StatusRequest);
}
getOrder_Status(id:string):Observable<Order_Status>{
  return this.http.get<Order_Status>(this.baseApiUrl+'api/order_status/'+id);

}
}
