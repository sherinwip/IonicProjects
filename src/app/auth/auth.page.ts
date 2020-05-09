import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
isLoading = false;
  constructor(private authService:AuthService,private route:Router,private loadingCtrl:LoadingController) { }

  ngOnInit() {
  }

  login(){
    this.isLoading= true;
    this.authService.login();
    this.loadingCtrl.create({keyboardClose:true,message:"Logging in.."}).then(
      LoadingEl =>{
        LoadingEl.present();
        setTimeout(() => {
          LoadingEl.dismiss();
          this.route.navigateByUrl("/places/tabs/discover");
        }, 1500);
      }
    );
    
    
  }

}
