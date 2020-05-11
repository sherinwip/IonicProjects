import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PlacesService } from '../../places.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-new-offer',
  templateUrl: './new-offer.page.html',
  styleUrls: ['./new-offer.page.scss'],
})
export class NewOfferPage implements OnInit {
form: FormGroup;
  constructor(private placeService:PlacesService,private router:Router,private loadingCtrl:LoadingController) { }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null,{
        updateOn:'blur',
        validators:[Validators.required]
      }),
      description:new FormControl(null,{
        updateOn:'blur',
        validators:[Validators.required,Validators.maxLength(180)]
      }),
      price:new FormControl(null,{
        updateOn:'blur',
        validators:[Validators.required,Validators.min(1)]
      }),
      dateFrom:new FormControl(null,{
        updateOn:'blur',
        validators:[Validators.required]
      }),
      dateTill:new FormControl(null,{
        updateOn:'blur',
        validators:[Validators.required]
      })
    });
  }

  createOffer(){
    console.log(this.form)
    if(!this.form.valid){
      return;
    }
    this.loadingCtrl.create({
      message:'Creating place...'
    }).then(loadingEl =>{
      loadingEl.present();
      this.placeService.addPlaces(this.form.value.title,
        this.form.value.description,
        +this.form.value.price,
        new Date(this.form.value.dateFrom),new Date(this.form.value.dateTill)).subscribe(places=>{
          loadingEl.dismiss();
          this.form.reset();
          this.router.navigateByUrl("/places/tabs/offers");
      
        });
    })
  

  }

}
