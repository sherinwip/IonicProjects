import { Injectable } from '@angular/core';
import { BehaviorSubject, } from 'rxjs';
import { Booking } from './booking.model';
import { AuthService } from '../auth/auth.service';
import {take,tap,delay} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {
private _bookings=new BehaviorSubject<Booking[]>([
  
]);

get bookings(){
  return this._bookings.asObservable();
}
  constructor(private authService:AuthService) { }

  addBooking(placeId:string,
    placeTitle:string,
    placeImage:string,
    name:string,
    guestNumber:number,
    dateFrom:Date,
    dateTo:Date
    ){
      const newBooking = new Booking(Math.random().toString(),placeTitle,placeId,guestNumber,this.authService.getUserId,dateFrom,dateTo,name);
      return this.bookings.pipe(take(1),delay(1000),tap(bookings =>{
        this._bookings.next(bookings.concat(newBooking));

      }));
  }

  cancelBooking(bookingId:string){
    return this.bookings.pipe(take(1),delay(1000),tap(bookings =>{
      console.log(bookings);
      this._bookings.next(bookings.filter(b => b.getId !== bookingId));
    }));
  }
}
