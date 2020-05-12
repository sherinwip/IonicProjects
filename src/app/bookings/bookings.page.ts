import { Component, OnInit, OnDestroy } from '@angular/core';

import { Booking } from './booking.model';
import { BookingsService } from './bookings.service';
import { IonItemSliding, LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit ,OnDestroy{
private loadedBookings:Booking[];
bookingSub : Subscription;
  constructor(private bookingsService:BookingsService,private loadingService:LoadingController) { }

  ngOnInit() {
      this.bookingSub = this.bookingsService.bookings.subscribe(bookings => {
      this.loadedBookings = bookings;
    });
  }
  onCancelBooking(offerId:string,slidingEL:IonItemSliding){
    console.log(offerId);
    this.loadingService.create({
      message:'cancelling..'
    }).then(loadingEl => {
      loadingEl.present();
      this.bookingsService.cancelBooking(offerId).subscribe(() => {
        console.log('finished');
        loadingEl.dismiss();
        slidingEL.close();
      }); 
    });
  //delete the booking 

}
ngOnDestroy(){
  if(this.bookingSub){
    this.bookingSub.unsubscribe();
  }
}
}
