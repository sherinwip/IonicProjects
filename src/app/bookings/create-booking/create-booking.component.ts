import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Place } from '../../places/place.model';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss'],
})
export class CreateBookingComponent implements OnInit {
  @Input() selectedPlace:Place;

  constructor(private modalCtrl:ModalController) { }

  ngOnInit() {}

  onClose(){
this.modalCtrl.dismiss(null,"Cancel");
  }
  onBooked(){
this.modalCtrl.dismiss(this.selectedPlace,"confirm");
  }

}
