import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { Place } from '../../places/place.model';
import { NgForm } from '@angular/forms';
import { BookingsService } from '../bookings.service';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss'],
})
export class CreateBookingComponent implements OnInit {
  @Input() selectedPlace:Place;
  @Input() selectedMode:'select' | 'random';
  startDate:string;
  endDate:string;
  @ViewChild('f',{static:true}) form: NgForm;

  constructor(private modalCtrl:ModalController,private bookingService:BookingsService,private loadingCtrl:LoadingController) { }

  ngOnInit() {
    const availableFrom =  new Date(this.selectedPlace.dateFrom);
    const availableTo = new Date( this.selectedPlace.dateTo);
    if(this.selectedMode==='random'){
      this.startDate = new Date(availableFrom.getTime()+Math.random() * (availableTo.getTime() - 8 *24 *60*60*1000 - availableFrom.getTime())).toISOString();

      this.endDate = new Date (new Date(this.startDate).getTime() + Math.random() * (new Date(this.startDate).getTime()+ 6 * 24 * 60 * 60 * 1000 - new Date(this.startDate).getTime())).toISOString();
    }
  }

  onClose(){
this.modalCtrl.dismiss(null,"Cancel");
  }
  onBooked(){
    if(!this.form.valid || !this.datesValid){
      return;
    }
this.modalCtrl.dismiss({bookingData:{
  name:this.form.value['name'],
  guestNumber : this.form.value['numberOfGuest'],
  dateFrom:this.form.value['dateFrom'],
  dateTo:this.form.value['dateTo']
}},"confirm");
  }

  datesValid(){
    const startDate = new Date (this.form.value['dateFrom']);
    const endDate = new Date (this.form.value['dateTo']);
    return endDate > startDate;

  }

  cancelBooking(){

  }

  addBooking(){
    this.loadingCtrl.create({
      message:'Confirming Booking..'
    }).then(loadingEl => {
      loadingEl.present();
      this.bookingService.addBooking(this.selectedPlace.id,this.selectedPlace.title,this.selectedPlace.imageUrl,this.form.value['name']
      ,this.form.value['guestNumber'],
      this.form.value['dateFrom'],
      this.form.value['dateTo']
      ).subscribe(() =>{
        this.loadingCtrl.dismiss(); 
      })
    });

  }

}
