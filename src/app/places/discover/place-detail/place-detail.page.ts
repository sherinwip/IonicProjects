import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController, ModalController, ActionSheetController, LoadingController } from '@ionic/angular';
import { CreateBookingComponent } from '../../../bookings/create-booking/create-booking.component';
import { Place } from '../../place.model';
import { PlacesService } from '../../places.service';
import { Subscription } from 'rxjs';
import { BookingsService } from '../../../bookings/bookings.service';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit,OnDestroy {
  place:Place;
  selectedMode:string;
  placeSub : Subscription;
  isBookable = false;

  constructor(private router:Router,private navCtrl:NavController,private modalCtrl:ModalController,
    private placeService:PlacesService,
    private route:ActivatedRoute,
    private actionSheet:ActionSheetController,
    private bookingService:BookingsService,
    private loadingCtrl:LoadingController,
    private authService:AuthService
    ) { }

  ngOnInit() {
    this.placeSub = this.route.paramMap.subscribe(paramMap =>{
      this.placeService.getPlaces(paramMap.get('placeId')).subscribe(place => {
        this.place = place;
        console.log(this.place);
        this.isBookable = this.place.userId !== this.authService.getUserId;
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
      this.loadingCtrl.create({message:'Booking Place...'}).then(loadingEl => {
        if(resultData.role==='confirm'){
          loadingEl.present();
          const data = resultData.data.bookingData;
          this.bookingService.addBooking(this.place.id,this.place.title,this.place.imageUrl,data.name,data.guestNumber,data.dateFrom,data.dateTo).subscribe(bookings =>{
            console.log(bookings);
          })
          console.log("BOOKED!");
          loadingEl.dismiss();
          
        }
      });
    }
  );
}

ngOnDestroy(){
  if(this.placeSub){
    this.placeSub.unsubscribe();
  }
}
  
}




 


