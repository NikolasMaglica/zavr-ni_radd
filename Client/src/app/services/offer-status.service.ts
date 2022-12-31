import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Offer_Status } from '../models/Offer_Status';

@Injectable({
  providedIn: 'root'
})
export class OfferStatusService {
  baseApiUrl:string=environment.apiUrl;


  constructor(private http:HttpClient) {}
  
  getAllOffers():Observable<Offer_Status[]>{
    return this.http.get<Offer_Status[]>(this.baseApiUrl +'api/Offer_Status');
}
addOffer(addOfferRequest:Offer_Status):Observable<Offer_Status>{
  return this.http.post<Offer_Status>(this.baseApiUrl +'api/Offer_Status', addOfferRequest);
}
getOffer(id:string):Observable<Offer_Status>{
  return this.http.get<Offer_Status>(this.baseApiUrl+'api/Offer_Status/'+id);
}
}