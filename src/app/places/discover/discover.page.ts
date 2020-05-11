import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlacesService } from '../places.service';
import { Place } from '../place.model';
import { SegmentChangeEventDetail } from '@ionic/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit,OnDestroy {
 
loadedPlace : Place[];
listedLoadedPlaces:Place[];
placesSub : Subscription;
relevantPlaces:Place[];
  constructor(private placeService:PlacesService,private authService:AuthService) { }

  ngOnInit() {

    this.placesSub = this.placeService.places.subscribe(place => {
      this.loadedPlace = place;
      this.relevantPlaces = this.loadedPlace;
      this.listedLoadedPlaces = this.relevantPlaces.slice(1);
    } );
  }

  onFilterUpdate(event:CustomEvent<SegmentChangeEventDetail>){
    console.log(event.detail);
    if(event.detail.value == 'all'){
      this.relevantPlaces = this.loadedPlace;
      this.listedLoadedPlaces = this.relevantPlaces.slice(1);
    }else{
      this.relevantPlaces = this.loadedPlace.filter(place => place.userId !== this.authService.getUserId);
      console.log(this.relevantPlaces);
      this.listedLoadedPlaces = this.relevantPlaces.slice(1);
    }
    
  }

  ngOnDestroy(): void {
    if(this.placesSub){
      this.placesSub.unsubscribe();
    }
  }

}
