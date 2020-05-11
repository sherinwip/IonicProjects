import { Component, OnInit, OnDestroy } from '@angular/core';
import { Offer } from './offer.model';
import { OffersService } from './offers.service';
import { Place } from '../place.model';
import { PlacesService } from '../places.service';
import { IonItemSliding } from '@ionic/angular';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit ,OnDestroy{
  
loadedPlace:Place[];
placesSub:Subscription;

  constructor(private placeService:PlacesService,private router:Router) { }

  ngOnInit() {
    this.placesSub = this.placeService.places.subscribe(places => {
      this.loadedPlace = places;
    });
  }

  onEdit(placeID:string,slidingOption:IonItemSliding){
    slidingOption.close();
    this.router.navigate(['/places/tabs/offers/edit',placeID]);
  }
  onDelete(placeID:string,slidingOption:IonItemSliding){
    slidingOption.close();
  }

  ngOnDestroy(): void {
    if (this.placesSub){
      this.placesSub.unsubscribe();
    }
  }

}
