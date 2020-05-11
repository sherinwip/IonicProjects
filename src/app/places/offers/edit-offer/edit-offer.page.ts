import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PlacesService } from '../../places.service';
import { Place } from '../../place.model';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit,OnDestroy {
place:Place;
form:FormGroup;
placeSub:Subscription;
  constructor(private route:ActivatedRoute,private placeService:PlacesService,private loadingCtrl:LoadingController,private router:Router) { }

  ngOnInit() {

    
    this.route.paramMap.subscribe(paramMap=>{
      console.log(paramMap.get('placeId'));
    this.placeSub =  this.placeService.getPlaces(paramMap.get('placeId')).subscribe(place => {
        this.place = place;
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
      });
    })
  }

  updateOffer(){
  if(!this.form.valid){
    return 
  }
this.loadingCtrl.create({
  message:'updated Place..'
}).then(lodingEl => {
  lodingEl.present();
  this.placeService.updatePlace(this.place.id,this.form.value.title,this.form.value.description).subscribe(places =>{
    console.log(places);
    lodingEl.dismiss();
    this.form.reset();
    this.router.navigate(['/places/tabs/offers'])
  });
  
});

  }
  ngOnDestroy(){
    if(this.placeSub){
      this.placeSub.unsubscribe();
    }
  }

}
