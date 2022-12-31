import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Vehicle } from '../models/vehicle.model';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  baseApiUrl:string=environment.apiUrl;


  constructor(private http:HttpClient) {}
  
  getAllVehicles():Observable<Vehicle[]>{
    return this.http.get<Vehicle[]>(this.baseApiUrl +'api/vehicle');
}
addVehicle(addOfferRequest:Vehicle):Observable<Vehicle>{
  return this.http.post<Vehicle>(this.baseApiUrl +'api/vehicle', addOfferRequest);
}
getVehicle(id:string):Observable<Vehicle>{
  return this.http.get<Vehicle>(this.baseApiUrl+'api/vehicle/'+id);
}
updateVehicle(id:string, updateVehicleRequest:Vehicle):Observable<Vehicle>{
  return this.http.put<Vehicle>(this.baseApiUrl +'api/vehicle/'+id, updateVehicleRequest);
}
deleteVehicle(id:string):Observable<Vehicle>{
  return this.http.delete<Vehicle>(this.baseApiUrl +'api/vehicle/'+id);
}
}
