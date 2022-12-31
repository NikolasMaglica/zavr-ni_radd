import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Service_Offer } from '../models/service_offer';

@Injectable({
  providedIn: 'root'
})
export class ServiceOfferService {

  baseApiUrl:string=environment.apiUrl;


  constructor(private http:HttpClient) {}
  
  getAllService_Offer():Observable<Service_Offer[]>{
    return this.http.get<Service_Offer[]>(this.baseApiUrl +'api/service_offer');
}
addService_Offer(addServiceRequest:Service_Offer):Observable<Service_Offer>{
  return this.http.post<Service_Offer>(this.baseApiUrl +'api/service_offer', addServiceRequest);
}
getService_Offer(id:string):Observable<Service_Offer>{
  return this.http.get<Service_Offer>(this.baseApiUrl+'api/service_offer/'+id);
}
updateService_Offer(id:string, updateServiceRequest:Service_Offer):Observable<Service_Offer>{
  return this.http.put<Service_Offer>(this.baseApiUrl +'api/service_offer/'+id, updateServiceRequest);
}
deleteService_Offer(id:string):Observable<Service_Offer>{
  return this.http.delete<Service_Offer>(this.baseApiUrl +'api/service_offer/'+id);
}
}