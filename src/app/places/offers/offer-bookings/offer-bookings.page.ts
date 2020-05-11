import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { PlacesService } from '../../places.service';
import { Place } from '../../place.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-offer-bookings',
  templateUrl: './offer-bookings.page.html',
  styleUrls: ['./offer-bookings.page.scss'],
})
export class OfferBookingsPage implements OnInit,OnDestroy {
  place:Place;
  placeSub:Subscription;

  constructor(private route:ActivatedRoute,private navCtrl:NavController,private placeService:PlacesService) { }

  ngOnInit() {
    this.placeSub = this.route.paramMap.subscribe(paramMap=>{
      if(!paramMap.has('placeId')){
        this.navCtrl.navigateBack('/places/tabs/offers');
        return;

      }
      this.placeService.getPlaces(paramMap.get('placeId')).subscribe(place=>{
        this.place = place;
      });
    });
  }
ngOnDestroy(){
  if(this.placeSub){
    this.placeSub.unsubscribe();
  }
}
}
