import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Order_Material } from '../models/order_material.model';

@Injectable({
  providedIn: 'root'
})
export class OrderMaterialService {

  baseApiUrl:string=environment.apiUrl;


  constructor(private http:HttpClient) {}
  
  getAllOrder_Material():Observable<Order_Material[]>{
    return this.http.get<Order_Material[]>(this.baseApiUrl +'api/order_material');
}
addOrder_Material(addOrder_MaterialRequest:Order_Material):Observable<Order_Material>{
  return this.http.post<Order_Material>(this.baseApiUrl +'api/order_material', addOrder_MaterialRequest);
}
getOrder_Material(id:string):Observable<Order_Material>{
  return this.http.get<Order_Material>(this.baseApiUrl+'api/order_material/'+id);
}
updateOrder_Material(id:string, updateServiceRequest:Order_Material):Observable<Order_Material>{
  return this.http.put<Order_Material>(this.baseApiUrl +'api/order_material/'+id, updateServiceRequest);
}
deleteOrder_Material(id:string):Observable<Order_Material>{
  return this.http.delete<Order_Material>(this.baseApiUrl +'api/order_material/'+id);
}
}