import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Offer } from '../models/offer.model';

@Injectable({
  providedIn: 'root'
})
export class OffersService {
  baseApiUrl:string=environment.apiUrl;


  constructor(private http:HttpClient) {}
  
  getAllOffers():Observable<Offer[]>{
    return this.http.get<Offer[]>(this.baseApiUrl +'api/offers');
}
addOffer(addOfferRequest:Offer):Observable<Offer>{
  return this.http.post<Offer>(this.baseApiUrl +'api/offers', addOfferRequest);
}
getOffer(id:string):Observable<Offer>{
  return this.http.get<Offer>(this.baseApiUrl+'api/offers/'+id);
}
updateOffer(id:string, updateOfferRequest:Offer):Observable<Offer>{
  return this.http.put<Offer>(this.baseApiUrl +'api/offers/'+id, updateOfferRequest);
}
deleteOffer(id:string):Observable<Offer>{
  return this.http.delete<Offer>(this.baseApiUrl +'api/offers/'+id);
}
}