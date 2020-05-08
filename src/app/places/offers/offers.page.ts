import { Component, OnInit } from '@angular/core';
import { Offer } from './offer.model';
import { OffersService } from './offers.service';
import { Place } from '../place.model';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {
loadedPlace:Place[];

  constructor(private placeService:PlacesService) { }

  ngOnInit() {
    this.loadedPlace = this.placeService.places;
  }

}
