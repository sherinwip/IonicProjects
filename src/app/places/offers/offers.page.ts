import { Component, OnInit } from '@angular/core';
import { Offer } from './offer.model';
import { OffersService } from './offers.service';
import { Place } from '../place.model';
import { PlacesService } from '../places.service';
import { IonItemSliding } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {
loadedPlace:Place[];

  constructor(private placeService:PlacesService,private router:Router) { }

  ngOnInit() {
    this.loadedPlace = this.placeService.places;
  }

  onEdit(placeID:string,slidingOption:IonItemSliding){
    slidingOption.close();
    this.router.navigate(['/places/tabs/offers/edit',placeID]);
  }
  onDelete(placeID:string,slidingOption:IonItemSliding){
    slidingOption.close();
  }

}
