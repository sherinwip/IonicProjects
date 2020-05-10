import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PlacesService } from '../../places.service';
import { Place } from '../../place.model';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit {
place:Place;
form:FormGroup;
  constructor(private route:ActivatedRoute,private placeService:PlacesService) { }

  ngOnInit() {

    
    this.route.paramMap.subscribe(paramMap=>{
      console.log(paramMap.get('placeId'));
      this.place = this.placeService.getPlaces(paramMap.get('placeId'));
      this.form = new FormGroup({
        title:new FormControl(this.place.title,{
          updateOn:'blur',
          validators:[Validators.required]
          
        }),
        description:new FormControl(this.place.description,{
          updateOn:'blur',
          validators:[Validators.required]
        })
      });
    })
  }

  updateOffer(){
    console.log(this.form);
  }

}
