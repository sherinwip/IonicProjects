import { Injectable } from '@angular/core';
import { Offer } from './offer.model';

@Injectable({
  providedIn: 'root'
})
export class OffersService {

  private _offers:Offer[]=[
    new Offer('O1','Diwali Offer','on ocassion of diwali','https://cdn5.vectorstock.com/i/thumbs/53/24/diwali-offer-and-sale-voucher-design-with-vibrant-vector-17775324.jpg',20),
    new Offer('O2','Ramzan Offer','on ocassion of Ramzan','https://cdn.grabon.in/gograbon/images/festival/1555484171575/ramzan-logo.jpg',80),
    new Offer('O3','Christmas offer','on ocassion of christmas','https://i-verve.com/blog/wp-content/uploads/2018/12/special-offer-christmas-02-01-01-01-01-01.jpg',90),
    
  ];

  get offer(){
    return [...this._offers];
  }

  constructor() { }
}

