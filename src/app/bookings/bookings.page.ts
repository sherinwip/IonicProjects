import { Component, OnInit } from '@angular/core';
import { Booking } from './booking.model';
import { BookingsService } from './bookings.service';
import { IonItemSliding } from '@ionic/angular';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit {
private loadedBookings:Booking[];
  constructor(private bookingsService:BookingsService) { }

  ngOnInit() {
    this.loadedBookings = this.bookingsService.bookings;
  }
onDelete(offerId:string,slidingEL:IonItemSliding){
  slidingEL.close();
  //delete the booking 

}
}
