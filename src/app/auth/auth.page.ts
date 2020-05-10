import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
isLoading = false;
isLogin = true;
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

  onSubmit(form:NgForm){
    console.log(form);
    if(!form.valid){
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    console.log(email,password);
    if(this.isLogin){
      //send a request to login server
    }else{
      //send a request to signup server
    }
  }

  onSwitch(){
this.isLogin = !this.isLogin;
  }

}
