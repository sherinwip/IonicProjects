import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController, ModalController, ActionSheetController } from '@ionic/angular';
import { CreateBookingComponent } from '../../../bookings/create-booking/create-booking.component';
import { Place } from '../../place.model';
import { PlacesService } from '../../places.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit,OnDestroy {
  place:Place;
  selectedMode:string;
  placeSub : Subscription;

  constructor(private router:Router,private navCtrl:NavController,private modalCtrl:ModalController,
    private placeService:PlacesService,
    private route:ActivatedRoute,
    private actionSheet:ActionSheetController) { }

  ngOnInit() {
    this.placeSub = this.route.paramMap.subscribe(paramMap =>{
      this.placeService.getPlaces(paramMap.get('placeId')).subscribe(place => {
        this.place = place;
        console.log(this.place);
      });
    });
    
  }

  onBookPlace(){
    //this.router.navigateByUrl("/places/tabs/discover");
    //this.navCtrl.navigateBack('/places/tabs/discover');
    this.actionSheet.create({header:'Choose an Action',
    buttons:[
      {
        text:'Select Date',
        handler:()=>{
          this.openBookingModal('select');
        }},
        {
          text:'Random Date',
          handler:()=>{
            this.openBookingModal('random');
          }},
          {
            text:'Cancel',
            role:'cancel'
            
      }
    ]

  
  }).then(
    actionEL =>{
      actionEL.present();
    }
  );
}

openBookingModal(mode:'select'|'random'){
  this.modalCtrl.create({component:CreateBookingComponent,componentProps:{selectedPlace:this.place,selectedMode:mode}}).then(
    modalEl => {
      modalEl.present();
      return modalEl.onDidDismiss();
    }
  ).then(
    resultData => {
      console.log(resultData.data,resultData.role);
      if(resultData.role==='confirm'){
        console.log("BOOKED!");
      }
    }
  );
}

ngOnDestroy(){
  if(this.placeSub){
    this.placeSub.unsubscribe();
  }
}
  
}




 


