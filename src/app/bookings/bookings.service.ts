import { Injectable } from '@angular/core';
import { Booking } from './booking.model';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {
private _bookings:Booking[]=[
  new Booking('xyz',
  'Ganesh Heritage',
  'P1',
  2,
  'abc')
];

get bookings(){
  return [...this._bookings];
}
  constructor() { }
}
