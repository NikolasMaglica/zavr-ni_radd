import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Vehicle_Type } from '../models/vehicle_type';

@Injectable({
  providedIn: 'root'
})
export class VehicleTypeService {
  baseApiUrl:string=environment.apiUrl;


  constructor(private http:HttpClient) {}
  
  getAllVehicle_Types():Observable<Vehicle_Type[]>{
    return this.http.get<Vehicle_Type[]>(this.baseApiUrl +'api/vehicle_type');
}
addVehicle_Type(addVehicle_TypeRequest:Vehicle_Type):Observable<Vehicle_Type>{
  return this.http.post<Vehicle_Type>(this.baseApiUrl +'api/vehicle_type', addVehicle_TypeRequest);
}
getVehicle_Type(id:string):Observable<Vehicle_Type>{
  return this.http.get<Vehicle_Type>(this.baseApiUrl+'api/vehicle_type/'+id);
}
updateVehicle_Type(id:string, updateVehicle_TypeRequest:Vehicle_Type):Observable<Vehicle_Type>{
  return this.http.put<Vehicle_Type>(this.baseApiUrl +'api/vehicle_type/'+id, updateVehicle_TypeRequest);
}
deleteVehicle_Type(id:string):Observable<Vehicle_Type>{
  return this.http.delete<Vehicle_Type>(this.baseApiUrl +'api/vehicle_type/'+id);
}
}