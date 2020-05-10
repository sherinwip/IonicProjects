import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController, ModalController, ActionSheetController } from '@ionic/angular';
import { CreateBookingComponent } from '../../../bookings/create-booking/create-booking.component';
import { Place } from '../../place.model';
import { PlacesService } from '../../places.service';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit {
  place:Place;
  selectedMode:string;

  constructor(private router:Router,private navCtrl:NavController,private modalCtrl:ModalController,
    private placeService:PlacesService,
    private route:ActivatedRoute,
    private actionSheet:ActionSheetController) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap =>{
      this.place = this.placeService.getPlaces(paramMap.get('placeId'));
    });
    
    console.log(this.place);
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
  
}




 


