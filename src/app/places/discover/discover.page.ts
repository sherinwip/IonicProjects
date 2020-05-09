import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../places.service';
import { Place } from '../place.model';
import { SegmentChangeEventDetail } from '@ionic/core';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit {
loadedPlace : Place[];
listedLoadedPlaces:Place[];
  constructor(private placeService:PlacesService) { }

  ngOnInit() {
    this.loadedPlace = this.placeService.places;
    this.listedLoadedPlaces = this.loadedPlace.slice(1);
  }

  onFilterUpdate(event:CustomEvent<SegmentChangeEventDetail>){
    console.log(event.detail);
    
  }

}
